const CATS=[
["all","الكل","🛍️"],["electronics","إلكترونيات","📱"],["women","أزياء نسائية","👗"],["men","أزياء رجالية","👔"],["shoes","أحذية","👟"],["bags","حقائب","👜"],["beauty","عطور وتجميل","✨"],["home","منزل ومطبخ","🏠"],["kids","أطفال وألعاب","🧸"],["food","غذائيات","🥫"],["accessories","إكسسوارات","⌚"],["cars","سيارات وإكسسوارات","🚗"],["sports","رياضة","⚽"],["office","مكتب وقرطاسية","📚"],["sale","العروض","🔥"]
];
const PRODUCTS=[
{id:1,cat:"men",name:"قميص رجالي كلاسيك",price:185000,emoji:"👔",rating:4.8,sold:98,new:false},
{id:2,cat:"women",name:"فستان نسائي أنيق",price:295000,emoji:"👗",rating:4.9,sold:124,new:true},
{id:3,cat:"shoes",name:"حذاء رياضي Premium",price:420000,emoji:"👟",rating:4.7,sold:87,new:false},
{id:4,cat:"bags",name:"حقيبة يومية فاخرة",price:260000,emoji:"👜",rating:4.8,sold:73,new:true},
{id:5,cat:"beauty",name:"عطر شرقي فاخر",price:350000,emoji:"🧴",rating:4.9,sold:156,new:false},
{id:6,cat:"electronics",name:"سماعات لاسلكية",price:275000,emoji:"🎧",rating:4.6,sold:210,new:true},
{id:7,cat:"kids",name:"طقم أطفال مميز",price:175000,emoji:"🧸",rating:4.8,sold:66,new:false},
{id:8,cat:"home",name:"طقم منزلي عصري",price:220000,emoji:"🏠",rating:4.7,sold:55,new:false},
{id:9,cat:"electronics",name:"ساعة ذكية",price:490000,emoji:"⌚",rating:4.8,sold:132,new:true},
{id:10,cat:"food",name:"سلة غذائيات سورية",price:180000,emoji:"🧺",rating:4.9,sold:190,new:false},
{id:11,cat:"accessories",name:"نظارة شمسية",price:145000,emoji:"🕶️",rating:4.6,sold:91,new:true},
{id:12,cat:"cars",name:"إكسسوار سيارة عملي",price:95000,emoji:"🚗",rating:4.5,sold:44,new:true}
];
const KEY={cart:"soCartV5",fav:"soFavV5",user:"soUserV5",orders:"soOrdersV5",addresses:"soAddressesV5",coupon:"soCouponV5"};
let cart=load(KEY.cart,[]), fav=load(KEY.fav,[]), current="all", sort="featured", discount=0;
const $=s=>document.querySelector(s), $$=s=>[...document.querySelectorAll(s)];
const fmt=n=>Number(n).toLocaleString("ar-SY")+" ل.س";
function load(k,d){try{return JSON.parse(localStorage.getItem(k))??d}catch{return d}}
function save(k,v){localStorage.setItem(k,JSON.stringify(v))}
function toast(msg){let t=$(".toast");if(!t){t=document.createElement("div");t.className="toast";document.body.appendChild(t)}t.textContent=msg;t.classList.add("show");clearTimeout(t._x);t._x=setTimeout(()=>t.classList.remove("show"),1800)}
function modal(title,body,after){const b=document.createElement("div");b.className="so-modal-backdrop";b.innerHTML=`<div class="so-modal"><div class="panel-head" style="padding:0 0 15px;border:0"><h2>${title}</h2><button data-close>×</button></div>${body}</div>`;document.body.appendChild(b);b.addEventListener("click",e=>{if(e.target===b||e.target.closest("[data-close]"))b.remove()});if(after)after(b);return b}
function user(){return load(KEY.user,null)}
function renderCats(){
 const strip=$("#categoryStrip"),grid=$("#catGrid"),drawer=$("#drawerCats");
 strip.innerHTML=CATS.map(c=>`<button class="cat-chip ${current===c[0]?"active":""}" data-cat="${c[0]}">${c[2]} ${c[1]}</button>`).join("");
 grid.innerHTML=CATS.filter(c=>c[0]!=="all"&&c[0]!=="sale").map(c=>`<button data-cat="${c[0]}"><b>${c[2]}</b><span>${c[1]}</span><small>اكتشف المنتجات</small></button>`).join("");
 drawer.innerHTML=CATS.map(c=>`<button data-cat="${c[0]}">${c[2]} ${c[1]}</button>`).join("");
 $$("[data-cat]").forEach(b=>{b.onclick=()=>setCat(b.dataset.cat)});
}
function render(){
 let arr=PRODUCTS.filter(p=>current==="all"||current==="sale"?true:p.cat===current);
 if(current==="sale")arr=arr.filter(p=>p.id%2===0);
 if(sort==="new")arr.sort((a,b)=>Number(b.new)-Number(a.new));
 if(sort==="best")arr.sort((a,b)=>b.sold-a.sold);
 if(sort==="low")arr.sort((a,b)=>a.price-b.price);
 if(sort==="high")arr.sort((a,b)=>b.price-a.price);
 $("#productsTitle").textContent=current==="all"?"منتجات مميزة":CATS.find(c=>c[0]===current)?.[1]||"المنتجات";
 $("#emptyState").hidden=arr.length>0;
 $("#productGrid").innerHTML=arr.map(p=>productCard(p)).join("");
 updateCounts();
}
function productCard(p){
 const active=fav.includes(p.id);
 return `<article class="product"><div class="pic">${p.emoji}<button class="heart ${active?"active":""}" data-fav="${p.id}">${active?"♥":"♡"}</button></div><div class="product-info"><span class="tag">${p.new?"وصل حديثاً":"SYRIA ONLINE"}</span><h3>${p.name}</h3><div class="rating">★★★★★ <small>${p.rating}</small></div><div class="price"><strong>${fmt(p.price)}</strong><button class="add" data-add="${p.id}">+</button></div></div></article>`;
}
function updateCounts(){$("#cartCount").textContent=cart.reduce((s,x)=>s+x.qty,0);$("#bottomCartCount").textContent=cart.reduce((s,x)=>s+x.qty,0);$("#favCount").textContent=fav.length}
function add(id){const row=cart.find(x=>x.id===id);if(row)row.qty++;else cart.push({id,qty:1});save(KEY.cart,cart);renderCart();updateCounts();toast("تمت إضافة المنتج للسلة 🛒")}
function remove(id){cart=cart.filter(x=>x.id!==id);save(KEY.cart,cart);renderCart();updateCounts()}
function change(id,d){const x=cart.find(x=>x.id===id);if(!x)return;x.qty+=d;if(x.qty<=0)remove(id);else{save(KEY.cart,cart);renderCart();updateCounts()}}
function cartTotal(){return cart.reduce((s,x)=>{const p=PRODUCTS.find(p=>p.id===x.id);return s+p.price*x.qty},0)}
function renderCart(){
 const el=$("#cartItems");
 if(!cart.length){el.innerHTML='<div class="empty">السلة فارغة حالياً 🛒</div>';$("#total").textContent="0 ل.س";return}
 el.innerHTML=cart.map(x=>{const p=PRODUCTS.find(p=>p.id===x.id);return `<div class="cart-row"><div class="mini">${p.emoji}</div><div><b>${p.name}</b><div>${fmt(p.price)}</div><div class="qty"><button data-minus="${p.id}">−</button><span>${x.qty}</span><button data-plus="${p.id}">+</button></div></div><button class="remove" data-remove="${p.id}">حذف</button></div>`}).join("");
 const total=Math.max(0,cartTotal()-discount);$("#total").textContent=fmt(total);
 $$("[data-plus]").forEach(b=>b.onclick=()=>change(+b.dataset.plus,1));$$("[data-minus]").forEach(b=>b.onclick=()=>change(+b.dataset.minus,-1));$$("[data-remove]").forEach(b=>b.onclick=()=>remove(+b.dataset.remove));
}
function setCat(cat){current=cat;renderCats();render();if(window.innerWidth<700)document.querySelector(".section").scrollIntoView({behavior:"smooth"});else window.scrollTo({top:document.querySelector(".section").offsetTop-130,behavior:"smooth"})}
function search(){
 const q=$("#search").value.trim().toLowerCase();current="all";renderCats();let arr=PRODUCTS.filter(p=>(p.name+" "+(CATS.find(c=>c[0]===p.cat)?.[1]||"")).toLowerCase().includes(q));$("#productsTitle").textContent=q?`نتائج البحث عن «${q}»`:"منتجات مميزة";$("#productGrid").innerHTML=arr.map(productCard).join("");$("#emptyState").hidden=arr.length>0;bindCards();
}
function bindCards(){
 $$("[data-add]").forEach(b=>b.onclick=()=>add(+b.dataset.add));$$("[data-fav]").forEach(b=>b.onclick=()=>{const id=+b.dataset.fav;if(fav.includes(id))fav=fav.filter(x=>x!==id);else fav.push(id);save(KEY.fav,fav);render()});
}
document.addEventListener("click",e=>{
 const open=e.target.closest("[data-open]");if(open)openPanel(open.dataset.open);
 const sortBtn=e.target.closest("[data-sort]");if(sortBtn){sort=sortBtn.dataset.sort;$("#filterPanel").classList.remove("open");render();document.querySelectorAll("[data-sort]").forEach(x=>x.classList.toggle("active",x===sortBtn))}
});
function openCart(){renderCart();$("#cartPanel").classList.add("open");$("#overlay").classList.add("show")}
function closePanels(){$("#cartPanel").classList.remove("open");$("#drawer").classList.remove("open");$("#overlay").classList.remove("show")}
function openPanel(name){
 if(name==="account"){accountModal();return}
 if(name==="favorites"){favoritesModal();return}
 if(name==="orders"){ordersModal();return}
 if(name==="addresses"){addressesModal();return}
 if(name==="support"){supportModal();return}
 if(name==="payment"){$("#payment").scrollIntoView({behavior:"smooth"});return}
}
function accountModal(){
 const u=user();
 if(!u){authModal();return}
 modal("حسابي",`<div class="account-summary"><strong>${esc(u.name)}</strong><span>${esc(u.email||u.phone||"")}</span></div><div class="notice">حسابك محفوظ على هذا الجهاز. كلمة السر لا تُحفظ كنص؛ يتم حفظ بصمتها فقط.</div><div class="modal-actions"><button class="primary" id="editAccount">تعديل البيانات</button><button class="secondary" id="logout">تسجيل خروج</button></div>`,b=>{$("#logout",b).onclick=()=>{localStorage.removeItem(KEY.user);b.remove();toast("تم تسجيل الخروج");updateUserUI()};$("#editAccount",b).onclick=()=>editAccountModal(b)})
}
function authModal(){
 let mode="login";
 const b=modal("تسجيل الدخول / إنشاء حساب",`<div class="tabs"><button class="active" id="loginTab">دخول</button><button id="signupTab">إنشاء حساب</button></div><div id="authBody"></div>`,box=>{const body=$("#authBody",box);const draw=()=>{body.innerHTML=mode==="login"?`<div class="form-grid"><div class="full"><label>الإيميل أو رقم الهاتف</label><input id="authId" placeholder="example@email.com أو 09xxxxxxxx"></div><div class="full"><label>كلمة السر</label><input id="authPass" type="password"></div><div class="full"><button class="primary" id="doLogin">دخول</button></div></div>`:`<div class="form-grid"><div class="full"><label>الاسم الكامل</label><input id="regName"></div><div><label>الإيميل</label><input id="regEmail" type="email"></div><div><label>رقم الهاتف</label><input id="regPhone" inputmode="tel"></div><div class="full"><label>كلمة السر</label><input id="regPass" type="password"></div><div class="full"><label>تأكيد كلمة السر</label><input id="regPass2" type="password"></div><div class="full"><button class="primary" id="doSignup">إنشاء الحساب</button></div></div><div class="security-note">لن يتم تخزين كلمة السر كنص؛ يتم حفظ SHA-256 فقط داخل المتصفح.</div>`;if(mode==="login")$("#doLogin",box).onclick=()=>login(box);else $("#doSignup",box).onclick=()=>signup(box)};draw();$("#loginTab",box).onclick=()=>{mode="login";$("#loginTab",box).classList.add("active");$("#signupTab",box).classList.remove("active");draw()};$("#signupTab",box).onclick=()=>{mode="signup";$("#signupTab",box).classList.add("active");$("#loginTab",box).classList.remove("active");draw()}})
}
async function sha(text){const data=new TextEncoder().encode(text),hash=await crypto.subtle.digest("SHA-256",data);return [...new Uint8Array(hash)].map(b=>b.toString(16).padStart(2,"0")).join("")}
async function signup(b){
 const name=$("#regName",b).value.trim(),email=$("#regEmail",b).value.trim(),phone=$("#regPhone",b).value.trim(),pass=$("#regPass",b).value,pass2=$("#regPass2",b).value;
 if(!name||(!email&&!phone)||!pass||pass!==pass2)return toast("تأكد من بيانات الحساب وكلمة السر");
 const passwordHash=await sha(pass);save(KEY.user,{name,email,phone,passwordHash});b.remove();updateUserUI();toast("تم إنشاء الحساب بنجاح")}
