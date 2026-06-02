import { Product } from "@/components/Product/Product";
import { CategoryInterface } from "@/lib/api/Collection";
import { ProductInterface } from "@/lib/api/Products";
import styles from "./Products.module.css";

export const Products = ({
    products,
    category,
}: {
    products: ProductInterface[];
    category: CategoryInterface;
}) => {
    return (
        <div className={styles.overlay}>
            {products.map((product, i) => (
                <Product key={i} category={category} product={product} />
            ))}
        </div>
    );
};
