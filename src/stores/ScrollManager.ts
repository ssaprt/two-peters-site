import Lenis from "lenis";
import { sectionVisibilityStore } from "./SectionVisibilityStore";
type ScrollState = {
    scroll: number;
    velocity: number;
    progress: number;
    direction: 1 | -1 | 0;
};
class ScrollManager {
    lenis: Lenis | null = null;
    wrapper: HTMLDivElement | null = null;
    currentTransitionTarget: HTMLElement | null = null;
    lastAlignedSection: HTMLElement | null = null;
    state: ScrollState = { scroll: 0, velocity: 0, progress: 0, direction: 1 };
    sections: HTMLElement[] = [];
    listeners = new Set<(state: ScrollState) => void>();
    isFullyBlocked = false;
    CONTROL_THRESHOLD = 20;
    TOUCH_THRESHOLD = 1;
    SNAP_DURATION = 1.1;
    ALIGN_DURATION = 0.5;
    isAnimating = false;
    activeIndex = 0;
    isLocked = false;
    isMobile = false;
    SNAP_GUARD = 300;
    transitionConsumed = false;
    hasAlignedUncontrolled = false;
    private touchStartY = 0;
    private touchHandled = false;
    EASING = (t: number) =>
        t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
    init(lenis: Lenis, wrapper: HTMLDivElement, isMobile: boolean) {
        this.lenis = lenis;
        this.wrapper = wrapper;
        this.SNAP_GUARD = Number(
            isMobile
                ? wrapper.getBoundingClientRect().height
                : (wrapper.getBoundingClientRect().height * 0.8).toFixed(0),
        );
        this.isMobile = isMobile;
        if (isMobile) {
            this.SNAP_DURATION = 0.9;
        }
        this.collectSections();
        lenis.on("scroll", (e) => {
            if (this.isFullyBlocked) return;
            this.state = {
                scroll: e.scroll,
                velocity: e.velocity,
                progress: e.progress,
                direction: e.direction as 1 | -1 | 0,
            };
            sectionVisibilityStore.update();
            this.emit();
            /** * desktop only */ if (!this.isMobile) {
                this.checkControlledTransition();
            }
        });
    }

    blockAll() {
        this.isFullyBlocked = true;

        this.isAnimating = false;
        this.isLocked = false;

        this.transitionConsumed = false;

        this.lenis?.stop();
    }

    unblockAll() {
        this.isFullyBlocked = false;

        this.isAnimating = false;
        this.isLocked = false;

        this.transitionConsumed = false;

        this.hasAlignedUncontrolled = false;

        this.currentTransitionTarget = null;
        this.lastAlignedSection = null;

        this.touchHandled = false;

        this.lenis?.start();

        this.collectSections();

        this.activeIndex = this.getActiveIndex();
    }

    subscribe(callback: (state: ScrollState) => void) {
        this.listeners.add(callback);
        return () => {
            this.listeners.delete(callback);
        };
    }
    emit() {
        for (const listener of this.listeners) {
            listener(this.state);
        }
    }
    collectSections() {
        this.sections = Array.from(
            document.querySelectorAll("[data-scroll-section]"),
        ) as HTMLElement[];
    }

    isNearUncontrolledTop(section: HTMLElement) {
        const rect = section.getBoundingClientRect();
        return Math.abs(rect.top) <= this.SNAP_GUARD;
    }

    getActiveIndex() {
        if (!this.sections.length) {
            this.activeIndex = 0;
            return 0;
        }

        if (this.activeIndex >= this.sections.length) {
            this.activeIndex = this.sections.length - 1;
        }
        if (this.activeIndex < 0) {
            this.activeIndex = 0;
        }

        let newIndex = 0;
        for (let i = 0; i < this.sections.length; i++) {
            const rect = this.sections[i].getBoundingClientRect();
            if (rect.top <= window.innerHeight / 2) {
                newIndex = i;
            }
        }

        this.activeIndex = newIndex;
        return this.activeIndex;
    }

