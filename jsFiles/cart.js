function cl(x){console.log(x)}

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



function isProduct(key){
    let productRegex=/^cartProduct/;
    return productRegex.test(key);
}

function numOfpruductsInCart(){
    let counter = 0;
    for(let i = 0; i < sessionStorage.length; i++){
        let key = sessionStorage.key(i);
        if(isProduct(key)){
            counter++;
        }
    }
    return counter;
}


    

let cartItems=document.querySelector("#cartItems");

function loadCartProductsintoPage(){
    for(let i = 0; i < sessionStorage.length; i++){
        let key = sessionStorage.key(i);

        if(isProduct(key)){
            let product = JSON.parse(sessionStorage.getItem(key));
            let quantity =Number(sessionStorage.getItem(`quantity${product.id}`));

            cartItems.innerHTML += `<tr  id="${product.id}">
            <td><img src="${product.image}" alt="Product image" class="img-fluid" style="max-height: 100px;"></td>
            <td>${product.name}</td>
            <td name="price">$${product.price}</td>
            <td>
                <input name="quantity" type="number" class="form-control" step="1" max="1000" min="1" value="${quantity}" style="max-width: 70px">
            </td>
            <td class="totalPrice">$${Number(product.price) * quantity}</td>
            <td>
                <button name="removebtn" class="btn btn-danger">Remove</button>
            </td>
        </tr>`
        }

      }
}

let numberOfProductsInCart=document.getElementById("numberOfProductsInCart");
let productsCounter=Number(sessionStorage.getItem("productsCounter")) || 0;
numberOfProductsInCart.textContent=productsCounter;


document.getElementById("cartItems").addEventListener("change",function(e){
    if(e.target.name === "quantity"){
      let id=  e.target.parentElement.parentElement.id
      let row=cartItems.querySelector(`tr[id="${id}"]`);
     let quantity = row.querySelector("input[name=quantity]").value
     let price = Number(row.querySelector("td[name=price]").textContent.slice(1))
    row.querySelector(".totalPrice").textContent = `$${Math.round(price * quantity*100)/100}`;

    updataTotalCost();
    }})



document.getElementById("cartItems").addEventListener("click",function(e){
    if(e.target.name === "removebtn"){
        let id=  e.target.parentElement.parentElement.id
      let row=cartItems.querySelector(`tr[id="${id}"]`);
      sessionStorage.removeItem(`cartProduct${id}`);
      sessionStorage.removeItem(`quantity${id}`);
      row.remove();
      updataTotalCost();
      let productsCounter=Number(sessionStorage.getItem("productsCounter"));
      productsCounter--;
      sessionStorage.setItem("productsCounter",productsCounter);
      numberOfProductsInCart.textContent=productsCounter;
    }

})


function updataTotalCost(){
    let sum=0;
  let totalCostSpan=  document.getElementById("totalCost");
  document.querySelectorAll(".totalPrice").forEach(element => {sum+=Number(element.textContent.slice(1))})
  totalCostSpan.textContent=`$${Math.round(sum)}`;
}


loadCartProductsintoPage();
updataTotalCost();



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

