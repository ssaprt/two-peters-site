import { makeAutoObservable, runInAction } from "mobx";

class DefaultScrollBarStore {
  private _positionMode: "over" | "after" = "over";
  private _hideTimeout: number | null = null;
  private _autoHideEnabled: boolean = false;
  autoHideScrollBar: boolean = false;
  //родительский, куда помещаем полосу
  private _parentNode: HTMLElement | null = null;
  private _resizeObserver: ResizeObserver | null = null;
  private _mutationObserver: MutationObserver | null = null;

  //скроллбар обертка
  scrollBar: HTMLElement | null = null;
  widthScrollBarLayout: number = 0;
  private _wrapperNode: HTMLElement | null = null;

  visibleScrollBar: 0 | 1 = 0;
  customHeightScrollBar: number = 0;

  //дорожка
  track: HTMLElement | null = null;
  widthTrack: number = 0;
  heightTrack: number = 0;

  //ползунок
  thumb: HTMLElement | null = null;
  widthThumb: number = 0;
  private _boxShadowThumb: string = "";
  private _heightThumb: number = 0;
  private _verticalPositionThumb: number = 0;
  private _thumbVerticalPadding: number = 0;

  private _isDragging: boolean = false;
  private _dragStartY: number = 0;
  private _dragStartScrollTop: number = 0;

  private _mouseDown: boolean = false;

  constructor() {
    makeAutoObservable(this);
  }

  // ============================================
  // НАСТРОЙКА ВЫСОТЫ СКРОЛЛБАРА
  // ============================================
  setCustomHeight(percent: number) {
    if (percent < 0 || percent > 100) {
      return;
    }

    runInAction(() => {
      this.customHeightScrollBar = percent;
      // Обновляем стили скроллбара и ползунка
      this._setStylesPropsScrollBar();
      this.updateThumb();
    });
  }

  setStyles({ thumbBoxShadow }: Record<"thumbBoxShadow", string>) {
    runInAction(() => {
      this._boxShadowThumb = thumbBoxShadow;
    });
  }

  // Сброс кастомной высоты (вернуть на 100%)
  resetCustomHeight() {
    this.setCustomHeight(0);
  }

  private _observeSize() {
    if (!this._parentNode) return;

    this._resizeObserver = new ResizeObserver(() => {
      this._updateVisibility();
      this.updateThumb();
    });

    this._resizeObserver.observe(this._parentNode);
  }

  // Получаем реальную высоту скроллбара с учетом кастомной высоты
  get actualScrollBarHeight(): number {
    if (!this._parentNode) return 0;

    const clientHeight = this._parentNode.clientHeight;

    if (this.customHeightScrollBar > 0 && this.customHeightScrollBar <= 100) {
      return (clientHeight * this.customHeightScrollBar) / 100;
    }

    return clientHeight;
  }

  private _observeMutations() {
    if (!this._parentNode) return;

    this._mutationObserver = new MutationObserver(() => {
      this._updateVisibility();
      this.updateThumb();
    });

    this._mutationObserver.observe(this._parentNode, {
      childList: true,
      subtree: true,
    });
  }

  // Получаем вертикальное смещение для центрирования скроллбара
  get scrollBarTopOffset(): number {
    if (!this._parentNode) return 0;

    const clientHeight = this._parentNode.clientHeight;

    if (this.customHeightScrollBar > 0 && this.customHeightScrollBar <= 100) {
      const actualHeight = this.actualScrollBarHeight;
      return (clientHeight - actualHeight) / 2;
    }

    return 0;
  }

  // Метод для обновления размеров

  private _setDefaultParams() {
    runInAction(() => {
      this.widthTrack = this.widthScrollBarLayout;
      this.widthThumb = this.widthScrollBarLayout;
    });
  }

