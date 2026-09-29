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


/* Syria Online v2 enhancements */
(function(){
  const CATS=["الكل","إلكترونيات","أزياء نسائية","أزياء رجالية","أحذية","حقائب","عطور وتجميل","منزل ومطبخ","أطفال وألعاب","إكسسوارات","سيارات وإكسسوارات","غذائيات"];
  const KEY="syriaOnlineCustomer";
  const cartKey="syriaOnlineCart";
  const $=(s,r=document)=>r.querySelector(s);
  const toast=(m)=>{let t=$(".so-toast");if(!t){t=document.createElement("div");t.className="so-toast";document.body.appendChild(t)}t.textContent=m;t.classList.add("show");setTimeout(()=>t.classList.remove("show"),1800)};
  function modal(title,body){let b=document.createElement("div");b.className="so-modal-backdrop open";b.innerHTML='<div class="so-modal"><div style="display:flex;justify-content:space-between;align-items:center;gap:10px"><h2 style="margin:0">'+title+'</h2><button class="so-btn so-btn-light" data-close>×</button></div>'+body+'</div>';document.body.appendChild(b);b.addEventListener("click",e=>{if(e.target===b||e.target.closest("[data-close]"))b.remove()});return b}
  function customer(){try{return JSON.parse(localStorage.getItem(KEY)||"null")}catch{return null}}
  function accountUI(){
    let host=document.querySelector("header")||document.body;
    let bar=document.createElement("div");bar.className="so-account-bar";bar.style.cssText="margin:8px 0";
    let c=customer();
    if(c){
      bar.innerHTML='<button class="so-btn so-btn-light" data-orders>طلباتي</button><button class="so-btn so-btn-light" data-account>حسابي: '+(c.name||"الزبون")+'</button><button class="so-btn so-btn-primary" data-logout>تسجيل خروج</button>';
      bar.querySelector("[data-logout]").onclick=()=>{localStorage.removeItem(KEY);location.reload()};
      bar.querySelector("[data-account]").onclick=()=>checkoutModal(true);
      bar.querySelector("[data-orders]").onclick=()=>ordersModal();
    }else{
      bar.innerHTML='<button class="so-btn so-btn-primary" data-login>تسجيل الدخول / إنشاء حساب</button>';
      bar.querySelector("[data-login]").onclick=loginModal;
    }
    host.prepend(bar);
  }
  function loginModal(){
    let b=modal("حساب سوريا أونلاين",`<div class="so-form-grid">
      <div class="full"><label>البريد الإلكتروني أو رقم الهاتف</label><input id="so-login-id" placeholder="example@email.com أو 09xxxxxxxx"></div>
      <div class="full"><label>كلمة السر</label><input id="so-login-pass" type="password" placeholder="••••••••"></div>
      <div class="full"><button class="so-btn so-btn-primary" id="so-do-login">دخول</button></div>
      <div class="full" style="text-align:center"><button class="so-btn so-btn-light" id="so-signup">إنشاء حساب جديد</button></div>
    </div>`);
    b.querySelector("#so-do-login").onclick=()=>{let id=$("#so-login-id",b).value.trim(),p=$("#so-login-pass",b).value;if(!id||!p)return toast("أدخل بيانات الدخول");localStorage.setItem(KEY,JSON.stringify({name:id,email:id,phone:id}));b.remove();location.reload()};
    b.querySelector("#so-signup").onclick=signupModal;
  }
  function signupModal(){
    let b=modal("إنشاء حساب",`<div class="so-form-grid">
      <div class="full"><label>الاسم الكامل</label><input id="so-name"></div>
      <div><label>البريد الإلكتروني</label><input id="so-email" type="email"></div>
      <div><label>رقم الهاتف</label><input id="so-phone" inputmode="tel"></div>
      <div class="full"><label>كلمة السر</label><input id="so-pass" type="password"></div>
      <div class="full"><button class="so-btn so-btn-primary" id="so-create">إنشاء الحساب</button></div>
    </div>`);
    b.querySelector("#so-create").onclick=()=>{let name=$("#so-name",b).value.trim(),email=$("#so-email",b).value.trim(),phone=$("#so-phone",b).value.trim(),pass=$("#so-pass",b).value;if(!name||(!email&&!phone)||!pass)return toast("كمّل بيانات الحساب");localStorage.setItem(KEY,JSON.stringify({name,email,phone}));b.remove();location.reload()};
  }
  function checkoutModal(){
    if(!customer()){loginModal();return}
    let b=modal("إتمام الطلب",`<p style="margin-top:8px;color:#5b665f">أدخل بيانات التوصيل قبل تأكيد الطلب.</p>
    <div class="so-form-grid">
      <div class="full"><label>الاسم الكامل</label><input id="co-name" value="${customer().name||""}"></div>
      <div><label>رقم الهاتف</label><input id="co-phone" value="${customer().phone||""}" inputmode="tel"></div>
      <div><label>المحافظة / المدينة</label><input id="co-city" placeholder="دمشق، حلب..."></div>
      <div class="full"><label>العنوان بالتفصيل</label><textarea id="co-address" rows="3" placeholder="المنطقة، الشارع، البناء، الطابق..."></textarea></div>
      <div class="full"><label>ملاحظات للطلب</label><textarea id="co-notes" rows="2"></textarea></div>
      <div class="full"><button class="so-btn so-btn-primary" id="co-confirm">تأكيد الطلب</button></div>
    </div>`);
    b.querySelector("#co-confirm").onclick=()=>{let order={id:"SO-"+Date.now(),date:new Date().toISOString(),name:$("#co-name",b).value,phone:$("#co-phone",b).value,city:$("#co-city",b).value,address:$("#co-address",b).value,notes:$("#co-notes",b).value,status:"جديد",items:JSON.parse(localStorage.getItem(cartKey)||"[]")};if(!order.name||!order.phone||!order.city||!order.address)return toast("كمّل بيانات التوصيل");let orders=JSON.parse(localStorage.getItem("syriaOnlineOrders")||"[]");orders.unshift(order);localStorage.setItem("syriaOnlineOrders",JSON.stringify(orders));localStorage.removeItem(cartKey);b.remove();toast("تم تسجيل الطلب بنجاح");setTimeout(ordersModal,500)};
  }
  function ordersModal(){let os=JSON.parse(localStorage.getItem("syriaOnlineOrders")||"[]");let html=os.length?os.map(o=>'<div style="border:1px solid #e6ece8;border-radius:14px;padding:14px;margin:8px 0"><b>'+o.id+'</b><div>'+new Date(o.date).toLocaleString("ar")+'</div><div>الحالة: <b>'+o.status+'</b></div><div>'+o.city+' — '+o.address+'</div></div>').join(""):"لا توجد طلبات بعد.";modal("طلباتي",html)}
  function categories(){
    let anchor=document.querySelector("main")||document.body;let wrap=document.createElement("div");wrap.className="so-cats";wrap.setAttribute("dir","rtl");CATS.forEach((c,i)=>{let x=document.createElement("button");x.className="so-cat"+(!i?" active":"");x.textContent=c;x.onclick=()=>{wrap.querySelectorAll(".so-cat").forEach(y=>y.classList.remove("active"));x.classList.add("active");toast("القسم: "+c)};wrap.appendChild(x)});anchor.prepend(wrap)
  }
  function logo(){
    let candidates=[...document.querySelectorAll("header img, header .logo, header a")];
    let el=candidates.find(x=>/SO|سوريا|logo/i.test(x.textContent||""))||candidates.find(x=>x.tagName==="IMG");
    if(el && el.tagName==="IMG"){el.src="syria-online-logo.svg";el.alt="سوريا أونلاين";el.classList.add("so-logo")}
    else if(el){el.innerHTML='<img class="so-logo" src="syria-online-logo.svg" alt="سوريا أونلاين">'}
  }
  function checkoutButton(){
    let b=document.createElement("button");b.className="so-btn so-btn-primary";b.textContent="إتمام الشراء";b.onclick=checkoutModal;b.style.cssText="position:fixed;right:18px;bottom:18px;z-index:999;border-radius:999px;padding:14px 20px";document.body.appendChild(b)
  }
  window.SyriaOnline={loginModal,signupModal,checkoutModal,ordersModal};
  document.addEventListener("DOMContentLoaded",()=>{logo();categories();accountUI();checkoutButton()});
})();


