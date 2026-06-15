

import ProductsTable from "../components/ProductsTable";
import { useProducts } from "../hooks/useProducts";

import styles from "./Products.module.css";

const CATEGORY_SUMMARY = [
  {
    label: "Snacks",
    rev: "$203K",
    margin: "—",
    color: "#BA7517",
  },
  {
    label: "Personal Care",
    rev: "$706K",
    margin: "—",
    color: "#534AB7",
  },
  {
    label: "Beverages",
    rev: "$95K",
    margin: "—",
    color: "#1D9E75",
  },
  {
    label: "Home Care",
    rev: "$281K",
    margin: "—",
    color: "#185FA5",
  },
];

export default function Products() {
  const { data, loading } = useProducts();

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <h1 className={styles.heading}>Products</h1>

        <p className={styles.sub}>
          All SKUs ranked by net revenue · Jan 2024 – Dec 2025
        </p>
      </header>

      <div
        className={styles.catRow}
        role="list"
        aria-label="Category summaries"
      >
        {CATEGORY_SUMMARY.map((cat) => (
          <div
            key={cat.label}
            className={styles.catCard}
            role="listitem"
          >
            <div
              className={styles.catDot}
              style={{ background: cat.color }}
            />

            <div>
              <p className={styles.catLabel}>
                {cat.label}
              </p>

              <p className={styles.catRev}>
                {cat.rev}
              </p>

              <p className={styles.catMargin}>
                {cat.margin}
              </p>
            </div>
          </div>
        ))}
      </div>

      <section className={styles.tableCard}>
        <p className={styles.cardTitle}>
          All Products
        </p>

        <ProductsTable
          data={data}
          loading={loading}
        />
      </section>
    </div>
  );
}