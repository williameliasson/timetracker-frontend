import { BrowserRouter, Route, Routes } from "react-router"
import IndexPage from "./pages/IndexPage"
import StatisticsPage from "./pages/StatisticsPage"
import NotFoundPage from "./pages/NotFoundPage"
import LoginPage from "./pages/LoginPage"
import RegisterPage from "./pages/RegisterPage"
import Navbar from "./components/Navbar"
import CategoriesPage from "./pages/CategoriesPage"
import { SessionsProvider } from "./components/SessionsContext"
import { CategoriesProvider } from "./components/CategoriesContext"
import AdminPage from "./pages/AdminPage"


function App() {

  return (
    <>
    <BrowserRouter>
      <Navbar />
      <SessionsProvider>
        <CategoriesProvider>
          <Routes>
            <Route path="/" element={<IndexPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/stats" element={<StatisticsPage />} />
            <Route path="/categories" element={<CategoriesPage />} />
            <Route path="/admin" element={<AdminPage />} />
            <Route path="/*" element={<NotFoundPage />} />
          </Routes>
        </CategoriesProvider>
      </SessionsProvider>
    </BrowserRouter>
    </>
  )
}

export default App
