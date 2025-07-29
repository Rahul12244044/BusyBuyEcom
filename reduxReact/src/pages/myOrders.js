import React from "react";
import myOrdersCssModule from "../cssModule/myOrders.module.css";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { orderSelector } from "../redux/reducers/orderReducer.js";
import { useItem } from "../context/itemContext.js";
import { oneUserOrderAsync } from "../redux/reducers/orderReducer.js";
import { ClipLoader } from "react-spinners";

const MyOrders = () => {
  const orderState = useSelector(orderSelector);
  console.log("myOrders");
  console.log(orderState);

  const { userId } = useItem();
  const oneUserAllOrders = orderState.orders.filter((elm) => elm.userId === userId);
  console.log(oneUserAllOrders);

  const sortedOneUserAllOrders = oneUserAllOrders.map((order) => {
    let orderDate = order.orderOn;
    if (orderDate && typeof orderDate === "object" && "seconds" in orderDate) {
      orderDate = new Date(orderDate.seconds * 1000);
    } else {
      orderDate = new Date();
    }
    return {
      ...order,
      orderOn: orderDate,
    };
  }).sort((a, b) => new Date(b.orderOn) - new Date(a.orderOn));

  console.log("Before sorting:", oneUserAllOrders.map(o => o.orderOn));
  oneUserAllOrders.sort((a, b) => new Date(b.orderOn) - new Date(a.orderOn));
  console.log("oneUserAllOrders");

  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000); 
    return () => clearTimeout(timer); 
  }, []);

  useEffect(() => {
    dispatch(oneUserOrderAsync(userId));
  }, [dispatch]);

  return (
    <div className={myOrdersCssModule.ordersWrapper}>
      {loading ? (
        <div className={myOrdersCssModule.loading}>
          <ClipLoader size={40} color="blue" />
          <p className={myOrdersCssModule.loadingName}>Loading...</p>
        </div>
      ) : (
        <>
          {sortedOneUserAllOrders.length === 0 ? (
            <h1 className={myOrdersCssModule.noOrders}>No Orders Found!</h1>
          ) : (
            <h2 className={myOrdersCssModule.heading}>Your Orders</h2>
          )}

          {sortedOneUserAllOrders.map((elem, index) => (
            <div className={myOrdersCssModule.myOrders} key={index}>
              <h3 className={myOrdersCssModule.orderedOn}>
                Ordered On: {elem.orderOn.toISOString().substring(0, 10)}
              </h3>

              <div className={myOrdersCssModule.tableWrapper}>
                <table className={myOrdersCssModule.ordersTable}>
                  <thead>
                    <tr>
                      <th className={myOrdersCssModule.tableHeader}>Title</th>
                      <th className={myOrdersCssModule.tableHeaders}>Price</th>
                      <th className={myOrdersCssModule.tableHeaders}>Quantity</th>
                      <th className={myOrdersCssModule.tableHeaders}>Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {elem.orderItems.map((order, i) => (
                      <tr key={i} className={myOrdersCssModule.tableRow}>
                        <td className={myOrdersCssModule.tableData}>{order.elm.name}</td>
                        <td className={myOrdersCssModule.tableData}>
                          ₹ {order.elm.price}
                        </td>
                        <td className={myOrdersCssModule.tableData}>{order.quantity}</td>
                        <td className={myOrdersCssModule.tableData}>
                          ₹ {order.quantity * order.elm.price}
                        </td>
                      </tr>
                    ))}
                    <tr className={myOrdersCssModule.tableRow}>
                      <td></td><td></td><td></td>
                      <td className={myOrdersCssModule.tableData}>
                        ₹ {elem.totalPrice}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default MyOrders;
