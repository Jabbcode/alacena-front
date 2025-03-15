import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { Trash2 } from "lucide-react";
import { toast } from "sonner";

import usePlateApi from "@/api/plate.service";

import { IPlate } from "@/interfaces/plate.interface";

type PlateItemProps = {
  plate: IPlate;
};

const PlateItem = ({ plate }: PlateItemProps) => {
  const navigate = useNavigate();
  const { deletePlate } = usePlateApi();
  const queryCLient = useQueryClient();

  const deletePlatoMutation = useMutation({
    mutationFn: deletePlate,
    onSuccess: () => {
      toast.success("Plato eliminado correctamente");
      queryCLient.invalidateQueries();
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const confirmDelete = (id: number) => {
    toast("¿Esta seguro de eliminar el plato?", {
      action: {
        label: "Eliminar",
        onClick: () => deletePlatoMutation.mutate(id),
      },
      closeButton: true,
      position: "top-center",
      duration: 20000,
    });
  };

  return (
    <div className="p-5 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
      <div className="flex justify-between">
        <h5 className="text-md font-bold tracking-tight text-gray-900 dark:text-white">
          {plate.name}
        </h5>
        <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-sm dark:bg-blue-900 dark:text-blue-300">
          {plate.ingredients && plate.ingredients.length} Ingredientes
        </span>
      </div>
      <p className="my-3 font-normal text-gray-700 dark:text-gray-400">
        {plate.description}
      </p>
      <div className="flex justify-between items-center">
        <div className="cursor-pointer bg-red-700 rounded-lg hover:bg-red-800 text-white px-2 py-2">
          <Trash2 onClick={() => confirmDelete(plate.id!)} size={14} />
        </div>
        <button
          onClick={() => navigate(`/platos/${plate.id}`)}
          className="cursor-pointer inline-flex items-center px-3 py-2 text-xs font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800"
        >
          Ver más
          <svg
            className="rtl:rotate-180 w-3 h-3 ms-2"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 14 10"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M1 5h12m0 0L9 1m4 4L9 9"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};
export default PlateItem;
