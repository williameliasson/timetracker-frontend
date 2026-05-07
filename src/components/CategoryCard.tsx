import { useState, type ChangeEvent } from "react"
import { API_URL, type Category } from "../config"

type CategoryCardProps = {
    category: Category,
    onUpdate: () => void
}
const secondsPerConfirmationMessage = 2;

function CategoryCard({category, onUpdate}: CategoryCardProps) {
    const [categoryName, setCategoryName] = useState<string>(category.name);
    const [showConfirmation, setShowConfirmation] = useState<boolean>(false);

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
        }).then((res) => {
            onUpdate()
            if (res.ok){
                setShowConfirmation(true);
                setTimeout(() => {
                    setShowConfirmation(false);
                }, secondsPerConfirmationMessage * 1000);
            }
        })
    }
  return (
    <div className="category-card" key={category.id}>
        <input name="categoryName" id={category.id} value={categoryName} onChange={handleChange}></input>
        <button onClick={handleSubmit}>✅</button>
        {showConfirmation && <div>Successful save</div>}
    </div>
  )
}

export default CategoryCard