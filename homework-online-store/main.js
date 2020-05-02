const burtonBoard = {
  title: 'Burton REWIND',
  brand: 'burton',
  image: './img/burton_rewind.jpg',
  price: 350,
  specification: {
    terrain: ['Freestyle', 'All-Mountain'],
    rockerType: 'Camber',
    flexRating: 'soft'
  }
};
const jonesBoard = {
  title: 'Jones AIRHEART',
  brand: 'jones',
  image: './img/jones_airheart.png',
  price: 526,
  specification: {
    terrain: ['Freestyle', 'All-Mountain'],
    rockerType: 'Rocker/Camber/Rocker',
    flexRating: 'stiff'
  }
};
const gnuBoard = {
  title: 'GNU KLASSY C2X',
  brand: 'gnu',
  image: './img/gnu.jpg',
  price: 406,
  specification: {
    terrain: ['Freeride', 'All-Mountain'],
    rockerType: 'Camber/Rocker/Camber',
    flexRating: 'medium'
  }
};
const roxyBoard = {
  title: 'Roxy TORAH C2',
  brand: 'roxy',
  image: './img/roxy.jpg',
  price: 444,
  specification: {
    terrain: ['Freestyle', 'All-Mountain'],
    rockerType: 'Camber/Rocker/Camber',
    flexRating: 'medium'
  }
};

const goods = [];
goods.push(burtonBoard, jonesBoard, gnuBoard, roxyBoard);
let goodsInCart = [];
const productsListEl = document.querySelector('.js-product-list');
const cartBtnEl = document.querySelector('.cart__products-button');
const totalBtnEl = document.querySelector('.cart__total-button');
const emptyBtnEl = document.querySelector('.cart__empty-button');
const goodsInCartListEl = document.querySelector('.cart__js-products');
const totalEl = document.querySelector('.cart__js-total');
let amount = 0;

function makeProductCard(product) {
  return `
    <div class="js-product-card">
      <img src="${product.image}" alt="${product.title}">
      <button class="js-product-card__cart-button"></button>
      <span class="js-product-card__brand">${product.brand}</span>
      <h3 id="item-one">Snowboard<br>${product.title}</h3>
      <p>$ ${product.price}</p>
      <div class="js-product-card__specification">
        <h4>Specs</h4>
        <p>Terrain: <span>${product.specification.terrain.join(', ')}</span></p>
        <p>Rocker Type: <span>${product.specification.rockerType}</span></p>
        <p>Flex Rating: <span>${product.specification.flexRating}</span></p>
      </div>
    </div>
  `;
}

function makeProductCardInCart(product) {
  const productCardEl = document.createElement('li');
  productCardEl.innerHTML = `
    <span>${product.title}</span><br>
    <span>Price: $ ${product.price}</span>
  `;
  return productCardEl;
}

function displayProduct(product) {
  const productItemEl = document.createElement('li');
  productItemEl.innerHTML = makeProductCard(product);
  productsListEl.appendChild(productItemEl);
  const addToCartBtnEl = productItemEl.querySelector('.js-product-card__cart-button');
  addToCartBtnEl.addEventListener('click', (event) => {
    goodsInCart.push(product);
    addToCartBtnEl.disabled = true;
    cartBtnEl.disabled = false;
    totalBtnEl.disabled = false;
    emptyBtnEl.disabled = false;
    amount += product.price;
  });
}

goods.forEach(displayProduct);
const addToCartBtnArray = productsListEl.querySelectorAll('button');

cartBtnEl.addEventListener('click', () => {
  goodsInCartListEl.innerHTML = '';
  goodsInCart.forEach(product => {
    const productCardEl = makeProductCardInCart(product);
    goodsInCartListEl.appendChild(productCardEl);
  });
});

totalBtnEl.addEventListener('click', () => {
  totalEl.innerHTML = `<hr>Total price: $ ${amount}`;
});

emptyBtnEl.addEventListener('click', () => {
  goodsInCart = [];
  goodsInCartListEl.innerHTML = '';
  totalEl.innerHTML = '';
  addToCartBtnArray.forEach(button => {
    button.disabled = false;
  });
  cartBtnEl.disabled = true;
  totalBtnEl.disabled = true;
  emptyBtnEl.disabled = true;
  amount = 0;
});
