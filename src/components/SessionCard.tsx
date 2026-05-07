import { useContext, useState, type ChangeEvent } from 'react'
import { API_URL, type Session } from '../config'
import { CategoriesContext } from './CategoriesContext'

type SessionCardProps = {
    session: Session,
    onUpdate: () => void,
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
    <div key={session.id} className='session-card'>
        {/* <div>
            {session.category}
        </div> */}
        <div>
            <select name="categoryName" id="categoryName" onChange={handleChangedCategory} value={categoryId}>
                {allOptions}
            </select>
        </div>
            {session.startTime} - {session.endTime || '[NOT YET ENDED]'}
        {showEndSessionButton && (
          <button onClick={handleClick}>End Session</button>
        )}
    </div>
  )
}

export default SessionCard