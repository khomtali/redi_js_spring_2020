let goodsInCart = [];
const products = [
  {
    name: 'Iphone',
    price: 900
  },
  {
    name: 'Nintend DS',
    price: 1200
  },
  {
    name: 'MacBook Air',
    price: 3200
  }
];
const productList = document.querySelector('.js-product-list');

function makeProductCard(product) {
  const productCardEl = document.createElement('div');
  productCardEl.innerHTML = `
    <span>${product.name}</span><br>
    <span>Price: ${product.price} €</span>
  `;
  return productCardEl;
}

products.forEach(product => {
  const productCardEl = makeProductCard(product);
  productCardEl.innerHTML += '<button>Add to shopping cart</button>';
  const cartBtnEl = productCardEl.querySelector('button');
  cartBtnEl.addEventListener('click', () => {
    goodsInCart.push(product);
  });
  productList.appendChild(productCardEl);
});

const shoppingCartEl = document.querySelector('#js-shopping-cart');
document.querySelector('#show-shopping-cart').addEventListener('click', () => {
  shoppingCartEl.innerHTML = '';
  goodsInCart.forEach(product => {
    const productCardEl = makeProductCard(product);
    shoppingCartEl.appendChild(productCardEl);
  });
});

document.querySelector('#total-price').addEventListener('click', () => {
  const totalPrice = goodsInCart.reduce((total, product) => {
    return total + product.price;
  }, 0);
  document.querySelector('#js-total').innerHTML = `${totalPrice} Euro`;
});

document.querySelector('#iphone-price').addEventListener('click', () => {
  const totalPrice = goodsInCart.reduce((total, product) => {
    if (product.name == 'Iphone') return total + product.price;
    return total;
  }, 0);
  document.querySelector('#js-iphone-total').innerHTML = `${totalPrice} Euro`;
});

let iterator;
document.querySelector('#create').addEventListener('click', () => {
  iterator = goodsInCart.values();
});
document.querySelector('#next').addEventListener('click', () => console.log(iterator.next().value));
