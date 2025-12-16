const activities = [
    { id: 1, user: 'Alice', action: 'deployed v2.3.4', time: '5 min ago' },
    { id: 2, user: 'Bob', action: 'merged PR #234', time: '15 min ago' },
    { id: 3, user: 'Carol', action: 'updated design', time: '1 hour ago' },
]

export default function ActivitySlot() {
    return (
        <div className="card">
            <h2>Recent Activity</h2>
            <ul className="activity-feed">
                {activities.map(activity => (
                    <li key={activity.id} className="activity-item">
                        <strong>{activity.user}</strong> {activity.action}
                        <span className="time">{activity.time}</span>
                    </li>
                ))}
            </ul>
            <a href="/dashboard/activity/all">View All Activity →</a>
        </div>
    )
}