/* Syria Online complete customer features */
(function(){
"use strict";
const DB={
 user:"soUserV4", cart:"soCartV4", fav:"soFavV4", orders:"soOrdersV4",
 addresses:"soAddressesV4", coupons:"soCouponsV4"
};
const cats=["إلكترونيات","أزياء نسائية","أزياء رجالية","أحذية","حقائب","عطور وتجميل","منزل ومطبخ","أطفال وألعاب","غذائيات","إكسسوارات","سيارات وإكسسوارات","رياضة","مكتب وقرطاسية"];
const products=[
 {id:"p1",name:"منتج إلكتروني مميز",cat:"إلكترونيات",price:120},
 {id:"p2",name:"أزياء نسائية",cat:"أزياء نسائية",price:75},
 {id:"p3",name:"أزياء رجالية",cat:"أزياء رجالية",price:85},
 {id:"p4",name:"حذاء عصري",cat:"أحذية",price:95},
 {id:"p5",name:"حقيبة أنيقة",cat:"حقائب",price:60},
 {id:"p6",name:"عطر فاخر",cat:"عطور وتجميل",price:55},
 {id:"p7",name:"أداة منزلية",cat:"منزل ومطبخ",price:40},
 {id:"p8",name:"لعبة أطفال",cat:"أطفال وألعاب",price:35}
];
const $=(s,r=document)=>r.querySelector(s);
const get=(k,d)=>{try{return JSON.parse(localStorage.getItem(k))??d}catch{return d}};
const set=(k,v)=>localStorage.setItem(k,JSON.stringify(v));
function user(){return get(DB.user,null)}
function ensureOverlay(title,body){
 const o=document.createElement("div");o.className="so-overlay open";
 o.innerHTML=`<div class="so-panel" dir="rtl"><div class="so-row"><h2>${title}</h2><button class="so-feature-btn" data-x>×</button></div>${body}</div>`;
 document.body.appendChild(o);o.addEventListener("click",e=>{if(e.target===o||e.target.closest("[data-x]"))o.remove()});return o;
}
function toast(t){let x=$("#so-v4-toast");if(!x){x=document.createElement("div");x.id="so-v4-toast";x.className="so-pill";x.style="position:fixed;bottom:20px;left:50%;transform:translateX(-50%);z-index:10001;background:#14201a;color:#fff;padding:12px 18px";document.body.appendChild(x)}x.textContent=t;setTimeout(()=>x.remove(),1800)}
function auth(){
 let o=ensureOverlay("حساب سوريا أونلاين",`<div class="so-grid">
 <div class="full"><label>الاسم الكامل</label><input id="au-name"></div>
 <div><label>البريد الإلكتروني</label><input id="au-email" type="email"></div>
 <div><label>رقم الهاتف</label><input id="au-phone" inputmode="tel"></div>
 <div class="full"><label>كلمة السر</label><input id="au-pass" type="password"></div>
 <div class="full"><button class="so-feature-btn primary" id="au-create">إنشاء / تسجيل الدخول</button></div>
 </div><p style="font-size:12px;color:#667">ملاحظة: كلمة السر لا تُحفظ في الموقع؛ هذا الإصدار التجريبي يحفظ بيانات الحساب الأساسية محليًا فقط. للتسجيل الحقيقي الآمن يلزم Backend/Auth.</p>`);
 o.querySelector("#au-create").onclick=()=>{
  let name=$("#au-name",o).value.trim(),email=$("#au-email",o).value.trim(),phone=$("#au-phone",o).value.trim(),pass=$("#au-pass",o).value;
  if(!name||(!email&&!phone)||!pass)return toast("كمّل بيانات الحساب");
  set(DB.user,{name,email,phone});o.remove();renderBar();toast("تم تسجيل الحساب");
 };
}
function profile(){
 let u=user();if(!u)return auth();
 let o=ensureOverlay("حسابي",`<div class="so-grid">
 <div class="full"><label>الاسم الكامل</label><input id="pf-name" value="${html(u.name)}"></div>
 <div><label>البريد</label><input id="pf-email" value="${html(u.email||"")}"></div>
 <div><label>الهاتف</label><input id="pf-phone" value="${html(u.phone||"")}"></div>
 <div class="full"><button class="so-feature-btn primary" id="pf-save">حفظ التعديلات</button> <button class="so-feature-btn" id="pf-out">تسجيل خروج</button></div>
 </div>`);
 o.querySelector("#pf-save").onclick=()=>{set(DB.user,{name:$("#pf-name",o).value,email:$("#pf-email",o).value,phone:$("#pf-phone",o).value});o.remove();renderBar();toast("تم حفظ الحساب")};
 o.querySelector("#pf-out").onclick=()=>{localStorage.removeItem(DB.user);o.remove();renderBar();toast("تم تسجيل الخروج")};
}
function html(x){return String(x??"").replace(/[&<>"']/g,m=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[m]))}
function cart(){
 let c=get(DB.cart,[]);
 let rows=c.length?c.map(i=>`<div class="so-card"><div class="so-row"><b>${html(i.name)}</b><button class="so-feature-btn so-danger" data-del="${i.id}">حذف</button></div>
 <div class="so-row"><span>${i.price} $</span><span><button class="so-feature-btn" data-minus="${i.id}">−</button> ${i.qty} <button class="so-feature-btn" data-plus="${i.id}">+</button></span></div></div>`).join(""):"السلة فارغة";
 let total=c.reduce((s,i)=>s+i.price*i.qty,0);
 let o=ensureOverlay("سلة المشتريات",rows+`<div class="so-row"><b>الإجمالي: ${total.toFixed(2)} $</b><button class="so-feature-btn primary" id="co-go">إتمام الشراء</button></div>`);
 o.querySelectorAll("[data-del]").forEach(b=>b.onclick=()=>{set(DB.cart,c.filter(i=>i.id!==b.dataset.del));o.remove();cart()});
 o.querySelectorAll("[data-plus]").forEach(b=>b.onclick=()=>{let a=c.find(i=>i.id===b.dataset.plus);a.qty++;set(DB.cart,c);o.remove();cart()});
 o.querySelectorAll("[data-minus]").forEach(b=>b.onclick=()=>{let a=c.find(i=>i.id===b.dataset.minus);a.qty=Math.max(1,a.qty-1);set(DB.cart,c);o.remove();cart()});
 o.querySelector("#co-go").onclick=checkout;
}
function checkout(){
 if(!user())return auth();
 let addresses=get(DB.addresses,[]),addrOptions=addresses.map((a,i)=>`<option value="${i}">${html(a.city)} — ${html(a.address)}</option>`).join("");
 let o=ensureOverlay("إتمام الشراء",`<div class="so-grid">
 <div class="full"><label>الاسم الكامل</label><input id="ch-name" value="${html(user().name)}"></div>
 <div><label>رقم الهاتف</label><input id="ch-phone" value="${html(user().phone||"")}"></div>
 <div><label>المحافظة / المدينة</label><input id="ch-city"></div>
 <div class="full"><label>العنوان بالتفصيل</label><textarea id="ch-address" rows="3"></textarea></div>
 <div class="full"><label>ملاحظات</label><textarea id="ch-notes"></textarea></div>
 <div class="full"><label>العنوان المحفوظ</label><select id="ch-saved"><option value="">استخدم عنوانًا جديدًا</option>${addrOptions}</select></div>
 <div class="full"><label>كوبون الخصم</label><input id="ch-coupon" placeholder="مثال: SYRIA10"></div>
 <div class="full"><button class="so-feature-btn primary" id="ch-confirm">تأكيد الطلب</button></div>
 </div>`);
 o.querySelector("#ch-saved").onchange=e=>{let a=addresses[+e.target.value];if(a){$("#ch-city",o).value=a.city;$("#ch-address",o).value=a.address}};
 o.querySelector("#ch-confirm").onclick=()=>{
  let c=get(DB.cart,[]);if(!c.length)return toast("السلة فارغة");
  let coupon=$("#ch-coupon",o).value.trim().toUpperCase(),disc=coupon==="SYRIA10"?0.10:0;
  let subtotal=c.reduce((s,i)=>s+i.price*i.qty,0),total=subtotal*(1-disc);
  let order={id:"SO-"+Date.now(),date:new Date().toISOString(),status:"تم استلام الطلب",name:$("#ch-name",o).value,phone:$("#ch-phone",o).value,city:$("#ch-city",o).value,address:$("#ch-address",o).value,notes:$("#ch-notes",o).value,items:c,total,coupon};
  if(!order.name||!order.phone||!order.city||!order.address)return toast("كمّل بيانات التوصيل");
  let os=get(DB.orders,[]);os.unshift(order);set(DB.orders,os);set(DB.cart,[]);
  o.remove();toast("تم تأكيد الطلب");setTimeout(orders,400);
 };
}
function orders(){
 let os=get(DB.orders,[]),body=os.length?os.map(o=>`<div class="so-card"><div class="so-row"><b>${o.id}</b><span class="so-pill">${html(o.status)}</span></div><div>${new Date(o.date).toLocaleString("ar")}</div><div>${html(o.city)} — ${html(o.address)}</div><div><b>${o.total.toFixed(2)} $</b></div></div>`).join(""):"لا توجد طلبات بعد.";
 ensureOverlay("طلباتي وتتبع الطلب",body);
}
function fav(){
 let f=get(DB.fav,[]),body=f.length?f.map(id=>{let p=products.find(x=>x.id===id);return p?`<div class="so-card"><div class="so-row"><b>${p.name}</b><button class="so-feature-btn" data-rm="${p.id}">إزالة</button></div><div>${p.price} $</div></div>`:""}).join(""):"لا توجد منتجات مفضلة.";
 let o=ensureOverlay("المفضلة",body);o.querySelectorAll("[data-rm]").forEach(b=>b.onclick=()=>{set(DB.fav,f.filter(x=>x!==b.dataset.rm));o.remove();fav()});
}
function addresses(){
 if(!user())return auth();let a=get(DB.addresses,[]);
 let body=a.map((x,i)=>`<div class="so-address"><div class="so-row"><b>${html(x.city)}</b><button class="so-feature-btn so-danger" data-rm="${i}">حذف</button></div><div>${html(x.address)}</div></div>`).join("");
 let o=ensureOverlay("عناويني",body+`<hr><div class="so-grid"><input id="ad-city" placeholder="المحافظة / المدينة"><textarea id="ad-address" placeholder="العنوان بالتفصيل"></textarea><div class="full"><button class="so-feature-btn primary" id="ad-add">حفظ عنوان جديد</button></div></div>`);
 o.querySelector("#ad-add").onclick=()=>{let city=$("#ad-city",o).value.trim(),address=$("#ad-address",o).value.trim();if(!city||!address)return toast("أدخل العنوان");a.push({city,address});set(DB.addresses,a);o.remove();addresses()};
 o.querySelectorAll("[data-rm]").forEach(b=>b.onclick=()=>{a.splice(+b.dataset.rm,1);set(DB.addresses,a);o.remove();addresses()});
}
function search(){
 let o=ensureOverlay("البحث والفلترة",`<input id="sx" placeholder="ابحث عن منتج..."><select id="sc"><option value="">كل الأقسام</option>${cats.map(c=>`<option>${c}</option>`).join("")}</select><select id="so"><option value="">الترتيب</option><option value="low">السعر: الأقل</option><option value="high">السعر: الأعلى</option></select><div id="sr" class="so-products" style="margin-top:12px"></div>`);
 function render(){let q=$("#sx",o).value.toLowerCase(),c=$("#sc",o).value,arr=products.filter(p=>(!q||p.name.toLowerCase().includes(q))&&(!c||p.cat===c));if($("#so",o).value==="low")arr.sort((a,b)=>a.price-b.price);if($("#so",o).value==="high")arr.sort((a,b)=>b.price-a.price);$("#sr",o).innerHTML=arr.map(p=>`<div class="so-product"><b>${p.name}</b><div>${p.cat}</div><div class="price">${p.price} $</div><div class="so-stars">★★★★★</div><button class="so-feature-btn primary" data-add="${p.id}">أضف للسلة</button> <button class="so-feature-btn" data-fav="${p.id}">♡</button></div>`).join("")||"لا نتائج"};
 ["#sx","#sc","#so"].forEach(s=>o.querySelector(s).oninput=render);o.querySelector("#so").onchange=render;
 o.addEventListener("click",e=>{let id=e.target.dataset.add;if(id){let p=products.find(x=>x.id===id),c=get(DB.cart,[]),x=c.find(i=>i.id===id);if(x)x.qty++;else c.push({...p,qty:1});set(DB.cart,c);toast("تمت الإضافة للسلة")};let f=e.target.dataset.fav;if(f){let a=get(DB.fav,[]);if(!a.includes(f))a.push(f);set(DB.fav,a);toast("تمت الإضافة للمفضلة")}});
 render();
}
function renderBar(){
 let old=$("#so-v4-bar");if(old)old.remove();
 let bar=document.createElement("div");bar.id="so-v4-bar";bar.className="so-feature-launcher";bar.dir="rtl";
 let u=user();
 bar.innerHTML=`<button class="so-feature-btn primary" data-a>${u?"حسابي":"تسجيل / إنشاء حساب"}</button><button class="so-feature-btn" data-c>🛒 السلة (${get(DB.cart,[]).reduce((s,x)=>s+x.qty,0)})</button><button class="so-feature-btn" data-o>📦 طلباتي</button><button class="so-feature-btn" data-f>❤️ المفضلة</button><button class="so-feature-btn" data-d>🏠 عناويني</button><button class="so-feature-btn" data-s>🔎 بحث وفلاتر</button>`;
 (document.querySelector("main")||document.body).prepend(bar);
 bar.querySelector("[data-a]").onclick=()=>u?profile():auth();bar.querySelector("[data-c]").onclick=cart;bar.querySelector("[data-o]").onclick=orders;bar.querySelector("[data-f]").onclick=fav;bar.querySelector("[data-d]").onclick=addresses;bar.querySelector("[data-s]").onclick=search;
}
document.addEventListener("DOMContentLoaded",()=>{renderBar()});
})();
