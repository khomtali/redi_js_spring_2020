const burtonBoard = {
  type: 'Snowboard',
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
const jonesAirheartBoard = {
  type: 'Snowboard',
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
  type: 'Snowboard',
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
  type: 'Snowboard',
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
const jonesAviatorBoard = {
  type: 'Snowboard',
  title: 'Jones AVIATOR',
  brand: 'jones',
  image: './img/jones_aviator.png',
  price: 496,
  specification: {
    terrain: ['Carving', 'All-Mountain'],
    rockerType: 'Power Camber',
    flexRating: 'stiff'
  }
};

const goods = [];
goods.push(burtonBoard, jonesAirheartBoard, gnuBoard, roxyBoard, jonesAviatorBoard);
let goodsInCart = [];
const goodsListEl = document.querySelector('.js-product-list');
const cartSnippetEl = document.querySelector('.cart-snippet');
const badgeEl = cartSnippetEl.querySelector('.cart-snippet__badge');
const cartEl = document.querySelector('.cart');
const cartListEl = cartEl.querySelector('.js-cart__list');
const closeCartEl = cartEl.querySelector('.cart__close');
const cartAmountEl = cartEl.querySelector('.cart__price');
let amount = 0;

function makeProductCard(product) {
  return `
    <div class="js-product-card">
      <figure>
        <img src="${product.image}" alt="${product.title}">
        <button class="js-product-card__cart-button plus"></button>
      </figure>
      <span class="js-product-card__brand">${product.brand}</span>
      <h3 id="item-one">${product.type}<br>${product.title}</h3>
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

goods.forEach(displayProduct);

function makeProductCardInCart(product) {
  const productCardEl = document.createElement('div');
  productCardEl.classList.add('js-cart__list__item');
  productCardEl.innerHTML = `
    <hr>
    <img src="${product.image}" alt="${product.title}">
    <div class="js-cart__list__info">
      <h4>${product.brand} ${product.type}</h4>
      <span>${product.title}</span><br>
      <span>Price: $ ${product.price}</span>
    </div>
  `; // <button class="js-cart__list__item__delete">delete</button>
  return productCardEl;
}

function toggleVisible(element) {
  element.classList.toggle('hidden');
}

closeCartEl.addEventListener('click', () => toggleVisible(cartEl));
cartSnippetEl.addEventListener('click', event => {
  event.preventDefault();
  if(goodsInCart.length == 0) return;
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
