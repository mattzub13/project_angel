import Alas3D from "../landing/components/Alas3D";

export const Navbar = () => {
  return (
    <header className="bg-white/80 backdrop-blur-md shadow-sm sticky top-100 py-1">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0 cursor-pointer">
            <span className="text-4xl font-bold ">ALAS</span>
          </div>
          <div className="mt-6">
            <Alas3D />
          </div>
        </div>
      </nav>
    </header>
  );
};
export default Navbar;
