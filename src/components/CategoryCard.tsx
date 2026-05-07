import { useState, type ChangeEvent } from "react"
import type { Category } from "../config"

type CategoryCardProps = {
    category: Category
}

function CategoryCard({category}: CategoryCardProps) {
    const [categoryName, setCategoryName] = useState<string>(category.name);
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const {value} = e.target;
        setCategoryName(value);
    }
  return (
    <div className="category-card" key={category.id}>
        <input name="categoryName" id={category.id} value={categoryName} onChange={handleChange}></input>
    </div>
  )
}

export default CategoryCard