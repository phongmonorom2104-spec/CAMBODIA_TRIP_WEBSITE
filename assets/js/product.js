const BOOKING_STORAGE_KEY = "khmernessBookingCart";

function getCart() {
  try {
    const storedCart = localStorage.getItem(BOOKING_STORAGE_KEY);
    return storedCart ? JSON.parse(storedCart) : [];
  } catch (error) {
    console.error("Could not read booking cart:", error);
    return [];
  }
}

function saveCart(cart) {
  localStorage.setItem(BOOKING_STORAGE_KEY, JSON.stringify(cart));
}

function formatPrice(price) {
  return Number(price).toFixed(2);
}

function renderCart() {
  const cart = getCart();
  const cartCount = document.getElementById("cartCount");
  const cartItems = document.getElementById("cart-items");
  const totalElement = document.getElementById("total");

  if (cartCount) {
    const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = itemCount;
  }

  if (!cartItems || !totalElement) {
    return;
  }

  if (cart.length === 0) {
    cartItems.innerHTML =
      '<li class="list-group-item text-center text-muted">No bookings added yet.</li>';
    totalElement.textContent = "0.00";
    return;
  }

  let total = 0;
  cartItems.innerHTML = cart
    .map((item, index) => {
      const itemTotal = item.price * item.quantity;
      total += itemTotal;

      return `
        <li class="list-group-item d-flex justify-content-between align-items-start gap-3">
          <div>
            <div class="fw-bold">${item.name}</div>
            <small class="text-muted">$${formatPrice(item.price)} x ${item.quantity}</small>
          </div>
          <div class="text-end">
            <div>$${formatPrice(itemTotal)}</div>
            <button class="btn btn-sm btn-outline-danger mt-2" onclick="removeFromCart(${index})">
              Remove
            </button>
          </div>
        </li>
      `;
    })
    .join("");

  totalElement.textContent = formatPrice(total);
}

function addToCart(name, price) {
  const cart = getCart();
  const existingItem = cart.find((item) => item.name === name);

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({
      name,
      price: Number(price),
      quantity: 1,
    });
  }

  saveCart(cart);
  renderCart();
  alert(`${name} was added to your booking.`);
}

function buyNow(name, price) {
  const total = formatPrice(price);
  alert(`Total: $${total}\nThank you for buying ${name}!`);
}

function removeFromCart(index) {
  const cart = getCart();
  cart.splice(index, 1);
  saveCart(cart);
  renderCart();
}

function checkout() {
  const cart = getCart();

  if (cart.length === 0) {
    alert("Your booking is empty. Please add a package first.");
    return;
  }

  alert("Booking confirmed. Thank you!");
  localStorage.removeItem(BOOKING_STORAGE_KEY);
  renderCart();

  const bookingModalElement = document.getElementById("bookingModal");
  if (bookingModalElement && window.bootstrap?.Modal) {
    bootstrap.Modal.getInstance(bookingModalElement)?.hide();
  }
}

document.addEventListener("DOMContentLoaded", renderCart);
