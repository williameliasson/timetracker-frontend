export const API_URL = "https://api.time.williameliasson.com/api";
// export const API_URL = "http://localhost:8080/api"

export type FormData = {
    username: string,
    password: string,
}

export type Session = {
    // private String id;
    // private Instant startTime;
    // private Instant endTime;

    // private String category;

    id: string,
    startTime: string,
    endTime: string | null,
    category: string
}

export const EMPTY_FORM: FormData = {username: "", password: ""}