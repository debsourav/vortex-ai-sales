import { useMemo, useState } from "react";
import "./App.css";

const salesData = [
  { id: 1, date: "2026-01-08", rep: "Aarav Sharma", region: "North", product: "Enterprise", revenue: 420000, deals: 8, status: "Won" },
  { id: 2, date: "2026-01-14", rep: "Priya Mehta", region: "West", product: "Growth", revenue: 280000, deals: 6, status: "Won" },
  { id: 3, date: "2026-01-21", rep: "Rohan Verma", region: "South", product: "Enterprise", revenue: 510000, deals: 9, status: "Won" },
  { id: 4, date: "2026-02-03", rep: "Ananya Singh", region: "North", product: "Starter", revenue: 165000, deals: 12, status: "Won" },
  { id: 5, date: "2026-02-11", rep: "Aarav Sharma", region: "East", product: "Growth", revenue: 320000, deals: 7, status: "Won" },
  { id: 6, date: "2026-02-18", rep: "Priya Mehta", region: "West", product: "Enterprise", revenue: 620000, deals: 11, status: "Won" },
  { id: 7, date: "2026-03-05", rep: "Rohan Verma", region: "South", product: "Growth", revenue: 360000, deals: 8, status: "Won" },
  { id: 8, date: "2026-03-13", rep: "Ananya Singh", region: "North", product: "Enterprise", revenue: 470000, deals: 9, status: "Won" },
  { id: 9, date: "2026-03-22", rep: "Aarav Sharma", region: "West", product: "Starter", revenue: 190000, deals: 14, status: "Won" },
  { id: 10, date: "2026-04-04", rep: "Priya Mehta", region: "East", product: "Enterprise", revenue: 580000, deals: 10, status: "Won" },
  { id: 11, date: "2026-04-17", rep: "Rohan Verma", region: "South", product: "Enterprise", revenue: 690000, deals: 12, status: "Won" },
  { id: 12, date: "2026-05-02", rep: "Ananya Singh", region: "North", product: "Growth", revenue: 410000, deals: 9, status: "Won" },
  { id: 13, date: "2026-05-15", rep: "Aarav Sharma", region: "West", product: "Enterprise", revenue: 730000, deals: 13, status: "Won" },
  { id: 14, date: "2026-05-23", rep: "Priya Mehta", region: "East", product: "Growth", revenue: 390000, deals: 8, status: "Won" },
  { id: 15, date: "2026-06-06", rep: "Rohan Verma", region: "South", product: "Enterprise", revenue: 810000, deals: 14, status: "Won" },
  { id: 16, date: "2026-06-19", rep: "Ananya Singh", region: "North", product: "Growth", revenue: 450000, deals: 10, status: "Won" },
  { id: 17, date: "2026-07-03", rep: "Aarav Sharma", region: "West", product: "Enterprise", revenue: 870000, deals: 15, status: "Won" },
  { id: 18, date: "2026-07-18", rep: "Priya Mehta", region: "East", product: "Enterprise", revenue: 640000, deals: 11, status: "Won" },
  { id: 19, date: "2026-08-05", rep: "Rohan Verma", region: "South", product: "Growth", revenue: 520000, deals: 10, status: "Won" },
  { id: 20, date: "2026-08-21", rep: "Ananya Singh", region: "North", product: "Enterprise", revenue: 760000, deals: 13, status: "Won" },
];

const monthlyRevenue = [
  { month: "Jan", value: 1.38 },
  { month: "Feb", value: 1.55 },
  { month: "Mar", value: 1.62 },
  { month: "Apr", value: 1.73 },
  { month: "May", value: 1.98 },
  { month: "Jun", value: 2.14 },
  { month: "Jul", value: 2.31 },
  { month: "Aug", value: 2.54 },
];

function money(value) {
  if (value >= 10000000) return `₹${(value / 10000000).toFixed(1)} Cr`;
  if (value >= 100000) return `₹${(value / 100000).toFixed(1)} L`;
  return `₹${value.toLocaleString("en-IN")}`;
}

