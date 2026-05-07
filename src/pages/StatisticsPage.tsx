import { useContext, useEffect, useState } from "react";
import { SessionsContext } from "../components/SessionsContext";
import { Pie, PieChart } from "recharts";
import { type PiePiece, type Session, TIMEFRAME_DAYS } from "../config";
import SessionCard from "../components/SessionCard";

function StatisticsPage() {
  const sessionsContext = useContext(SessionsContext);
  if (!sessionsContext){
    return
  }
  const {sessions, fetchSessions} = sessionsContext;

  const [pieData, setPieData] = useState<PiePiece[]>([]);
  const [sessionsWithinDays, setSessionsWithinDays] = useState<Session[]>([]);
  useEffect(() => {
    let tempPieData: PiePiece[] = [];
    let filteredDays = sessions.filter((session) => {
      let cutoffDate = new Date()
      cutoffDate.setDate(cutoffDate.getDate() - TIMEFRAME_DAYS);
      return new Date(session.startTime) > cutoffDate;
    })
    setSessionsWithinDays(filteredDays);
    
    filteredDays.forEach((session) => {
      if (session.endTime === null) return;
      let sessionMinutes = (new Date(session.endTime).getTime() - new Date(session.startTime).getTime()) / 1000
      // tempPieData = tempPieData.map((piePiece: PiePiece) => {
      //   piePiece.category === session.category
      //   ? { ...piePiece, minutes: piePiece.minutes += sessionMinutes}
      //   : {...piePiece}
      let existingCategory = tempPieData.find((piePiece: PiePiece) => (piePiece.category === session.category))
      if (existingCategory){
        existingCategory.minutes += sessionMinutes
      } else {
        tempPieData.push({
          category: session.category,
          minutes: sessionMinutes
        })
      }
      })
    
    setPieData(tempPieData);
    console.log(tempPieData)
    }, [sessions])

  const allSessions = sessionsWithinDays.map(session => {
    return <SessionCard session={session} onUpdate={fetchSessions}/>
  })

  return (
    <div>
      <h1>Stats</h1>
      <div>
        {/* src: https://recharts.github.io/en-US/examples/PieChartWithPaddingAngle/ */}
        <PieChart className="piechart" style={{ width: '100%', maxWidth: '500px', maxHeight: '80vh', aspectRatio: 1 }}>
          <Pie
          
          data={pieData} 
          nameKey="category"
          dataKey="minutes"
          label={({ name }) => name}
          />
        </PieChart>
          
      </div>
      <div>
          {allSessions}
      </div>
    </div>
  )
}

export default StatisticsPage