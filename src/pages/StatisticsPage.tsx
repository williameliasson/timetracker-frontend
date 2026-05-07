import { useContext } from "react";
import { SessionsContext } from "../components/SessionsContext";

function StatisticsPage() {
  const sessionsContext = useContext(SessionsContext);
  if (!sessionsContext){
    return
  }
  return (
    <div></div>
  )
}

export default StatisticsPage