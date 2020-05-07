const token = window.localStorage.getItem('token');
let goods = [];
fetch(`https://student-store.travisshears.xyz/store/${token}`, {
  method: 'GET'
})
  .then(response => response.json())
  .then((data) => {
    console.log(data);
    renderProducts(data.products);
  })
  .catch((error) => {
    console.error('Error:', error);
  });

// goods.push(burtonBoard, jonesAirheartBoard, gnuBoard, roxyBoard, jonesAviatorBoard);
// 😀
function renderProducts(goods) {
  let goodsInCart = [];
  const goodsListEl = document.querySelector('.js-product-list');
  const cartSnippetEl = document.querySelector('.menu__navbar-right__cart-snippet');
  const badgeEl = cartSnippetEl.querySelector('.menu__navbar-right__cart-snippet__badge');
  const cartEl = document.querySelector('.cart');
  const cartListEl = cartEl.querySelector('.js-cart__list');
  const closeCartEl = cartEl.querySelector('.cart__close');
  const cartAmountEl = cartEl.querySelector('.cart__price');
  let amount = 0;

  function makeProductCard(product) {
    return `
    <div class="js-product-card">
      <figure>
        <img src="${product.extra_data.image}" alt="${product.title}">
        <button class="js-product-card__cart-button plus"></button>
      </figure>
      <span class="js-product-card__brand">${product.extra_data.brand}</span>
      <h3 id="item-one">${product.extra_data.type}<br>${product.title}</h3>
      <p>$ ${product.price}</p>
      <div class="js-product-card__specification">
        <h4>Specs</h4>
        <p>Terrain: <span>${product.extra_data.specification.terrain.join(', ')}</span></p>
        <p>Rocker Type: <span>${product.extra_data.specification.rockerType}</span></p>
        <p>Flex Rating: <span>${product.extra_data.specification.flexRating}</span></p>
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
    <img src="${product.extra_data.image}" alt="${product.title}">
    <div class="js-cart__list__info">
      <h4>${product.extra_data.brand} ${product.extra_data.type}</h4>
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
}
