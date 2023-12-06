const products = [
  {
    productname: "Cropped Stay Groovy off white",
    productprice: 10.9,
    iamgea: "images/image1a.webp",
    imageb: "images/image1-b.webp",
    size: ["XL", "L", ""],
    quantity: 1,
  },
  {
    productname: "Basic Cactus White T-shirt",
    productprice: 13.25,
    iamgea: "images/image2a.webp",
    imageb: "images/image2b.webp",
    size: ["XL", "L", ""],
    quantity: 1,
  },
  {
    productname: "Skater Black Sweatshirt",
    productprice: 25.9,
    iamgea: "images/image3a.webp",
    imageb: "images/image3b.webp",
    size: ["XL", "L", "M"],
    quantity: 1,
  },
  {
    productname: "Black Tule Oversized",
    productprice: 29.45,
    iamgea: "images/image4a.webp",
    imageb: "images/image4b.webp",
    size: ["XL", "L", "XXL"],
    quantity: 1,
  },
  {
    productname: "Black Batman T-shirt",
    productprice: 10.0,
    iamgea: "images/image5a.webp",
    imageb: "images/image5b.webp",
    size: ["XL", "L", "ML"],
    quantity: 1,
  },
  {
    productname: "Blue T-Shirt",
    productprice: 9.0,
    iamgea: "images/image6a.webp",
    imageb: "images/image6b.webp",
    size: ["M", "L", "ML"],
    quantity: 1,
  },
  {
    productname: "Loose Black T-shirt",
    productprice: 14.0,
    iamgea: "images/image7a.webp",
    imageb: "images/image7b.webp",
    size: ["L", "XS", "S"],
    quantity: 1,
  },
];
let cartitemshowobj = [];
let totalprice = 0;
let cartnumber = document.getElementById("cartnumber");
let numberoncart = cartitemshowobj.length;
//showing product length
function showproductlength() {
  let productlength = document.getElementById("productlength");
  productlength.innerText = products.length;
}
// function to display all products
function showproducts(producttoshow) {
  producttoshow.forEach(myfunction);
  function myfunction(element, index) {
    let maindiv = document.querySelector(".maincontent");
    let div = document.createElement("div");
    div.className = "productdisplay";
    div.innerHTML = `
            <img src="${element.iamgea}" alt="" />
            <p class="productname">${element.productname}</p>
            <p class="productprice">$<b>${element.productprice}</b></p>
            <button class="aaddcart">Add to cart</button>`;
    maindiv.appendChild(div);
    let btnclick = document.getElementsByClassName("aaddcart")[index];
    btnclick.addEventListener("click", function () {
      totalprice = 0;
      btnclick.style.backgroundColor = "orange";

      console.log(element);
      cartitemshowobj.push(element);
      console.log(cartitemshowobj);

      cartnumber.style.display = "flex";
      numberoncart++;
      cartnumber.innerText = numberoncart;
      document.getElementById("cartitem").innerHTML = "";

      main();
      btnclick.disabled = true;
    });

    let productdisplayimg = document.querySelectorAll(".productdisplay");
    productdisplayimg.forEach((element, index) => {
      element.addEventListener("mouseenter", function () {
        let imgsrc = element.children[0];
        imgsrc.src = `${producttoshow[index].imageb}`;
      });
      element.addEventListener("mouseout", function () {
        let imgsrc = element.children[0];
        imgsrc.src = `${producttoshow[index].iamgea}`;
      });
    });
  }
  showproductlength();
}
showproducts(products);

// size wise displayong
let roundbttn = document.querySelectorAll(".roundbttn");
roundbttn.forEach((element, index) => {
  element.addEventListener("click", function () {
    let productsize = element.innerText;
    let maindiv = document.querySelector(".maincontent");
    maindiv.innerHTML = "";
    // console.log(products[index].size);
    // console.log(productsize);
    let searchResult = products.filter((name) => {
      if (name.size.includes(productsize)) {
        return true;
      } else {
        return false;
      }
    });
    console.log(searchResult);
    showproducts(searchResult);
    let productlength = document.getElementById("productlength");
    productlength.innerText = searchResult.length;
  });
});

// function to show cart nd close cart
let cart = document.getElementById("mycart");
cart.addEventListener("click", showcart);
function showcart() {
  document.querySelector(".cartitem").style.display = "flex";
}
function closecart() {
  document.querySelector(".cartitem").style.display = "none";
}
let billamount = document.getElementById("bill");
// function to show added product
function main() {
  for (let i = 0; i < cartitemshowobj.length; i++) {
    let showsddeditem = document.getElementById("cartitem");

    let div = document.createElement("div");
    totalprice += cartitemshowobj[i].productprice * cartitemshowobj[i].quantity;

    div.className = "addeditem";
    div.innerHTML = `<div class="itemimg">
      <img src="${cartitemshowobj[i].iamgea}" alt="" /></div>
        <div class="itemname">
          <h3>${cartitemshowobj[i].productname}</h3>
          <p>Quantity:<span id="itemstoadd">${cartitemshowobj[i].quantity}</span></p>
        </div>
        <div class="itemvalue">
          <p>$<span class="bill">${cartitemshowobj[i].productprice}</span></p>
          <div class="btnofplusminus">
            <button id="plusbtn${i}">+</button>
            <button id="minusbtn${i}">-</button>
            <button id="dltbtn${i}">dlt</button>
            
          </div>
        </div>`;

    showsddeditem.appendChild(div);

    let plusevent = document.getElementById(`plusbtn${i}`);
    plusevent.addEventListener("click", plusfunc);

    let minusevent = document.getElementById(`minusbtn${i}`);

    minusevent.addEventListener("click", minusfunc);

    let dltbtn = document.getElementById(`dltbtn${i}`);

    dltbtn.addEventListener("click", function () {
      cartitemshowobj.splice(i, 1);
      document.getElementById("cartitem").innerHTML = "";

      main();
      cartnumber.innerText = cartitemshowobj.length - 1;
    });
  }
  subtotal();
}

function subtotal() {
  let intvalue = Math.floor(totalprice);
  console.log(intvalue);
  billamount.innerText = intvalue;
  totalprice = 0;
}

function plusfunc(e) {
  let plusA = e.target.id;
  plusA = plusA.slice(7);
  plusA = Number(plusA);
  console.log(plusA);
  cartitemshowobj[plusA].quantity += 1;
  //   totalprice = cartitemshowobj[i].productprice - totalprice;

  document.getElementById("cartitem").innerHTML = "";
  main();
  numberoncart += 1;
  cartnumber.innerText = numberoncart;
}
function minusfunc(e) {
  let minusA = e.target.id;
  minusA = minusA.slice(8);
  minusA = Number(minusA);
  cartitemshowobj[minusA].quantity -= 1;

  if (cartitemshowobj[minusA].quantity < 1) {
    document.getElementById("minusbtn").disabled = true;
  }

  document.getElementById("cartitem").innerHTML = "";
  main();
  numberoncart -= 1;
  cartnumber.innerText = numberoncart;
}
