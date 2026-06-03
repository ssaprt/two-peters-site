import { TematicalColorButton } from "@/components/button/TematicalColorButton/TematicalColorButton";
import { OverlayForNodeContent } from "@/components/modals/OverlayForNodeContent/OverlayForNodeContent";
import { DefaultScrollBarScroll } from "@/components/scrollbar/DefaultScrollBarScroll/DefaultScrollBarScroll";
import { FullOverlayModalsControl } from "@/stores/FullOverlayModalsControl";
import { WaitingUtils } from "@/stores/WaitingUtils";
import clsx from "clsx";
import { observer } from "mobx-react-lite";
import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import styles from "./Popup.module.css";

export const Popup = observer(
    ({
        modalData,
        utilsData,
        type,
    }: {
        modalData: FullOverlayModalsControl;
        utilsData: WaitingUtils;
        type: "confidentiality" | "cookie";
    }) => {
        const timerRef = useRef<NodeJS.Timeout | null>(null);

        useEffect(() => {
            utilsData?.setWaiting(true);
            timerRef.current = setTimeout(() => {
                utilsData?.setWaiting(false);
            }, 700);
        }, []);

        return (
            modalData?.openModal &&
            createPortal(
                <OverlayForNodeContent
                    style={{
                        width: "86%",
                        height: "90dvh",
                        maxWidth: "920px",
                    }}
                    utilsData={utilsData!}
                    modalData={modalData}
                >
                    <div className={styles.popup}>
                        <div className={styles.topHeader}>
                            <span className="link-font">
                                {type === "confidentiality"
                                    ? "Политика конфиденциальности"
                                    : "Файлы cookie"}
                            </span>
                            <TematicalColorButton
                                onClick={() => {
                                    modalData.isHide();
                                }}
                            >
                                Закрыть
                            </TematicalColorButton>
                        </div>
                        <div className={styles.overlayScroll}>
                            <div
                                className={styles.scrollBox}
                                data-lenis-prevent
                            >
                                {type === "confidentiality" && (
                                    <div className={styles.body}>
                                        <div className={styles.section}>
                                            <h4
                                                className={clsx(
                                                    styles.title,
                                                    `tag-font`,
                                                )}
                                            >
                                                Политика конфиденциальности
                                            </h4>
                                            <span
                                                className={clsx(
                                                    styles.text,
                                                    `tag-font`,
                                                )}
                                            >
                                                Настоящая Политика
                                                конфиденциальности регулирует
                                                порядок обработки информации
                                                пользователей сайта.
                                            </span>
                                        </div>

                                        <div className={styles.section}>
                                            <h4
                                                className={clsx(
                                                    styles.title,
                                                    `tag-font`,
                                                )}
                                            >
                                                Общие положения
                                            </h4>
                                            <span
                                                className={clsx(
                                                    styles.text,
                                                    `tag-font`,
                                                )}
                                            >
                                                Сайт носит информационный
                                                характер и предоставляет
                                                пользователям возможность
                                                ознакомления с материалами, а
                                                также публикации комментариев.
                                                <br />
                                                <br />
                                                Используя сайт, пользователь
                                                соглашается с условиями
                                                настоящей Политики.
                                            </span>
                                        </div>

                                        <div className={styles.section}>
                                            <h4
                                                className={clsx(
                                                    styles.title,
                                                    `tag-font`,
                                                )}
                                            >
                                                Какие данные могут
                                                обрабатываться
                                            </h4>
                                            <span
                                                className={clsx(
                                                    styles.text,
                                                    `tag-font`,
                                                )}
                                            >
                                                При использовании сайта могут
                                                автоматически собираться:
                                                <ul>
                                                    <li>IP-адрес;</li>
                                                    <li>
                                                        сведения о браузере и
                                                        устройстве;
                                                    </li>
                                                    <li>
                                                        техническая информация о
                                                        посещении страниц;
                                                    </li>
                                                    <li>
                                                        данные файлов cookie.
                                                    </li>
                                                </ul>
                                                При публикации комментариев
                                                пользователь добровольно
                                                предоставляет информацию,
                                                указанную в форме комментария.
                                            </span>
                                        </div>

                                        <div className={styles.section}>
                                            <h4
                                                className={clsx(
                                                    styles.title,
                                                    `tag-font`,
                                                )}
                                            >
                                                Цели обработки данных
                                            </h4>
                                            <span
                                                className={clsx(
                                                    styles.text,
                                                    `tag-font`,
                                                )}
                                            >
                                                Информация может использоваться
                                                для:
                                                <ul>
                                                    <li>
                                                        обеспечения работы
                                                        сайта;
                                                    </li>
                                                    <li>
                                                        публикации и модерации
                                                        комментариев;
                                                    </li>
                                                    <li>
                                                        предотвращения спама и
                                                        злоупотреблений;
                                                    </li>
                                                    <li>
                                                        обеспечения безопасности
                                                        сайта;
                                                    </li>
                                                    <li>
                                                        анализа работы сайта и
                                                        улучшения его
                                                        функциональности.
                                                    </li>
                                                </ul>
                                            </span>
                                        </div>

                                        <div className={styles.section}>
                                            <h4
                                                className={clsx(
                                                    styles.title,
                                                    `tag-font`,
                                                )}
                                            >
                                                Комментарии пользователей
                                            </h4>
                                            <span
                                                className={clsx(
                                                    styles.text,
                                                    `tag-font`,
                                                )}
                                            >
                                                Пользователь самостоятельно
                                                несёт ответственность за
                                                информацию, размещаемую в
                                                комментариях.
                                                <br />
                                                <br />
                                                Администрация сайта оставляет за
                                                собой право удалять комментарии,
                                                нарушающие законодательство
                                                Российской Федерации или правила
                                                сайта.
                                            </span>
                                        </div>

                                        <div className={styles.section}>
                                            <h4
                                                className={clsx(
                                                    styles.title,
                                                    `tag-font`,
                                                )}
                                            >
                                                Передача данных третьим лицам
                                            </h4>
                                            <span
                                                className={clsx(
                                                    styles.text,
                                                    `tag-font`,
                                                )}
                                            >
                                                Информация пользователей не
                                                передаётся третьим лицам, за
                                                исключением случаев,
                                                предусмотренных
                                                законодательством Российской
                                                Федерации.
                                            </span>
                                        </div>

                                        <div className={styles.section}>
                                            <h4
                                                className={clsx(
                                                    styles.title,
                                                    `tag-font`,
                                                )}
                                            >
                                                Защита данных
                                            </h4>
                                            <span
                                                className={clsx(
                                                    styles.text,
                                                    `tag-font`,
                                                )}
                                            >
                                                Администрация сайта принимает
                                                разумные организационные и
                                                технические меры для защиты
                                                обрабатываемой информации.
                                            </span>
                                        </div>

                                        <div className={styles.section}>
                                            <h4
                                                className={clsx(
                                                    styles.title,
                                                    `tag-font`,
                                                )}
                                            >
                                                Изменение политики
                                            </h4>
                                            <span
                                                className={clsx(
                                                    styles.text,
                                                    `tag-font`,
                                                )}
                                            >
                                                Настоящая Политика может быть
                                                изменена без предварительного
                                                уведомления пользователей.
                                                Актуальная редакция всегда
                                                размещается на данной странице.
                                            </span>
                                        </div>

                                        <div className={styles.section}>
                                            <h4
                                                className={clsx(
                                                    styles.title,
                                                    `tag-font`,
                                                )}
                                            >
                                                Контакты
                                            </h4>
                                            <span
                                                className={clsx(
                                                    styles.text,
                                                    `tag-font`,
                                                )}
                                            >
                                                По вопросам, связанным с работой
                                                сайта и обработкой информации,
                                                пользователь может обратиться по
                                                контактным данным, указанным на
                                                сайте.
                                            </span>
                                        </div>
                                    </div>
                                )}

                                {type === "cookie" && (
                                    <div className={styles.body}>
                                        <div className={styles.section}>
                                            <h4
                                                className={clsx(
                                                    styles.title,
                                                    `tag-font`,
                                                )}
                                            >
                                                Политика использования файлов
                                                cookie
                                            </h4>
                                            <span
                                                className={clsx(
                                                    styles.text,
                                                    `tag-font`,
                                                )}
                                            >
                                                Настоящий сайт использует файлы
                                                cookie и аналогичные технологии
                                                для обеспечения корректной
                                                работы сервиса, повышения
                                                удобства использования и
                                                получения статистической
                                                информации о посещении сайта.
                                            </span>
                                        </div>

                                        <div className={styles.section}>
                                            <h4
                                                className={clsx(
                                                    styles.title,
                                                    `tag-font`,
                                                )}
                                            >
                                                Что такое cookie
                                            </h4>
                                            <span
                                                className={clsx(
                                                    styles.text,
                                                    `tag-font`,
                                                )}
                                            >
                                                Что такое cookie Cookie — это
                                                небольшие текстовые файлы,
                                                которые сохраняются на
                                                устройстве пользователя при
                                                посещении сайта. Они позволяют
                                                сайту запоминать информацию о
                                                действиях пользователя и его
                                                настройках.
                                            </span>
                                        </div>

                                        <div className={styles.section}>
                                            <h4
                                                className={clsx(
                                                    styles.title,
                                                    `tag-font`,
                                                )}
                                            >
                                                Для чего мы используем cookie
                                            </h4>
                                            <span
                                                className={clsx(
                                                    styles.text,
                                                    `tag-font`,
                                                )}
                                            >
                                                Файлы cookie могут
                                                использоваться для:
                                                <ul>
                                                    <li>
                                                        обеспечения работы сайта
                                                        и его отдельных функций;
                                                    </li>
                                                    <li>
                                                        сохранения
                                                        пользовательских
                                                        настроек; повышения
                                                        производительности и
                                                        безопасности сайта;
                                                    </li>
                                                    <li>
                                                        повышения
                                                        производительности и
                                                        безопасности сайта;
                                                    </li>
                                                    <li>
                                                        анализа посещаемости и
                                                        улучшения качества
                                                        сервиса.
                                                    </li>
                                                </ul>
                                            </span>
                                        </div>

                                        <div className={styles.section}>
                                            <h4
                                                className={clsx(
                                                    styles.title,
                                                    `tag-font`,
                                                )}
                                            >
                                                Какие данные могут собираться
                                            </h4>
                                            <span
                                                className={clsx(
                                                    styles.text,
                                                    `tag-font`,
                                                )}
                                            >
                                                С помощью cookie могут
                                                обрабатываться:
                                                <ul>
                                                    <li>
                                                        IP-адрес в обезличенном
                                                        виде;
                                                    </li>
                                                    <li>
                                                        информация о браузере и
                                                        устройстве;
                                                    </li>
                                                    <li>
                                                        данные о посещённых
                                                        страницах;
                                                    </li>
                                                    <li>
                                                        дата и время посещения
                                                        сайта;
                                                    </li>
                                                    <li>
                                                        технические параметры
                                                        взаимодействия с сайтом.
                                                    </li>
                                                </ul>
                                            </span>
                                        </div>

                                        <div className={styles.section}>
                                            <h4
                                                className={clsx(
                                                    styles.title,
                                                    `tag-font`,
                                                )}
                                            >
                                                Управление файлами cookie
                                            </h4>
                                            <span
                                                className={clsx(
                                                    styles.text,
                                                    `tag-font`,
                                                )}
                                            >
                                                Пользователь может изменить
                                                настройки использования файлов
                                                cookie в своём браузере или
                                                полностью отключить их. При
                                                отключении некоторых cookie
                                                отдельные функции сайта могут
                                                работать некорректно.
                                            </span>
                                        </div>

                                        <div className={styles.section}>
                                            <h4
                                                className={clsx(
                                                    styles.title,
                                                    `tag-font`,
                                                )}
                                            >
                                                Сторонние сервисы
                                            </h4>
                                            <span
                                                className={clsx(
                                                    styles.text,
                                                    `tag-font`,
                                                )}
                                            >
                                                На сайте могут использоваться
                                                сервисы веб-аналитики и другие
                                                сторонние инструменты,
                                                необходимые для функционирования
                                                сайта. Такие сервисы могут
                                                использовать собственные файлы
                                                cookie в соответствии со своими
                                                правилами обработки данных.
                                            </span>
                                        </div>

                                        <div className={styles.section}>
                                            <h4
                                                className={clsx(
                                                    styles.title,
                                                    `tag-font`,
                                                )}
                                            >
                                                Изменение политики
                                            </h4>
                                            <span
                                                className={clsx(
                                                    styles.text,
                                                    `tag-font`,
                                                )}
                                            >
                                                Администрация сайта вправе
                                                вносить изменения в настоящую
                                                Политику. Актуальная версия
                                                документа всегда доступна на
                                                данной странице.
                                            </span>
                                        </div>

                                        <div className={styles.section}>
                                            <h4
                                                className={clsx(
                                                    styles.title,
                                                    `tag-font`,
                                                )}
                                            >
                                                Контактная информация
                                            </h4>
                                            <span
                                                className={clsx(
                                                    styles.text,
                                                    `tag-font`,
                                                )}
                                            >
                                                По вопросам, связанным с
                                                использованием файлов cookie,
                                                пользователь может обратиться
                                                через контактные данные,
                                                указанные на сайте.
                                            </span>
                                        </div>
                                    </div>
                                )}
                            </div>
                            <DefaultScrollBarScroll />
                        </div>
                    </div>
                </OverlayForNodeContent>,
                document.body,
            )
        );
    },
);
