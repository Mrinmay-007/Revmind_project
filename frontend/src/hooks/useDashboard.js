import { useEffect, useState } from "react";
import { api } from "../api/api";

export function useSummary() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .getSummary()
      .then((res) => {
        setData({
          totalNetRevenue: res.total_net_revenue_usd,
          grossProfitMargin: res.gross_profit_margin_pct,

          topRegion: res.top_region?.name,
          topRegionRevenue: res.top_region?.revenue,

          topChannel: res.top_channel?.name,
          topChannelRevenue: res.top_channel?.revenue,
        });
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  return { data, loading };
}

export function useTrends() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .getTrends()
      .then((res) => setData(res))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  return { data, loading };
}