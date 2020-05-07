const token = window.localStorage.getItem('token');

async function getProducts(token) {
  return response = await fetch(`https://student-store.travisshears.xyz/store/${token}`, {
    method: 'GET'
  });
}

getProducts(token).then(response => response.json())
  .then((data) => {
    console.log(data);
    goods = data.products;
    renderPage(goods);
  })
  .catch((error) => {
    console.error('Error:', error);
  });

// 😀

const goodsListEl = document.querySelector('.js-product-list');
const cartSnippetEl = document.querySelector('.menu__navbar-right__cart-snippet');
const badgeEl = cartSnippetEl.querySelector('.menu__navbar-right__cart-snippet__badge');
const cartEl = document.querySelector('.cart');
const cartListEl = cartEl.querySelector('.js-cart__list');
const closeCartEl = cartEl.querySelector('.cart__close');
const cartAmountEl = cartEl.querySelector('.cart__price');
const cartCheckoutBtnEl = cartEl.querySelector('.cart__checkout__button');
let amount = 0;
let goods = [];
let goodsInCart = [];

function makeProductCard(product) {
  return `
    <div class="js-product-card ${product.sku}">
      <figure>
        <img src="${product.extra_data.image}" alt="${product.title}">
        <button class="js-product-card__cart-button plus" ${isNull(product.stock) ? 'disabled' : ''}></button>
      </figure>
      <span class="js-product-card__brand">${product.extra_data.brand}</span>${checkStock(product.stock).outerHTML}
      <h3 id="item-one">${product.extra_data.type}<br>${product.title}</h3>
      <p>$ ${product.price}</p>
      <div class="js-product-card__specification">
        <h4>Specs</h4>
        <p>Terrain: ${product.extra_data.specification.terrain.join(', ')}</p>
        <p>Rocker Type: ${product.extra_data.specification.rockerType}</p>
        <p>Flex Rating: ${product.extra_data.specification.flexRating}</p>
      </div>
    </div>
  `;
}

function isNull(stock) {
  if (stock == 0) return;
  else return false;
}

function checkStock(stock) {
  const stockEl = document.createElement('span');
  stockEl.classList.add('js-product-card__stock');
  if (stock <= 3) {
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

function makeProductCardInCart(product) {
  const productCardEl = document.createElement('div');
  productCardEl.classList.add('js-cart__list__item');
  productCardEl.innerHTML = `
    <hr>
    <img src="${product.extra_data.image}" alt="${product.title}">
    <div class="js-cart__list__info">
      <h4>${product.extra_data.brand} ${product.extra_data.type}</h4>
      <span>${product.title}</span><br>
      <span>Price: $ ${product.price}</span>
    </div>
  `; // <button class="js-cart__list__item__delete">delete</button>
  return productCardEl;
}

function displayProduct(product) {
  const productItemEl = document.createElement('li');
  productItemEl.innerHTML = makeProductCard(product);
  goodsListEl.appendChild(productItemEl);
  const addToCartBtnEl = productItemEl.querySelector('.js-product-card__cart-button');
  addToCartBtnEl.addEventListener('click', () => {
    if (addToCartBtnEl.classList.contains('plus')) {
      goodsInCart.push(product);
      amount += product.price;
    } else if (addToCartBtnEl.classList.contains('minus')) {
      goodsInCart.splice(goodsInCart.indexOf(product), 1);
      amount -= product.price;
    }
    badgeEl.textContent = goodsInCart.length;
    addToCartBtnEl.classList.toggle('plus');
    addToCartBtnEl.classList.toggle('minus');
  });
}

function toggleVisible(element) {
  element.classList.toggle('hidden');
}

function renderPage(goods) {
  goods.forEach(displayProduct);
  cartSnippetEl.addEventListener('click', event => {
    event.preventDefault();
    if (goodsInCart.length == 0) return;
    cartListEl.innerHTML = '';
    goodsInCart.forEach(good => {
      cartListEl.appendChild(makeProductCardInCart(good));
      // const deleteBtnEl = cartEl.querySelector('.js-cart__list__item__delete');
      // deleteBtnEl.addEventListener('click', event => {
      //   console.log(event.target.parentNode);
      //   const delEl = event.target.parentNode;
      //   cartListEl.removeChild(delEl);
      // });
    });
    cartAmountEl.textContent = goodsInCart.reduce((total, product) => {
      return total + product.price;
    }, 0);
    toggleVisible(cartEl);
  });
  closeCartEl.addEventListener('click', () => toggleVisible(cartEl));
}

function renderStock(good) {
  const goodItemEl = document.querySelector(`.${good.sku}`);
  goodItemEl.querySelector('.js-product-card__cart-button').disabled = isNull(good.stock);
  goodItemEl.querySelector('.js-product-card__brand').nextElementSibling = checkStock(good.stock).outerHTML;
}

async function deleteFromStock(token, sku) {
  return response = await fetch(`https://student-store.travisshears.xyz/buy/${sku}?token=${token}`, {
    method: 'GET'
  });
}

function buyProducts(goodsInCart) {
  goodsInCart.forEach(good => {
    deleteFromStock(token, good.sku).then(response => response.json())
      .then((data) => {
        console.log(data);
        renderStock(good);
        goodsInCart = []; // put '+' on all buttons
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }); 
}

cartCheckoutBtnEl.addEventListener('click', () => {
  buyProducts(goodsInCart);
  toggleVisible(cartEl);
});