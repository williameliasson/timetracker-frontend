type NewSessionButtonProps = {
    enabled: boolean,
}

function NewSessionButton({enabled}: NewSessionButtonProps) {
  
    if (enabled) return (
    <div>
        <button>New Session</button>
    </div>
    ) 
    return null;
}

export default NewSessionButton