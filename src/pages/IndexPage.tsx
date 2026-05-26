import { useContext, useEffect, useState, type ChangeEvent } from "react"
import { API_URL, type Category } from "../config";
import SessionCard from "../components/SessionCard/SessionCard";
import NewSessionButton from "../components/NewSessionButton";
import { SessionsContext } from "../components/SessionsContext";

function IndexPage() {
  const sessionsContext = useContext(SessionsContext);
  if (!sessionsContext){
    return
  }
  const {sessions, fetchSessions} = sessionsContext;
  const [categories, setCategories] = useState<Category[]>([]);
  const [showNewSessionButton, setShowNewSessionButton] = useState(false);

  const [categoryId, setCategoryId] = useState<string>("");
  useEffect(() => {
    let userHasOpenSession = false;
    if (categories.length === 0){
      return;
    }
    if (sessions.length === 0){
      setShowNewSessionButton(true);
      return;
    }
    sessions.forEach((session) => {
      if (session.endTime === null){
        userHasOpenSession = true;
      }
    })
    setShowNewSessionButton(!userHasOpenSession);
  }, [sessions])

  const fetchCategories = () => {
    //fetch and store in sessions stat var
    fetch(API_URL + "/me/categories", {
      method: "GET",
      credentials: "include"
    }).then(res => {
      if (!res.ok) return []
      return res.json()
    }).then(data => {
      data = data.sort((a: Category, b: Category) => {
        if (a.name < b.name){
          return -1;
        }
        if (a.name > b.name){
          return 1;
        }
        return 0;
      })
      setCategories(data);
      return data
    }).then((data) => {
      setCategoryId(data[0].id)
    })
  }
  
  const handleCategoryChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target;
    setCategoryId(value)
  }

  useEffect(() => {
    fetchSessions();
    fetchCategories();
  }, [])

  const allSessions = sessions.map(session => {
    return <SessionCard session={session} onUpdate={fetchSessions}/>
  })

  const allOptions = categories.map(category => {
    return <option id={category.id} value={category.id}>{category.name}</option>
  })
  return (
    <div>
      <h1>Index</h1>
      <div className="centered">
        <div className="new-session-container">
          {categories.length != 0 && <div>
            <label htmlFor="categoryId">Category: </label>
            <select name="categoryId" id="categoryId" value={categoryId} onChange={handleCategoryChange}>
              {allOptions}
            </select>
          </div>}
          <NewSessionButton categoryId={categoryId} enabled={showNewSessionButton} onUpdate={fetchSessions}/>
        </div>
        <div>
          {allSessions}
        </div>
      </div>
    </div>
  )
}

export default IndexPage