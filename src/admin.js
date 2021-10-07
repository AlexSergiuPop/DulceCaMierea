import { http } from "./http.js";
import { ui } from "./ui.js";

const productsURL = "https://61363d1c8700c50017ef54c9.mockapi.io/products";

document.addEventListener("DOMContentLoaded", getProducts);

function getProducts() {
  http.get(productsURL).then((data) => ui.showAdminProducts(data));
}
