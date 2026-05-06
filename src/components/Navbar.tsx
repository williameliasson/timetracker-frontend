import { Link } from 'react-router'

function Navbar() {
  return (
    <nav>
        <Link to="/">Index</Link>
        <Link to="/register">Register</Link>
        <Link to="/login">Login</Link>
    </nav>
  )
}

export default Navbar