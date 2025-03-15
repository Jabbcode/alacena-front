import { createBrowserRouter } from "react-router-dom";

import EventsPage from "@/pages/events/page";
import HeroPage from "@/pages/hero/page";
import IngredientPage from "@/pages/ingredient/page";
import MenuPage from "@/pages/menu/page";
import PlatesPage from "@/pages/plates/page";
import IngredientContainer from "@/pages/plates/components/IngredientContainer";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HeroPage />,
  },
  {
    path: "eventos",
    element: <EventsPage />,
  },
  {
    path: "menu/:date",
    element: <MenuPage />,
  },
  {
    path: "almacen",
    element: <IngredientPage />,
  },
  {
    path: "platos",
    element: <PlatesPage />,
    children: [
      {
        path: ":id",
        element: <IngredientContainer />,
      },
    ],
  },
]);

export default router;
