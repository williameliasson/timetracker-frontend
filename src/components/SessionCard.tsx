import type { Session } from '../config'

type SessionCardProps = {
    session: Session,
}

function SessionCard({session}: SessionCardProps) {
  return (
    <div key={session.id}>
        <p>
            {session.category}: {session.startTime} - {session.endTime || ''}
        </p>
    </div>
  )
}

export default SessionCard