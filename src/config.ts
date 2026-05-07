// export const API_URL = "https://api.time.williameliasson.com/api";
export const API_URL = "http://localhost:8080/api"

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

export const EMPTY_FORM: FormData = {username: "", password: ""}
export const TIMEFRAME_DAYS = 30;
export type PiePiece = {
    category: string,
    seconds: number
}