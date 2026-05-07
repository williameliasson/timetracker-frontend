import type { UserSummary } from "../config"
import { secondsToHMS } from "../utils"

type UserSummaryCardProps = {
    userSummary: UserSummary
}

function UserSummaryCard({userSummary}: UserSummaryCardProps) {
  return (
    <div className="usersummary-card">
        <p>{userSummary.username}</p>
        <p>{secondsToHMS(userSummary.totalSeconds)}</p>
    </div>
  )
}

export default UserSummaryCard