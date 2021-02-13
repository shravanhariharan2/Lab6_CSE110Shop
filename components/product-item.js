// product-item.js

class ProductItem extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.attachShadow({ mode: 'open' });

    const listElement = document.createElement('li')
    listElement.className = 'product';
    
    const imgElement = listElement.appendChild(document.createElement('img'));
    imgElement.src = this.getAttribute('img');
    imgElement.width = 200;

    const pTitleElement = listElement.appendChild(document.createElement('p'));
    const pPriceElement = listElement.appendChild(document.createElement('p'));
    pTitleElement.className = 'title';
    pPriceElement.className = 'price';
    pTitleElement.textContent = this.getAttribute('title'); 
    pPriceElement.textContent = this.getAttribute('price');

    const buttonElement = listElement.appendChild(document.createElement('button'));
    buttonElement.onclick = () => alert('Added to Cart!');
    buttonElement.textContent = 'Add to cart';

    const styleElement = document.createElement('link')
    styleElement.setAttribute('rel', 'stylesheet');
    styleElement.setAttribute('href', '/styles/styles.css');

    this.shadowRoot.append(listElement, styleElement);
  }
}

customElements.define('product-item', ProductItem);