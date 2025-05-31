import { Routes, Route } from 'react-router-dom'

//Routes
import Home from './pages/Home'
import MenuItem from './pages/Menuitem'
import Restaurant from './pages/Restaurant'

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/restaurant/:id?" element={<Restaurant />} />
      <Route path="/menuitem/:id?" element={<MenuItem />} />
    </Routes>
  )
}

export default AppRoutes
