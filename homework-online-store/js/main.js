const goodsListEl = document.querySelector('.product-list');
const cartSnippetEl = document.querySelector('.menu__navbar-right__cart-snippet');
const badgeEl = cartSnippetEl.querySelector('.menu__navbar-right__cart-snippet__badge');
const cartEl = document.querySelector('.cart');
const cartListEl = cartEl.querySelector('.cart__list');
const closeCartEl = cartEl.querySelector('.cart__close');
const cartAmountEl = cartEl.querySelector('.cart__price');
const cartCheckoutBtnEl = cartEl.querySelector('.cart__checkout__button');
let amount = 0;
let goodsInCart = [];
let skuInCart = [];
const token = window.localStorage.getItem('token');

function makeProductCard(product) {
  return `
    <div class="product-card">
      <figure>
        <img src="${product.extra_data.image}" alt="${product.title}">
        <button class="product-card__cart-button plus" ${isNull(product.stock) ? 'disabled' : ''}></button>
      </figure>
      <span class="product-card__brand">${product.extra_data.brand}</span>${checkStock(product.stock).outerHTML}
      <h3 id="item-one">${product.extra_data.type}<br>${product.title}</h3>
      <p>$ ${product.price}</p>
      <div class="product-card__specification">
        <h4>Specs</h4>
        <p>Terrain: ${product.extra_data.specification.terrain.join(', ')}</p>
        <p>Rocker Type: ${product.extra_data.specification.rockerType}</p>
        <p>Flex Rating: ${product.extra_data.specification.flexRating}</p>
      </div>
    </div>
  `;
}

function makeProductCardInCart(product) {
  const productCardEl = document.createElement('div');
  productCardEl.classList.add('cart__list__item');
  productCardEl.innerHTML = `
    <hr>
    <img src="${product.extra_data.image}" alt="${product.title}">
    <div class="cart__list__info">
      <h4>${product.extra_data.brand} ${product.extra_data.type}</h4>
      <span>${product.title}</span><br>
      <span>Price: $ ${product.price}</span>
    </div>
  `;
  return productCardEl;
}

function checkStock(stock) {
  const stockEl = document.createElement('span');
  stockEl.classList.add('product-card__stock');
  if (stock < 4 && stock > 1) {
    stockEl.textContent = 'almost out of stock';
    stockEl.style.color = 'green';
  } else if (stock == 1) {
    stockEl.textContent = 'last chance';
    stockEl.style.color = 'orange';
  } else if (stock == 0) {
    stockEl.textContent = 'out of stock';
    stockEl.style.color = 'red';
  }
  return stockEl;
}

function isNull(stock) {
  if (stock == 0) return true;
}

function toggleVisible(element) {
  element.classList.toggle('hidden');
}

function togglePlusMinus(element) {
  element.classList.toggle('plus');
  element.classList.toggle('minus');
}

function displayProductCard(product) {
  const productItemEl = document.createElement('li');
  productItemEl.id = product.sku;
  productItemEl.innerHTML = makeProductCard(product);
  goodsListEl.appendChild(productItemEl);
  const addToCartBtnEl = productItemEl.querySelector('.product-card__cart-button');
  addToCartBtnEl.addEventListener('click', () => {
    if (addToCartBtnEl.classList.contains('plus'))
      goodsInCart.push(product);
    else if (addToCartBtnEl.classList.contains('minus'))
      goodsInCart.splice(goodsInCart.indexOf(product), 1);
    badgeEl.textContent = goodsInCart.length;
    togglePlusMinus(addToCartBtnEl);
  });
}

function updateProductCard(product) {
  const productItemEl = goodsListEl.querySelector(`#${product.sku}`);
  togglePlusMinus(productItemEl.querySelector('.product-card__cart-button'));
  renderStock(product);
}

function clearCart() {
  goodsInCart = [];
  badgeEl.textContent = 0;
  cartListEl.innerHTML = '';
  cartAmountEl.textContent = 0;
}

function renderPage(goods) {
  goods.forEach(displayProductCard);
  cartSnippetEl.addEventListener('click', event => {
    event.preventDefault();
    if (goodsInCart.length == 0) return;
    cartListEl.innerHTML = '';
    goodsInCart.forEach(good => {
      cartListEl.appendChild(makeProductCardInCart(good));
    });
    cartAmountEl.textContent = goodsInCart.reduce((total, product) => {
      return total + product.price;
    }, 0);
    toggleVisible(cartEl);
  });
  closeCartEl.addEventListener('click', () => toggleVisible(cartEl));
}

function renderStock(good) {
  const goodItemEl = document.querySelector(`#${good.sku}`);
  goodItemEl.querySelector('.product-card__cart-button').disabled = isNull(good.stock);
  goodItemEl.querySelector('.product-card__brand').nextElementSibling = checkStock(good.stock).outerHTML;
}

async function getProducts(token) {
  return await fetch(`https://student-store.travisshears.xyz/store/${token}`, {
    method: 'GET'
  });
}

async function deleteFromStock(token, sku) {
  return await fetch(`https://student-store.travisshears.xyz/buy/${sku}?token=${token}`, {
    method: 'POST'
  });
}

function buyProducts(goodsInCart) {
  goodsInCart.forEach(good => {
    deleteFromStock(token, good.sku)
      .then(response => response.json())
      .then((data) => {
        skuInCart.push(good.sku);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  });
  getProducts(token)
    .then(response => response.json())
    .then((data) => {
      console.log(data);
      data.products.forEach(product => {
        if (skuInCart.indexOf(product.sku) !== -1)
          updateProductCard(product);
      });
      skuInCart = [];
    })
    .catch((error) => {
      console.error('Error:', error);
    });
}

getProducts(token)
  .then(response => response.json())
  .then((data) => {
    console.log(data);
    renderPage(data.products);
  })
  .catch((error) => {
    console.error('Error:', error);
  });

cartCheckoutBtnEl.addEventListener('click', () => {
  buyProducts(goodsInCart);
  clearCart();
  toggleVisible(cartEl);
});