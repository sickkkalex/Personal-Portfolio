import { BrowserRouter, Routes, Route } from 'react-router-dom'
import CustomCursor from './components/CustomCursor'
import Home from './pages/Home'
import BioPage from './pages/BioPage'
import ProgettiPage from './pages/ProgettiPage'

export default function App() {
  return (
    <BrowserRouter>
      <CustomCursor />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/bio" element={<BioPage />} />
        <Route path="/progetti" element={<ProgettiPage />} />
      </Routes>
    </BrowserRouter>
  )
}
