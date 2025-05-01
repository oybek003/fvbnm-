document.addEventListener('DOMContentLoaded', () => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartList = document.getElementById('cart-items');
    const totalSpan = document.getElementById('total-price');
    const orderSummary = document.getElementById('order-summary');
    const emptyCart = document.getElementById('empty-cart');
  
    if (cart.length > 0) {
      orderSummary.style.display = 'block';
      emptyCart.style.display = 'none';
      let total = 0;
  
      cart.forEach(item => {
        const li = document.createElement('li');
        li.textContent = `${item.name} — ${item.price} ₽ × ${item.quantity}`;
        total += item.price * item.quantity;
        cartList.appendChild(li);
      });
  
      totalSpan.textContent = total;
    } else {
      orderSummary.style.display = 'none';
      emptyCart.style.display = 'block';
    }
  });
  