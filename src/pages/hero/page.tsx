import { Link } from "react-router-dom";

const HeroPage = () => {
  return (
    <div className="flex flex-col mx-auto text-center items-center justify-center h-screen">
      <h1 className="text-4xl font-bold mb-5">Organizador de Comida</h1>
      <Link
        to="/events"
        className="px-8 py-2 bg-black text-white text-sm rounded-md font-semibold hover:bg-black/[0.8] hover:shadow-lg"
      >
        Ir a calendario
      </Link>
    </div>
  );
};

export default HeroPage;
