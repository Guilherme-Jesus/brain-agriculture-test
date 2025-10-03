import Layout from '@/components/templates/Layout'
import { lazy } from 'react'
import { Route, Routes } from 'react-router-dom'

const DashboardPage = lazy(() => import('@/pages/Dashboard'))
const ProducersPage = lazy(() => import('@/pages/Producers'))
const FarmsPage = lazy(() => import('@/pages/Farms'))
const CulturesPage = lazy(() => import('@/pages/Cultures'))
const HarvestsPage = lazy(() => import('@/pages/Harvests'))
const PlantedCropsPage = lazy(() => import('@/pages/PlantedCrops'))

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<DashboardPage />} />
        <Route path="producers" element={<ProducersPage />}>
          <Route path="new" element={<ProducersPage />} />
          <Route path=":id/edit" element={<ProducersPage />} />
        </Route>
        <Route path="farms" element={<FarmsPage />}>
          <Route path="new" element={<FarmsPage />} />
          <Route path=":id/edit" element={<FarmsPage />} />
        </Route>
        <Route path="cultures" element={<CulturesPage />}>
          <Route path="new" element={<CulturesPage />} />
          <Route path=":id/edit" element={<CulturesPage />} />
        </Route>
        <Route path="harvests" element={<HarvestsPage />}>
          <Route path="new" element={<HarvestsPage />} />
          <Route path=":id/edit" element={<HarvestsPage />} />
        </Route>
        <Route path="planted-crops" element={<PlantedCropsPage />}>
          <Route path="new" element={<PlantedCropsPage />} />
          <Route path=":id/edit" element={<PlantedCropsPage />} />
        </Route>
      </Route>
    </Routes>
  )
}

export default App
