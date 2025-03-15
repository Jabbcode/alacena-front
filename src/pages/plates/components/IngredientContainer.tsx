import { useState } from "react";
import { useParams } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { CirclePlus, Trash2 } from "lucide-react";
import { toast } from "sonner";

import FormAssignIngrediente from "@/components/Form/FormAssignIngredient";
import Modal from "@/components/Modal/Modal";

import { INITIAL_FORM_DATA } from "../constants";

import usePlateApi from "@/api/plate.service";

const PlateItemPage = () => {
  const params = useParams();
  const queryCLient = useQueryClient();

  const { findByIdPlate, assignIngredientToPlate, removeIngredientFromPlate } =
    usePlateApi();

  const [isOpen, setIsOpen] = useState(false);
  const [form, setForm] = useState(INITIAL_FORM_DATA);

  const { data, isLoading, error } = useQuery({
    queryKey: ["plats", params.id],
    queryFn: () => findByIdPlate(Number(params.id)),
    staleTime: 5 * 60 * 1000, // Mantener en caché durante 5 minutos
    refetchOnWindowFocus: false, // Evitar refetch cuando el usuario cambie de pestaña
  });

  const assignIngredient = useMutation({
    mutationFn: assignIngredientToPlate,
    onSuccess: () => {
      queryCLient.invalidateQueries();
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const handleOnSubmit = () => {
    assignIngredient.mutate(
      {
        quantity: form.quantity,
        ingredientId: form.ingredientId,
        plateId: Number(params.id!),
        unit: form.unit,
      },
      {
        onSuccess: () => {
          toast.success("Ingrediente agregado correctamente");
          setForm(INITIAL_FORM_DATA);
        },
        onError: (error) => {
          console.log(error.message);
          toast.error(error.message);
        },
      }
    );
  };

  const removeIngredient = useMutation({
    mutationFn: removeIngredientFromPlate,
    onSuccess: () => {
      toast.success("Ingrediente eliminado correctamente");
      queryCLient.invalidateQueries();
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const confirmDelete = (plateId: number, ingredientId: number) => {
    toast("¿Esta seguro de eliminar el ingrediente?", {
      action: {
        label: "Eliminar",
        onClick: () => removeIngredient.mutate({ plateId, ingredientId }),
      },
      closeButton: true,
      position: "top-center",
      duration: 20000,
    });
  };

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <>
      {data && data.ingredients && data.ingredients.length > 0 ? (
        <div>
          <div className="flex gap-3 items-center mb-3">
            <h3 className="font-medium text-2xl">{data.name} - Ingredientes</h3>
            <button onClick={openModal}>
              <CirclePlus size={26} />
            </button>
          </div>
          <div className="relative overflow-x-auto">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    Nombre
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Cantidad
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Unidad
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Acciones
                  </th>
                </tr>
              </thead>
              <tbody>
                {data &&
                  data.ingredients.map((ingredient) => (
                    <tr
                      key={ingredient.info.id}
                      className="bg-white border-b border-gray-200"
                    >
                      <th
                        scope="row"
                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                      >
                        {ingredient.info.name}
                      </th>
                      <td className="px-6 py-4">{ingredient.quantity}</td>
                      <td className="px-6 py-4">{ingredient.unit}</td>
                      <td className="px-6 py-4">
                        <button
                          onClick={() =>
                            confirmDelete(
                              Number(params.id),
                              ingredient.info.id!
                            )
                          }
                          className="cursor-pointer bg-red-700 rounded-lg hover:bg-red-800 text-white px-2 py-2"
                        >
                          <Trash2 size={14} />
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="w-full h-5/6 flex flex-col gap-3 justify-center items-center">
          <h2 className="font-bold text-4xl">{data?.name}</h2>
          <h3 className="font-medium text-xl">Sin Ingredientes</h3>
          <button onClick={openModal}>
            <CirclePlus size={26} />
          </button>
        </div>
      )}
      <Modal
        title="Agregar Ingrediente"
        isVisible={isOpen}
        onAccept={handleOnSubmit}
        onCancel={closeModal}
      >
        <FormAssignIngrediente form={form} setForm={setForm} />
      </Modal>
    </>
  );
};
export default PlateItemPage;
