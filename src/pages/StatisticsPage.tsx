import { useContext, useEffect, useState } from "react";
import { SessionsContext } from "../components/SessionsContext";
import { Pie, PieChart } from "recharts";
import { type PiePiece, TIMEFRAME_DAYS } from "../config";

function StatisticsPage() {
  const sessionsContext = useContext(SessionsContext);
  if (!sessionsContext){
    return
  }
  const {sessions} = sessionsContext;

  const [pieData, setPieData] = useState<PiePiece[]>([]);
  // const [sessionsWithinDays, setSessionsWithinDays] = useState<Session[]>([]);
  useEffect(() => {
    let tempPieData: PiePiece[] = [];
    let filteredDays = sessions.filter((session) => {
      let cutoffDate = new Date()
      cutoffDate.setDate(cutoffDate.getDate() - TIMEFRAME_DAYS);
      return new Date(session.startTime) > cutoffDate;
    })
    // setSessionsWithinDays(filteredDays);
    
    filteredDays.forEach((session) => {
      if (session.endTime === null) return;
      let sessionSeconds = (new Date(session.endTime).getTime() - new Date(session.startTime).getTime()) / 1000
      let existingCategory = tempPieData.find((piePiece: PiePiece) => (piePiece.category === session.category))
      if (existingCategory){
        existingCategory.seconds += sessionSeconds
      } else {
        tempPieData.push({
          category: session.category,
          seconds: sessionSeconds
        })
      }
      })
    
    setPieData(tempPieData);
    }, [sessions])

  return (
    <div>
      <h1>Stats</h1>
      <div>
        <h3>Pie chart over time spent on each category last 30 days</h3>
        {/* src: https://recharts.github.io/en-US/examples/PieChartWithPaddingAngle/ */}
        <PieChart className="piechart" style={{ width: '100%', maxWidth: '500px', maxHeight: '80vh', aspectRatio: 1 }}>
          <Pie
          
          data={pieData} 
          nameKey="category"
          dataKey="seconds"
          label={({ name }) => name}
          />
        </PieChart>
          
      </div>
      <div>
        <h3>Sums of seconds of each category last 30 days</h3>
          {pieData.map((piePiece) => (
            <p key={piePiece.category}>{piePiece.category}: {Math.floor(piePiece.seconds)} seconds</p>
          ))}
      </div>
    </div>
  )
}

export default StatisticsPage