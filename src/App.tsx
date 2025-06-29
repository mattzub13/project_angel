import OpportunitiesDashboard from './app/OpportunitiesDashboard';
import './App.css';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

function App() {
 

  return (
    <div className="bg-white">
      <Navbar/>
      <OpportunitiesDashboard />
      <Footer />
    </div>
  );
}

export default App;