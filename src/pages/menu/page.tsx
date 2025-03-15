import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { compareAsc, format as formatDateFns } from "date-fns";
import { es } from "date-fns/locale";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import MenuContainer from "./components/MenuContainer";

import FormAssignMenu from "@/components/Form/FormAssignMenu";
import Modal from "@/components/Modal/Modal";

import useEventApi from "@/api/event.service";
import usePlateApi from "@/api/plate.service";

import { capitalizeFirstLetter, format } from "@/helpers";

const MenuPage = () => {
  const { assignPlateToMenu, findByFilterEvent } = useEventApi();
  const { createPlate } = usePlateApi();
  const queryCLient = useQueryClient();
  const params = useParams<{ date: string }>();
  const navigate = useNavigate();

  const INITIAL_FORM_DATA = {
    mealType: "",
    plateId: 0,
    date: params.date! as unknown as Date,
    name: "",
  };

  const [form, setForm] = useState(INITIAL_FORM_DATA);
  const [isOpen, setIsOpen] = useState(false);

  const {
    data: events,
    isLoading: isLoadingEvents,
    error: errorEvents,
  } = useQuery({
    queryKey: ["events"],
    queryFn: () =>
      findByFilterEvent({
        date: params.date as unknown as Date,
      }),
  });

  const createPlateMutation = useMutation({
    mutationFn: createPlate,
    onSuccess: () => {
      setForm(INITIAL_FORM_DATA);
      queryCLient.invalidateQueries();
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const assignPlate = useMutation({
    mutationFn: assignPlateToMenu,
    onSuccess: () => {
      setIsOpen(false);
      setForm(INITIAL_FORM_DATA);
      toast.success("Menu asignado correctamente");
      queryCLient.invalidateQueries();
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const handleNavigate = () => {
    navigate("/eventos");
  };

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const handleOnSubmit = async () => {
    if (form.name !== "") {
      createPlateMutation.mutate(
        { name: form.name },
        {
          onSuccess: (response) => {
            assignPlate.mutate({ ...form, plateId: response.id! });
            setIsOpen(false);
          },
          onError: (error) => {
            toast.error(error.message);
          },
        }
      );
    } else {
      assignPlate.mutate(form, {
        onError: (error) => {
          toast.error(error.message);
        },
      });
    }
  };

  if (isLoadingEvents) return <p>Loading...</p>;
  if (errorEvents) return <p>Error: {errorEvents.message}</p>;

  return (
    <div className="grid grid-rows-[auto_1fr_auto] h-screen">
      <div className="row-start-1 row-end-2 px-4 py-6 bg-gray-100">
        <h1 className="text-3xl text-center font-bold text-gray-800">
          Lista de comida
        </h1>
        <h2 className="text-center font-medium text-gray-600 text-base">
          {capitalizeFirstLetter(
            formatDateFns(new Date(params.date as unknown as Date), "eeee", {
              locale: es,
            })
          )}{" "}
          -{" "}
          {format(new Date(new Date(params.date as unknown as Date)), "es", {
            dateStyle: "long",
          })}
        </h2>
      </div>

      <div className="row-start-2 row-end-3 overflow-y-auto px-4">
        <Modal
          title="Agregar plato"
          isVisible={isOpen}
          onAccept={handleOnSubmit}
          onCancel={closeModal}
        >
          <FormAssignMenu form={form} setForm={setForm} />
        </Modal>
        <section className="space-y-4">
          {events &&
            events
              .sort((a, b) => compareAsc(a.date, b.date))
              .map((event) => {
                return <MenuContainer key={event.id} event={event} />;
              })}
        </section>
      </div>

      <div className="row-start-3 row-end-4 px-4 py-4 flex gap-2 bg-gray-100">
        <button
          onClick={handleNavigate}
          className="w-full h-10 px-8 py-2 bg-black text-white text-sm rounded-md font-semibold hover:bg-black/[0.8] hover:shadow-lg"
        >
          Volver
        </button>

        <button
          onClick={openModal}
          className="w-full h-10 px-8 py-2 bg-blue-700 text-white text-sm rounded-md font-semibold hover:bg-blue-400 hover:shadow-lg"
        >
          Agregar Plato
        </button>
      </div>
    </div>
  );
};
export default MenuPage;
