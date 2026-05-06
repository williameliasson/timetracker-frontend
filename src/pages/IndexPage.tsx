import { useEffect, useState, type ReactNode } from "react"
import { API_URL, type Session } from "../config";

function IndexPage() {
  const [sessions, setSessions] = useState<Session[]>([]);
  useEffect(() => {
    //fetch and store in sessions stat var
    fetch(API_URL + "/me/sessions", {
      method: "GET",
      credentials: "include"
    }).then(res => {
      return res.json()
    }).then(data => {
      setSessions(data);
    })
  }, [])
  const allSessions = sessions.map(item => {
    return <p key={item.id}> {item.category}: {item.startTime} - {item.endTime || ''}</p>
  })
  return (
    <div>
      <h1>Index</h1>
      <div>
        {allSessions}
      </div>
    </div>
  )
}

export default IndexPage