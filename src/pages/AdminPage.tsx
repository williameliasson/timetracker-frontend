import { useEffect, useState } from "react";
import { API_URL, type UserSummary } from "../config";
import UserSummaryCard from "../components/UserSummaryCard";

function AdminPage() {
    const [userSummaries, setUserSummaries] = useState<UserSummary[]>([]);
    const fetchUserSummaries = () => {
        fetch(API_URL + "/admin/summaries", {
            method: "GET",
            credentials: "include"
        }).then((res) => {
            return res.json()
        }).then(data => {
            setUserSummaries(data);
        })
    }
    useEffect(() => {
        fetchUserSummaries();
    }, [])
  const allUserSummaryCards = userSummaries.map(userSummary => {
    return <UserSummaryCard userSummary={userSummary}/>
  })
  return (
    <div>
        <h1>Admin page</h1>
        {allUserSummaryCards}
    </div>
  )
}

export default AdminPage