import { HeroSection } from "./components/HeroSection";
import TrustSection from "./components/TrustSection";
import CTAButton from "./components/CTAButton";
import HowItWorks from "./components/HowItWorks";
import { ValueEmprendedores } from "./components/ValueEmprendedores";

export const LandingPage = () => {
    return (
        <div className="bg-light_sky">
            <HeroSection />
            <ValueEmprendedores />
            <HowItWorks />

            <TrustSection />
            <div className="text-center my-16 bg-light py-20">
                <h3 className="text-3xl font-bold mb-4 text-secondary">
                    Únete a la Revolución de la Inversión Local
                </h3>
                <p className="text-lg text-gray-600 mb-8">
                    Empodera a los negocios de tu comunidad y obtén un retorno por ello.
                </p>
                <CTAButton label="Crear mi Cuenta Ahora" level="primary" />

            </div>

        </div>
    )
}