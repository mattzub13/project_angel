import { Button } from 'primereact/button';
import { ReasonHero } from './ReasonHero';
const reasons = [{
    icon: "pi pi-map-marker",
    title: "Encuentra una oportunidad de inversión"
},
{
    icon: "pi pi-verified",
    title: "Inversionistas verificados para tu empresa",
}, {
    icon: "pi pi-bolt",
    title: "Mejora tu ranking y gana visibilidad"
}]
export const HeroSection = () => {


    return (
        <div className="relative flex p-9">
            <div className="flex flex-col  pr-4"> <div className="bg-blue_green min-h-[400px] py-6 rounded-xl flex flex-col px-5 justify-center items-start z-10">
                <h1 className="text-white text-6xl font-bold">ALAS</h1>
                <p className="text-white">
                    Alas es una plataforma que conecta a pequeños inversores con negocios que necesitan financiamiento.
                </p>
                <Button label='Agenda una demo' className='bg-nyanza py-3 px-2 rounded-xl my-3 text-font gap-2 hover:scale-105 active:scale-95 active:brightness-90  focus:outline-none focus:ring-2  transition-all duration-200 focus:ring-offset-1 inline-flex items-center justify-center' icon="pi pi-calendar" iconPos='right' />


            </div>
                <div className="grid grid-cols-4 gap-4 py-5 z-20 text-neutral-light">
                    {reasons.map((reason, index) => (
                        <ReasonHero key={index} icon={reason.icon} title={reason.title} />
                    ))}
                </div>
            </div>
            {/*   <div className="absolute -right-[90px] lg:right-[200px] top-[200px] -translate-y-1/2  z-20"> <img src="/imgs/laburante-1.png" alt="" className="w-full h-auto object-cover" />
            </div> */}
        </div>
    )
}
