import { ReactNode } from "react";
import { Link } from "react-router-dom";

interface MainLayoutProps {
  children: ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <div className="grid grid-rows-[1fr_auto] h-screen">
      {children}
      <Link
        to="/"
        className="px-8 py-3 text-center mt-2 mx-2 mb-1 bg-black text-white text-sm rounded-md font-semibold hover:bg-black/[0.8] hover:shadow-lg"
      >
        Volver a inicio
      </Link>
    </div>
  );
};
export default MainLayout;
