// product-item.js

class ProductItem extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.loadDOMElements();
  }

  loadDOMElements() {
    this.attachShadow({ mode: 'open' });
    this.renderCartSize();

    const listElement = this.createListElement();
    
    this.createImageElement(listElement);
    this.createTitleElement(listElement);
    this.createPriceElement(listElement);
    this.createButtonElement(listElement);

    const styleElement = this.createStyles();

    this.shadowRoot.append(listElement, styleElement);
  }

  renderCartSize() {
    document.getElementById('cart-count').innerText = window.localStorage.getItem('cartSize');
  }

  createListElement() {
    const listElement = document.createElement('li')
    listElement.className = 'product';
    return listElement;
  }

  createImageElement(listElement) {
    const imgElement = listElement.appendChild(document.createElement('img'));
    imgElement.src = this.getAttribute('img');
    imgElement.width = 200;
    return imgElement;
  }

  createTitleElement(listElement) {
    const pTitleElement = listElement.appendChild(document.createElement('p'));
    pTitleElement.className = 'title';
    pTitleElement.textContent = this.getAttribute('title');
    return pTitleElement;
  }

  createPriceElement(listElement) {
    const pPriceElement = listElement.appendChild(document.createElement('p'));
    pPriceElement.className = 'price';
    pPriceElement.textContent = this.getAttribute('price');
    return pPriceElement;
  }

  createButtonElement(listElement) {
    const buttonElement = listElement.appendChild(document.createElement('button'));
    const hasCurrentItemInCart = window.localStorage.getItem(this.getAttribute('id')) === null ? false : true;
    buttonElement.textContent = hasCurrentItemInCart ? 'Remove from cart' : 'Add to cart';
    buttonElement.onclick = () => hasCurrentItemInCart ? this.removeCurrentItemFromCart(buttonElement) : this.addCurrentItemToCart(buttonElement);
    return buttonElement;
  }

  addCurrentItemToCart(buttonElement) {
    window.localStorage.setItem(this.getAttribute('id'), true);
    this.incrementCartSize();
    alert('Added to Cart!');
    buttonElement.textContent = 'Remove from cart';
    buttonElement.onclick = () => this.removeCurrentItemFromCart(buttonElement);
  }

  removeCurrentItemFromCart(buttonElement) {
    window.localStorage.removeItem(this.getAttribute('id'));
    this.decrementCartSize();
    alert('Removed from cart!');
    buttonElement.textContent = 'Add to cart';
    buttonElement.onclick = () => this.addCurrentItemToCart(buttonElement);
  }

  incrementCartSize() {
    window.localStorage.setItem('cartSize', Number(window.localStorage.getItem('cartSize')) + 1);
    this.renderCartSize();
  }

  decrementCartSize() {
    window.localStorage.setItem('cartSize', Number(window.localStorage.getItem('cartSize')) - 1);
    this.renderCartSize();
  }

  createStyles() {
    const styleElement = document.createElement('link')
    styleElement.setAttribute('rel', 'stylesheet');
    styleElement.setAttribute('href', './styles/styles.css');
    return styleElement;
  }
}

customElements.define('product-item', ProductItem);