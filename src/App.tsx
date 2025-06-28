import './index.css'
import { Route, Routes } from "react-router-dom";
import { LandingPage } from "./landing/LandingPage";
function App() {

  return (
    <Routes>
      <Route path="/landing" element={<LandingPage />} />
    </Routes>
  )
}

export default App
