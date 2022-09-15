import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom'
import HomePage from './HomePage'
import FilmLibrary from './FilmLibrary'
import NotFoundPage from './NotFoundPage'
import './App.css'

function App() {
  return (
    <BrowserRouter>
      <nav className="linkLayout">
        <NavLink to="/">HomePage</NavLink> {''}|<NavLink to="*"></NavLink>
        <NavLink to="/films"> {''}See the Films </NavLink>
      </nav>
      <Routes>
        <Route path="/" element={<HomePage />}></Route>
        <Route path="*" element={<NotFoundPage />}></Route>
        <Route path="/films" element={<FilmLibrary />}>
          <Route path="/films/:filmId" element={<FilmLibrary />}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
