import { useEffect, useState } from "react";

const API_URL =
  "https://script.google.com/macros/s/AKfycbw49rOf_VJZInzMjowfG9xucxPu1CISGCePxT0bsW_RfdEfBYe5EF1EW0uwUiEFkPHmhw/exec";

export default function App() {

  const [orders, setOrders] = useState([]);

  const [form, setForm] = useState({
    customerName: "",
    product: "",
    quantity: ""
  });

  const loadOrders = async () => {
    const res = await fetch(API_URL);
    const data = await res.json();
    setOrders(data);
  };

  useEffect(() => {
    loadOrders();
  }, []);

  const submitOrder = async () => {

    await fetch(API_URL, {
      method: "POST",
      body: JSON.stringify(form)
    });

    loadOrders();

    setForm({
      customerName: "",
      product: "",
      quantity: ""
    });
  };

  return (
    <div style={{padding:"20px"}}>

      <h1>Inventory Orders</h1>

      <input
        placeholder="Customer"
        value={form.customerName}
        onChange={(e)=>
          setForm({
            ...form,
            customerName:e.target.value
          })
        }
      />

      <br/><br/>

      <input
        placeholder="Product"
        value={form.product}
        onChange={(e)=>
          setForm({
            ...form,
            product:e.target.value
          })
        }
      />

      <br/><br/>

      <input
        placeholder="Quantity"
        value={form.quantity}
        onChange={(e)=>
          setForm({
            ...form,
            quantity:e.target.value
          })
        }
      />

      <br/><br/>

      <button onClick={submitOrder}>
        Save Order
      </button>

      <hr/>

      {orders.map((order,index)=>(
        <div key={index}>
          <b>{order.CustomerName}</b>
          {" - "}
          {order.Product}
          {" - "}
          {order.Status}
        </div>
      ))}

    </div>
  );
}