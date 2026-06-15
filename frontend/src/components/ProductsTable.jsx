

import styles from "./ProductsTable.module.css";

const CATEGORY_COLORS = {
  Snacks: {
    bg: "#FAEEDA",
    text: "#854F0B",
  },
  Beverages: {
    bg: "#E1F5EE",
    text: "#0F6E56",
  },
  "Personal Care": {
    bg: "#EEEDFE",
    text: "#3C3489",
  },
  "Home Care": {
    bg: "#E6F1FB",
    text: "#0C447C",
  },
};

function formatRevenue(value = 0) {
  if (value >= 1000000) {
    return `$${(value / 1000000).toFixed(2)}M`;
  }

  if (value >= 1000) {
    return `$${(value / 1000).toFixed(0)}K`;
  }

  return `$${value.toFixed(0)}`;
}

function formatPrice(value = 0) {
  return `$${Number(value).toFixed(2)}`;
}

export default function ProductsTable({
  data = [],
  loading = false,
}) {
  if (loading) {
    return (
      <div className={styles.loading}>
        Loading products...
      </div>
    );
  }

  if (!data.length) {
    return (
      <div className={styles.loading}>
        No products found
      </div>
    );
  }

  const maxRevenue = Math.max(
    ...data.map(
      (product) => product.total_net_revenue || 0
    ),
    1
  );

  return (
    <div className={styles.wrap}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Product</th>
            <th>Category</th>
            <th className={styles.right}>
              Net Revenue
            </th>
            <th className={styles.right}>
              Units Sold
            </th>
            <th className={styles.right}>
              Avg Unit Price
            </th>
            <th className={styles.shareCol}>
              Revenue Share
            </th>
          </tr>
        </thead>

        <tbody>
          {data.map((product) => {
            const revenue =
              product.total_net_revenue || 0;

            const units =
              product.total_units_sold || 0;

            const avgPrice =
              product.avg_unit_price || 0;

            const revenueShare = Math.round(
              (revenue / maxRevenue) * 100
            );

            const categoryColor =
              CATEGORY_COLORS[
                product.category
              ] || {
                bg: "#F3F4F6",
                text: "#374151",
              };

            return (
              <tr
                key={product.sku}
                className={styles.row}
              >
                <td className={styles.nameCell}>
                  <span className={styles.sku}>
                    {product.sku}
                  </span>

                  {product.product_name}
                </td>

                <td>
                  <span
                    className={styles.badge}
                    style={{
                      background:
                        categoryColor.bg,
                      color:
                        categoryColor.text,
                    }}
                  >
                    {product.category}
                  </span>
                </td>

                <td className={styles.right}>
                  <strong>
                    {formatRevenue(revenue)}
                  </strong>
                </td>

                <td className={styles.right}>
                  {units.toLocaleString()}
                </td>

                <td className={styles.right}>
                  {formatPrice(avgPrice)}
                </td>



                 <td className={styles.shareCol}>
  <div className={styles.shareWrapper}>
    <span className={styles.shareText}>
      {revenueShare}%
    </span>

    <div
      className={styles.barTrack}
      title={`${revenueShare}% of top product revenue`}
    >
      <div
        className={styles.barFill}
        style={{
          width: `${revenueShare}%`,
          background: "#1D9E75",
        }}
      />
    </div>
  </div>
</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}