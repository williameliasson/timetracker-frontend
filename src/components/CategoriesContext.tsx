import { createContext, useEffect, useState, type ReactNode } from "react"
import { API_URL, type Category } from "../config";

type CategoriesContextType = {
    categories: Category[],
    fetchCategories: () => void
}

export const CategoriesContext = createContext<CategoriesContextType | null>(null)

export function CategoriesProvider({children}: {children: ReactNode}) {
    const [categories, setCategories] = useState<Category[]>([]);

    const fetchCategories = () => {
        //fetch and store in categories state var
        fetch(API_URL + "/me/categories", {
          method: "GET",
          credentials: "include"
        }).then(res => {
          if (!res.ok) return []
          return res.json()
        }).then(data => {
          setCategories(data);
        })
      }

      useEffect(() => {
        fetchCategories()
      }, [])
  return (
    <CategoriesContext.Provider value={{categories, fetchCategories}}>
        {children}
    </CategoriesContext.Provider>
  )
}