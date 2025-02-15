import { ReactNode } from "react";

interface IModalProps {
  children: ReactNode;
  title: string;
  isVisible: boolean;
  onAccept: () => void;
  onCancel: () => void;
}

const Modal = ({
  children,
  title,
  isVisible,
  onAccept,
  onCancel,
}: IModalProps) => {
  return (
    <>
      {/* Fondo oscurecido (Backdrop) */}
      {isVisible && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black z-50"
          onClick={close}
        >
          {/* Contenedor del modal */}
          <div
            className="relative bg-white w-full max-w-md p-6 rounded-lg shadow-lg outline-none"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Título del modal */}
            <h2 className="text-2xl font-bold mb-4 text-gray-800">{title}</h2>

            {/* Contenido del modal */}
            {children}

            {/* Botones del modal */}
            <div className="flex justify-end space-x-4">
              <button
                onClick={onCancel}
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 transition duration-300"
              >
                Cerrar
              </button>
              <button
                onClick={onAccept}
                className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 transition duration-300"
              >
                Agregar
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;
