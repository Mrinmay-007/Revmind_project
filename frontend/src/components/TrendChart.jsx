
import {
  ResponsiveContainer,
  ComposedChart,
  Line,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

import styles from "./TrendChart.module.css";

function formatCurrency(value) {
  if (value == null) return "-";

  if (value >= 1000000) {
    return `$${(value / 1000000).toFixed(1)}M`;
  }

  if (value >= 1000) {
    return `$${(value / 1000).toFixed(0)}K`;
  }

  return `$${value.toFixed(0)}`;
}

const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;

  return (
    <div className={styles.tooltip}>
      <p className={styles.tooltipLabel}>{label}</p>

      {payload.map((entry) => (
        <p
          key={entry.dataKey}
          className={styles.tooltipRow}
          style={{ color: entry.color }}
        >
          {entry.name}: <strong>{formatCurrency(entry.value)}</strong>
        </p>
      ))}
    </div>
  );
};

export default function TrendChart({ data = [] }) {
  const data2024 = data.filter((item) =>
    item.month.startsWith("2024")
  );

  const data2025 = data.filter((item) =>
    item.month.startsWith("2025")
  );

  const chartData = MONTHS.map((month, index) => ({
    month,
    revenue2024: data2024[index]?.net_revenue ?? null,
    revenue2025: data2025[index]?.net_revenue ?? null,
  }));

  return (
    <div className={styles.wrap}>
      <div className={styles.legend}>
        <span className={styles.legendItem}>
          <span
            className={styles.dot}
            style={{ background: "#1D9E75" }}
          />
          2024 Revenue
        </span>

        <span className={styles.legendItem}>
          <span
            className={styles.dot}
            style={{
              border: "2px solid #5DCAA5",
              background: "transparent",
            }}
          />
          2025 Revenue
        </span>
      </div>

      <ResponsiveContainer width="100%" height={280}>
        <ComposedChart
          data={chartData}
          margin={{
            top: 10,
            right: 10,
            left: 0,
            bottom: 0,
          }}
        >
          <CartesianGrid
            strokeDasharray="3 3"
            vertical={false}
          />

          <XAxis
            dataKey="month"
            axisLine={false}
            tickLine={false}
            tick={{
              fontSize: 12,
              fill: "#6B7280",
            }}
          />

          <YAxis
            tickFormatter={formatCurrency}
            axisLine={false}
            tickLine={false}
            width={60}
            tick={{
              fontSize: 11,
              fill: "#6B7280",
            }}
          />

          <Tooltip content={<CustomTooltip />} />

          <Bar
            name="2024"
            dataKey="revenue2024"
            fill="#DDF5EC"
            stroke="#1D9E75"
            radius={[4, 4, 0, 0]}
          />

          <Line
            name="2025"
            type="monotone"
            dataKey="revenue2025"
            stroke="#1D9E75"
            strokeWidth={3}
            dot={{
              r: 4,
              fill: "#1D9E75",
            }}
            activeDot={{
              r: 6,
            }}
          />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
}