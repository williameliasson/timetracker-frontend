import { BrowserRouter, Route, Routes } from "react-router"
import IndexPage from "./pages/IndexPage"
import StatisticsPage from "./pages/StatisticsPage"
import SessionsPage from "./pages/SessionsPage"
import NotFoundPage from "./pages/NotFoundPage"

function App() {

  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<IndexPage />} />
        <Route path="/stats" element={<StatisticsPage />} />
        <Route path="/sessions" element={<SessionsPage />} />
        <Route path="/*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
