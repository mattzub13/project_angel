import './index.css'
import { Route, Routes } from "react-router-dom";
import { LandingPage } from "./landing/LandingPage";
import 'primeicons/primeicons.css';
function App() {

  return (
    <Routes>
      <Route path="/landing" element={<LandingPage />} />
      <Route path="/" element={<LandingPage />} />
    </Routes>
  )
}

export default App
