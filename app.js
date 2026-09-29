const dealProducts = [
  ["👟","حذاء رياضي رجالي","1,080","1,800","-40%","128"],
  ["👜","حقيبة نسائية أنيقة","840","1,200","-30%","95"],
  ["🎧","سماعات لاسلكية","710","950","-25%","212"],
  ["🧥","سترة رجالية شتوية","1,040","1,600","-35%","87"],
  ["🌹","عطر نسائي فاخر","1,120","1,400","-20%","176"]
];
const bestProducts = [
  ["👟","حذاء رياضي","950","1,200","", "320"],
  ["⌚","ساعة ذكية","1,250","1,500","","280"],
  ["🧥","هودي رجالي","890","1,100","","190"],
  ["🍳","طقم أواني طبخ","1,300","1,650","","150"],
  ["💄","مجموعة مكياج","980","1,250","","410"],
  ["🚙","سيارة أطفال","670","850","","230"]
];

function productCard(p){
  return `<article class="product-card" data-name="${p[1]}">
    ${p[4] ? `<span class="discount">${p[4]}</span>` : ""}
    <span class="wish">♡</span>
    <div class="product-img">${p[0]}</div>
    <div><span class="stars">★★★★★</span> <span class="reviews">(${p[5]})</span></div>
    <h3>${p[1]}</h3>
    <div class="price"><strong>₺${p[2]}</strong><del>₺${p[3]}</del></div>
    <button class="add-cart">أضف إلى السلة 🛒</button>
  </article>`;
}

document.getElementById("dealProducts").innerHTML = dealProducts.map(productCard).join("");
document.getElementById("bestProducts").innerHTML = bestProducts.map(productCard).join("");

let cart = 0;
document.addEventListener("click", e => {
  if(e.target.classList.contains("add-cart")){
    cart++;
    document.getElementById("cartCount").textContent = cart;
    e.target.textContent = "✓ تمت الإضافة";
    setTimeout(()=>e.target.textContent="أضف إلى السلة 🛒",900);
  }
});

const search = document.getElementById("searchInput");
search.addEventListener("input", () => {
  const q = search.value.trim().toLowerCase();
  document.querySelectorAll(".product-card").forEach(card=>{
    card.style.display = !q || card.dataset.name.toLowerCase().includes(q) ? "" : "none";
  });
});

let seconds = 6*3600 + 25*60 + 18;
setInterval(()=>{
  seconds = Math.max(0,seconds-1);
  const h = Math.floor(seconds/3600);
  const m = Math.floor((seconds%3600)/60);
  const s = seconds%60;
  const vals = document.querySelectorAll(".countdown span b");
  if(vals.length===3){ vals[0].textContent=String(s).padStart(2,"0"); vals[1].textContent=String(m).padStart(2,"0"); vals[2].textContent=String(h).padStart(2,"0"); }
},1000);