  initialScrollBar(valueNodeElement: HTMLElement | null, initialWidthScrollBar: number | undefined) {
    this._setDefaultParams();

    runInAction(() => {
      this.scrollBar = valueNodeElement;

      if (!this.scrollBar) return;

      // wrapper — родитель scrollbar
      this._wrapperNode = this.scrollBar.parentElement;

      // scroll-container — предыдущий sibling
      this._parentNode = this.scrollBar.previousElementSibling as HTMLElement;

      if (!this._wrapperNode || !this._parentNode) return;

      this.thumb = this.scrollBar.children[1] as HTMLElement;
      this.track = this.scrollBar.children[0] as HTMLElement;

      if (initialWidthScrollBar) {
        this.widthScrollBarLayout = initialWidthScrollBar;
      }

      if (this.track && this.thumb) {
        const trackWidth = parseInt(window.getComputedStyle(this.track).width);
        const thumbWidth = parseInt(window.getComputedStyle(this.thumb).width);
        this._thumbVerticalPadding = Math.max(0, (trackWidth - thumbWidth) / 2);
      }

      this._initializeThumb();
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          this._updateVisibility();
        });
      });
      this._setStylesPropsScrollBar();
    });
  }

  private _onScrollBarActivity() {
    if (!this._autoHideEnabled) return;
    if (!this.visibleScrollBar) return;

    this.autoHideScrollBar = false;
    this._startHideTimer();
  }

  setPositionMode(mode: "over" | "after") {
    runInAction(() => {
      this._positionMode = mode;

      this._applyAfterLayout(); // единственный источник
      this._setStylesPropsScrollBar();
    });
  }

  setHideTimeOut(timeOut: `${number}ms`) {
    const clearNumber = parseInt(timeOut.replace("ms", ""));
    runInAction(() => {
      this._hideTimeout = clearNumber;
    });
  }

  enableAutoHide(enabled: boolean = true) {
    runInAction(() => {
      this._autoHideEnabled = enabled;
      if (enabled) {
        this._startHideTimer();
      } else {
        this._clearHideTimer();
        this.autoHideScrollBar = false;
      }
    });
  }

  private _startHideTimer() {
    this._clearHideTimer();

    if (this._autoHideEnabled) {
      runInAction(() => {
        this.autoHideScrollBar = false; // Показываем
      });

      this._hideTimeout = window.setTimeout(() => {
        runInAction(() => {
          this.autoHideScrollBar = true; // Скрываем через 2 секунды
        });
      }, 2000);
    }
  }

  private _clearHideTimer() {
    if (this._hideTimeout) {
      clearTimeout(this._hideTimeout);
      this._hideTimeout = null;
    }
  }

  // ============================================
  // УПРАВЛЕНИЕ ПОЛЗУНКОМ (THUMB)
  // ============================================

  // Вычисляем высоту ползунка относительно scrollHeight
  private _calculateThumbHeight(): number {
    if (!this._parentNode) return 0;

    const scrollHeight = this._parentNode.scrollHeight;
    const clientHeight = this._parentNode.clientHeight;
    const visibleHeight = this.actualScrollBarHeight;

    const availableHeight = visibleHeight - this._thumbVerticalPadding * 2;

    if (scrollHeight <= clientHeight) {
      return availableHeight;
    }

    const thumbHeight = (clientHeight / scrollHeight) * availableHeight;
    const minThumbHeight = 30;

    return Math.max(thumbHeight, minThumbHeight);
  }

  // Вычисляем позицию ползунка относительно прокрутки
  private _calculateThumbPosition(): number {
    if (!this._parentNode) return 0;

    const scrollTop = this._parentNode.scrollTop;
    const scrollHeight = this._parentNode.scrollHeight;
    const clientHeight = this._parentNode.clientHeight;

    const maxScroll = scrollHeight - clientHeight;

    if (maxScroll <= 0) {
      return this._thumbVerticalPadding;
    }

    const availableHeight = this.actualScrollBarHeight - this._heightThumb - this._thumbVerticalPadding * 2;

    if (availableHeight <= 0) {
      return this._thumbVerticalPadding;
    }

    const ratio = scrollTop / maxScroll;

    const rawPosition = this._thumbVerticalPadding + ratio * availableHeight;

    const min = this._thumbVerticalPadding;
    const max = this.actualScrollBarHeight - this._heightThumb - this._thumbVerticalPadding;

    return Math.min(Math.max(rawPosition, min), max);
  }

  // Обновляем размер и позицию ползунка
  updateThumb() {
    runInAction(() => {
      const prevHeight = this._heightThumb;
      const prevPos = this._verticalPositionThumb;

      this._heightThumb = this._calculateThumbHeight();
      this._verticalPositionThumb = this._calculateThumbPosition();

      if (this.thumb) {
        this.thumb.style.height = `${this._heightThumb}px`;
        this.thumb.style.top = `${this._verticalPositionThumb}px`;
      }

      // 👇 ВАЖНО
      if (prevHeight !== this._heightThumb || prevPos !== this._verticalPositionThumb) {
        this._onScrollBarActivity();
      }
    });
  }

  // Подписываемся на событие прокрутки
  private _setupScrollListener() {
    if (!this._parentNode) return;

    this._parentNode.addEventListener("scroll", () => {
      this.updateThumb();
      this._updateVisibility();
      this._onScrollBarActivity();
    });
  }

  private _applyAfterLayout() {
    if (!this._parentNode) return;

    const gap = 4;
    const W = this.widthScrollBarLayout;

    if (this._positionMode === "after" && this.visibleScrollBar) {
      this._parentNode.style.transition = "right 0.2s ease-in-out";
      this._parentNode.style.paddingRight = `${W + gap}px`;
    } else {
      this._parentNode.style.transition = "right 0.2s ease-in-out";
      this._parentNode.style.right = `0px`;
    }
  }

  private _observeContentSize() {
    if (!this._parentNode) return;

    const content = this._parentNode.firstElementChild as HTMLElement;
    if (!content) return;

    this._resizeObserver = new ResizeObserver(() => {
      this._updateVisibility();
      this.updateThumb();
    });

    this._resizeObserver.observe(content);
  }

  private _updateVisibility() {
    if (!this._parentNode) {
      this.visibleScrollBar = 0;
      this._applyAfterLayout();
      return;
    }

    const scrollHeight = this._parentNode.scrollHeight;
    const clientHeight = this._parentNode.clientHeight;

    const newVisible = scrollHeight > clientHeight + 1 ? 1 : 0;

    if (newVisible !== this.visibleScrollBar) {
      this.visibleScrollBar = newVisible;
      this._applyAfterLayout();
    }
  }

  // Инициализация ползунка
  private _initializeThumb() {
    if (!this._parentNode) return;

    // сразу проверяем нужна ли полоса
    this._updateVisibility();

    // рассчитываем thumb
    this.updateThumb();

    // подписываемся на scroll
    this._setupScrollListener();

    // клик по треку
    this._setupTrackClickListener();

    // drag + hover
    this._setupThumbDragListener();
    this._onMouseHoverInit();
    this._observeSize();
    this._observeContentSize();
    this._observeMutations();
  }

  // ============================================
  // ОТСЛЕЖИВАНИЕ ИЗМЕНЕНИЙ ВЫСОТЫ
  // ============================================

  private _onMouseHoverInit = () => {
    if (this.thumb) {
      this.thumb.addEventListener("mouseenter", this._onMouseEnter);
      this.thumb.addEventListener("mouseleave", this._onMouseLeave);
    }
  };

  private _onMouseEnter = () => {
    if (this.thumb) {
      this.thumb.style.transform = "translateX(-50%) scaleX(1.8)";
      this.thumb.style.boxShadow = this._boxShadowThumb;
    }
  };

  private _onMouseLeave = () => {
    if (this.thumb) {
      if (this._mouseDown) return;
      this.thumb.style.transform = "translateX(-50%) scaleX(1)";
      this.thumb.style.boxShadow = "none";
    }
  };

  // Начало перетаскивания
  private _onThumbMouseDown = (e: MouseEvent) => {
    e.preventDefault();
    this._mouseDown = true;
    this._isDragging = true;
    this._dragStartY = e.clientY;
    this._dragStartScrollTop = this._parentNode?.scrollTop || 0;

    // Добавляем глобальные обработчики
    document.addEventListener("mousemove", this._onMouseMove);
    document.addEventListener("mouseup", this._onMouseUp);

    // Добавляем класс для курсора
    if (this.thumb) {
      this.thumb.style.transform = "translateX(-50%) scaleX(1.8)";
      this.thumb.style.boxShadow = this._boxShadowThumb;
    }
  };

  // Движение мыши
  private _onMouseMove = (e: MouseEvent) => {
    if (!this._isDragging || !this._parentNode) return;

    const deltaY = e.clientY - this._dragStartY;

    const scrollHeight = this._parentNode.scrollHeight;
    const clientHeight = this._parentNode.clientHeight;

    const maxScroll = scrollHeight - clientHeight;

    const maxThumbMove = this.actualScrollBarHeight - this._heightThumb - this._thumbVerticalPadding * 2;

    if (maxScroll <= 0 || maxThumbMove <= 0) return;

    const scrollRatio = maxScroll / maxThumbMove;
    const scrollDelta = deltaY * scrollRatio;

    this._parentNode.scrollTop = this._dragStartScrollTop + scrollDelta;
  };

  // Отпускание мыши
  private _onMouseUp = () => {
    this._isDragging = false;
    this._mouseDown = false;

    // Удаляем глобальные обработчики
    document.removeEventListener("mousemove", this._onMouseMove);
    document.removeEventListener("mouseup", this._onMouseUp);

    // Возвращаем курсор
    if (this.thumb) {
      this.thumb.style.transform = "translateX(-50%) scaleX(1)";
      this.thumb.style.boxShadow = "none";
    }
  };

  private _onThumbTouchStart = (e: TouchEvent) => {
    e.preventDefault();
    this._mouseDown = true;
    this._isDragging = true;
    this._dragStartY = e.touches[0].clientY;
    this._dragStartY = e.touches[0].clientY;
    this._dragStartScrollTop = this._parentNode?.scrollTop || 0;

    document.addEventListener("touchmove", this._onTouchMove);
    document.addEventListener("touchend", this._onTouchEnd);

    if (this.thumb) {
      this.thumb.style.transform = "translateX(-50%) scaleX(1.8)";
      this.thumb.style.boxShadow = this._boxShadowThumb;
    }
  };

  private _onTouchMove = (e: TouchEvent) => {
    if (!this._isDragging || !this._parentNode) return;

    const deltaY = e.touches[0].clientY - this._dragStartY;

    const scrollHeight = this._parentNode.scrollHeight;
    const clientHeight = this._parentNode.clientHeight;

    const maxScroll = scrollHeight - clientHeight;

    const maxThumbMove = this.actualScrollBarHeight - this._heightThumb - this._thumbVerticalPadding * 2;

    if (maxScroll <= 0 || maxThumbMove <= 0) return;

    const scrollRatio = maxScroll / maxThumbMove;
    const scrollDelta = deltaY * scrollRatio;

    this._parentNode.scrollTop = this._dragStartScrollTop + scrollDelta;
  };

  private _onTouchEnd = () => {
    this._isDragging = false;
    this._mouseDown = false;

    document.removeEventListener("touchmove", this._onTouchMove);
    document.removeEventListener("touchend", this._onTouchEnd);

    if (this.thumb) {
      this.thumb.style.transform = "translateX(-50%) scaleX(1)";
      this.thumb.style.boxShadow = "none";
    }
  };

  // Клик по треку (дорожке)
  private _onTrackClick = (e: MouseEvent) => {
    // Игнорируем клики по ползунку
    if (e.target === this.thumb) return;
    if (!this.track || !this._parentNode) return;

    const rect = this.track.getBoundingClientRect();
    const clickY = e.clientY - rect.top;

    const scrollHeight = this._parentNode.scrollHeight;
    const clientHeight = this._parentNode.clientHeight;
    const maxScroll = scrollHeight - clientHeight;

    if (maxScroll <= 0) return;

    const visibleHeight = this.actualScrollBarHeight;
    const availableHeight = visibleHeight - this._thumbVerticalPadding * 2;
    const maxThumbMove = visibleHeight - this._heightThumb - this._thumbVerticalPadding * 2;

    if (availableHeight <= 0 || maxThumbMove <= 0) return;

    // Вычисляем позицию клика относительно доступной области трека
    const clickPosition = Math.max(
      this._thumbVerticalPadding,
      Math.min(clickY, visibleHeight - this._thumbVerticalPadding),
    );

    // Преобразуем позицию клика в пропорцию (0-1)
    const ratio = (clickPosition - this._thumbVerticalPadding) / availableHeight;

    // Вычисляем новую позицию прокрутки
    const newScrollTop = ratio * maxScroll;

    this._parentNode.scrollTop = newScrollTop;
  };

  // Подписка на клик по треку
  private _setupTrackClickListener() {
    if (!this.track) return;
    this.track.addEventListener("mousedown", this._onTrackClick);
  }

  // Подписка на события ползунка
  private _setupThumbDragListener() {
    if (!this.thumb) return;
    this.thumb.addEventListener("mousedown", this._onThumbMouseDown);
    this.thumb.addEventListener("touchstart", this._onThumbTouchStart);
  }

  // Очистка при уничтожении
  cleanup() {
    // Отписываемся от scroll события
    if (this._parentNode) {
      this._parentNode.removeEventListener("scroll", this.updateThumb);
    }
    if (this._resizeObserver) {
      this._resizeObserver.disconnect();
      this._resizeObserver = null;
    }

    if (this._mutationObserver) {
      this._mutationObserver.disconnect();
      this._mutationObserver = null;
    }

    // Очистка обработчиков драга
    if (this.thumb) {
      this.thumb.removeEventListener("mousedown", this._onThumbMouseDown);
      this.thumb.removeEventListener("mouseenter", this._onMouseEnter);
      this.thumb.removeEventListener("mouseleave", this._onMouseLeave);
      this.thumb.removeEventListener("touchstart", this._onThumbTouchStart);
    }

    // Очистка обработчика клика по треку
    if (this.track) {
      this.track.removeEventListener("mousedown", this._onTrackClick);
    }
    document.removeEventListener("mousemove", this._onMouseMove);
    document.removeEventListener("mouseup", this._onMouseUp);
    document.removeEventListener("touchend", this._onTouchEnd);

    this._clearHideTimer();
  }

  private _setStylesPropsScrollBar() {
    runInAction(() => {
      if (!this.scrollBar) return;

      const gap = 4;
      const W = this.widthScrollBarLayout;

      this.scrollBar.style.position = "absolute";
      this.scrollBar.style.top = `${this.scrollBarTopOffset}px`;
      this.scrollBar.style.height = `${this.actualScrollBarHeight}px`;
      this.scrollBar.style.width = `${W}px`;

      // теперь всегда положительный right
      this.scrollBar.style.right = `${gap}px`;
    });
  }
}

export default DefaultScrollBarStore;
