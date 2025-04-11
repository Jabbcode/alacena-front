import { axiosClient } from "@/helpers/axiosHelpers";
import { IIngredient } from "@/interfaces/ingredient.interface";

type ResponseType = {
  message?: string;
  ingredient?: IIngredient;
  ingredients?: IIngredient[];
};

type ResponseTypePagination = {
  ingredients: IIngredient[];
  total: number;
  currentPage: number;
  totalPages: number;
};

const ROUTE = "/ingredients";

const useIngredientApi = () => {
  const findAllIngredient = async ({
    page = 1,
    limit = 25,
  }): Promise<ResponseTypePagination> => {
    const { data } = await axiosClient.get<ResponseTypePagination>(
      `${ROUTE}?page=${page}&limit=${limit}`
    );
    return data;
  };

  const createIngredient = async (body: IIngredient): Promise<ResponseType> => {
    const { data } = await axiosClient.post<ResponseType>(ROUTE, body);
    return data;
  };

  const renewIngredient = async (id: number): Promise<ResponseType> => {
    const { data } = await axiosClient.patch<ResponseType>(
      `${ROUTE}/renew/${id}`
    );

    return data;
  };

  const cancelIngredient = async (id: number): Promise<ResponseType> => {
    const { data } = await axiosClient.patch<ResponseType>(
      `${ROUTE}/cancel/${id}`
    );
    return data;
  };

  return {
    findAllIngredient,
    createIngredient,
    renewIngredient,
    cancelIngredient,
  };
};

export default useIngredientApi;
