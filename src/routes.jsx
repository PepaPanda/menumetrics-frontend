import { Routes, Route } from 'react-router-dom'

//Error
import { ErrorProvider } from './hooks/ErrorContext'
import ErrorOverlay from './components/ErrorOverlay'

//Routes
import Home from './pages/Home'
import MenuItem from './pages/Menuitem'
import Restaurant from './pages/Restaurant'
import NewMenuItem from './pages/NewMenuItem'
import NewRestaurant from './pages/NewRestaurant'

const AppRoutes = () => {
  return (
    <ErrorProvider>
      <ErrorOverlay />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/restaurant/:id" element={<Restaurant />} />
        <Route path="/menuitem/:id" element={<MenuItem />} />
        <Route path="/menuitem/" element={<NewMenuItem />} />
        <Route path="/restaurant/" element={<NewRestaurant />} />
      </Routes>
    </ErrorProvider>
  )
}

export default AppRoutes
