import Layout from '@/components/templates/Layout'
import DashboardPage from '@/pages/DashboardPage/DashboardPage'
import { ProducersPage } from '@/pages/ProducersPage/ProducersPage'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

const FarmsPage = () => <h1>Lista de Fazendas</h1>
const CulturesPage = () => <h1>Lista de Culturas</h1>
const SeasonsPage = () => <h1>Lista de Safras</h1>
const ReportsPage = () => <h1>Relatórios</h1>
const ProducerDetailPage = () => <h1>Detalhes do Produtor</h1>
const ProducerFormPage = () => <h1>Formulário de Produtor</h1>

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<DashboardPage />} />
          <Route path="producers" element={<ProducersPage />} />
          <Route path="producers/:id" element={<ProducerDetailPage />} />
          <Route path="producers/editar/:id" element={<ProducerFormPage />} />
          <Route path="farms" element={<FarmsPage />} />
          <Route path="cultures" element={<CulturesPage />} />
          <Route path="seasons" element={<SeasonsPage />} />
          <Route path="reports" element={<ReportsPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
