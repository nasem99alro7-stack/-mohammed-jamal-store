const CATS=[
["all","الكل","🛍️"],["electronics","إلكترونيات","📱"],["women","أزياء نسائية","👗"],["men","أزياء رجالية","👔"],["shoes","أحذية","👟"],["bags","حقائب","👜"],["beauty","عطور وتجميل","✨"],["home","منزل ومطبخ","🏠"],["kids","أطفال وألعاب","🧸"],["food","غذائيات","🥫"],["accessories","إكسسوارات","⌚"],["cars","سيارات وإكسسوارات","🚗"],["sports","رياضة","⚽"],["office","مكتب وقرطاسية","📚"],["sale","العروض","🔥"]];
const PRODUCTS=[
{id:1,cat:"men",name:"قميص رجالي كلاسيك",price:185000,old:215000,emoji:"👔",rating:4.8,sold:98,new:false,sale:true,brand:"Syria Style",seller:"متجر الشام"},
{id:2,cat:"women",name:"فستان نسائي أنيق",price:295000,old:340000,emoji:"👗",rating:4.9,sold:124,new:true,sale:true,brand:"Syria Fashion",seller:"بوتيك دمشق"},
{id:3,cat:"shoes",name:"حذاء رياضي Premium",price:420000,old:470000,emoji:"👟",rating:4.7,sold:87,new:false,sale:true,brand:"Urban Step",seller:"ستيب ستور"},
{id:4,cat:"bags",name:"حقيبة يومية فاخرة",price:260000,old:0,emoji:"👜",rating:4.8,sold:73,new:true,sale:false,brand:"SO Collection",seller:"سوريا أونلاين"},
{id:5,cat:"beauty",name:"عطر شرقي فاخر",price:350000,old:390000,emoji:"🧴",rating:4.9,sold:156,new:false,sale:true,brand:"Orient",seller:"عطور الياسمين"},
{id:6,cat:"electronics",name:"سماعات لاسلكية",price:275000,old:320000,emoji:"🎧",rating:4.6,sold:210,new:true,sale:true,brand:"SoundX",seller:"تك سوريا"},
{id:7,cat:"kids",name:"طقم أطفال مميز",price:175000,old:0,emoji:"🧸",rating:4.8,sold:66,new:false,sale:false,brand:"Little",seller:"عالم الطفل"},
{id:8,cat:"home",name:"طقم منزلي عصري",price:220000,old:260000,emoji:"🏠",rating:4.7,sold:55,new:false,sale:true,brand:"Home",seller:"بيت وذوق"},
{id:9,cat:"electronics",name:"ساعة ذكية",price:490000,old:560000,emoji:"⌚",rating:4.8,sold:132,new:true,sale:true,brand:"SmartPro",seller:"تك سوريا"},
{id:10,cat:"food",name:"سلة غذائيات سورية",price:180000,old:205000,emoji:"🧺",rating:4.9,sold:190,new:false,sale:true,brand:"Syrian Box",seller:"مونة الشام"},
{id:11,cat:"accessories",name:"نظارة شمسية",price:145000,old:170000,emoji:"🕶️",rating:4.6,sold:91,new:true,sale:true,brand:"Vision",seller:"إكسسوارات SO"},
{id:12,cat:"cars",name:"إكسسوار سيارة عملي",price:95000,old:120000,emoji:"🚗",rating:4.5,sold:44,new:true,sale:true,brand:"Auto",seller:"كار ستور"},
{id:13,cat:"sports",name:"حقيبة رياضية",price:165000,old:0,emoji:"🎒",rating:4.7,sold:61,new:true,sale:false,brand:"Sport",seller:"سبورت سوريا"},
{id:14,cat:"office",name:"طقم قرطاسية مكتبي",price:75000,old:90000,emoji:"📚",rating:4.6,sold:38,new:false,sale:true,brand:"Office",seller:"المكتبة الحديثة"}];
const KEY={cart:"soCartV6",fav:"soFavV6",user:"soUserV6",orders:"soOrdersV6",addresses:"soAddressesV6",coupon:"soCouponV6",reviews:"soReviewsV6"};
let cart=load(KEY.cart,[]),fav=load(KEY.fav,[]),current="all",sort="featured",discount=0;
const $=s=>document.querySelector(s), $$=s=>[...document.querySelectorAll(s)];
const fmt=n=>Number(n||0).toLocaleString("ar-SY")+" ل.س";
function load(k,d){try{return JSON.parse(localStorage.getItem(k))??d}catch{return d}}
function save(k,v){localStorage.setItem(k,JSON.stringify(v))}
function esc(s){return String(s??"").replace(/[&<>"']/g,m=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[m]))}
function toast(msg){let t=$(".toast");if(!t){t=document.createElement("div");t.className="toast";document.body.appendChild(t)}t.textContent=msg;t.classList.add("show");clearTimeout(t.x);t.x=setTimeout(()=>t.classList.remove("show"),1900)}
function modal(title,body,after){const b=document.createElement("div");b.className="modal-bg";b.innerHTML=`<div class="modal"><div class="modal-head"><h2>${title}</h2><button data-x>×</button></div>${body}</div>`;document.body.appendChild(b);b.onclick=e=>{if(e.target===b||e.target.closest("[data-x]"))b.remove()};after?.(b);return b}
function renderCats(){
 const nav=$("#navCats"),grid=$("#catGrid"),drawer=$("#drawerCats");
 nav.innerHTML=CATS.map(c=>`<button class="${current===c[0]?"active":""}" data-cat="${c[0]}">${c[2]} ${c[1]}</button>`).join("");
 grid.innerHTML=CATS.filter(c=>c[0]!=="all"&&c[0]!=="sale").map(c=>`<button data-cat="${c[0]}"><b>${c[2]}</b><strong>${c[1]}</strong><small>اكتشف المنتجات</small></button>`).join("");
 drawer.innerHTML=CATS.map(c=>`<button data-cat="${c[0]}">${c[2]} ${c[1]}</button>`).join("");
}
function filtered(){
 let a=PRODUCTS.filter(p=>current==="all"||current==="sale"?true:p.cat===current);
 if(current==="sale")a=a.filter(p=>p.sale);
 const q=($("#search")?.value||"").trim().toLocaleLowerCase("ar");
 if(q)a=a.filter(p=>(p.name+" "+p.brand+" "+p.seller+" "+(CATS.find(c=>c[0]===p.cat)?.[1]||"")).toLocaleLowerCase("ar").includes(q));
 const min=Number($("#minPrice")?.value||0),max=Number($("#maxPrice")?.value||0);
 if(min)a=a.filter(p=>p.price>=min);if(max)a=a.filter(p=>p.price<=max);
 if($("#onlyNew")?.checked)a=a.filter(p=>p.new);if($("#onlySale")?.checked)a=a.filter(p=>p.sale);
 if(sort==="best")a.sort((x,y)=>y.sold-x.sold);if(sort==="new")a.sort((x,y)=>Number(y.new)-Number(x.new));
 if(sort==="low")a.sort((x,y)=>x.price-y.price);if(sort==="high")a.sort((x,y)=>y.price-x.price);if(sort==="rating")a.sort((x,y)=>y.rating-x.rating);
 return a;
}
function card(p){
 const favOn=fav.includes(p.id),reviews=load(KEY.reviews,{})[p.id]||[];
 return `<article class="product" data-product="${p.id}"><div class="pic" data-product="${p.id}">${p.emoji}<button class="heart ${favOn?"on":""}" data-fav="${p.id}">${favOn?"♥":"♡"}</button>${p.sale?`<label class="sale">-${Math.round((1-p.price/p.old)*100)}%</label>`:""}</div><div class="pinfo"><small class="tag">${p.new?"وصل حديثاً":p.brand}</small><h3>${p.name}</h3><div class="stars">★★★★★ <span>${p.rating} (${reviews.length+Math.max(2,Math.round(p.sold/25))})</span></div><div class="prices"><strong>${fmt(p.price)}</strong>${p.old?`<del>${fmt(p.old)}</del>`:""}<button class="add" data-add="${p.id}">+</button></div><small class="seller">يباع بواسطة ${esc(p.seller)}</small></div></article>`
}
function render(){
 const a=filtered(),q=($("#search")?.value||"").trim();
 $("#productsTitle").textContent=q?`نتائج البحث عن «${esc(q)}»`:current==="all"?"منتجات مميزة":(CATS.find(c=>c[0]===current)?.[1]||"المنتجات");
 $("#productGrid").innerHTML=a.map(card).join("");$("#empty").hidden=a.length>0;updateCounts()
}
function setCat(c){current=c;renderCats();render();document.getElementById("products").scrollIntoView({behavior:"smooth",block:"start"})}
function updateCounts(){const n=cart.reduce((s,x)=>s+x.qty,0);$("#cartCount").textContent=n;$("#bottomCartCount").textContent=n;$("#favCount").textContent=fav.length}
function add(id){const x=cart.find(r=>r.id===id);x?x.qty++:cart.push({id,qty:1});save(KEY.cart,cart);renderCart();updateCounts();toast("تمت إضافة المنتج للسلة 🛒")}
function change(id,d){const x=cart.find(r=>r.id===id);if(!x)return;x.qty+=d;if(x.qty<=0)cart=cart.filter(r=>r.id!==id);save(KEY.cart,cart);renderCart();updateCounts()}
function total(){return cart.reduce((s,x)=>s+(PRODUCTS.find(p=>p.id===x.id)?.price||0)*x.qty,0)}
function renderCart(){
 const el=$("#cartItems");if(!cart.length){el.innerHTML='<div class="empty">السلة فارغة حالياً 🛒</div>';$("#total").textContent="0 ل.س";return}
 el.innerHTML=cart.map(x=>{const p=PRODUCTS.find(p=>p.id===x.id);return `<div class="cart-row"><div class="mini">${p.emoji}</div><div><b>${p.name}</b><small>${fmt(p.price)}</small><div class="qty"><button data-minus="${p.id}">−</button><b>${x.qty}</b><button data-plus="${p.id}">+</button></div></div><button class="remove" data-remove="${p.id}">حذف</button></div>`}).join("");
 $("#total").textContent=fmt(Math.max(0,total()-discount));
}
function authModal(){
 let signupMode=false;
 const b=modal("تسجيل الدخول / إنشاء حساب",`<div class="tabs"><button id="loginTab" class="active">دخول</button><button id="signupTab">إنشاء حساب</button></div><div id="authBody"></div>`,box=>{
  const draw=()=>{$("#authBody",box).innerHTML=signupMode?`<div class="form"><label>الاسم الكامل<input id="regName"></label><label>الإيميل<input id="regEmail" type="email"></label><label>رقم الهاتف<input id="regPhone" inputmode="tel"></label><label class="full">كلمة السر<input id="regPass" type="password"></label><label class="full">تأكيد كلمة السر<input id="regPass2" type="password"></label><button class="primary full" id="signup">إنشاء الحساب</button></div><small class="hint">كلمة السر لا تُحفظ كنص؛ تُحفظ بصمة SHA-256 محلياً.</small>`:`<div class="form"><label class="full">الإيميل أو رقم الهاتف<input id="loginId"></label><label class="full">كلمة السر<input id="loginPass" type="password"></label><button class="primary full" id="login">دخول</button></div>`;
  if(signupMode)$("#signup",box).onclick=async()=>{const n=$("#regName",box).value.trim(),e=$("#regEmail",box).value.trim(),ph=$("#regPhone",box).value.trim(),p=$("#regPass",box).value,p2=$("#regPass2",box).value;if(!n||(!e&&!ph)||!p||p!==p2)return toast("تأكد من البيانات وكلمة السر");save(KEY.user,{name:n,email:e,phone:ph,passwordHash:await sha(p)});b.remove();updateUser();toast("تم إنشاء الحساب بنجاح 🎉")};
  else $("#login",box).onclick=async()=>{const id=$("#loginId",box).value.trim(),p=$("#loginPass",box).value,u=load(KEY.user,null);if(!u||(u.email!==id&&u.phone!==id))return toast("الحساب غير موجود على هذا الجهاز");if(await sha(p)!==u.passwordHash)return toast("كلمة السر غير صحيحة");b.remove();updateUser();toast("أهلاً بك في سوريا أونلاين")};
 };
 draw();$("#loginTab",b).onclick=()=>{signupMode=false;$("#loginTab",b).classList.add("active");$("#signupTab",b).classList.remove("active");draw()};$("#signupTab",b).onclick=()=>{signupMode=true;$("#signupTab",b).classList.add("active");$("#loginTab",b).classList.remove("active");draw()}
 })
}
async function sha(t){const h=await crypto.subtle.digest("SHA-256",new TextEncoder().encode(t));return [...new Uint8Array(h)].map(x=>x.toString(16).padStart(2,"0")).join("")}
function accountModal(){const u=load(KEY.user,null);if(!u)return authModal();modal("حسابي",`<div class="account"><b>${esc(u.name)}</b><span>${esc(u.email||u.phone)}</span></div><div class="account-grid"><button id="edit">تعديل البيانات</button><button data-open="orders">طلباتي</button><button data-open="addresses">عناويني</button><button id="logout">تسجيل خروج</button></div>`,b=>{$("#logout",b).onclick=()=>{localStorage.removeItem(KEY.user);b.remove();updateUser();toast("تم تسجيل الخروج")};$("#edit",b).onclick=()=>{b.remove();editAccount()}})}
function editAccount(){const u=load(KEY.user,null);modal("تعديل الحساب",`<div class="form"><label>الاسم الكامل<input id="en" value="${esc(u.name)}"></label><label>الإيميل<input id="ee" value="${esc(u.email||"")}"></label><label>رقم الهاتف<input id="ep" value="${esc(u.phone||"")}"></label><button class="primary full" id="save">حفظ</button></div>`,b=>{$("#save",b).onclick=()=>{u.name=$("#en",b).value.trim();u.email=$("#ee",b).value.trim();u.phone=$("#ep",b).value.trim();save(KEY.user,u);b.remove();updateUser();toast("تم حفظ البيانات")}})}
function updateUser(){const u=load(KEY.user,null);$("#drawerUser").innerHTML=u?`<div class="account"><b>${esc(u.name)}</b><span>${esc(u.email||u.phone)}</span></div>`:`<button class="primary wide" id="drawerLogin">تسجيل الدخول / إنشاء حساب</button>`;$("#drawerLogin")?.addEventListener("click",authModal)}
function favoritesModal(){const a=PRODUCTS.filter(p=>fav.includes(p.id));modal("المفضلة",a.length?`<div class="mini-grid">${a.map(card).join("")}</div>`:"لا توجد منتجات في المفضلة بعد.",b=>bindModalCards(b))}
function ordersModal(){const a=load(KEY.orders,[]);modal("طلباتي",a.length?a.map(o=>`<div class="order"><b>${o.id}</b><span>${o.status}</span><small>${new Date(o.date).toLocaleString("ar-SY")}</small><div>${esc(o.city)} — ${esc(o.address)}</div><strong>${fmt(o.total)}</strong></div>`).join(""):"<div class='empty'>لا توجد طلبات بعد.</div>")}
function addressesModal(){const a=load(KEY.addresses,[]);modal("عناويني",`${a.map((x,i)=>`<div class="address"><b>${esc(x.title)}</b><span>${esc(x.city)} — ${esc(x.address)}</span><button data-del="${i}">حذف</button></div>`).join("")}<button class="primary wide" id="addAddr">+ إضافة عنوان</button>`,b=>{$("#addAddr",b).onclick=()=>{b.remove();addAddress()};$$( "[data-del]",b).forEach(x=>x.onclick=()=>{a.splice(+x.dataset.del,1);save(KEY.addresses,a);b.remove();addressesModal()})})}
function addAddress(){modal("إضافة عنوان",`<div class="form"><label>اسم العنوان<input id="at" placeholder="المنزل"></label><label>المحافظة / المدينة<input id="ac"></label><label class="full">العنوان بالتفصيل<textarea id="aa"></textarea></label><button class="primary full" id="sa">حفظ العنوان</button></div>`,b=>{$("#sa",b).onclick=()=>{const x={title:$("#at",b).value.trim(),city:$("#ac",b).value.trim(),address:$("#aa",b).value.trim()};if(!x.title||!x.city||!x.address)return toast("كمّل بيانات العنوان");const a=load(KEY.addresses,[]);a.push(x);save(KEY.addresses,a);b.remove();addressesModal()}})}
function couponsModal(){modal("كوبونات وخصومات",`<div class="coupon-card"><b>SYRIA10</b><span>خصم 10% على السلة</span><button data-copy="SYRIA10">نسخ</button></div><div class="coupon-card"><b>NEW15</b><span>خصم 15% للعملاء الجدد</span><button data-copy="NEW15">نسخ</button></div><div class="coupon-card"><b>WELCOME5</b><span>خصم 5% ترحيبي</span><button data-copy="WELCOME5">نسخ</button></div>`)}
function supportModal(){modal("خدمة العملاء",`<div class="support"><button onclick="location.href='tel:+963000000000'">📞 <b>اتصل بنا</b><small>ضع رقم المتجر الحقيقي هنا</small></button><button onclick="location.href='mailto:support@syria-online.store'">✉️ <b>البريد الإلكتروني</b><small>support@syria-online.store</small></button><button data-open="orders">📦 <b>تتبع الطلب</b><small>من صفحة طلباتي</small></button><div class="notice">أرقام التواصل والدفع تحتاج بيانات المتجر الحقيقية قبل الإطلاق.</div></div>`)}
function productModal(id){const p=PRODUCTS.find(x=>x.id===id),rs=load(KEY.reviews,{})[id]||[];modal(p.name,`<div class="detail"><div class="detail-pic">${p.emoji}</div><div><span class="tag">${p.brand}</span><div class="stars">★★★★★ ${p.rating}</div><h3>${fmt(p.price)} ${p.old?`<del>${fmt(p.old)}</del>`:""}</h3><p>منتج متاح للطلب مع خيارات توصيل داخل سوريا حسب المنطقة. البائع: <b>${esc(p.seller)}</b></p><div class="detail-actions"><button class="primary" id="addDetail">أضف للسلة</button><button class="secondary" id="favDetail">${fav.includes(p.id)?"♥":"♡"} المفضلة</button></div></div></div><hr><h3>تقييمات العملاء</h3><div>${rs.length?rs.map(r=>`<div class="review"><b>${esc(r.name)}</b><span>★★★★★</span><p>${esc(r.text)}</p></div>`).join(""):"لا توجد تقييمات مكتوبة بعد."}</div><button class="secondary wide" id="writeReview">اكتب تقييماً</button>`,b=>{$("#addDetail",b).onclick=()=>{add(p.id);b.remove()};$("#favDetail",b).onclick=()=>{if(fav.includes(p.id))fav=fav.filter(x=>x!==p.id);else fav.push(p.id);save(KEY.fav,fav);render();b.remove();productModal(id)};$("#writeReview",b).onclick=()=>writeReview(id,b)})}
function writeReview(id,parent){parent.remove();modal("تقييم المنتج",`<div class="form"><label>اسمك<input id="rn"></label><label class="full">رأيك<textarea id="rt"></textarea></label><button class="primary full" id="sendReview">إرسال التقييم</button></div>`,b=>{$("#sendReview",b).onclick=()=>{const n=$("#rn",b).value.trim(),t=$("#rt",b).value.trim();if(!n||!t)return toast("اكتب الاسم والتقييم");const all=load(KEY.reviews,{});all[id]=all[id]||[];all[id].push({name:n,text:t});save(KEY.reviews,all);b.remove();toast("تم إرسال التقييم ⭐");productModal(id)}})}
function checkoutModal(){if(!cart.length)return toast("السلة فارغة");if(!load(KEY.user,null)){authModal();return}const u=load(KEY.user,null),as=load(KEY.addresses,[]);modal("إتمام الشراء",`<div class="form"><label>الاسم الكامل<input id="cn" value="${esc(u.name)}"></label><label>رقم الهاتف<input id="cp" value="${esc(u.phone||"")}"></label><label>المحافظة / المدينة<input id="cc"></label><label class="full">عنوان محفوظ<select id="cs"><option value="">عنوان جديد</option>${as.map((a,i)=>`<option value="${i}">${esc(a.title)} — ${esc(a.city)}</option>`).join("")}</select></label><label class="full">العنوان بالتفصيل<textarea id="ca"></textarea></label><label class="full">ملاحظات الطلب<textarea id="cnote"></textarea></label><label class="full">طريقة الدفع<select id="pay"><option>الدفع عند الاستلام</option><option>شام كاش</option><option>USDT</option><option>Visa</option><option>Mastercard</option></select></label><div class="notice full">الإجمالي: <b>${fmt(Math.max(0,total()-discount))}</b></div><button class="primary full" id="confirm">تأكيد الطلب</button></div>`,b=>{$("#cs",b).onchange=()=>{const a=as[+$("#cs",b).value];if(a){$("#cc",b).value=a.city;$("#ca",b).value=a.address}};$("#confirm",b).onclick=()=>{const o={id:"SO-"+Date.now().toString().slice(-8),date:new Date().toISOString(),name:$("#cn",b).value.trim(),phone:$("#cp",b).value.trim(),city:$("#cc",b).value.trim(),address:$("#ca",b).value.trim(),notes:$("#cnote",b).value.trim(),payment:$("#pay",b).value,status:"جديد",total:Math.max(0,total()-discount),items:cart};if(!o.name||!o.phone||!o.city||!o.address)return toast("كمّل بيانات التوصيل");const os=load(KEY.orders,[]);os.unshift(o);save(KEY.orders,os);cart=[];save(KEY.cart,cart);discount=0;b.remove();renderCart();updateCounts();toast("تم تسجيل الطلب 🎉");setTimeout(ordersModal,400)}})}
function applyCoupon(){const c=$("#couponInput").value.trim().toUpperCase(),valid={SYRIA10:.10,NEW15:.15,WELCOME5:.05};if(valid[c]){discount=Math.round(total()*valid[c]);save(KEY.coupon,c);renderCart();toast("تم تطبيق الخصم "+valid[c]*100+"%")}else toast("الكوبون غير صحيح")}
function bindModalCards(b){$$("[data-product]",b).forEach(x=>x.onclick=e=>{if(e.target.closest("[data-fav]")||e.target.closest("[data-add]"))return;productModal(+x.dataset.product)});$$("[data-add]",b).forEach(x=>x.onclick=()=>add(+x.dataset.add));$$("[data-fav]",b).forEach(x=>x.onclick=()=>{const id=+x.dataset.fav;fav=fav.includes(id)?fav.filter(n=>n!==id):[...fav,id];save(KEY.fav,fav);render();b.remove();favoritesModal()})}
document.addEventListener("click",e=>{
 const cat=e.target.closest("[data-cat]");if(cat){e.preventDefault();setCat(cat.dataset.cat);return}
 const open=e.target.closest("[data-open]");if(open){const n=open.dataset.open;if(n==="account")accountModal();if(n==="favorites")favoritesModal();if(n==="orders")ordersModal();if(n==="addresses")addressesModal();if(n==="coupons")couponsModal();if(n==="support")supportModal();return}
 const scr=e.target.closest("[data-scroll]");if(scr){if(scr.dataset.scroll==="home")window.scrollTo({top:0,behavior:"smooth"});else document.getElementById(scr.dataset.scroll)?.scrollIntoView({behavior:"smooth"});return}
 const addBtn=e.target.closest("[data-add]");if(addBtn){add(+addBtn.dataset.add);return}
 const favBtn=e.target.closest("[data-fav]");if(favBtn){const id=+favBtn.dataset.fav;fav=fav.includes(id)?fav.filter(n=>n!==id):[...fav,id];save(KEY.fav,fav);render();return}
 const prod=e.target.closest("[data-product]");if(prod)productModal(+prod.dataset.product)
 const plus=e.target.closest("[data-plus]");if(plus){change(+plus.dataset.plus,1);renderCart()}
 const minus=e.target.closest("[data-minus]");if(minus){change(+minus.dataset.minus,-1);renderCart()}
 const rem=e.target.closest("[data-remove]");if(rem){cart=cart.filter(x=>x.id!==+rem.dataset.remove);save(KEY.cart,cart);renderCart();updateCounts()}
 const cp=e.target.closest("[data-copy]");if(cp){navigator.clipboard?.writeText(cp.dataset.copy);toast("تم نسخ الكود "+cp.dataset.copy)}
});
$("#searchBtn").onclick=()=>{current="all";renderCats();render();$("#products").scrollIntoView({behavior:"smooth"})};
$("#search").oninput=render;$("#search").onkeydown=e=>{if(e.key==="Enter")$("#searchBtn").click()};
$("#sort").onchange=e=>{sort=e.target.value;render()};$("#filterBtn").onclick=()=>$("#filterPanel").classList.toggle("open");$("#applyFilters").onclick=render;
$("#cartBtn").onclick=()=>{$("#cartPanel").classList.add("open");renderCart()};$("#bottomCart").onclick=()=>{$("#cartPanel").classList.add("open");renderCart()};$$("[data-close-panel]").forEach(b=>b.onclick=()=>$("#cartPanel").classList.remove("open"));
$("#checkout").onclick=checkoutModal;$("#couponBtn").onclick=applyCoupon;$("#accountBtn").onclick=accountModal;$("#favBtn").onclick=favoritesModal;
$("#menuBtn").onclick=()=>{$("#drawer").classList.add("open");$("#overlay").classList.add("show");updateUser()};$("#closeDrawer").onclick=()=>{$("#drawer").classList.remove("open");$("#overlay").classList.remove("show")};$("#overlay").onclick=()=>{$("#drawer").classList.remove("open");$("#overlay").classList.remove("show")};
let end=Date.now()+((7*24+3)*60*60*1000);setInterval(()=>{let d=Math.max(0,end-Date.now()),h=Math.floor(d/36e5),m=Math.floor(d%36e5/6e4),s=Math.floor(d%6e4/1e3);$("#timer").textContent=[h,m,s].map(x=>String(x).padStart(2,"0")).join(":")},1000);
renderCats();render();renderCart();updateUser();updateCounts();
