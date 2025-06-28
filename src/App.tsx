import { useState } from 'react';
import { LandingPage } from './landing/LandingPage';
import OpportunitiesDashboard from './app/OpportunitiesDashboard';
import './App.css';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

function App() {
  const [currentView, setCurrentView] = useState('landing');
  const navigateToDashboard = () => setCurrentView('dashboard');
  const navigateToLanding = () => setCurrentView('landing');

  return (
    <div className="bg-white">
      <Navbar onNavigateToDashboard={navigateToDashboard} onLogoClick={navigateToLanding} />
      <main>
        {currentView === 'landing' && <LandingPage />}
        {currentView === 'dashboard' && <OpportunitiesDashboard />}
      </main>
      <Footer />
    </div>
  );
}

export default App;