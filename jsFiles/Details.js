function cl(x){console.log(x)}

//#region Details

let details
async function loadDetailsintoPage(){
    let id=sessionStorage.getItem("productID");
    let filter =`?id=${id}`
    let url=`https://productsapi-sigma.vercel.app/products${filter}`;

        let response =await fetch(url);
        products= await response.json()

     details = products[0];
    document.querySelector("#productDetails img").src=details.image;
    document.querySelector("#productDetails h2").textContent=details.name;
    document.querySelector("#productDetails  p.brand").textContent=`Brand: ${details.brand}`;
    document.querySelector("#productDetails  p.Category").textContent=`Category: ${details.category}`;
    document.querySelector("#productDetails h3").textContent=`$${details.price}`;
    document.querySelector("#productDetails p.mb-4").textContent=`${details.description}`;
    
}

window.onload=loadDetailsintoPage;

//#endregion

//#region cart
let numberOfProductsInCart=document.getElementById("numberOfProductsInCart");
let productsCounter=Number(sessionStorage.getItem("productsCounter")) || 0;
numberOfProductsInCart.textContent=productsCounter;

let addbutton=document.getElementById("addbutton");
let quantityInput=document.getElementById("quantity");


addbutton.addEventListener("click",function(){
    let id = JSON.parse(sessionStorage.getItem("productID"));
    addToCart(id);
  
})

function checkElementINCart(id){
    for(let i = 0; i < sessionStorage.length; i++){
        let key = sessionStorage.key(i);
        let value = sessionStorage.getItem(key);
        if(key === `cartProduct${id}`){
            return true;
        }
      }
      return false;
}

function addToCart(id){
    if(!checkElementINCart(id)){
        productsCounter++;
    sessionStorage.setItem("productsCounter",productsCounter);
    numberOfProductsInCart.textContent=productsCounter;

    sessionStorage.setItem(`cartProduct${id}`,JSON.stringify(details));
    }
    sessionStorage.setItem(`quantity${id}`,quantityInput.value);
}

function removeProductFromCart(){
    productsCounter--;
    numberOfProductsInCart.textContent=productsCounter;
}

function openProductDetails(id){
   sessionStorage.setItem("product",JSON.stringify(products[id-1]));
   window.open("Details.html","_self");
}
//#endregion

document.getElementById("cartIcon").addEventListener("click",()=>window.open("cart.html","_self"));



//#region upArrow
let myUPArrow = document.getElementById("scroll-icon");


window.onscroll = function() {
    if (window.scrollY >= 300) {
        myUPArrow.style.display = "block";
      } else {
        myUPArrow.style.display = "none";
      }
};

myUPArrow.onclick = function() {
    window.scrollTo({left:0,top:0,behavior:'smooth'});
}
  
//#endregion

