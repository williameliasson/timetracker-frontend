import { useState } from 'react'
import type { Session } from '../config'

type SessionCardProps = {
    session: Session,
}

function SessionCard({session}: SessionCardProps) {
  // const [showEndSessionButton, setShowEndSessionButton] = useState(false);
  const showEndSessionButton = session.endTime === null;
  return (
    <div key={session.id} className='session-card'>
        <div>
            <h4>
            {session.category}
            </h4>
        </div>
            {session.startTime} - {session.endTime || '[NOT YET ENDED]'}
        {showEndSessionButton && (
          <button>End Session</button>
        )}
    </div>
  )
}

export default SessionCard