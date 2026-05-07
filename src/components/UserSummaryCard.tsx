import type { UserSummary } from "../config"
import { secondsToHMS } from "../utils"

type UserSummaryCardProps = {
    userSummary: UserSummary
}

function UserSummaryCard({userSummary}: UserSummaryCardProps) {
  return (
    <div className="usersummary-card">
        <p>{userSummary.username}</p>
        <p>Total time: {userSummary.totalSeconds > 0 && secondsToHMS(userSummary.totalSeconds)}{userSummary.totalSeconds === 0 && '0 seconds'}</p>
    </div>
  )
}

export default UserSummaryCard