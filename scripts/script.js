// Script.js

window.addEventListener('DOMContentLoaded', async () => {
  if(!window.localStorage.getItem('products')) {
    const productResponse = await fetch('https://fakestoreapi.com/products');
    const products = await productResponse.json();
    window.localStorage.setItem('products', JSON.stringify(products));
  }

  if(!window.localStorage.getItem('cartSize')) {
    window.localStorage.setItem('cartSize', 0)
  }
  const products = JSON.parse(window.localStorage.getItem('products'));
  const productListElement = document.getElementById('product-list');

  products.forEach((product) => {
    const productElement = document.createElement('product-item');
    productElement.setAttribute('id', product.id);
    productElement.setAttribute('img', product.image);
    productElement.setAttribute('title', product.title);
    productElement.setAttribute('price', product.price);
    productListElement.appendChild(productElement);
  });

});