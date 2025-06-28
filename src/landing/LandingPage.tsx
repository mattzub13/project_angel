import { HeroSection } from "./components/HeroSection";
import { ValueEmprendedores } from "./components/ValueEmprendedores";
import HowItWorks from "./components/HowItWorks";
import TrustSection from "./components/TrustSection";

export const LandingPage = () => {
  return (
    <>
      <HeroSection />
      <ValueEmprendedores />
      <HowItWorks />
      <TrustSection />
    </>
  );
};