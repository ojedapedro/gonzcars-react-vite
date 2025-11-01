import { useContext, useState } from "react";
import { AuthContext } from "../auth/AuthProvider";
import { createOrder } from "../api/gsheetApi";

export default function Cart() {
  const { user } = useContext(AuthContext);
  const [cart] = useState([{ id: "P0001", qty: 2 }]);
  const [loading, setLoading] = useState(false);

  async function handleCheckout() {
    setLoading(true);
    const res = await createOrder({
      seller_id: user.seller_id,
      seller_email: user.email,
      customer_name: "Cliente Ejemplo",
      customer_phone: "999999999",
      items: cart,
      notes: "Pedido desde catálogo",
    });
    setLoading(false);
    if (res.ok) {
      window.open(res.order.pdf_url, "_blank");
    } else {
      alert("Error: " + res.error);
    }
  }

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-2">Carrito</h2>
      <button
        onClick={handleCheckout}
        disabled={loading}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        {loading ? "Procesando..." : "Generar pedido"}
      </button>
    </div>
  );
}