    getSectionDirection(delta: number) {
        return delta > 0 ? 1 : -1;
    }
    lock() {
        this.isLocked = true;
        if (!this.lenis) return;
        this.lenis.scrollTo(this.lenis.scroll, { immediate: true });
    }
    unlock() {
        this.isLocked = false;
    }
    enableMomentum() {
        this.wrapper?.classList.add("momentum");
    }
    disableMomentum() {
        this.wrapper?.classList.remove("momentum");
    }
    handleTouchStart = (e: TouchEvent) => {
        if (!this.isMobile) return;
        if (this.isFullyBlocked) {
            e.preventDefault();
            return;
        }
        if (this.isAnimating || this.isLocked) {
            e.preventDefault();
            return;
        }
        this.touchHandled = false;
        this.touchStartY = e.touches[0].clientY;
    };
    handleTouchMove = (e: TouchEvent) => {
        if (!this.isMobile) return;
        if (this.isFullyBlocked) {
            e.preventDefault();
            return;
        }
        if (this.isAnimating || this.isLocked) {
            if (this.transitionConsumed) {
                e.preventDefault();
                return;
            }
            e.preventDefault();
            return;
        }
        if (this.touchHandled) {
            e.preventDefault();
            return;
        }
        const currentY = e.touches[0].clientY;
        const delta = this.touchStartY - currentY;
        if (Math.abs(delta) < this.TOUCH_THRESHOLD) {
            return;
        }
        this.touchHandled = true;

        this.collectSections();
        const direction = delta > 0 ? "down" : "up";
        const activeIndex = this.getActiveIndex();
        const currentSection = this.sections[activeIndex];
        const targetIndex =
            direction === "down" ? activeIndex + 1 : activeIndex - 1;
        const targetSection = this.sections[targetIndex];
        if (!targetSection) return;
        const currentRect = currentSection.getBoundingClientRect();

        const isCurrentControlled =
            currentSection.dataset.controlScroll === "true";
        const isTargetControlled =
            targetSection.dataset.controlScroll === "true";
        const shouldAlign = !isCurrentControlled && isTargetControlled;
        const isScrollingUp = direction === "up";

        if (isScrollingUp && !isCurrentControlled && isTargetControlled) {
            if (!this.isNearUncontrolledTop(currentSection)) {
                this.hasAlignedUncontrolled = false;
                this.touchHandled = false;
                return;
            }

            if (this.hasAlignedUncontrolled) {
                this.hasAlignedUncontrolled = false;
                this.lastAlignedSection = null;
                e.preventDefault();
                this.transitionConsumed = true;
                this.scrollToSection(targetSection, this.SNAP_DURATION); // явный snap
                return;
            } else {
                e.preventDefault();
                this.hasAlignedUncontrolled = true;
                this.transitionConsumed = true;
                this.lastAlignedSection = currentSection;
                this.scrollToSection(currentSection, this.ALIGN_DURATION);
                return;
            }
        }

        if (shouldAlign && !this.hasAlignedUncontrolled) {
            if (this.lastAlignedSection === currentSection) {
                this.lastAlignedSection = null;
            } else {
                const distanceToTop = Math.abs(currentRect.top);

                // Проверка расстояния
                if (distanceToTop > 2 && distanceToTop < this.SNAP_GUARD) {
                    e.preventDefault();
                    this.transitionConsumed = true;
                    this.lastAlignedSection = currentSection;

                    this.scrollToSection(currentSection, this.ALIGN_DURATION);
                    return;
                }
            }
        }

        const shouldSnap = isCurrentControlled || isTargetControlled;

        // Ограничение по скорости
        if (Math.abs(this.state.velocity) > 400) {
            return; // Игнорировать snap, если скорость слишком высокая
        }

        if (!shouldSnap) {
            this.touchHandled = false;
            return;
        }

        e.preventDefault();
        this.transitionConsumed = true;
        this.scrollToSection(targetSection, this.SNAP_DURATION);
    };

