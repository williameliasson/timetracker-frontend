import { useEffect, useState } from "react"
import { API_URL, type Session } from "../config";
import SessionCard from "../components/SessionCard";

function IndexPage() {
  const [sessions, setSessions] = useState<Session[]>([]);
  useEffect(() => {
    //fetch and store in sessions stat var
    fetch(API_URL + "/me/sessions", {
      method: "GET",
      credentials: "include"
    }).then(res => {
      if (!res.ok) return []
      return res.json()
    }).then(data => {
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
    </div>
  )
}

export default IndexPage