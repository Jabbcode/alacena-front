import { axiosClient } from "@/helpers/axiosHelpers";
import { IPlate } from "@/interfaces/plate.interface";

const ROUTE = "/plates";

const ROUTE_INGREDIENTE_PLATO = "/ingredient-plate";

type BodyAssignIngredientToPlato = {
  plateId: number;
  ingredientId: number;
  quantity: number;
  unit: string;
};

type BodyRemoveIngredientFromPlate = {
  plateId: number;
  ingredientId: number;
};

const usePlateApi = () => {
  const findAllPlates = async (): Promise<IPlate[]> => {
    const { data } = await axiosClient.get<IPlate[]>(ROUTE);
    return data;
  };

  const createPlate = async (body: IPlate): Promise<IPlate> => {
    const { data } = await axiosClient.post<IPlate>(ROUTE, body);
    return data;
  };

  const findByIdPlate = async (id: number) => {
    const { data } = await axiosClient.get<IPlate>(`${ROUTE}/${id}`);
    return data;
  };

  const deletePlate = async (idPlate: number): Promise<void> => {
    await axiosClient.delete<void>(`${ROUTE}/${idPlate}`);
  };

  const assignIngredientToPlate = async ({
    plateId,
    ingredientId,
    quantity,
    unit,
  }: BodyAssignIngredientToPlato): Promise<IPlate> => {
    const { data } = await axiosClient.put<Promise<IPlate>>(
      `${ROUTE_INGREDIENTE_PLATO}/assign/${plateId}/${ingredientId}`,
      { quantity, unit }
    );

    return data;
  };

  const removeIngredientFromPlate = async ({
    ingredientId,
    plateId,
  }: BodyRemoveIngredientFromPlate) => {
    const { data } = await axiosClient.put<Promise<IPlate>>(
      `${ROUTE_INGREDIENTE_PLATO}/${plateId}/remove/${ingredientId}`
    );
    return data;
  };

  return {
    findAllPlates,
    findByIdPlate,
    createPlate,
    deletePlate,
    assignIngredientToPlate,
    removeIngredientFromPlate,
  };
};

export default usePlateApi;
