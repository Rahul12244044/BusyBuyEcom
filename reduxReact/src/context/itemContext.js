import { createContext, useContext, useState, useEffect } from "react";

const ItemContext = createContext();

export const useItem = () => {
  return useContext(ItemContext);
};

const ItemContextProvider = ({ children }) => {
  const [nameUser, setNameUser] = useState(undefined);
  const [typeCustomer, setTypeCustomer] = useState(undefined);
  const [loggedIn, setLoggedIn] = useState(false);
  const [userId, setUserId] = useState(undefined);
  const [cartLength, setCartLength] = useState(undefined);
  const [totalPrice, setTotalPrice] = useState(0);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [userExist, setUserExist] = useState(false);

  const [isInitialized, setIsInitialized] = useState(false);

useEffect(() => {
  const user = sessionStorage.getItem("user") || localStorage.getItem("user");
  if (user) {
    const parsedUser = JSON.parse(user);
    setUserId(parsedUser.userId);
    setLoggedIn(true);
    setNameUser(parsedUser.nameUser);
    setTypeCustomer(parsedUser.typeCustomer);
  }
  setIsInitialized(true); // ✅ After state is restored
}, []);

  return (
    <ItemContext.Provider
      value={{
        nameUser,
        setNameUser,
        typeCustomer,
        setTypeCustomer,
        setLoggedIn,
        loggedIn,
        userId,
        setUserId,
        cartLength,
        setCartLength,
        totalPrice,
        setTotalPrice,
        orderPlaced,
        setOrderPlaced,
        userExist,
        setUserExist,
        isInitialized
      }}
    >
      {children}
    </ItemContext.Provider>
  );
};

export default ItemContextProvider;
