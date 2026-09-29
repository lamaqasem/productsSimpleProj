document.addEventListener("DOMContentLoaded", function () {

  const categoriesList = document.querySelector("#categoriesList");
  const productsList = document.querySelector("#productLink");

  let categories = [];
  let products = [];

  getCategories();
  getProducts();

  function getCategories() {
    fetch("https://dummyjson.com/products/category-list")
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        categories = data;
        displayCategories();
      });
  }

  function displayCategories() {
    const result = categories
      .map(function (category) {
        return `<li>${category}</li>`;
      })
      .join("");

    categoriesList.innerHTML = result;
  }

  function getProducts() {
    fetch("https://dummyjson.com/products?limit=5")
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        products = data.products;
        displayProducts();
      });
  }

  function displayProducts() {
    const result = products
      .map(function (product) {
        return `<li>${product.title} - $${product.price}</li>`;
      })
      .join("");

    productsList.innerHTML = result;
  }

});
