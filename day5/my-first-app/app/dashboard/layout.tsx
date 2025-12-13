export default function DashboardLayout({
  children,
  analytics,
  team,
  activity,
}: {
  children: React.ReactNode
  analytics: React.ReactNode
  team: React.ReactNode
  activity: React.ReactNode
}) {
  return (
    <div className="dashboard-container">
      <h1>Dashboard Overview</h1>
      {children}

      <div className="dashboard-grid">
        {/* Left column - Analytics */}
        <div className="analytics-section">
          {analytics}
        </div>

        {/* Middle column - Team */}
        <div className="team-section">
          {team}
        </div>

        {/* Right column - Activity */}
        <div className="activity-section">
          {activity}
        </div>
      </div>
    </div>
  )
}