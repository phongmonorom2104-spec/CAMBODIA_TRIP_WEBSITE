const products = {
  "phnom-penh": {
    name: "Phnom Penh",
    price: 3.5,
    img: "https://i.pinimg.com/1200x/6f/d8/4c/6fd84c62d6e72f5067064f84f2874e22.jpg",
  },
  "siem-reap": {
    name: "Siem Reap",
    price: 10.5,
    img: "https://i.pinimg.com/1200x/5b/a2/ae/5ba2ae8012bb08db10695f6c084f5a66.jpg",
  },
  kampot: {
    name: "Kampot",
    price: 5.0,
    img: "https://cambodia-images.com/wp-content/uploads/2023/07/kampot-10-2-kep.jpg",
  },
};

const productBox = document.getElementById("productBox");

if (productBox) {
  const id = new URLSearchParams(window.location.search).get("id");
  const product = products[id];

  if (!product) {
    productBox.innerHTML = "<p class='text-danger'>Product not found.</p>";
  } else {
    productBox.innerHTML = `
      <img src="${product.img}" class="img-fluid mb-3">
      <h2>${product.name}</h2>
      <h4>$${product.price.toFixed(2)}</h4>
      <button class="btn btn-success" onclick="addToCart('${product.name}', ${product.price})">
        Add to Booking
      </button>
    `;
  }
}