function App() {
  const [page, setPage] = useState("Dashboard");
  const [region, setRegion] = useState("All");
  const [product, setProduct] = useState("All");
  const [lastUpdated, setLastUpdated] = useState("Just now");

  const filteredData = useMemo(() => {
    return salesData.filter((row) => {
      const regionMatch = region === "All" || row.region === region;
      const productMatch = product === "All" || row.product === product;
      return regionMatch && productMatch;
    });
  }, [region, product]);

  const totalRevenue = filteredData.reduce((sum, row) => sum + row.revenue, 0);
  const totalDeals = filteredData.reduce((sum, row) => sum + row.deals, 0);
  const avgDeal = totalDeals ? totalRevenue / totalDeals : 0;

  const reps = [...new Set(salesData.map((x) => x.rep))];

  const leaderboard = reps
    .map((rep) => ({
      rep,
      revenue: filteredData
        .filter((x) => x.rep === rep)
        .reduce((sum, x) => sum + x.revenue, 0),
    }))
    .sort((a, b) => b.revenue - a.revenue);

  const regionStats = ["North", "South", "East", "West"].map((name) => ({
    name,
    revenue: filteredData
      .filter((x) => x.region === name)
      .reduce((sum, x) => sum + x.revenue, 0),
  }));

  const productStats = ["Enterprise", "Growth", "Starter"].map((name) => ({
    name,
    revenue: filteredData
      .filter((x) => x.product === name)
      .reduce((sum, x) => sum + x.revenue, 0),
  }));

  const refreshDashboard = () => {
    setLastUpdated(new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    }));
  };

  return (
    <div className="app">
      <header className="navbar">
        <div className="brand">
          <div className="logo">VC</div>
          <div>
            <div className="brand-name">VORTEX CUBE</div>
            <div className="brand-subtitle">AI SALES ANALYST</div>
          </div>
        </div>

        <nav>
          {["Dashboard", "Analytics", "AI Insights"].map((item) => (
            <button
              key={item}
              className={page === item ? "nav-active" : ""}
              onClick={() => setPage(item)}
            >
              {item}
            </button>
          ))}
        </nav>

        <div className="ai-status">
          <span></span> AI POWERED
        </div>
      </header>

      <main>
        <section className="hero">
          <div>
            <p className="eyebrow">SALES INTELLIGENCE PLATFORM</p>
            <h1>
              Turn Sales Data
              <br />
              <span>Into Decisions.</span>
            </h1>
            <p className="hero-text">
              An AI-powered dashboard that transforms sales data into
              actionable business insights.
            </p>
          </div>

          <div className="hero-card">
            <div className="card-top">
              <span>AI ANALYSIS</span>
              <span className="live">● LIVE</span>
            </div>

            <div className="hero-number">{money(totalRevenue)}</div>
            <div className="hero-label">Total Revenue</div>

            <div className="mini-bars">
              {monthlyRevenue.map((item) => (
                <div
                  key={item.month}
                  className="mini-bar"
                  style={{ height: `${item.value * 38}px` }}
                  title={`${item.month}: ₹${item.value} Cr`}
                ></div>
              ))}
            </div>

            <div className="growth">+14.2% revenue growth</div>
          </div>
        </section>

        <section className="toolbar">
          <div>
            <span className="filter-label">Region</span>
            <select value={region} onChange={(e) => setRegion(e.target.value)}>
              <option>All</option>
              <option>North</option>
              <option>South</option>
              <option>East</option>
              <option>West</option>
            </select>
          </div>

          <div>
            <span className="filter-label">Product</span>
            <select value={product} onChange={(e) => setProduct(e.target.value)}>
              <option>All</option>
              <option>Enterprise</option>
              <option>Growth</option>
              <option>Starter</option>
            </select>
          </div>

          <button className="refresh-btn" onClick={refreshDashboard}>
            ↻ Refresh Data
          </button>

          <span className="updated">Updated {lastUpdated}</span>
        </section>

        {page === "Dashboard" && (
          <>
            <section className="kpi-grid">
              <KPI title="Total Revenue" value={money(totalRevenue)} change="+14.2%" />
              <KPI title="Closed Deals" value={totalDeals} change="+11.8%" />
              <KPI title="Avg. Deal Size" value={money(avgDeal)} change="+8.6%" />
              <KPI title="Conversion Rate" value="18.6%" change="+3.4%" />
            </section>

            <section className="content-grid">
              <RevenueChart />

              <div className="panel">
                <div className="panel-heading">
                  <div>
                    <span className="eyebrow">PERFORMANCE</span>
                    <h2>Regional Revenue</h2>
                  </div>
                </div>

                <div className="region-list">
                  {regionStats
                    .sort((a, b) => b.revenue - a.revenue)
                    .map((item) => {
                      const max = Math.max(...regionStats.map((x) => x.revenue));
                      return (
                        <div className="region-row" key={item.name}>
                          <div className="region-info">
                            <span>{item.name}</span>
                            <strong>{money(item.revenue)}</strong>
                          </div>
                          <div className="progress">
                            <div
                              style={{
                                width: `${(item.revenue / max) * 100}%`,
                              }}
                            ></div>
                          </div>
                        </div>
                      );
                    })}
                </div>
              </div>
            </section>

            <section className="content-grid lower">
              <div className="panel">
                <div className="panel-heading">
                  <div>
                    <span className="eyebrow">PRODUCT MIX</span>
                    <h2>Revenue by Product</h2>
                  </div>
                </div>

                <div className="product-list">
                  {productStats.map((item) => (
                    <div className="product-row" key={item.name}>
                      <div className="product-icon">
                        {item.name === "Enterprise" ? "E" : item.name === "Growth" ? "G" : "S"}
                      </div>
                      <div className="product-name">
                        <strong>{item.name}</strong>
                        <span>{Math.round((item.revenue / totalRevenue) * 100)}% of revenue</span>
                      </div>
                      <strong>{money(item.revenue)}</strong>
                    </div>
                  ))}
                </div>
              </div>

              <div className="panel">
                <div className="panel-heading">
                  <div>
                    <span className="eyebrow">SALES TEAM</span>
                    <h2>Top Performers</h2>
                  </div>
                </div>

                <div className="leaderboard">
                  {leaderboard.map((item, index) => (
                    <div className="leader-row" key={item.rep}>
                      <div className="rank">{index + 1}</div>
                      <div className="avatar">
                        {item.rep
                          .split(" ")
                          .map((x) => x[0])
                          .join("")}
                      </div>
                      <div className="leader-name">
                        <strong>{item.rep}</strong>
                        <span>Sales Executive</span>
                      </div>
                      <strong>{money(item.revenue)}</strong>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          </>
        )}

        {page === "Analytics" && (
          <section className="analytics-page">
            <div className="page-title">
              <span className="eyebrow">ANALYTICS ENGINE</span>
              <h2>Sales Performance Analytics</h2>
              <p>Explore the underlying fictional sales dataset powering this dashboard.</p>
            </div>

            <RevenueChart />

            <div className="panel table-panel">
              <div className="panel-heading">
                <div>
                  <span className="eyebrow">RAW DATA</span>
                  <h2>Sales Transactions</h2>
                </div>
                <span className="data-badge">{filteredData.length} records</span>
              </div>

              <div className="table-wrap">
                <table>
                  <thead>
                    <tr>
                      <th>Date</th>
                      <th>Sales Rep</th>
                      <th>Region</th>
                      <th>Product</th>
                      <th>Deals</th>
                      <th>Revenue</th>
                      <th>Status</th>
                    </tr>
                  </thead>

                  <tbody>
                    {filteredData.map((row) => (
                      <tr key={row.id}>
                        <td>{row.date}</td>
                        <td>{row.rep}</td>
                        <td>{row.region}</td>
                        <td>{row.product}</td>
                        <td>{row.deals}</td>
                        <td>{money(row.revenue)}</td>
                        <td>
                          <span className="status">● {row.status}</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </section>
        )}

        {page === "AI Insights" && (
          <section className="insights-page">
            <div className="page-title">
              <span className="eyebrow">AI REASONING ENGINE</span>
              <h2>AI-Powered Sales Insights</h2>
              <p>
                Automated observations generated from the fictional sales
                dataset.
              </p>
            </div>

            <div className="insight-grid">
              <Insight
                icon="↑"
                title="Revenue Momentum"
                text="Revenue has increased consistently across the last four reporting periods, indicating positive sales momentum."
                tag="POSITIVE"
              />

              <Insight
                icon="★"
                title="Enterprise Opportunity"
                text="Enterprise accounts contribute the largest share of revenue. Prioritising high-value enterprise leads could improve overall deal economics."
                tag="HIGH IMPACT"
              />

              <Insight
                icon="!"
                title="Regional Opportunity"
                text="The North and West regions show strong performance and represent attractive areas for additional sales capacity."
                tag="OPPORTUNITY"
              />

              <Insight
                icon="◆"
                title="Rep Performance"
                text="A small group of representatives contributes a significant portion of total revenue. Replicate their sales practices across the wider team."
                tag="RECOMMENDATION"
              />
            </div>

            <div className="ai-summary">
              <div className="ai-orb">✦</div>
              <div>
                <span className="eyebrow">EXECUTIVE SUMMARY</span>
                <h2>Sales performance is trending upward.</h2>
                <p>
                  Based on the current dataset, Vortex Cube should focus on
                  enterprise accounts, strengthen the North and West regions,
                  and replicate the behaviour of top-performing sales
                  representatives.
                </p>
              </div>
            </div>
          </section>
        )}

        <section className="disclaimer">
          <span>●</span>
          Demo environment · All sales data shown is fictional and created for
          product demonstration purposes.
        </section>
      </main>
    </div>
  );
}

function KPI({ title, value, change }) {
  return (
    <div className="kpi">
      <span>{title}</span>
      <strong>{value}</strong>
      <small>↑ {change} vs previous period</small>
    </div>
  );
}

function Insight({ icon, title, text, tag }) {
  return (
    <div className="insight-card">
      <div className="insight-icon">{icon}</div>
      <span className="insight-tag">{tag}</span>
      <h3>{title}</h3>
      <p>{text}</p>
    </div>
  );
}

function RevenueChart() {
  const max = Math.max(...monthlyRevenue.map((x) => x.value));

  return (
    <div className="panel chart-panel">
      <div className="panel-heading">
        <div>
          <span className="eyebrow">REVENUE TREND</span>
          <h2>Monthly Revenue</h2>
        </div>

        <span className="chart-total">₹2.54 Cr</span>
      </div>

      <div className="chart">
        <div className="chart-grid">
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </div>

        <div className="bars">
          {monthlyRevenue.map((item) => (
            <div className="bar-column" key={item.month}>
              <div
                className="bar"
                style={{ height: `${(item.value / max) * 88}%` }}
                title={`₹${item.value} Cr`}
              ></div>
              <span>{item.month}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;