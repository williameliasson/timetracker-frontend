import { useContext, useState, type ChangeEvent } from 'react'
import { API_URL, type Session } from '../../config'
import { CategoriesContext } from '../CategoriesContext'
import { secondsToHMS } from '../../utils';
import styles from "./SessionCard.module.scss";
type SessionCardProps = {
    session: Session,
    onUpdate: () => void,
}

function getHumanDate(dateString: string){
    const date = new Date(dateString)
    return new Intl.DateTimeFormat(undefined, {
        dateStyle: "medium",
        timeStyle: "medium"
    }).format(date);
}

function SessionCard({session, onUpdate}: SessionCardProps) {
  const categoriesContext = useContext(CategoriesContext)
  if (!categoriesContext){
    return
  }
  const {categories} = categoriesContext;
  
  const [categoryId, setCategoryId] = useState<string>(session.categoryId)
  const handleChangedCategory = (e: ChangeEvent<HTMLSelectElement>) => {
    const {value} = e.target;
    console.log(value)
    setCategoryId(value);
    fetch(API_URL + "/me/sessions/" + session.id, {
        method: "PATCH",
        credentials: "include",
        headers: {
            "Content-Type" : "application/json",
        },
        body: JSON.stringify({
            categoryId: value
        }),
    }).then((res) =>  {
        console.log(res.status)
        onUpdate()
    })
  }

  const handleClick = () => {
          fetch(API_URL + "/me/sessions/" + session.id, {
              method: "PATCH",
              credentials: "include",
              headers: {
                  "Content-Type" : "application/json",
              },
              body: JSON.stringify({
                  endTime: new Date(),
              })
          }).then(() => onUpdate())
      }
  const allOptions = categories.map((category) => {
    return <option key={category.id} value={category.id}>{category.name}</option>
  })

  const showEndSessionButton = session.endTime === null;
  return (
    <div key={session.id} className={styles.card}>
        <div>
            <select name="categoryName" id="categoryName" onChange={handleChangedCategory} value={categoryId}>
                {allOptions}
            </select>
        </div>
        <div className={styles.table}>
            <div className={styles.row}>
                <span>Started: </span> {getHumanDate(session.startTime)}
            </div>
            <div className={styles.row}>
                <span>Ended: </span> {session.endTime && getHumanDate(session.endTime)}
            </div>
            <div className={styles.row}>
                <span>Duration: </span>{session.endTime && secondsToHMS(Math.floor((new Date(session.endTime).getTime() - new Date(session.startTime).getTime())/1000))}
            </div>
        </div>
        <div className={styles.end_button_container}>
            {showEndSessionButton && (
            <button onClick={handleClick}>End Session</button>
            )}
        </div>
    </div>
  )
}

export default SessionCard