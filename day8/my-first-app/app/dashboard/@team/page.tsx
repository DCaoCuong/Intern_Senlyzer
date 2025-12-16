const teamMembers = [
    { id: 1, name: 'Alice Johnson', role: 'Frontend Dev', status: 'online' },
    { id: 2, name: 'Bob Smith', role: 'Backend Dev', status: 'away' },
    { id: 3, name: 'Carol White', role: 'Designer', status: 'offline' },
]

export default function TeamSlot() {
    return (
        <div className="card">
            <h2>Team Members</h2>
            <ul className="team-list">
                {teamMembers.map(member => (
                    <li key={member.id} className="team-member">
                        <span className={`status ${member.status}`}></span>
                        <div>
                            <strong>{member.name}</strong>
                            <p>{member.role}</p>
                        </div>
                    </li>
                ))}
            </ul>
            <a href="/dashboard/team/all">View All Team →</a>
        </div>
    )
}