async function login(b){
 const id=$("#authId",b).value.trim(),pass=$("#authPass",b).value;if(!id||!pass)return toast("أدخل بيانات الدخول");
 const u=user();if(!u||((u.email||"")!==id&&(u.phone||"")!==id))return toast("الحساب غير موجود على هذا الجهاز");
 if(await sha(pass)!==u.passwordHash)return toast("كلمة السر غير صحيحة");b.remove();updateUserUI();toast("أهلاً بك في سوريا أونلاين")}
function editAccountModal(parent){parent.remove();const u=user();modal("تعديل بيانات الحساب",`<div class="form-grid"><div class="full"><label>الاسم الكامل</label><input id="edName" value="${esc(u.name)}"></div><div><label>الإيميل</label><input id="edEmail" value="${esc(u.email||"")}"></div><div><label>رقم الهاتف</label><input id="edPhone" value="${esc(u.phone||"")}"></div><div class="full"><button class="primary" id="saveEd">حفظ</button></div></div>`,b=>{$("#saveEd",b).onclick=()=>{let x=user();x.name=$("#edName",b).value.trim();x.email=$("#edEmail",b).value.trim();x.phone=$("#edPhone",b).value.trim();save(KEY.user,x);b.remove();updateUserUI();toast("تم حفظ البيانات")}})}
function favoritesModal(){const arr=PRODUCTS.filter(p=>fav.includes(p.id));modal("المفضلة",arr.length?`<div class="product-grid">${arr.map(productCard).join("")}</div>`:"لا توجد منتجات في المفضلة بعد.",bindCards)}
function ordersModal(){const os=load(KEY.orders,[]);modal("طلباتي",os.length?os.map(o=>`<div class="order-card"><b>${o.id}</b><span class="status">${o.status}</span><div>${new Date(o.date).toLocaleString("ar-SY")}</div><div>${esc(o.city)} — ${esc(o.address)}</div><small>الإجمالي: ${fmt(o.total)}</small></div>`).join(""):'<div class="empty">لا توجد طلبات بعد.</div>')}
function addressesModal(){
 const as=load(KEY.addresses,[]);modal("عناويني",`${as.map((a,i)=>`<div class="address-card"><b>${esc(a.title)}</b><div>${esc(a.city)} — ${esc(a.address)}</div><button class="secondary" data-deladdr="${i}" style="margin-top:8px">حذف</button></div>`).join("")}<button class="primary" id="addAddress">+ إضافة عنوان</button>`,b=>{$("#addAddress",b).onclick=()=>{b.remove();addAddressModal()};$$("[data-deladdr]").forEach(x=>x.onclick=()=>{as.splice(+x.dataset.deladdr,1);save(KEY.addresses,as);b.remove();addressesModal()})})
}
function addAddressModal(){modal("إضافة عنوان",`<div class="form-grid"><div><label>اسم العنوان</label><input id="adTitle" placeholder="المنزل"></div><div><label>المحافظة / المدينة</label><input id="adCity"></div><div class="full"><label>العنوان بالتفصيل</label><textarea id="adAddress" rows="3"></textarea></div><div class="full"><button class="primary" id="saveAddr">حفظ العنوان</button></div></div>`,b=>{$("#saveAddr",b).onclick=()=>{let a={title:$("#adTitle",b).value.trim(),city:$("#adCity",b).value.trim(),address:$("#adAddress",b).value.trim()};if(!a.title||!a.city||!a.address)return toast("كمّل بيانات العنوان");let as=load(KEY.addresses,[]);as.push(a);save(KEY.addresses,as);b.remove();addressesModal()}})}
function supportModal(){modal("خدمة العملاء",`<div class="support-grid"><button onclick="location.href='tel:+963000000000'">📞 اتصل بنا<br><small>رقم خدمة العملاء</small></button><button onclick="location.href='mailto:support@syria-online.store'">✉️ البريد الإلكتروني<br><small>support@syria-online.store</small></button><button id="trackSupport">📦 تتبع طلب<br><small>من صفحة طلباتي</small></button><button onclick="document.querySelector('#payment').scrollIntoView({behavior:'smooth'});document.querySelectorAll('.so-modal-backdrop').forEach(x=>x.remove())">💳 طرق الدفع<br><small>خيارات الدفع المتاحة</small></button></div><div class="notice">ضع رقم الهاتف والبريد الحقيقيين للمتجر قبل الإطلاق.</div>`)}
function checkoutModal(){
 if(!user()){authModal();toast("سجّل دخولك أولاً لإتمام الطلب");return}
 if(!cart.length){toast("السلة فارغة");return}
 const u=user(),as=load(KEY.addresses,[]);
 modal("إتمام الشراء",`<div class="form-grid"><div class="full"><label>الاسم الكامل</label><input id="coName" value="${esc(u.name)}"></div><div><label>رقم الهاتف</label><input id="coPhone" value="${esc(u.phone||"")}"></div><div><label>المحافظة / المدينة</label><input id="coCity"></div><div class="full"><label>اختر عنواناً محفوظاً</label><select id="coSaved"><option value="">إدخال عنوان جديد</option>${as.map((a,i)=>`<option value="${i}">${esc(a.title)} — ${esc(a.city)}</option>`).join("")}</select></div><div class="full"><label>العنوان بالتفصيل</label><textarea id="coAddress" rows="3"></textarea></div><div class="full"><label>ملاحظات للطلب</label><textarea id="coNotes" rows="2"></textarea></div><div class="full"><label>طريقة الدفع</label><select id="coPay"><option>الدفع عند الاستلام</option><option>شام كاش</option><option>USDT</option><option>Visa</option><option>Mastercard</option></select></div><div class="full"><div class="notice">الإجمالي بعد الخصم: <b>${fmt(Math.max(0,cartTotal()-discount))}</b></div></div><div class="full"><button class="primary" id="confirmOrder">تأكيد الطلب</button></div></div>`,b=>{$("#coSaved",b).onchange=()=>{const a=as[+$("#coSaved",b).value];if(a){$("#coCity",b).value=a.city;$("#coAddress",b).value=a.address}};$("#confirmOrder",b).onclick=()=>{const o={id:"SO-"+Date.now().toString().slice(-8),date:new Date().toISOString(),name:$("#coName",b).value.trim(),phone:$("#coPhone",b).value.trim(),city:$("#coCity",b).value.trim(),address:$("#coAddress",b).value.trim(),notes:$("#coNotes",b).value.trim(),payment:$("#coPay",b).value,status:"جديد",total:Math.max(0,cartTotal()-discount),items:cart};if(!o.name||!o.phone||!o.city||!o.address)return toast("كمّل بيانات التوصيل");let os=load(KEY.orders,[]);os.unshift(o);save(KEY.orders,os);cart=[];save(KEY.cart,cart);discount=0;b.remove();renderCart();updateCounts();toast("تم تسجيل طلبك بنجاح 🎉");setTimeout(ordersModal,500)}})
}
function applyCoupon(){const c=$("#couponInput").value.trim().toUpperCase();const valid={SYRIA10:.10,NEW15:.15,WELCOME5:.05};if(valid[c]){discount=Math.round(cartTotal()*valid[c]);save(KEY.coupon,c);renderCart();toast(`تم تطبيق خصم ${valid[c]*100}%`)}else toast("الكوبون غير صحيح")}
function updateUserUI(){const u=user();$("#drawerUser").innerHTML=u?`<div class="account-summary"><strong>${esc(u.name)}</strong><span>${esc(u.email||u.phone||"")}</span></div>`:`<button class="primary" id="drawerLogin">تسجيل الدخول / إنشاء حساب</button>`;$("#drawerLogin")?.addEventListener("click",authModal)}
function esc(s){return String(s??"").replace(/[&<>"']/g,m=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[m]))}
$("#menuBtn").onclick=()=>{$("#drawer").classList.add("open");$("#overlay").classList.add("show")};
$("#closeDrawer").onclick=closePanels;$("#overlay").onclick=closePanels;$("#cartBtn").onclick=openCart;$("#bottomCart").onclick=openCart;$("#closeCart").onclick=closePanels;$("#checkout").onclick=checkoutModal;$("#couponBtn").onclick=applyCoupon;$("#searchBtn").onclick=search;$("#search").onkeydown=e=>{if(e.key==="Enter")search()};$("#favBtn").onclick=()=>openPanel("favorites");$("#accountBtn").onclick=()=>openPanel("account");$("#openCategories").onclick=()=>$("#categories").scrollIntoView({behavior:"smooth"});$("#bottomCategories").onclick=()=>$("#categories").scrollIntoView({behavior:"smooth"});$("#filterBtn").onclick=()=>$("#filterPanel").classList.toggle("open");
$("#productGrid").addEventListener("click",e=>{const a=e.target.closest("[data-add]");const f=e.target.closest("[data-fav]");if(a)add(+a.dataset.add);if(f){const id=+f.dataset.fav;if(fav.includes(id))fav=fav.filter(x=>x!==id);else fav.push(id);save(KEY.fav,fav);render()}});
renderCats();render();renderCart();updateUserUI();updateCounts();