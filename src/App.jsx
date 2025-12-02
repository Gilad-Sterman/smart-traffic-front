import { Routes, Route } from 'react-router-dom'
import { Layout } from './cmps/Layout'
import { Home } from './pages/Home'
import { Dashboard } from './pages/Dashboard'
import { Analytics } from './pages/Analytics'
import { Settings } from './pages/Settings'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        {/* MVP Routes */}
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="analytics" element={<Analytics />} />
        <Route path="settings" element={<Settings />} />
      </Route>
    </Routes>
  )
}

export default App
