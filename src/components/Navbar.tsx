import Alas3D from "../landing/components/Alas3D";

export const Navbar = () => {
  return (
    <header className="bg-white/80 backdrop-blur-md shadow-sm sticky top-0 py-1 z-40">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0 cursor-pointer flex items-center h-full">
            <span className="text-4xl font-bold text-space_cadet">ALAS</span>
          </div>
          <div className="flex items-center h-full">
            <div className="w-16 h-16 flex items-center justify-center">
              <Alas3D />
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
