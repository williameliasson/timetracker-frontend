import { useContext, useEffect, useState, type ChangeEvent } from "react"
import { API_URL, type Category } from "../config";
import CategoryCard from "../components/CategoryCard";
import { SessionsContext } from "../components/SessionsContext";
import { CategoriesContext } from "../components/CategoriesContext";


function CategoriesPage() {
    const sessionsContext = useContext(SessionsContext);
      if (!sessionsContext){
        return
      }
      const categoriesContext = useContext(CategoriesContext)
      if (!categoriesContext){
        return
      }
    const {fetchSessions} = sessionsContext;
    const {categories, fetchCategories} = categoriesContext;
    const [newCategoryName, setNewCategoryName] = useState<string>("");

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