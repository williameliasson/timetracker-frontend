import { useContext, useEffect, useState, type ChangeEvent } from "react"
import { API_URL, type Category } from "../config";
import CategoryCard from "../components/CategoryCard";
import { SessionsContext } from "../components/SessionsContext";


function CategoriesPage() {
    const sessionsContext = useContext(SessionsContext);
      if (!sessionsContext){
        return
      }
    const {fetchSessions} = sessionsContext;
    const [categories, setCategories] = useState<Category[]>([]);
    const [newCategoryName, setNewCategoryName] = useState<string>("");

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
        })
    }

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const {value} = e.target;
        setNewCategoryName(value);
    }

    const handleSubmit = () => {
        fetch(API_URL + "/me/categories", {
            method: "POST",
            headers: {
                "Content-Type" : "application/json",
            },
            body: JSON.stringify({
                name: newCategoryName
            }),
            credentials: "include",
        }).then((res) => {
            if (res.ok) {
                setNewCategoryName("");
                fetchCategories();
                fetchSessions();
            }

        })
    }
    
    const allCategoryCards = categories.map((category: Category) => {
        return <CategoryCard category={category} onUpdate={fetchCategories}/>
    })

    useEffect(() => {
        fetchCategories()
    }, [])
  return (
    <div>
        <h1>Categories</h1>
        
        <div>
            <input name="newCategoryName" value={newCategoryName} onChange={handleChange}></input>
            <button onClick={handleSubmit}>Create new category</button>
        </div>

        <div>
            {allCategoryCards}
        </div>
    </div>
  )
}

export default CategoriesPage