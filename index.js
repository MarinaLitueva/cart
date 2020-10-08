//Глобальные переменные
const category = document.querySelector('#category');
const products = document.querySelector('#products');

const price = document.querySelector('#price-num');
const desc = document.querySelector('#descr');
const images = document.querySelector('#block-img');

const sectionCart = document.querySelector('#wrapper-card');
const cartWrap = document.querySelector('#cart');

let array = [];
let prodArr = [];

category.onchange = categoryChange;
products.onchange = productsChange;

fetch('products.json').then(function (response) {
  return response.json();
}).then(function (json) {
  
  array = json;

  json.forEach(element => {
    const option = document.createElement('option');
    option.textContent = element.name;
    category.append(option);
  });

}).catch(function (err) {
  console.log('Error: ' + err.message);
});


function categoryChange(e) {
  e.preventDefault();
  let categoryIndex = e.target.options.selectedIndex;
  if (categoryIndex === 0) {
    products.innerHTML = '';
    price.innerHTML = '';
    desc.innerHTML = '';
    images.src = 'images/' + "";
    ;
  } else {
    //заполнить поле выбора продукцией   
    prodArr = array[categoryIndex - 1].items;
    products.innerHTML = '';
    const option = document.createElement('option');
    option.textContent = '-';
    products.append(option);

    prodArr.forEach(element => {
      console.log(element.name)
      const option = document.createElement('option');
      option.textContent = element.name;
      products.append(option);
    });
  }
}

function productsChange(e) {
  e.preventDefault();
  let productIndex = e.target.options.selectedIndex;
   
  if (productIndex === 0) {
    price.innerHTML = '';
    desc.innerHTML = '';
    images.src = 'images/' + "";

  } else {
    let prodItem = prodArr[productIndex - 1];
    price.textContent = prodItem.price;
    desc.textContent = prodItem.desc;
    images.append(prodItem.img);
    images.src = 'images/' + prodItem.img;
  }
}

//Корзина

let cart = [];

let btn = document.querySelector('#btn');
btn.addEventListener('click', function(e) {
  e.preventDefault();
  let productIndex = products.selectedIndex;
  if (productIndex != 0) {
    let amount = document.getElementById('input').value;//данные в инпуте

    //создаем объект в корзине
    let prodObj = {
      "prod": prodArr[productIndex-1],
      "value": amount
    };

    //проверяем наличие товара в корзине      
    var prodId;
    for(var i = 0; i < cart.length; i++) {
      if(cart[i].prod.id == prodObj.prod.id) {
        prodId = i;
        break;
      }
    }

    if(prodId === undefined) { 
      cart.push(prodObj)
    } else {
      cart[prodId].value=+cart[prodId].value + +prodObj.value     
    }
    cartDisplay();   
  } 
});

function cartDisplay(el) {
  cartWrap.innerHTML = '';//очищаем блок

  cart.forEach(element => { 
    const gridBlock = document.createElement('div')
    gridBlock.className = 'cart-block';
    cartWrap.append(gridBlock)

    //img cart    
    let cartImg = document.createElement('div');
    cartImg.className = 'flex';
    let photo = document.createElement('img');
    photo.src ='images/' + element.prod.img; 
    cartImg.append(photo);   
    gridBlock.append(cartImg); 
    
    //id товара
    let cartId = document.createElement('div');
    cartId.className = 'opacity';
    cartId.textContent = element.prod.id;
    cartImg.append(cartId);
    
    //name cart    
    let cartName = document.createElement('div');
    cartName.className = 'flex cart-block__name';
    cartName.textContent = element.prod.name;
    gridBlock.append(cartName);

    //amount cart           
    let cartAmount = document.createElement('div');
    cartAmount.className = 'flex';
    cartAmount.textContent = element.value;
    gridBlock.append(cartAmount);

    //price cart          
    let cartPrice = document.createElement('div');
    cartPrice.className = 'price-cart flex';
    cartPrice.textContent = (element.prod.price*element.value) + ' руб';
    gridBlock.append(cartPrice);

    //delete cart          
    let cartDelete = document.createElement('div');
    cartDelete.className = 'cart-block__icon  flex';   
    gridBlock.append(cartDelete);

    cartDelete.addEventListener('click', function(e) {
      console.log(cart)     

     let prodId = document.querySelectorAll('.opacity') 
     console.log(prodId)

      for(var i = 0; i < cart.length; i++) {
        if(cart[i].prod.id == prodId) {
          prodId = i;
          cart.splice(i,1)
        }
      }    
      
    });    
  });
}