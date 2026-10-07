import supabase from "../config/supabase.js";
import * as demo from "../config/demoData.js";

/**
 * GET /api/dashboard
 * Returns all dashboard data: KPIs, forecast, lead sources.
 */
export async function getDashboard(req, res) {
  try {
    if (supabase) {
      // When connected to Supabase you'd run aggregations:
      // const { data: salesTotal } = await supabase.rpc('total_sales');
      // For now, return the static demo data even with Supabase.
    }

    res.json({
      kpi: demo.dashboardKPI,
      forecast: demo.revenueForecast,
      sources: demo.leadSources,
      recentDeals: demo.deals.slice(0, 4),
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

/**
 * GET /api/dashboard/reports
 * Returns report-specific KPIs.
 */
export function getReports(req, res) {
  res.json({
    totalRevenue: { value: 142800, change: 14.3, direction: "up" },
    dealsWon: { value: 86, change: 9.1, direction: "up" },
    conversionRate: { value: 24.6, change: 3.5, direction: "up" },
    avgDealSize: { value: 3400, change: 2.1, direction: "down" },
    revenueTrend: [5, 40, 15, 60, 45, 95, 80],
    profitTrend: [20, 25, 45, 45, 50, 52, 70],
  });
}
