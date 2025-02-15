import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { compareAsc, format as formatDateFns } from "date-fns";

import MenuContainer from "./components/MenuContainer";

import { findByFilterEventService, assignPlatoToMenuService } from "@/api/menu";

import { IEvento } from "@/interfaces/menu";
import { format } from "@/helpers/dateHelpers";
import Modal from "@/components/Modal";
import { findAllPlatosService } from "@/api/plato";
import { IPlato } from "@/interfaces/plato";
import FormAssignMenu from "./components/FormAssignMenu";
import { es } from "date-fns/locale";
import { capitalizeFirstLetter } from "@/helpers";

const MenuPage = () => {
  const params = useParams<{ fecha: string }>();
  const navigate = useNavigate();

  const INITIAL_FORM_DATA = {
    mealType: "",
    platoId: 0,
    fecha: params.fecha! as unknown as Date,
  };

  const [form, setForm] = useState(INITIAL_FORM_DATA);
  const [eventos, setEventos] = useState<IEvento[]>([]);
  const [platos, setPlatos] = useState<IPlato[]>([]);
  const [menu, setMenu] = useState<IEvento>({
    fecha: new Date(),
    menuPlatos: [],
  });
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    getEvent(params.fecha as unknown as Date);
  }, [params, menu]);

  useEffect(() => {
    getAllPlatos();
  }, []);

  const getAllPlatos = async () => {
    const data = await findAllPlatosService();
    setPlatos(data);
  };

  const getEvent = async (fecha: Date) => {
    try {
      const data = await findByFilterEventService({ fecha });
      setEventos(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleNavigate = () => {
    navigate("/events");
  };

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const handleOnSubmit = async () => {
    const data = await assignPlatoToMenuService(form);
    setMenu(data);
    setIsOpen(false);
  };

  return (
    <div className="grid grid-rows-[auto_1fr_auto] h-screen">
      <div className="row-start-1 row-end-2 px-4 py-6 bg-gray-100">
        <h1 className="text-3xl text-center font-bold text-gray-800">
          Lista de comida
        </h1>
        <h2 className="text-center font-medium text-gray-600 text-base">
          {capitalizeFirstLetter(
            formatDateFns(new Date(params.fecha as unknown as Date), "eeee", {
              locale: es,
            })
          )}{" "}
          -{" "}
          {format(new Date(new Date(params.fecha as unknown as Date)), "es", {
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
          <FormAssignMenu form={form} setForm={setForm} platos={platos} />
        </Modal>
        <section className="space-y-4">
          {eventos
            .sort((a, b) => compareAsc(a.fecha, b.fecha))
            .map((evento) => {
              return (
                <MenuContainer
                  key={evento.id}
                  evento={evento}
                  setMenu={setMenu}
                />
              );
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
