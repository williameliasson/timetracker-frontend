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
            if (res.ok){
                return res.json()
            }
            return [];
        }).then(data => {
            setUserSummaries(data);
        })
    }
    useEffect(() => {
        fetchUserSummaries();
    }, [])
  const allUserSummaryCards = userSummaries.map(userSummary => {
    return <UserSummaryCard key={userSummary.userId} userSummary={userSummary}/>
  })
  return (
    <div>
        <h1>Admin page</h1>
        {userSummaries.length > 0 && allUserSummaryCards}
        {userSummaries.length === 0 && 'Theres no summaries to show!'}
    </div>
  )
}

export default AdminPage