import { useState } from "react";
import { LandingPage } from "./landing/LandingPage";
import OpportunitiesDashboard from "./app/OpportunitiesDashboard";
import InvestorForm from "./app/InvestorForm";
import ConfirmationPage from "./app/ConfirmationPage";

import "./App.css";

function App() {
  const [currentView, setCurrentView] = useState("landing");

  const navigateToDashboard = () => setCurrentView("dashboard");
  const navigateToInvestorForm = () => setCurrentView("form");
  const navigateToConfirmation = () => setCurrentView("confirmation"); 
  const navigateToLanding = () => setCurrentView("landing");

  let content;
  if (currentView === "landing") {
    content = <LandingPage onNavigateToDashboard={navigateToDashboard} />;
  } else if (currentView === "dashboard") {
    content = (
      <OpportunitiesDashboard onNavigateToForm={navigateToInvestorForm} />
    );
  } else if (currentView === "form") {
    content = <InvestorForm onFormSubmit={navigateToConfirmation} />;
  } else if (currentView === "confirmation") {
    content = <ConfirmationPage onReturnToDashboard={navigateToDashboard} />;
  }

  return (
    <>
      <header
        className="p-2 bg-blue_green-100 text-white text-center cursor-pointer"
        onClick={navigateToLanding}
      >
        Volver al Inicio (Demo)
      </header>
      {content}
    </>
  );
}

export default App;
