document.addEventListener("DOMContentLoaded", function () {
  const categoriesLink = document.querySelector('a.link[href="./categories.html"]');
  const categoriesList = document.querySelector("#categoriesList");
  let categoriesData = null;

  categoriesLink.addEventListener("click", function (e) {
    e.preventDefault();

    if (categoriesData) {
      displayCategories(categoriesData);
    } else {
      fetch("https://dummyjson.com/products/category-list")
        .then(response => response.json())
        .then(data => {
          categoriesData = data;
          displayCategories(data);
        })
        .catch(err => console.error(err));
    }
  });

  function displayCategories(categories) {
    categoriesList.innerHTML = `
      <h3>Categories</h3>
      <ul>
        ${categories.map(cat => `<li class="category-item" data-category="${cat}">${cat}</li>`).join("")}
      </ul>
    `;

    document.querySelectorAll(".category-item").forEach(item => {
      item.addEventListener("click", function () {
        const categoryName = this.getAttribute("data-category");
        fetchProducts(categoryName);
      });
    });
  }

  function fetchProducts(category) {
    fetch(`https://dummyjson.com/products/category/${encodeURIComponent(category)}`)
      .then(response => response.json())
      .then(data => {
        displayProducts(data.products, category);
      })
      .catch(err => console.error(err));
  }

  function displayProducts(products, category) {
    categoriesList.innerHTML = `
      <h3>Products in ${category}</h3>
      <ul>
        ${products.map(p => `<li class="product-item" data-id="${p.id}">${p.title} - $${p.price}</li>`).join("")}
      </ul>
      <button id="backToCategories">Back to Categories</button>
    `;

    document.querySelectorAll(".product-item").forEach(item => {
      item.addEventListener("click", function () {
        const productId = this.getAttribute("data-id");
        fetchProductDetails(productId);
      });
    });

    document.querySelector("#backToCategories").addEventListener("click", function () {
      displayCategories(categoriesData);
    });
  }

  function fetchProductDetails(id) {
    fetch(`https://dummyjson.com/products/${id}`)
      .then(response => response.json())
      .then(product => {
        displayProductDetails(product);
      })
      .catch(err => console.error(err));
  }

  function displayProductDetails(product) {
    categoriesList.innerHTML = `
      <h3>${product.title}</h3>
      <p><strong>Price:</strong> $${product.price}</p>
      <p><strong>Brand:</strong> ${product.brand}</p>
      <p><strong>Category:</strong> ${product.category}</p>
      <p><strong>Description:</strong> ${product.description}</p>
      <img src="${product.thumbnail}" alt="${product.title}" style="width:200px;"/>
      <button id="backToProducts">Back to Products</button>
    `;

    document.querySelector("#backToProducts").addEventListener("click", function () {
      fetchProducts(product.category);
    });
  }
});
