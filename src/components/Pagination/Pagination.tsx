import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "../ui/button";

type PaginationProps = {
  page: number;
  setPage: (page: number) => void;
  totalPages: number;
  setLimit: (limit: number) => void;
};

const Pagination = ({
  page,
  setPage,
  setLimit,
  totalPages,
}: PaginationProps) => {
  const handlePreviousPage = () => {
    if (page === 1) {
      setPage(1);
    } else {
      setPage(page - 1);
    }
  };

  const handleNextPage = () => {
    if (page === totalPages) {
      setPage(totalPages);
    } else {
      setPage(page + 1);
    }
  };

  return (
    <div className="flex items-center justify-between w-full px-4 py-3 bg-white border-t border-gray-200 sm:px-6">
      <div>
        <span className="text-sm font-medium text-gray-700">
          Página {page} de {totalPages}
        </span>
      </div>
      <div>
        <label className="text-sm font-medium text-gray-700">Limite:</label>
        <select
          onChange={(e) => setLimit(Number(e.target.value))}
          className="ml-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
        >
          <option value={10}>10</option>
          <option value={25}>25</option>
          <option value={50}>50</option>
          <option value={100}>100</option>
        </select>
      </div>
      <div className="flex gap-2">
        <Button
          disabled={page === 1}
          onClick={handlePreviousPage}
          className="flex items-center justify-center px-3 h-8 me-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 cursor-pointer"
        >
          <ChevronLeft />
          Anterior
        </Button>
        <Button
          disabled={page === totalPages}
          onClick={handleNextPage}
          className="flex items-center justify-center px-3 h-8 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 cursor-pointer"
        >
          Siguiente
          <ChevronRight />
        </Button>
      </div>
    </div>
  );
};
export default Pagination;