    checkControlledTransition() {
        if (!this.lenis) return;
        if (this.isAnimating) return;
        const direction = this.state.direction;
        if (!direction) return;
        const scroll = this.lenis.scroll;
        for (const section of this.sections) {
            const isControlled = section.dataset.controlScroll === "true";
            if (!isControlled) continue;
            const top = section.offsetTop;
            const distance = top - scroll;
            /** * DOWN */ if (
                direction === 1 &&
                distance > 0 &&
                distance < this.CONTROL_THRESHOLD
            ) {
                this.disableMomentum();
                this.enterControlledSection(section);
                return;
            }
            /** * UP */ if (
                direction === -1 &&
                distance < 0 &&
                Math.abs(distance) < this.CONTROL_THRESHOLD
            ) {
                this.disableMomentum();
                this.enterControlledSection(section);
                return;
            }
        }
    }
    handleWheel(e: WheelEvent) {
        if (this.isMobile) return;
        if (this.isFullyBlocked) {
            e.preventDefault();
            return;
        }
        if (this.isLocked || this.isAnimating) {
            if (this.transitionConsumed) {
                e.preventDefault();
                return;
            }
            e.preventDefault();
            return;
        }
        this.collectSections();
        if (!this.sections.length) return;
        const direction = e.deltaY > 0 ? "down" : "up";
        const activeIndex = this.getActiveIndex();
        const currentSection = this.sections[activeIndex];
        const targetIndex =
            direction === "down" ? activeIndex + 1 : activeIndex - 1;
        const targetSection = this.sections[targetIndex];

        if (!targetSection) return;
        const currentRect = currentSection.getBoundingClientRect();
        const isCurrentControlled =
            currentSection.dataset.controlScroll === "true";
        const isTargetControlled =
            targetSection.dataset.controlScroll === "true";
        const shouldAlign = !isCurrentControlled && isTargetControlled;
        const isScrollingUp = direction === "up";

        if (isScrollingUp && !isCurrentControlled && isTargetControlled) {
            /**
             * далеко внутри uncontrolled
             * обычный scroll
             */
            if (!this.isNearUncontrolledTop(currentSection)) {
                this.hasAlignedUncontrolled = false;
                return;
            }

            /**
             * уже align сделали —
             * теперь разрешаем snap
             */
            if (this.hasAlignedUncontrolled) {
                this.hasAlignedUncontrolled = false;
                this.lastAlignedSection = null;
            } else {
                /**
                 * first stop
                 */
                e.preventDefault();

                this.hasAlignedUncontrolled = true;
                this.transitionConsumed = true;
                this.lastAlignedSection = currentSection;
                this.scrollToSection(currentSection, this.ALIGN_DURATION);

                return;
            }
        }
        if (shouldAlign && !this.hasAlignedUncontrolled) {
            if (this.lastAlignedSection === currentSection) {
                this.lastAlignedSection = null;
            } else {
                const distanceToTop = Math.abs(currentRect.top);

                if (distanceToTop > 2) {
                    e.preventDefault();

                    this.transitionConsumed = true;

                    this.lastAlignedSection = currentSection;

                    this.scrollToSection(currentSection, this.ALIGN_DURATION);

                    return;
                }
            }
        }
        /** * SNAP */ const shouldSnap =
            isCurrentControlled || isTargetControlled;
        if (!shouldSnap) return;
        e.preventDefault();
        this.transitionConsumed = true;
        this.scrollToSection(targetSection, this.SNAP_DURATION);
    }
    /** * ========================================= * COMMON * ========================================= */ enterControlledSection(
        section: HTMLElement,
    ) {
        if (!this.lenis) return;
        this.isAnimating = true;
        this.lock();
        this.lenis.scrollTo(section, {
            duration: this.ALIGN_DURATION,
            easing: this.EASING,
            lock: true,
            onComplete: () => {
                requestAnimationFrame(() => {
                    requestAnimationFrame(() => {
                        this.unlock();
                        this.isAnimating = false;
                    });
                });
            },
        });
    }
    scrollToSection(
        section: HTMLElement,
        duration = this.SNAP_DURATION,
        onComplete?: () => void,
    ) {
        if (!this.lenis) return;
        this.currentTransitionTarget = section;
        this.isAnimating = true;
        this.lock();
        this.lenis.scrollTo(section, {
            duration,
            easing: this.EASING,
            lock: true,
            onComplete: () => {
                requestAnimationFrame(() => {
                    requestAnimationFrame(() => {
                        this.unlock();
                        this.touchHandled = false;
                        this.isAnimating = false;

                        window.setTimeout(() => {
                            this.touchHandled = false;
                        }, 180);
                        window.setTimeout(() => {
                            this.transitionConsumed = false;
                        }, 120);
                        onComplete?.();
                    });
                });
            },
        });
    }

    scrollToPosition(
        section: HTMLElement,
        offset = 0,
        duration = this.SNAP_DURATION,
        onComplete?: () => void,
    ) {
        if (!this.lenis) return;

        const top =
            section.getBoundingClientRect().top + this.lenis.scroll + offset;

        this.currentTransitionTarget = section;

        this.isAnimating = true;

        this.lock();

        this.lenis.scrollTo(top, {
            duration,
            easing: this.EASING,
            lock: true,

            onComplete: () => {
                requestAnimationFrame(() => {
                    requestAnimationFrame(() => {
                        this.unlock();

                        this.touchHandled = false;

                        this.isAnimating = false;

                        window.setTimeout(() => {
                            this.touchHandled = false;
                        }, 180);

                        window.setTimeout(() => {
                            this.transitionConsumed = false;
                        }, 120);

                        onComplete?.();
                    });
                });
            },
        });
    }

    scrollToIndex = (index: number) => {
        const section = this.sections[index];
        if (!section) return;
        this.transitionConsumed = true;
        this.scrollToSection(section);
    };
}
export const scrollManager = new ScrollManager();
