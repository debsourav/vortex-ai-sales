import { useState } from "react";
import "./App.css";

const sectors = {
  Technology: { revenue: 8.2, growth: 21, customers: 342 },
  Healthcare: { revenue: 5.6, growth: 15, customers: 286 },
  BFSI: { revenue: 4.7, growth: 8, customers: 218 },
  Manufacturing: { revenue: 3.8, growth: -3, customers: 196 },
  Retail: { revenue: 2.5, growth: 6, customers: 242 },
};

const insights = {
  "Why is revenue growing?":
    "Technology is the strongest growth driver, contributing ₹8.2 Cr with 21% growth. Healthcare is the second strongest sector.",
  "Which sector should we focus on?":
    "Technology should be prioritized because it has both the highest revenue contribution and the strongest growth rate.",
  "Which sector is underperforming?":
    "Manufacturing is underperforming with ₹3.8 Cr revenue and -3% growth. Customer churn and pipeline quality should be investigated.",
  "What should we do next?":
    "Focus sales resources on Technology and Healthcare while investigating the decline in Manufacturing.",
};

function App() {
  const [sector, setSector] = useState("Technology");
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState(
    "Ask the AI Sales Analyst a question about your sales performance."
  );

  const current = sectors[sector];

  function askAI() {
    const result = insights[question];

    setAnswer(
      result ||
        "Based on the current data, Technology is the strongest growth opportunity while Manufacturing requires attention."
    );
  }

  return (
    <div className="app">

      {/* NAVBAR */}
      <nav className="navbar">
        <div className="brand">
          <div className="logo">VC</div>
          <div>
            <h3>VORTEX CUBE</h3>
            <span>AI SALES ANALYST</span>
          </div>
        </div>

        <div className="nav-links">
          <a href="#dashboard">Dashboard</a>
          <a href="#analytics">Analytics</a>
          <a href="#ai">AI Insights</a>
        </div>

        <div className="ai-status">
          ● AI POWERED
        </div>
      </nav>


      {/* HERO */}
      <section className="hero">

        <div>
          <p className="eyebrow">SALES INTELLIGENCE PLATFORM</p>

          <h1>
            Turn Sales Data
            <br />
            <span>Into Decisions.</span>
          </h1>

          <p className="hero-text">
            An AI-powered dashboard that transforms sales
            data into actionable business insights.
          </p>

          <a href="#dashboard" className="primary-button">
            Explore Dashboard →
          </a>
        </div>

        <div className="hero-card">

          <div className="card-top">
            <span>AI ANALYSIS</span>
            <span className="live">● LIVE</span>
          </div>

          <h2>₹24.8 Cr</h2>

          <p>Total Revenue</p>

          <div className="mini-bars">
            <i style={{ height: "35%" }}></i>
            <i style={{ height: "50%" }}></i>
            <i style={{ height: "42%" }}></i>
            <i style={{ height: "65%" }}></i>
            <i style={{ height: "75%" }}></i>
            <i style={{ height: "95%" }}></i>
          </div>

          <strong className="growth">+14.2%</strong>
          <small> revenue growth</small>

        </div>

      </section>


      {/* KPI DASHBOARD */}
      <section className="dashboard" id="dashboard">

        <div className="section-title">
          <div>
            <p className="eyebrow">OVERVIEW</p>
            <h2>Sales Performance</h2>
          </div>

          <select
            value={sector}
            onChange={(e) => setSector(e.target.value)}
          >
            {Object.keys(sectors).map((name) => (
              <option key={name}>{name}</option>
            ))}
          </select>
        </div>


        <div className="kpi-grid">

          <div className="kpi-card">
            <span>Revenue</span>
            <strong>₹{current.revenue} Cr</strong>
            <small className="positive">
              ↑ {current.growth}% growth
            </small>
          </div>

          <div className="kpi-card">
            <span>Pipeline</span>
            <strong>₹41.2 Cr</strong>
            <small className="positive">↑ 18.6%</small>
          </div>

          <div className="kpi-card">
            <span>Win Rate</span>
            <strong>28.6%</strong>
            <small className="positive">↑ 4.2%</small>
          </div>

          <div className="kpi-card">
            <span>Customers</span>
            <strong>{current.customers}</strong>
            <small className="positive">↑ 11.8%</small>
          </div>

        </div>


        {/* ANALYTICS */}
        <div className="analytics-grid">

          <div className="panel">

            <div className="panel-heading">
              <div>
                <h3>Revenue Trend</h3>
                <p>Monthly performance</p>
              </div>

              <strong className="positive">+14.2%</strong>
            </div>

            <div className="chart">

              <div className="grid-line"></div>
              <div className="grid-line"></div>
              <div className="grid-line"></div>

              <svg viewBox="0 0 600 220">
                <polyline
                  points="0,180 100,150 200,165 300,110 400,125 500,65 600,35"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="4"
                />

                <circle cx="600" cy="35" r="7" fill="currentColor" />
              </svg>

            </div>

            <div className="months">
              <span>Jan</span>
              <span>Feb</span>
              <span>Mar</span>
              <span>Apr</span>
              <span>May</span>
              <span>Jun</span>
              <span>Jul</span>
            </div>

          </div>


          <div className="panel">

            <div className="panel-heading">
              <div>
                <h3>Revenue by Sector</h3>
                <p>Contribution to total revenue</p>
              </div>
            </div>

            <div className="sector-bars">

              {Object.entries(sectors).map(
                ([name, data]) => (

                  <div className="sector-row" key={name}>

                    <div className="sector-name">
                      <span>{name}</span>
                      <strong>₹{data.revenue} Cr</strong>
                    </div>

                    <div className="bar">
                      <div
                        style={{
                          width: `${(data.revenue / 8.2) * 100}%`,
                        }}
                      ></div>
                    </div>

                  </div>

                )
              )}

            </div>

          </div>

        </div>


        {/* FUNNEL */}
        <div className="panel funnel-panel">

          <p className="eyebrow">PIPELINE</p>
          <h3>Sales Funnel</h3>

          <div className="funnel">

            <div>
              <strong>1,840</strong>
              <span>Leads</span>
            </div>

            <b>→</b>

            <div>
              <strong>920</strong>
              <span>Qualified</span>
            </div>

            <b>→</b>

            <div>
              <strong>520</strong>
              <span>Demo</span>
            </div>

            <b>→</b>

            <div>
              <strong>280</strong>
              <span>Proposal</span>
            </div>

            <b>→</b>

            <div>
              <strong>145</strong>
              <span>Negotiation</span>
            </div>

            <b>→</b>

            <div className="won">
              <strong>82</strong>
              <span>Closed Won</span>
            </div>

          </div>

        </div>

      </section>


      {/* AI SECTION */}
      <section className="ai-section" id="ai">

        <div className="ai-box">

          <div className="ai-heading">

            <div className="ai-icon">✦</div>

            <div>
              <p className="eyebrow">INTELLIGENCE LAYER</p>
              <h2>AI Sales Analyst</h2>
              <p>
                Ask questions about your sales performance.
              </p>
            </div>

          </div>


          <div className="ai-input">

            <input
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") askAI();
              }}
              placeholder="Ask: Which sector should we focus on?"
            />

            <button onClick={askAI}>
              ✦ Analyse
            </button>

          </div>


          <div className="suggestions">

            {Object.keys(insights).map((item) => (

              <button
                key={item}
                onClick={() => {
                  setQuestion(item);
                  setAnswer(insights[item]);
                }}
              >
                {item}
              </button>

            ))}

          </div>


          <div className="ai-answer">

            <div className="answer-title">
              <span>✦</span>

              <div>
                <strong>AI Insight</strong>
                <small>Generated from sales data</small>
              </div>
            </div>

            <p>{answer}</p>

            <div className="recommendation">
              <strong>Recommended Action</strong>

              <span>
                Focus resources on high-growth sectors and
                investigate declining segments.
              </span>
            </div>

          </div>

        </div>

      </section>


      {/* FOOTER */}
      <footer>
        <strong>VORTEX CUBE</strong>
        <p>AI-assisted Sales Intelligence Demo</p>
        <small>
          Business requirement → AI prompt → Interface →
          Data visualization → AI insights
        </small>
      </footer>

    </div>
  );
}

export default App;