import { Routes, Route } from 'react-router-dom'
import { AppProvider } from '@/lib/app-context'
import { SidebarProvider } from '@/components/sidebar'
import DashboardPage from '@/src/pages/Dashboard'
import AvancesPage from '@/src/pages/Avances'
import MetasPage from '@/src/pages/Metas'
import RegistroPage from '@/src/pages/Registro'
import HistoricoPage from '@/src/pages/Historico'
import AdminPage from '@/src/pages/Admin'
import InfografiasPage  from '@/src/pages/Infografias'

function App() {
  return (
    <AppProvider>
      <SidebarProvider>
        <Routes>
          <Route path="/" element={<DashboardPage />} />
          <Route path="/avances" element={<AvancesPage />} />
          <Route path="/metas" element={<MetasPage />} />
          <Route path="/registro" element={<RegistroPage />} />
          <Route path="/historico" element={<HistoricoPage />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/infografias" element={<InfografiasPage />} />
          </Routes>

      </SidebarProvider>
    </AppProvider>
  )
}

export default App

