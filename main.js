const productList = document.querySelector(".product-list");
const categoryList = document.querySelector(".category-list");
const sepetBtn=document.querySelector("#sepet");
const closeBtn=document.querySelector(".close");
const modal=document.querySelector(".modal-wrapper");
const modalList=document.getElementById("modal-list");
const fiyatSpan=document.querySelector("#fiyat");
const girisBtn=document.querySelector("#giris");
const girisWrapper= document.querySelector(".giris-wrapper");
const onayBtn=document.querySelector("#onaylaBtn");
const closeLogin=document.querySelector(".close-login");
const kaydolBtn=document.querySelector("#kaydol");
const closeKayit=document.querySelector(".close-kayit");
const kaydet=document.querySelector("#kaydetBtn");
const kayitWrapper=document.querySelector(".kayit-wrapper");

document.addEventListener('DOMContentLoaded', ()=>{  //callback fonlsiyon iceriginde birden cok fonksiyonu calistirir.
 fetchCategories();
 fetchProducts()
});

function fetchCategories(){

    fetch('https://api.escuelajs.co/api/v1/categories')
    .then(res=>res.json())
    .then((data)=>data.slice(1,4).forEach((category) => {
      //gelen her obje icin bir div olusturma
      const categoryDiv=document.createElement('div') 
      //olusan elemana class verme
      categoryDiv.classList.add('category')
      //elemanin html icerigini degistirme
      categoryDiv.innerHTML=`
            <img src="${category.image}"/>
            <span>${category.name}</span>
      `
      //olusan elemani html e gondermek
categoryList.appendChild(categoryDiv);
    }))
    .catch((err)=>console.log(err))
}


function fetchProducts(){
    fetch("https://api.escuelajs.co/api/v1/products")
    .then(res=>res.json())
    .then((data)=>data.slice(0,24).forEach((product)=>{
        //her gelen product icin div olusturma
       const productDiv= document.createElement('div')
//olusan elemana sinif verme
  productDiv.classList.add("product")
  //elemanin html icerigini degistirme
  productDiv.innerHTML=`
  <img src="${product.images[0]}" >
            <p>${product.title}</p>
            <p>${product.category.name}</p>
            <div class="product-info">
                <span>${product.price}</span>
                <button onClick='sepeteEkle({name:"${product.title}",id:"${product.id}",price:"${product.price}",amount:1})' >Sepete Ekle</button>
  `         
  //olusan elemani html e gondermek
  productList.appendChild(productDiv)
    }))
    .catch((err)=>{});
}
const basket=[];
let toplamFiyat=0;

function listBasket(){
    basket.forEach((eleman)=>{
        console.log(eleman)
      //sepet elemanin divini olusturma
     const basketItem= document.createElement("div");
     basketItem.classList.add("sepetItem")
     basketItem.innerHTML=`
     <h2>${eleman.name}</h2>
     <h2>${eleman.price} $ </h2>
     <p>Miktar:${eleman.amount}</p
     `
     modalList.appendChild(basketItem)
   
     toplamFiyat += Number(eleman.price) * eleman.amount
     console.log(toplamFiyat)

    })
    fiyatSpan.innerText = toplamFiyat;
}

//sepeti acma-kapama//
sepetBtn.addEventListener('click',()=>{
   //sepeti acar
    toggleSepet()
    //sepete eleman ekler
    listBasket()
});
closeBtn.addEventListener('click',()=>{
    toggleSepet(),
    //sepet kapandiginda listenin icini temizledik
    modalList.innerHTML=""
});

function toggleSepet(){
    modal.classList.toggle('active');
}
//sepete eleman ekleme//


function sepeteEkle(param){
 const foundItem= basket.find((eleman)=> eleman.id == param.id);
 
 if(foundItem){
    foundItem.amount +=1;

}else{
    basket.push(param);
} 
console.log(basket)
}
// giris elementi div olusturma
 //gerek yok//

// giris butonunu acar 
 girisBtn.addEventListener("click", toggleGiris)
  
 //giris butonunu kapatir
closeLogin.addEventListener('click',toggleGiris);

onayBtn.addEventListener("click",toggleGiris)
function toggleGiris(){
    girisWrapper.classList.toggle("active");
    
    }
    //kayit butonunu acar
kaydolBtn.addEventListener("click", toggleKayit);
// kayit butonu kapatir
closeKayit.addEventListener("click", toggleKayit);

kaydet.addEventListener("click", toggleKayit);

function toggleKayit(){
    kayitWrapper.classList.toggle("active");
}