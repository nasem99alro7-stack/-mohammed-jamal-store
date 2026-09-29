const products=[
{id:1,cat:"men",name:"قميص رجالي كلاسيك",price:185000,emoji:"👔"},
{id:2,cat:"women",name:"فستان نسائي أنيق",price:295000,emoji:"👗"},
{id:3,cat:"shoes",name:"حذاء رياضي Premium",price:420000,emoji:"👟"},
{id:4,cat:"bags",name:"حقيبة يومية فاخرة",price:260000,emoji:"👜"},
{id:5,cat:"beauty",name:"عطر شرقي فاخر",price:350000,emoji:"🧴"},
{id:6,cat:"electronics",name:"سماعات لاسلكية",price:275000,emoji:"🎧"},
{id:7,cat:"kids",name:"طقم أطفال مميز",price:175000,emoji:"🧸"},
{id:8,cat:"home",name:"طقم منزلي عصري",price:220000,emoji:"🏠"}];
let current="all",cart=[];
const grid=document.querySelector("#productGrid"),title=document.querySelector("#productsTitle");
const fmt=n=>n.toLocaleString("ar-SY")+" ل.س";
function render(){
 let arr=current==="all"?products:products.filter(p=>p.cat===current);
 grid.innerHTML=arr.map(p=>`<article class="product"><div class="pic">${p.emoji}</div><div class="product-info"><span class="tag">SYRIA ONLINE</span><h3>${p.name}</h3><div class="rating">★★★★★</div><div class="price"><strong>${fmt(p.price)}</strong><button class="add" data-add="${p.id}">+</button></div></div></article>`).join("");
 title.textContent=current==="all"?"منتجات مختارة":"منتجات القسم";
 document.querySelectorAll("[data-add]").forEach(b=>b.onclick=()=>add(+b.dataset.add));
}
function add(id){cart.push(products.find(p=>p.id===id));document.querySelector("#cartCount").textContent=cart.length;renderCart()}
function renderCart(){
 const el=document.querySelector("#cartItems");
 if(!cart.length){el.innerHTML='<div style="text-align:center;padding:50px 10px;color:#789">السلة فارغة حالياً 🛒</div>';document.querySelector("#total").textContent="0 ل.س";return}
 el.innerHTML=cart.map((p,i)=>`<div class="cart-row"><div class="mini">${p.emoji}</div><div style="flex:1"><b>${p.name}</b><div>${fmt(p.price)}</div></div><button onclick="removeItem(${i})" style="border:0;background:none;color:#b33">×</button></div>`).join("");
 document.querySelector("#total").textContent=fmt(cart.reduce((s,p)=>s+p.price,0));
}
window.removeItem=i=>{cart.splice(i,1);document.querySelector("#cartCount").textContent=cart.length;renderCart()};
function setCat(cat){current=cat;render();window.scrollTo({top:document.querySelector(".products").offsetTop-100,behavior:"smooth"})}
document.querySelectorAll("[data-cat]").forEach(b=>b.addEventListener("click",()=>setCat(b.dataset.cat)));
document.querySelector("#searchBtn").onclick=()=>{const q=document.querySelector("#search").value.trim();if(!q)return setCat("all");grid.innerHTML=products.filter(p=>p.name.includes(q)).map(p=>`<article class="product"><div class="pic">${p.emoji}</div><div class="product-info"><span class="tag">SEARCH RESULT</span><h3>${p.name}</h3><div class="price"><strong>${fmt(p.price)}</strong><button class="add" data-add="${p.id}">+</button></div></div></article>`).join("")||"<p>ما لقينا منتج مطابق.</p>";document.querySelectorAll("[data-add]").forEach(b=>b.onclick=()=>add(+b.dataset.add))};
document.querySelector("#search").addEventListener("keydown",e=>{if(e.key==="Enter")document.querySelector("#searchBtn").click()});
const drawer=document.querySelector("#drawer"),overlay=document.querySelector("#overlay");
document.querySelector("#menuBtn").onclick=()=>{drawer.classList.add("open");overlay.classList.add("show")};
document.querySelector("#closeDrawer").onclick=closeAll;overlay.onclick=closeAll;
function closeAll(){drawer.classList.remove("open");overlay.classList.remove("show");document.querySelector("#cartPanel").classList.remove("open")}
document.querySelectorAll(".parent").forEach(b=>b.onclick=()=>b.parentElement.classList.toggle("open"));
document.querySelector("#cartBtn").onclick=()=>{document.querySelector("#cartPanel").classList.add("open");renderCart()};
document.querySelector("#closeCart").onclick=closeAll;
document.querySelector("#checkout").onclick=()=>alert("واجهة الدفع جاهزة. لإتمام الدفع الحقيقي نحتاج بيانات بوابات شام كاش وUSDT وVisa/Mastercard الخاصة بك.");
document.querySelector("#openCategories").onclick=()=>document.querySelector(".categories").scrollIntoView({behavior:"smooth"});
render();
