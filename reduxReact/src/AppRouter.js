import { useItem } from "./context/itemContext.js";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import NavBar from "./components/nav.js";
import ItemCard from "./pages/itemCard.js";
import PriceRange from "./pages/priceRange.js";
import AddProduct from "./pages/addProduct.js";
import Cart from "./pages/cart.js";
import SignUp from "./pages/signUp.js";
import SignIn from "./pages/signIn.js";
import MyOrders from "./pages/myOrders.js";

const AppRouter = () => {
  const { isInitialized } = useItem();

  if (!isInitialized) return null;

  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <>
          <NavBar />
          <div style={{ display: "flex", flexWrap: "wrap", gap: "20px", padding: "20px" }}>
            <div style={{ flex: "1 1 300px", maxWidth: "300px" }}>
              <PriceRange />
            </div>
            <div style={{ flex: "3 1 0", display: "flex", flexWrap: "wrap", gap: "20px" }}>
              <ItemCard />
            </div>
          </div>
        </>
      ),
    },
    {
      path: "/addProduct",
      element: (
        <>
          <NavBar />
          <AddProduct />
        </>
      ),
    },
    {
      path: "/cart",
      element: (
        <>
          <NavBar />
          <Cart />
        </>
      ),
    },
    {
      path: "/signUp",
      element: <SignUp />,
    },
    {
      path: "/signIn",
      element: <SignIn />,
    },
    {
      path: "/myOrders",
      element: (
        <>
          <NavBar />
          <MyOrders />
        </>
      ),
    },
  ]);

  return <RouterProvider router={router} />;
};

export default AppRouter;
