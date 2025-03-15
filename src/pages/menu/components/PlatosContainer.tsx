import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CircleMinus } from "lucide-react";
import { toast } from "sonner";

import useEventApi from "@/api/event.service";

import { IEvent } from "@/interfaces/menu.interface";
import { IPlate } from "@/interfaces/plate.interface";

interface PlatosContainerProps {
  menu: IEvent;
  category: string;
  plates: IPlate[];
}

const PlatosContainer = ({ menu, category, plates }: PlatosContainerProps) => {
  const queryCLient = useQueryClient();
  const { removePlateFromMenu } = useEventApi();

  const deletePlate = useMutation({
    mutationFn: removePlateFromMenu,
    onSuccess: () => {
      toast.info("Menu removido correctamente");
      queryCLient.invalidateQueries();
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return (
    <ul className="list-disc list-inside ml-4 space-y-1">
      {plates.map((plate) => {
        return (
          <li key={plate.id} className="text-gray-700 flex gap-2">
            {plate.name}
            <div
              onClick={() =>
                deletePlate.mutate({
                  mealType: category,
                  menuId: menu.id!,
                  plateId: plate.id!,
                })
              }
            >
              <CircleMinus />
            </div>
          </li>
        );
      })}
    </ul>
  );
};

export default PlatosContainer;
