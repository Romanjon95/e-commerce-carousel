//Get the elements from the page
const ballSmall = document.querySelector('.little-ball');
const cloud = document.querySelector('.cloud');
const productsContainer = document.querySelector('.card-wrapper');
const products = document.querySelectorAll('.card-wrapper');
const nextBtn = document.querySelector('.next-btn');
const prevBtn = document.querySelector('.previous-btn');
const shop = document.querySelector('#shop-link');
const contacts = document.querySelector('#contacts-link');
const seeAll = document.querySelector('#button-grid');

//Buttons listeners
ballSmall.addEventListener('mouseover', () => {
  cloud.classList.remove('none');
});

ballSmall.addEventListener('mouseout', () => {
  cloud.classList.add('none');
});

//Press Enter = Press Button
input.addEventListener('keypress', (e) => {
  if (e.keyCode === 13) {
    btnSearch.click();
  }
});

//Carousel

products.forEach((item) => {
  let containerDimensions = item.getBoundingClientRect();
  let containerWidth = containerDimensions.width;

  nextBtn.addEventListener('click', () => {
    item.scrollLeft += containerWidth;
  })

  prevBtn.addEventListener('click', () => {
    item.scrollLeft -= containerWidth;
  })
})

//get an array

getArray();

async function getArray() {
  const response = await fetch('./cards.json');
  const productsArray = await response.json();
  console.log(productsArray);

  renderProducts(productsArray);
}

//Render products
function renderProducts(productsArray) {
  productsArray.forEach((item) => {
    const html = `
    <div class="card" data-id="${item.id}">
    <div class="card__img-content">
      <div class="card__img">
        <img class="card__image" src="./img/${item.imgSrc}">
      </div>
    </div>
    <div class="card__content">
      <div class="card__text-content">
        <p class="card__title">${item.title}</p>
        <img data-cart class="card__cart cart" src="./icons/free-icon-shopping-cart-5108212.png" alt="cart">
      </div>
      <p class="card__price price">${item.price}</p>
    </div>
  </div>`;
  productsContainer.insertAdjacentHTML('beforeend', html);
  });
}

//scroll to anchors
function scrollTo(el) {
  window.scroll({
    left: 0,
    top: el.offsetTop,
    behavior: 'smooth'
  })
}

const cards = document.querySelector('#cards');
const footer = document.querySelector('#footer');

btnSearch.addEventListener('click', () => {
  scrollTo(cards);
});

shop.addEventListener('click', () => {
  scrollTo(cards);
});

contacts.addEventListener('click', () => {
  scrollTo(footer);
});

seeAll.addEventListener('click', () => {
  scrollTo(cards);
});