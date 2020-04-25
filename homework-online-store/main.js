let burtonBoard = {
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
let jonesBoard = {
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
let gnuBoard = {
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
let roxyBoard = {
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
let goods = [];
goods.push(burtonBoard, jonesBoard, gnuBoard, roxyBoard);

const productsListEl = document.querySelector('.js-product-list');
const totalCount = document.querySelector('#cart__count');
const totalPrice = document.querySelector('#cart__total-price');
let count = 0, amount = 0;
function fillInInnerHTML(product) {
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
function displayProduct(product) {
  const productItemEl = document.createElement('li');
  productItemEl.innerHTML = fillInInnerHTML(product);
  productsListEl.appendChild(productItemEl);
  const addToCartEl = productItemEl.querySelector('.js-product-card__cart-button');
  addToCartEl.addEventListener('click', (event) => {
    count += 1;
    amount += product.price;
    console.log(amount);
    totalCount.innerHTML = count;
    totalPrice.innerHTML = amount;
  });
}

goods.forEach(displayProduct);