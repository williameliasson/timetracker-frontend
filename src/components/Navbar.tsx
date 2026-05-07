import { Link } from 'react-router'

function Navbar() {
  return (
    <nav>
        <Link to="/">Home</Link>
        <Link to="/categories">Categories</Link>
        <Link to="/stats">Stats</Link>
        <Link to="/register">Register</Link>
        <Link to="/login">Login</Link>
    </nav>
  )
}

export default Navbar