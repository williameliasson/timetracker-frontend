import { useState, type ChangeEvent } from "react"
import { API_URL, type Category } from "../config"

type CategoryCardProps = {
    category: Category,
    onUpdate: () => void
}

function CategoryCard({category, onUpdate}: CategoryCardProps) {
    const [categoryName, setCategoryName] = useState<string>(category.name);
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const {value} = e.target;
        setCategoryName(value);
    }

    const handleSubmit = () => {
        fetch(API_URL + "/me/categories/" + category.id, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name: categoryName
            }),
            credentials: "include"
        }).then(() => {
            onUpdate()
        })
    }
  return (
    <div className="category-card" key={category.id}>
        <input name="categoryName" id={category.id} value={categoryName} onChange={handleChange}></input>
        <button onClick={handleSubmit}>✅</button>
    </div>
  )
}

export default CategoryCard