//Get the elements from the page
const productsCont = document.querySelector('.productsContainer');
const bucket = document.querySelector('.cart-img');
const cartBag = document.querySelector('.cart-bag');
const xmark = document.querySelector('.xmark');
const form = document.querySelector('.footer__btn-container');
const input = document.querySelector('.input');
const inputSubs = document.querySelector('.footer__input');
const btnSearch = document.querySelector('.btn');
const btnSubs = document.querySelector('.btn-subscribe')

//Press Enter = Press Button
input.addEventListener('keypress', (e) => {
  if (e.keyCode === 13) {
    btnSearch.click();
  }
});

//validation

function removeError(inputSubs) {
  const parent = inputSubs.parentNode;

  if (parent.classList.contains('error')) {
    parent.querySelector('.error-label').remove();
    parent.classList.remove('error');
  }
}

function createError(inputSubs, text) {
  const parent = inputSubs.parentNode;
  const errorLabel = document.createElement('label')

  errorLabel.classList.add('error-label')
  errorLabel.textContent = text

  parent.classList.add('error');
  parent.append(errorLabel);
}

function validation(form) {
  let result = true;

  removeError(inputSubs);

  if (inputSubs.dataset.minLength) {
    if (inputSubs.value.length < inputSubs.dataset.minLength) {
      removeError(inputSubs);
      createError(inputSubs, `Min number of symbols: ${inputSubs.dataset.minLength}`)
      result = false;
    }
  }

  if (inputSubs.value === '') {
    removeError(inputSubs);
    createError(inputSubs, 'Field is empty');
    result = false;
  } else {}

  return result
};

form.addEventListener('submit', (event) => {
  event.preventDefault();
  if (validation(this) === true) {
    alert('Success!');
  }
})


// Cart open/close
bucket.addEventListener('click', () => {
  cartBag.classList.add('cart-bag_active');
})

xmark.addEventListener('click', () => {
  cartBag.classList.remove('cart-bag_active');
})

// Add products into the cart
window.addEventListener('click', (event) => {
  if (event.target.hasAttribute('data-cart')) {
    const product = event.target.closest('.card');
    const productInfo = {
      id: product.dataset.id,
      imgSrc: product.querySelector('.card__image').getAttribute('src'),
      title: product.querySelector('.card__title').innerText,
      price: product.querySelector('.card__price').innerText,
    };

    console.log(productInfo);

    //is there a product in the cart - verification
    const itemInCart = productsCont.querySelector(`[data-id="${productInfo.id}"]`);

    // if there is a product in the cart
    if (itemInCart) {
    } else {
      // If there is no such a product in the cart
      
    const productItemHTML = `<div class="product bag" data-id="${productInfo.id}">
    <img class="product__img bag-img" src="${productInfo.imgSrc}" alt="${productInfo.title}">
    <div class="product__description bag-description">
      <p class="product__text bag-text">${productInfo.title}</p>
      <div class="product__price bag-price">${productInfo.price}</div>
      <p class="product__price bag-remove">remove</p>
    </div>
  </div>`;
      
      productsCont.insertAdjacentHTML('beforeend', productItemHTML);
    }

    //Calculation of total price of all items in the cart
    calcCartPrice();
  }
});

// Deleting an element from the cart
window.addEventListener('click', (event) => {
  if (event.target.closest('.bag-remove')) {
    event.target.closest('.product').remove();
    //calculating the total price
    calcCartPrice();
  }
});

// Deleting all elements from the cart
const checkout = document.querySelector('.featured__btn');
checkout.addEventListener('click', () => {
  productsCont.innerHTML = '';
  //calculating the total price
  calcCartPrice();
});

// Caclucating Products in the cart
function calcCartPrice() {
  const cartItems = document.querySelectorAll('.bag');
  const total = document.querySelector('.total');

  let totalPrice = 0;

  cartItems.forEach(function (item) {

    const priceEl = item.querySelector('.product__price');

    const currentPrice = parseInt(priceEl.innerText)
    totalPrice += currentPrice;
  });

  //render the total price
  total.innerText = `Total : ${totalPrice}`;
};