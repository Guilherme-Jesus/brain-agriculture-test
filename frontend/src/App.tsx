import Layout from '@/components/templates/Layout'
import CulturesPage from '@/pages/CulturesPage/CulturesPage'
import DashboardPage from '@/pages/DashboardPage/DashboardPage'
import FarmsPage from '@/pages/FarmsPage/FarmsPage'
import HarvestsPage from '@/pages/HarvestsPage/HarvestsPage'
import PlantedCropsPage from '@/pages/PlantedCropsPage/PlantedCropsPage'
import ProducersPage from '@/pages/ProducersPage/ProducersPage'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<DashboardPage />} />
          <Route path="producers" element={<ProducersPage />} />
          <Route path="producers/edit/:id" element={<ProducersPage />} />
          <Route path="farms" element={<FarmsPage />} />
          <Route path="farms/edit/:id" element={<FarmsPage />} />
          <Route path="cultures" element={<CulturesPage />} />
          <Route path="cultures/edit/:id" element={<CulturesPage />} />
          <Route path="harvests" element={<HarvestsPage />} />
          <Route path="harvests/edit/:id" element={<HarvestsPage />} />
          <Route path="planted-crops" element={<PlantedCropsPage />} />
          <Route path="planted-crops/edit/:id" element={<PlantedCropsPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
