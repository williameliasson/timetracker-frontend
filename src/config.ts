// export const API_URL = "https://api.time.williameliasson.com/api";
export const API_URL = "http://localhost:8080/api"

export const EMPTY_FORM: FormData = {username: "", password: ""}
export const TIMEFRAME_DAYS = 30;

export const PIE_COLORS = ["#00c100", "#0067c1", "#d4dc00","#3700dc","#00dcd5", "#dc0096", "#dc7900"]

export type FormData = {
    username: string,
    password: string,
}

export type Session = {
    id: string,
    startTime: string,
    endTime: string | null,
    category: string,
    categoryId: string,
}

export type Category = {
    id: string,
    name: string
}

export type PiePiece = {
    category: string,
    seconds: number,
    fill: string,
}

export type UserSummary = {
    username: string,
    userId: string,
    totalSeconds: number,
}