const BASE = "https://script.google.com/macros/s/YOUR_DEPLOY_ID/exec";
const API_KEY = "YOUR_API_KEY";

export async function auth(email: string, password: string) {
  const res = await fetch(BASE, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ path: "auth", email, password }),
  });
  return res.json();
}

export async function getProducts() {
  const res = await fetch(`${BASE}?path=products&x-api-key=${API_KEY}`);
  return res.json();
}

export async function createOrder(payload: any) {
  const res = await fetch(BASE, {
    method: "POST",
    headers: { "Content-Type": "application/json", "x-api-key": API_KEY },
    body: JSON.stringify({ path: "createOrder", ...payload }),
  });
  return res.json();
}

export async function getOrdersBySeller(seller_id: string) {
  const res = await fetch(`${BASE}?path=orders&seller_id=${seller_id}&x-api-key=${API_KEY}`);
  return res.json();
}
