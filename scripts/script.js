// Script.js

window.addEventListener('DOMContentLoaded', async () => {
  if(!window.localStorage.getItem('products')) {
    const productResponse = await fetch('https://fakestoreapi.com/products');
    const products = await productResponse.json();
    window.localStorage.setItem('products', JSON.stringify(products));
  }
  const products = JSON.parse(window.localStorage.getItem('products'));
  const productListElement = document.getElementById('product-list');

  products.forEach((product) => {
    const productElement = document.createElement('product-item');
    productElement.setAttribute('img', product.image);
    productElement.setAttribute('title', product.title);
    productElement.setAttribute('price', product.price);
    productListElement.appendChild(productElement);
  });

});