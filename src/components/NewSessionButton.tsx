import { API_URL } from "../config";

type NewSessionButtonProps = {
    enabled: boolean,
    onUpdate: () => void,
    categoryId: string
}

function NewSessionButton({enabled, onUpdate, categoryId}: NewSessionButtonProps) {
    const handleClick = () => {
        fetch(API_URL + "/me/sessions", {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type" : "application/json",
            },
            body: JSON.stringify({
                startTime: new Date(),
                categoryId: categoryId //placeholder id
            })
        }).then(() => onUpdate())
    }

    if (enabled) return (
    <div>
        <button onClick={handleClick}>New Session</button>
    </div>
    ) 
    return null;
}

export default NewSessionButton