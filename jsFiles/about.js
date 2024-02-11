let numberOfProductsInCart=document.getElementById("numberOfProductsInCart");
let productsCounter=Number(sessionStorage.getItem("productsCounter")) || 0;
numberOfProductsInCart.textContent=productsCounter;