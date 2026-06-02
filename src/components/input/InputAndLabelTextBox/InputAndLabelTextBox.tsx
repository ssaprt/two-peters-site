import { SearchFromInputText } from "@/components/modals/SearchFromInputText/SearchFromInputText";
import { geoCodeStore } from "@/stores/GEO/GeoCodeStore";
import { useRef } from "react";
import { useDebouncedCallback } from "use-debounce";
import styles from "./InputAndLabelTextBox.module.css";

interface InputAndLabelTextBoxProps {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    props: any;
    idAndForHTML: string;
    labelText: string;
    colorFocus?: string;

    debounce?: {
        delay: number;
        onDebounce: (value: string) => void;
    };

    searchResultBox?: boolean;
}

export const InputAndLabelTextBox = ({
    props,
    idAndForHTML,
    labelText,
    colorFocus,
    debounce,
    searchResultBox,
}: InputAndLabelTextBoxProps) => {
    const refInput = useRef<HTMLInputElement>(null);
    const { ref: rhfRef, ...rest } = props;

    const debounced = useDebouncedCallback((value: string) => {
        debounce?.onDebounce(value);
    }, debounce?.delay || 300);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        geoCodeStore.clearArray();

        if (props.onChange) {
            props.onChange(e);
        }

        if (debounce) {
            debounced(value);
        }
    };

    const handleClick = (e: React.MouseEvent<HTMLInputElement>) => {
        const value = e.currentTarget.value;
        geoCodeStore.clearArray();
        if (debounce) {
            debounced(value);
        }
    };

    return (
        <div
            className={styles.boxLineInput}
            style={
                {
                    "--color-focus": colorFocus || "var(--global-color-link)",
                } as React.CSSProperties
            }
        >
            <input
                {...rest}
                ref={(el) => {
                    refInput.current = el;

                    if (rhfRef) {
                        rhfRef(el);
                    }
                }}
                onChange={handleChange}
                onClick={handleClick}
                className={styles.input}
                placeholder=" "
                id={idAndForHTML}
                type="text"
            />
            <label htmlFor={idAndForHTML}>{labelText}</label>
            {searchResultBox && <SearchFromInputText refInput={refInput} />}
        </div>
    );
};
