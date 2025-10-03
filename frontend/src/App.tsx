import Layout from '@/components/templates/Layout'
import CulturesPage from '@/pages/CulturesPage/CulturesPage'
import DashboardPage from '@/pages/DashboardPage/DashboardPage'
import FarmsPage from '@/pages/Farms'
import HarvestsPage from '@/pages/Harvests'
import PlantedCropsPage from '@/pages/PlantedCrops'
import ProducersPage from '@/pages/Producers'
import { Route, Routes } from 'react-router-dom'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<DashboardPage />} />
        <Route path="producers" element={<ProducersPage />} />
        <Route path="producers/new" element={<ProducersPage />} />
        <Route path="producers/:id/edit" element={<ProducersPage />} />
        <Route path="farms" element={<FarmsPage />} />
        <Route path="farms/new" element={<FarmsPage />} />
        <Route path="farms/:id/edit" element={<FarmsPage />} />
        <Route path="cultures" element={<CulturesPage />} />
        <Route path="cultures/edit/:id" element={<CulturesPage />} />
        <Route path="harvests" element={<HarvestsPage />} />
        <Route path="harvests/new" element={<HarvestsPage />} />
        <Route path="harvests/:id/edit" element={<HarvestsPage />} />
        <Route path="planted-crops" element={<PlantedCropsPage />} />
        <Route path="planted-crops/new" element={<PlantedCropsPage />} />
        <Route path="planted-crops/:id/edit" element={<PlantedCropsPage />} />
      </Route>
    </Routes>
  )
}

export default App
