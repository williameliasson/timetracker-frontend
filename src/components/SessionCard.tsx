import { API_URL, type Session } from '../config'

type SessionCardProps = {
    session: Session,
    onUpdate: () => void,
}

function SessionCard({session, onUpdate}: SessionCardProps) {
  
  const handleClick = () => {
          fetch(API_URL + "/me/sessions/" + session.id, {
              method: "PATCH",
              credentials: "include",
              headers: {
                  "Content-Type" : "application/json",
              },
              body: JSON.stringify({
                  endTime: new Date(),
              })
          }).then(() => onUpdate())
      }

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
          <button onClick={handleClick}>End Session</button>
        )}
    </div>
  )
}

export default SessionCard