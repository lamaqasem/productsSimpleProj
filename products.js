document.addEventListener("DOMContentLoaded", function () {
  const productsList = document.querySelector("#productLink");

  let products = [];

  getProducts();

  function getProducts() {
    fetch("https://dummyjson.com/products")
      .then(response => response.json())
      .then(data => {
        products = data.products;
        displayProducts();
      });
  }

  function displayProducts() {
    productsList.innerHTML = products
      .map(product => `<li class="product-item" data-id="${product.id}">${product.title} - $${product.price}</li>`)
      .join("");

    const productItems = document.querySelectorAll(".product-item");
    productItems.forEach(item => {
      item.addEventListener("click", function () {
        const productId = this.getAttribute("data-id");
        fetchProductDetails(productId);
      });
    });
  }

  function fetchProductDetails(id) {
    fetch(`https://dummyjson.com/products/${id}`)
      .then(response => response.json())
      .then(product => {
        displayProductDetails(product);
      });
  }

  function displayProductDetails(product) {
    productsList.innerHTML = `
      <h3>${product.title}</h3>
      <p><strong>Price:</strong> $${product.price}</p>
      <p><strong>Brand:</strong> ${product.brand}</p>
      <p><strong>Category:</strong> ${product.category}</p>
      <p><strong>Description:</strong> ${product.description}</p>
      <img src="${product.thumbnail}" alt="${product.title}" style="width:200px;"/>
      <button id="backBtn">Back to Products</button>
    `;

    document.querySelector("#backBtn").addEventListener("click", function () {
      displayProducts();
    });
  }
});
