const products=[
 {id:1,name:"بدلة رجالية فاخرة",cat:"ملابس",price:125000,emoji:"🕴️"},
 {id:2,name:"قميص كلاسيك",cat:"ملابس",price:65000,emoji:"👔"},
 {id:3,name:"ساعة أنيقة",cat:"إكسسوارات",price:95000,emoji:"⌚"},
 {id:4,name:"عطر فاخر",cat:"عطور",price:78000,emoji:"🧴"},
 {id:5,name:"محفظة جلد",cat:"إكسسوارات",price:45000,emoji:"👝"},
 {id:6,name:"حذاء رجالي",cat:"ملابس",price:110000,emoji:"👞"},
 {id:7,name:"عطر رجالي",cat:"عطور",price:69000,emoji:"🌿"},
 {id:8,name:"نظارة شمسية",cat:"إكسسوارات",price:55000,emoji:"🕶️"}
];
let cart=JSON.parse(localStorage.getItem("mj-cart")||"[]");
const money=n=>n.toLocaleString("ar-SA")+" ل.س";
function render(){
 const q=document.getElementById("search").value.trim().toLowerCase();
 const c=document.getElementById("category").value;
 const list=products.filter(p=>(c==="all"||p.cat===c)&&(!q||p.name.toLowerCase().includes(q)));
 document.getElementById("grid").innerHTML=list.map(p=>`
 <article class="product"><div class="pic">${p.emoji}</div><div class="info"><h3>${p.name}</h3><span class="cat">${p.cat}</span><div class="price">${money(p.price)}</div><button class="add" onclick="add(${p.id})">أضف إلى السلة</button></div></article>`).join("")||"<p>لا توجد منتجات.</p>";
 updateCart();
}
function add(id){const x=cart.find(i=>i.id===id);x?x.qty++:cart.push({id,qty:1});save();openCart()}
function save(){localStorage.setItem("mj-cart",JSON.stringify(cart));updateCart()}
function updateCart(){
 document.getElementById("cartCount").textContent=cart.reduce((s,i)=>s+i.qty,0);
 document.getElementById("cartItems").innerHTML=cart.length?cart.map(i=>{const p=products.find(x=>x.id===i.id);return `<div class="cartItem"><div><b>${p.name}</b><br><small>${money(p.price)}</small></div><div class="qty"><button onclick="change(${p.id},-1)">−</button> ${i.qty} <button onclick="change(${p.id},1)">+</button></div></div>`}).join(""):"<p style='color:#aaa'>السلة فارغة.</p>";
 document.getElementById("total").textContent=money(cart.reduce((s,i)=>s+products.find(p=>p.id===i.id).price*i.qty,0));
}
function change(id,d){const x=cart.find(i=>i.id===id);if(!x)return;x.qty+=d;if(x.qty<=0)cart=cart.filter(i=>i.id!==id);save()}
function toggleCart(){document.getElementById("cart").classList.toggle("open");document.getElementById("overlay").classList.toggle("open")}
function openCart(){document.getElementById("cart").classList.add("open");document.getElementById("overlay").classList.add("open")}
function focusSearch(){document.getElementById("search").focus()}
function checkout(){
 if(!cart.length)return alert("السلة فارغة");
 const text=cart.map(i=>{const p=products.find(x=>x.id===i.id);return `${p.name} × ${i.qty}`}).join("\n");
 const total=cart.reduce((s,i)=>s+products.find(p=>p.id===i.id).price*i.qty,0);
 const phone="000000000000"; // ضع رقم واتساب المتجر هنا بدون +
 window.open(`https://wa.me/${phone}?text=${encodeURIComponent("مرحباً، أريد طلب:\n"+text+"\nالمجموع: "+money(total))}`,"_blank");
}
document.getElementById("search").addEventListener("input",render);render();
