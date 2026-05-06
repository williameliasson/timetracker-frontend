import { useEffect, useState } from "react"
import { API_URL, type Session } from "../config";
import SessionCard from "../components/SessionCard";
import NewSessionButton from "../components/NewSessionButton";

function IndexPage() {
  const [sessions, setSessions] = useState<Session[]>([]);
  const [showNewSessionButton, setShowNewSessionButton] = useState(false);

  useEffect(() => {
    let userHasOpenSession = false;
    if (sessions.length === 0){
      return;
    }
    sessions.forEach((session) => {
      if (session.endTime === null){
        userHasOpenSession = true;
      }
    })
    setShowNewSessionButton(!userHasOpenSession);
  }, [sessions])

  useEffect(() => {
    //fetch and store in sessions stat var
    fetch(API_URL + "/me/sessions", {
      method: "GET",
      credentials: "include"
    }).then(res => {
      if (!res.ok) return []
      return res.json()
    }).then(data => {
      data = data.sort((a: Session, b: Session) => {
        if (a.startTime < b.startTime){
          return -1;
        }
        if (a.startTime > b.startTime){
          return 1;
        }
        return 0;
      })
      data = data.reverse()
      setSessions(data);
    })
  }, [])
  const allSessions = sessions.map(session => {
    return <SessionCard session={session} />
  })
  return (
    <div>
      <h1>Index</h1>
      <div>
        {allSessions}
      </div>
      <NewSessionButton enabled={showNewSessionButton}/>
    </div>
  )
}

export default IndexPage