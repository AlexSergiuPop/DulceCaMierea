import { http } from "./http.js";
import { ui } from "./ui.js";

document.addEventListener("DOMContentLoaded", getProducts);

function getProducts() {
  http
    .get("https://61363d1c8700c50017ef54c9.mockapi.io/products")
    .then((data) => ui.showProducts(data));
}

document
  .getElementById("btn-add-product")
  .addEventListener("click", addNewProduct);

let product;

function addNewProduct() {
  const nameValue = document.getElementById("name").value;
  const pictureValue = document.getElementById("picture").value;
  const priceValue = document.getElementById("price").value;
  const descriptionValue = document.getElementById("description").value;
  const stockValue = document.getElementById("stock").value;
  const currencyValue = document.getElementById("currency").value;

  product = {
    name: nameValue,
    picture: pictureValue,
    price: priceValue,
    description: descriptionValue,
    stock: stockValue,
    currency: currencyValue,
  };
  console.log(product);
  http
    .post("https://61363d1c8700c50017ef54c9.mockapi.io/products", product)
    .then(() => getProducts());
  // window.location.reload();
}

document.getElementById("available").addEventListener("click", deleteProduct);

let id;

function deleteProduct(e) {
  id = e.target.getAttribute("id");
  if (e.target.classList.contains("delete")) {
    http
      .delete(`https://61363d1c8700c50017ef54c9.mockapi.io/products/${id}`)
      .then((data) => getProducts(data))
      .catch("Error on delete!");
    id = "";
  }
  // window.location.reload();
}
