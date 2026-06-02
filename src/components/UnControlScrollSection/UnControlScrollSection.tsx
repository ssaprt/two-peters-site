"use client";

type Props = {
    id: string;
    transform?: boolean;
    fillBg?: boolean;
    style?: React.CSSProperties;
    children: React.ReactNode;
};

export const UnControlScrollSection = ({
    id,
    transform = false,
    fillBg = false,
    style,
    children,
}: Props) => {
    return (
        <section
            className="min-h-dvh"
            style={{
                padding: "20px",
                paddingTop: "100px",
                height: "auto",
                transform: "none",
                ...style,
            }}
            data-scroll-section
            data-control-scroll="false"
            data-section-id={id}
            data-transform={transform}
            data-fill-bg={fillBg}
        >
            {children}
        </section>
    );
};
