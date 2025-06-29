export const Footer = () => {
  return (
    <footer className="bg-space_cadet text-white">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h3 className="text-4xl font-bold">ALAS</h3>
          <p className="mt-2 text-blue_green-800">
            Conectando Inversión con Potencial Local.
          </p>
          <div className="mt-6 flex justify-center space-x-6">
            <a href="#" className="hover:text-light_blue">
              <i className="pi pi-twitter text-xl"></i>
            </a>
            <a href="#" className="hover:text-light_blue">
              <i className="pi pi-instagram text-xl"></i>
            </a>
            <a href="#" className="hover:text-light_blue">
              <i className="pi pi-linkedin text-xl"></i>
            </a>
          </div>
        </div>
        <div className=" pt-4 border-t border-blue_green-200 text-center">
          <p className="text-base text-blue_green-800">
            &copy; 2025 ALAS Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
