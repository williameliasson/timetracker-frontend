import type { Category } from "../config"

type CategoryCardProps = {
    category: Category
}

function CategoryCard({category}: CategoryCardProps) {
  return (
    <div className="category-card">
        <h1>{category.name}</h1>
    </div>
  )
}

export default CategoryCard