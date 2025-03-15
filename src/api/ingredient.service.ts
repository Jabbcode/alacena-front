import { axiosClient } from "@/helpers/axiosHelpers";
import { IIngredient } from "@/interfaces/ingredient.interface";

type ResponseType = {
  message?: string;
  ingredient?: IIngredient;
  ingredients?: IIngredient[];
};

const ROUTE = "/ingredients";

const useIngredientApi = () => {
  const findAllIngredient = async (): Promise<ResponseType> => {
    const { data } = await axiosClient.get<ResponseType>(ROUTE);
    return data;
  };

  const createIngredient = async (body: IIngredient): Promise<ResponseType> => {
    const { data } = await axiosClient.post<ResponseType>(ROUTE, body);
    return data;
  };

  return {
    findAllIngredient,
    createIngredient,
  };
};

export default useIngredientApi;
