import { BrowserRouter, Route, Routes } from "react-router"
import IndexPage from "./pages/IndexPage"
import StatisticsPage from "./pages/StatisticsPage"
import SessionsPage from "./pages/SessionsPage"
import NotFoundPage from "./pages/NotFoundPage"
import LoginPage from "./pages/LoginPage"
import RegisterPage from "./pages/RegisterPage"
import Navbar from "./components/Navbar"
import CategoriesPage from "./pages/CategoriesPage"

function App() {

  return (
    <>
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<IndexPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/stats" element={<StatisticsPage />} />
        <Route path="/sessions" element={<SessionsPage />} />
        <Route path="/categories" element={<CategoriesPage />} />
        <Route path="/*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
