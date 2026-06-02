import { Category } from "@/components/Category/Category";
import { CategoryInterface } from "@/lib/api/Collection";
import styles from "./Categories.module.css";

export const Categories = ({
    categories,
}: {
    categories: CategoryInterface[];
}) => {
    return (
        <div className={styles.categories}>
            {categories.map((category, i) => {
                return <Category key={i} category={category} />;
            })}
        </div>
    );
};
