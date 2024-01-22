const modal = document.querySelector(".modal");
const closeBtn = document.querySelector(".close-modal");
const overlay = document.querySelector(".overlay");
const productContainer = document.getElementById("productContainer");
const productImage = document.getElementById("productImage");
const productName = document.getElementById("productName");
const productDescription = document.getElementById("productDescription");

let cartItems = 0;

const openModal = function (productId) {
    const productCard = document.querySelector(`[data-product-id="${productId}"]`);
    const productCardRect = productCard.getBoundingClientRect();

    const top = window.pageYOffset + productCardRect.top + (productCardRect.height / 2);

    fetch(`https://fakestoreapi.com/products/${productId}`)
        .then(response => response.json())
        .then(data => {
            productImage.src = data.image;
            productDescription.textContent = data.description;
        });

    modal.style.top = `${top}px`;
    modal.classList.remove("hidden");
    overlay.classList.remove("hidden");

    window.scrollTo({
        top: top - (window.innerHeight / 2),
        behavior: 'smooth'
    });
}

const closeModal = function () {
    modal.classList.add("hidden");
    overlay.classList.add("hidden");
}

const addToCart = function () {
    alert("Product added to cart!");
}

const createProductCard = (productId, productName, productImageSrc, productPrice, productRating) => {
    const productCard = document.createElement("div");
    productCard.classList.add("product-card");
    productCard.setAttribute("data-product-id", productId);
    productCard.innerHTML = `
        <img class="product-photo" src="${productImageSrc}" alt="${productName}" width="200" height="200">
        <h2 class="product-name">${productName}</h2>
        <p class="product-price">$${productPrice}</p>
        <p class="product-rating">Rating: ${productRating}</p>
        <button class="view-product" onclick="openModal(${productId})">View Product</button>
    `;
    productContainer.appendChild(productCard);
};

fetch("https://fakestoreapi.com/products")
    .then(response => response.json())
    .then(products => {
        products.forEach(product => {
            createProductCard(product.id, product.title, product.image, product.price, product.rating.rate);
        });
    })
    .catch(error => console.error("Error fetching products:", error));

closeBtn.addEventListener("click", closeModal);
overlay.addEventListener("click", closeModal);

