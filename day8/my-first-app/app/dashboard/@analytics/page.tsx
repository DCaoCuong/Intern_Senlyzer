export default function AnalyticsSlot() {
    return (
        <div className="card">
            <h2>Phân s tichsss</h2>
            <div className="stats-grid">
                <div className="stat">
                    <span className="value">12,345</span>
                    <span className="label">Total Users</span>
                </div>
                <div className="stat">
                    <span className="value">89%</span>
                    <span className="label">Conversion Rate</span>
                </div>
                <div className="stat">
                    <span className="value">$45,678</span>
                    <span className="label">Revenue</span>
                </div>
            </div>
            <a href="/dashboard/analytics/detailed">View Details →</a>
        </div>
    )
}