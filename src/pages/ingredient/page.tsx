import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { CirclePlus } from "lucide-react";
import { toast } from "sonner";

import IngredientList from "./components/IngredientList";

import FormCreateIngredient from "@/components/Form/FormCreateIngredient";
import Modal from "@/components/Modal/Modal";

import MainLayout from "@/components/Layouts/MainLayout";

import useIngredientApi from "@/api/ingredient.service";
import { INITIAL_FORM_DATA } from "./constants";

const IngredientPage = () => {
  const queryCLient = useQueryClient();
  const { createIngredient, findAllIngredient } = useIngredientApi();

  const [form, setForm] = useState(INITIAL_FORM_DATA);
  const [isOpen, setIsOpen] = useState(false);

  const { data, isLoading, error } = useQuery({
    queryKey: ["ingredients"],
    queryFn: findAllIngredient,
  });

  const createIngredientMutation = useMutation({
    mutationFn: createIngredient,
    onSuccess: (response) => {
      toast.success(response.message);
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

  const handleOnSubmit = async () => {
    createIngredientMutation.mutate({ name: form.name });
    setForm(INITIAL_FORM_DATA);
  };

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <MainLayout>
      <div className="mx-4">
        <div className="flex justify-between">
          <h1 className="text-4xl font-bold mb-5">Alacena</h1>
          <button onClick={openModal}>
            <CirclePlus />
          </button>
        </div>
        {data && data.ingredients && (
          <IngredientList ingredients={data.ingredients} />
        )}
      </div>

      <Modal
        title="Agregar Ingrediente"
        isVisible={isOpen}
        onAccept={handleOnSubmit}
        onCancel={closeModal}
      >
        <FormCreateIngredient form={form} setForm={setForm} />
      </Modal>
    </MainLayout>
  );
};
export default IngredientPage;
