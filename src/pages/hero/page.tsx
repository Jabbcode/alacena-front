import { Link } from "react-router-dom";

const HeroPage = () => {
  return (
    <div className="flex flex-col gap-2 mx-auto text-center items-center justify-center h-screen">
      <h1 className="text-4xl font-bold mb-5">Organizador de Comida</h1>
      <div className="grid gap-2 grid-cols-2">
        <Link
          to="/eventos"
          className="px-8 py-2 col-span-2 bg-black text-white text-sm rounded-md font-semibold hover:bg-black/[0.8] hover:shadow-lg"
        >
          Ir a calendario
        </Link>
        <Link
          to="/platos"
          className="px-8 py-2 bg-black text-white text-sm rounded-md font-semibold hover:bg-black/[0.8] hover:shadow-lg"
        >
          Ir a platos
        </Link>
        <Link
          to="/almacen"
          className="px-8 py-2 bg-black text-white text-sm rounded-md font-semibold hover:bg-black/[0.8] hover:shadow-lg"
        >
          Ir al almacén
        </Link>
      </div>
    </div>
  );
};

export default HeroPage;
