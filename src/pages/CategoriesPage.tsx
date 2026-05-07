import { useEffect, useState } from "react"
import { API_URL, type Category } from "../config";
import CategoryCard from "../components/CategoryCard";


function CategoriesPage() {
    const [categories, setCategories] = useState<Category[]>([]);
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
    
    const allCategoryCards = categories.map((category: Category) => {
        return <CategoryCard category={category}/>
    })

    useEffect(() => {
        fetchCategories()
    }, [])
  return (
    <div>
        <h1>Categories</h1>
        <div>
            {allCategoryCards}
        </div>
    </div>
  )
}

export default CategoriesPage