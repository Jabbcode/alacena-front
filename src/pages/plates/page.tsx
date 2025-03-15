import { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { CirclePlus } from "lucide-react";
import { toast } from "sonner";

import PlateList from "./components/PlateList";
import Modal from "@/components/Modal/Modal";
import FormCreatePlate from "@/components/Form/FormCreatePlate";

import MainLayout from "@/components/Layouts/MainLayout";

import usePlateApi from "@/api/plate.service";

import { INITIAL_FORM_DATA_PLATE } from "./constants";

const PlatesPage = () => {
  const navigate = useNavigate();
  const { findAllPlates, createPlate } = usePlateApi();
  const queryCLient = useQueryClient();

  const [isOpen, setIsOpen] = useState(false);
  const [form, setForm] = useState(INITIAL_FORM_DATA_PLATE);

  const { data, isLoading, error } = useQuery({
    queryKey: ["plates"],
    queryFn: findAllPlates,
  });

  const createPlateMutation = useMutation({
    mutationFn: createPlate,
    onSuccess: () => {
      setForm(INITIAL_FORM_DATA_PLATE);
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
    createPlateMutation.mutate(
      { ...form },
      {
        onSuccess: (response) => {
          setIsOpen(false);
          navigate(`/platos/${response.id}`);
        },
        onError: (error) => {
          toast.error(error.message);
        },
      }
    );
  };

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <MainLayout>
      <div className="flex gap-3">
        <aside
          id="default-sidebar"
          className="fixed top-0 left-0 z-40 w-80 h-auto transition-transform -translate-x-full sm:translate-x-0"
          aria-label="Sidebar"
        >
          <div className="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
            <div className="flex justify-between items-center">
              <h1 className="text-4xl font-bold mb-5">Platos</h1>
              <button onClick={openModal} className="cursor-pointer">
                <CirclePlus size={26} />
              </button>
            </div>

            {data && <PlateList plates={data} />}
          </div>
        </aside>

        <div className="p-4 relative w-[calc(100%-320px)] left-[320px]">
          <Outlet />
        </div>
      </div>
      <Modal
        title="Agregar plato"
        isVisible={isOpen}
        onAccept={handleOnSubmit}
        onCancel={closeModal}
      >
        <FormCreatePlate form={form} setForm={setForm} />
      </Modal>
    </MainLayout>
  );
};
export default PlatesPage;
