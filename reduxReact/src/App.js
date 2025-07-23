import { Provider } from "react-redux";
import store from "../src/store.js";
import ItemContextProvider from "./context/itemContext.js";
import AppRouter from "./AppRouter.js"; // ⬅️ Create this file next
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <>
      <ToastContainer />
      <Provider store={store}>
        <ItemContextProvider>
          <AppRouter /> 
        </ItemContextProvider>
      </Provider>
    </>
  );
}

export default App;
