import { http } from "./http.js";
import { ui } from "./ui.js";

window.onload = () => {
  if (window.location.search !== "") {
    const id = window.location.search.split("=")[1];
    http
      .get(`https://61363d1c8700c50017ef54c9.mockapi.io/products/${id}`)
      .then((data) => ui.showDetails(data));
  }
};
