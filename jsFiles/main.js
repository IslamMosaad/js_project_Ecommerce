function cl(x) {console.log(x)}


//#region products

let productsContainer=document.getElementById("productsContainer");
let products;
async function getdata(category="") {
    let filter =(category=="")? "" : `?category=${category}`
let url=`https://productsapi-sigma.vercel.app/products${filter}`;

        let response =await fetch(url);
        products= await response.json();
        productsContainer.innerHTML="";
   //#region building cards
    for (let i = 0; i< products.length;i++) {
 
  
    let newCard =`<div class="card reveal">
    <div class="img-container">
      <img  src="${products[i].image}" alt="Product image">
      <div class="overlay">
        <h3 class="name">${products[i].name}</h3>
        <p class="price">$${products[i].price}</p>
        <button onclick="addToCart(${products[i].id})" class="add-to-cart">Add to cart <i class="fa-solid fa-cart-shopping "></i></button>
        <button onclick="openProductDetails(${products[i].id})" class="details">Details</button>
      </div>
    </div>
  </div>`;
  productsContainer.innerHTML+=newCard;
  
}
//#endregion

getimgs();
}
getdata();


//#endregion


//#region Native Slider
let slider = document.querySelector(".NativeSlider");
let leftArrow = document.querySelector(".arrow-left");
let rightArrow = document.querySelector(".arrow-right");
let myImgs;

let i = 0;

// getting images from api

function AddimageToContainer(_src){
    let img=document.createElement("img");
    img.src=_src;
    slider.appendChild(img);
}

 function getimgs(){
let length=(products.length>5)? 7 : products.length;
for (let i = 0; i< length;i++) {
    if(i==4)continue;
    AddimageToContainer(products[i].image);
}

myImgs=slider.querySelectorAll("img");
myImgs[0].style.display="block";
}



/// implementing slider



leftArrow.addEventListener("click", function () {
    myImgs[i].style.display="none";
    i--;
    i=(i==-1)? myImgs.length-1 : i % myImgs.length;
    myImgs[i].style.display="block"; 

});

rightArrow.addEventListener("click", function () {
    myImgs[i].style.display="none";
    i++;
    i= i % myImgs.length;
    myImgs[i].style.display="block"; 
});


//#endregion


//#region cart
let numberOfProductsInCart=document.getElementById("numberOfProductsInCart");
let productsCounter=Number(sessionStorage.getItem("productsCounter")) || 0;
numberOfProductsInCart.textContent=productsCounter;

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

async function addToCart(id){
    if(!checkElementINCart(id)){
        productsCounter++;
        sessionStorage.setItem("productsCounter",productsCounter);
        numberOfProductsInCart.textContent=productsCounter;
    }
   let response =await fetch(`https://productsapi-sigma.vercel.app/products/?id=${id}`);
   let products= await response.json();
   let product=products[0]

 sessionStorage.setItem(`cartProduct${id}`,JSON.stringify(product));
 sessionStorage.setItem(`quantity${id}`,1);
}


 function openProductDetails(id){
   sessionStorage.setItem("productID",id);
   window.open("Details.html","_self");
}
//#endregion


//#region filter
document.addEventListener("DOMContentLoaded", function() {
    let filterContainer = document.getElementById("filterContainer");
        filterContainer.addEventListener("click", function(e) {
            if(e.target.name === "btnradio") {
                let category = (e.target.id==="All")? "" : e.target.id;
                getdata(category);
            }
        });
  
});
//#endregion


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


/////-
function reveal() {
    var reveals = document.querySelectorAll(".reveal");

    for (var i = 0; i < reveals.length; i++) {
      var windowHeight = window.innerHeight;
      var elementTop = reveals[i].getBoundingClientRect().top;
      var elementVisible = 150;
  
      if (elementTop < windowHeight - elementVisible) {
        reveals[i].classList.add("active");
      } else {
        reveals[i].classList.remove("active");
      }
    }
  }
  
  window.addEventListener("scroll", reveal);
