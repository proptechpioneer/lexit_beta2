import './index.css';
import Layout from './components/Layout';
import PropertyForm from "./components/PropertyForm"
import Stats from "./components/Stats"
import Cashflow from "./components/Cashflow"
import Analysis from "./components/Analysis"
import { useAuth } from './context/AuthContext';
import { propData } from './utils';
import LandingPage from './components/LandingPage';

function App() {
  const {globalUser, isLoading, globalData } = useAuth()
  const isAuthenticated = globalUser 
  const isData = globalData && !!Object.keys(globalData || {}).length
  
  const authenticatedContent = (
    <>
      < Stats />
      < Cashflow />
      < Analysis />
    </>
  )

  // Show LandingPage if not authenticated
  if (!isAuthenticated) {
    return (
      <Layout>
        <LandingPage />
      </Layout>
    )
  }

  return (
    <Layout> 
      <PropertyForm isAuthenticated={isAuthenticated} />
      {(isAuthenticated && isLoading) && (
        <p>Loading data...</p>
      )}
      {(isAuthenticated && isData) && (authenticatedContent)}
    </Layout>
  )
}

export default App
