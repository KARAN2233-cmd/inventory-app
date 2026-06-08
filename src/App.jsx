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
  <div className="container">

    <h1>📦 Inventory Dashboard</h1>

    <div className="cards">

      <div className="card">
        <h3>Total Orders</h3>
        <p>{orders.length}</p>
      </div>

      <div className="card">
        <h3>Pending</h3>
        <p>
          {
            orders.filter(
              o => o.Status === "Pending"
            ).length
          }
        </p>
      </div>

    </div>

    <div className="form">

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

      <button onClick={submitOrder}>
        Save Order
      </button>

    </div>

    <table>

      <thead>
        <tr>
          <th>Customer</th>
          <th>Product</th>
          <th>Status</th>
        </tr>
      </thead>

      <tbody>

      {orders.map((order,index)=>(

        <tr key={index}>
          <td>{order.CustomerName}</td>
          <td>{order.Product}</td>
          <td>{order.Status}</td>
        </tr>

      ))}

      </tbody>

    </table>

  </div>
);
