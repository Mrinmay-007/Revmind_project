

import KPICard from "../components/KPICard";
import TrendChart from "../components/TrendChart";

import { useSummary, useTrends } from "../hooks/useDashboard";

import styles from "./Dashboard.module.css";

function fmt(n) {
  if (!n) return "$0";

  if (n >= 1000000) {
    return `$${(n / 1000000).toFixed(2)}M`;
  }

  if (n >= 1000) {
    return `$${(n / 1000).toFixed(0)}K`;
  }

  return `$${n}`;
}

function Card({ title, children }) {
  return (
    <section className={styles.card}>
      <p className={styles.cardTitle}>{title}</p>
      {children}
    </section>
  );
}

export default function Dashboard() {
  const { data: summary, loading: sumLoading } = useSummary();
  const { data: trends, loading: trendLoading } = useTrends();

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <h1 className={styles.heading}>Overview</h1>
        <p className={styles.sub}>
          NovaBite Consumer Goods · Jan 2024 – Dec 2025
        </p>
      </header>

      <div
        className={styles.kpiRow}
        role="list"
        aria-label="Key performance indicators"
      >
        <div role="listitem">
          <KPICard
            label="Total net revenue"
            value={
              sumLoading
                ? "Loading..."
                : fmt(summary?.totalNetRevenue)
            }
            sub="Across all channels & regions"
            accent
          />
        </div>

        <div role="listitem">
          <KPICard
            label="Gross profit margin"
            value={
              sumLoading
                ? "Loading..."
                : `${summary?.grossProfitMargin ?? 0}%`
            }
            sub="Net revenue minus COGS"
          />
        </div>

        <div role="listitem">
          <KPICard
            label="Top region"
            value={
              sumLoading
                ? "Loading..."
                : summary?.topRegion || "-"
            }
            sub={
              sumLoading
                ? ""
                : `${fmt(summary?.topRegionRevenue)} net revenue`
            }
          />
        </div>

        <div role="listitem">
          <KPICard
            label="Top channel"
            value={
              sumLoading
                ? "Loading..."
                : summary?.topChannel || "-"
            }
            sub={
              sumLoading
                ? ""
                : `${fmt(summary?.topChannelRevenue)} net revenue`
            }
          />
        </div>
      </div>

      <Card title="Monthly net revenue — bars: 2024 · line: 2025">
        {trendLoading ? (
          <div className={styles.loading}>Loading...</div>
        ) : (
          <TrendChart data={trends} />
        )}
      </Card>
    </div>
  );
}