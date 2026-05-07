import { createContext, useState, type ReactNode } from "react"
import { API_URL, type Session } from "../config";

type SessionsContextType = {
    sessions: Session[],
    fetchSessions: () => void
}

export const SessionsContext = createContext<SessionsContextType | null>(null)

export function SessionsProvider({children}: {children: ReactNode}) {
    const [sessions, setSessions] = useState<Session[]>([]);

    const fetchSessions = () => {
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
      }
  return (
    <SessionsContext.Provider value={{sessions, fetchSessions}}>
        {children}
    </SessionsContext.Provider>
  )
}