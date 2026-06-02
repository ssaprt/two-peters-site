"use client";

type Props = {
    id: string;
    transform?: boolean;
    fillBg?: boolean;
    children: React.ReactNode;
};

export default function ControlScrollSection({
    id,
    transform = false,
    fillBg = false,
    children,
}: Props) {
    return (
        <section
            data-scroll-section
            data-control-scroll="true"
            data-transform={transform}
            data-fill-bg={fillBg}
            data-section-id={id}
            className="h-dvh"
        >
            {children}
        </section>
    );
}
