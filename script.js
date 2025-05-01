document.addEventListener('DOMContentLoaded', () => {
    const pizzas = [
      { name: "Сырный цыплёнок", price_from: 770, category: "Мясные" },
      { name: "Креветки по-азиатски", price_from: 290, category: "Морепродукты" },
      { name: "Чизбургер-пицца", price_from: 350, category: "Гриль" },
      { name: "Пепперони", price_from: 450, category: "Мясные" },
      { name: "Вегетарианская", price_from: 390, category: "Вегетарианская" },
      { name: "Острая курица", price_from: 500, category: "Острые" }
    ];
  
    let filteredPizzas = pizzas;
  
    const allPizzasContainer = document.getElementById('all-pizzas');
    const sortSelect = document.querySelector('select');
    const filterButtons = document.querySelectorAll('.div2 .button, .div2 .button3');
  
    function renderPizzas(pizzaArray) {
      allPizzasContainer.innerHTML = '';
      pizzaArray.forEach(pizza => {
        const card = document.createElement('div');
        card.className = 'pizza-card';
        card.innerHTML = `
          <img src="img/image 2.png" alt="${pizza.name}" class="pizza-image" />
          <div class="pizza-name">${pizza.name}</div>
          <table>
            <tr><th>Тонкое</th><th>Традиционное</th></tr>
            <tr><td>26 см.</td><td>30 см. 40 см.</td></tr>
          </table>
          <div class="price">От ${pizza.price_from} ₽</div>
          <button class="add-btn" data-name="${pizza.name}" data-price="${pizza.price_from}">+ Добавить</button>
        `;
        const addButton = card.querySelector('.add-btn');
        addButton.addEventListener('click', () => {
          let cart = JSON.parse(localStorage.getItem('cart')) || [];
          const existing = cart.find(p => p.name === pizza.name);
          if (existing) {
            existing.quantity += 1;
          } else {
            cart.push({ name: pizza.name, price: pizza.price_from, quantity: 1 });
          }
          localStorage.setItem('cart', JSON.stringify(cart));
          updateCartCount();
        });
        allPizzasContainer.appendChild(card);
      });
    }
  
    function updateCartCount() {
      const cart = JSON.parse(localStorage.getItem('cart')) || [];
      const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
      const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
      document.querySelector('.button1').textContent = `${totalPrice} ₽`;
      document.querySelector('.button2').innerHTML = `<img src="img/iconfinder_shopping-cart_2561279 1.svg" alt="">${totalItems}`;
    }
  
    sortSelect.addEventListener('change', () => {
      const value = sortSelect.value;
      if (value === "По цене") {
        filteredPizzas.sort((a, b) => a.price_from - b.price_from);
      } else if (value === "По алфавиту") {
        filteredPizzas.sort((a, b) => a.name.localeCompare(b.name));
      }
      renderPizzas(filteredPizzas);
    });
  
    filterButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        const category = btn.textContent.trim();
        filteredPizzas = category === "Все" ? pizzas : pizzas.filter(p => p.category === category);
        renderPizzas(filteredPizzas);
      });
    });
  
    renderPizzas(pizzas);
    updateCartCount();
  });
      