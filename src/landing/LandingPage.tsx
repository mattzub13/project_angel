//import { HeroSection } from "./components/HeroSection";
//import TrustSection from "./components/TrustSection";
import CTAButton from "./components/CTAButton";
//import HowItWorks from "./components/HowItWorks";
//import { ValueEmprendedores } from "./components/ValueEmprendedores";
// import { ValueInversores } from "./components/ValueInversores";

export const LandingPage = ({ onNavigateToDashboard }: { onNavigateToDashboard: () => void }) => {
    return (
        <main className="bg-light_sky">

            <div className="text-center my-16 bg-white py-20">
                <CTAButton
                    label="Ver Oportunidades Ahora"
                    level="primary"
                    onClick={onNavigateToDashboard}
                />
            </div>
        </main>
    )
}