import {
  addProductsInLocalStorage,
  updateQuantityInLocalStorage,
  getElementFromLocalStorage,
  removeElementFromLocalStorage,
} from "./localStorage.js";

class UI {
  constructor() {
    this.productsContainer = document.getElementById("products");
    this.detailsContainer = document.getElementById("details");
    this.adminContainer = document.getElementById("available");
    this.cartContainer = document.getElementById("cart-body");
    this.name = document.getElementById("name");
    this.picture = document.getElementById("picture");
    this.description = document.getElementById("description");
    this.stock = document.getElementById("stock");
    this.currency = document.getElementById("currency");
    this.id = document.getElementById("id");
    this.quantity = document.getElementById("quantity");
  }

  showProducts(products) {
    let output = "";
    products.forEach((product) => {
      output += `
      <div class="products-each">
        <div class="product-img">
          <img src=${product.picture} class="prod-img" alt=${product.name}/>
        </div>
        <div class="products-card">
          <h1 class="product-name">${product.name}</h1>
          <p class="product-price">
            ${product.price}
            <span class="product-currency">${product.currency}</span>
          </p>
          <button
            onclick="window.location.href='details.html?id=${product.id}'"
            type="button"
            class="btn-details"
          >
            Detalii
          </button>
        </div>
      </div>`;
      this.productsContainer.innerHTML = output;
    });
  }
  showDetails(product) {
    let output = "";
    output += `
    <div class="detail-img">
      <img src=${product.picture} class="prod-img" alt=${product.name}/>
    </div>
    <div class="detail-card">
      <h1 class="detail-name">${product.name}</h1>
      <h2 class="detail-description">${product.description}</h2>
      <p class="detail-price">
        ${product.price}
        <span class="detail-currency">${product.currency}</span>
      </p>
      <p class="detail-stock">Numar produse pe stoc: <span>${product.stock}</span></p>
      <h2 class="bought-quantity">Alegeti cantitatea: <input id="quantity" type="number" value="1" min="1" max="100"></h2>
      <button id="btn-addtocart" type="button">Adauga in cos</button>
    </div>`;
    this.detailsContainer.innerHTML = output;

    let addProductToCart = document.getElementById("btn-addtocart");
    addProductToCart.addEventListener("click", () => {
      let count = parseInt(quantity.value);
      if (isNaN(count)) {
        count = 1;
      }
      addProductsInLocalStorage(product, count);
      Swal.fire({
        title: "Produsul a fost adăugat cu succes în coș!",
        showClass: {
          popup: "animate__animated animate__fadeInDown",
        },
        hideClass: {
          popup: "animate__animated animate__fadeOutUp",
        },
      });
    });
  }
  showAdminProducts(products) {
    let output = "";
    products.forEach((product) => {
      output += `
      <div id="available-prod">
      <div class="admin-id">${product.id}</div>
      <div class="admin-picture"><img src="${product.picture}" alt="${product.name}"></div>
      <div class="admin-name">${product.name}</div>
      <div class="admin-stock">${product.stock}</div>
      <div class="admin-price">${product.price}</div>
      <div class="admin-currency">${product.currency}</div>
      <div class="admin-delete"><button class="btn-admdelete delete" id="${product.id}" type="button">Sterge</button></div>
      </div>
            `;
      this.adminContainer.innerHTML = output;
    });
  }
  showProductsCart(storageItems) {
    let output = "";
    storageItems.forEach((item) => {
      output = `
      <div class="cart-items">
      <div class="prod-picture"><img src="${item.product.picture}" alt="${
        item.product.name
      }"></div>
      <div class="prod-name">${item.product.name}</div>
      <div class="prod-available">${item.product.stock} buc</div>
      <div class="prod-ordered"><input class="final-quantity" value="${
        item.count
      }" type="number" min="1" max="50"> buc</div>
      <div class="prod-price">${item.product.price}</div>
      <div class="prod-totalprice">${item.product.price * item.count}</div>
      <div class="prod-delete"><button id=${
        item.product.id
      } class="btn-admdelete delete" onclick="btn-admdelete delete">Sterge</button></div>
      </div>
      `;
      this.cartContainer.innerHTML += output;
    });

    let inputFields = document.querySelectorAll("input");
    inputFields.forEach((inputElement) => {
      let row = inputElement.parentElement.parentElement;
      let removeButton = row.lastElementChild.firstElementChild;

      let productId = removeButton.id;
      inputElement.addEventListener("change", (e) => {
        let count = parseInt(e.target.value);
        if (!isNaN(count) && count > 0) {
          updateQuantityInLocalStorage(productId, count);
          return window.location.reload();
        } else {
          let storageElement = getElementFromLocalStorage(productId);
          e.target.value = storageElement.count;
        }
      });

      removeButton.addEventListener("click", (e) => {
        removeElementFromLocalStorage(e.target.id);
        row.remove();
        return window.location.reload();
      });
    });
  }
}
export const ui = new UI();
