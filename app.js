
(() => {
const $=(s,r=document)=>r.querySelector(s), $$=(s,r=document)=>[...r.querySelectorAll(s)];
const KEY={user:"so_user_v6",cart:"so_cart_v6",fav:"so_fav_v6",orders:"so_orders_v6",recent:"so_recent_v6",addresses:"so_addresses_v6",payments:"so_payments_v6"};
const load=(k,d)=>{try{return JSON.parse(localStorage.getItem(k))??d}catch{return d}};
const save=(k,v)=>localStorage.setItem(k,JSON.stringify(v));
const money=n=>`₺${Number(n).toLocaleString("tr-TR")}`;
const esc=s=>String(s).replace(/[&<>"']/g,m=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[m]));

const products=[
{id:1,emoji:"👟",name:"حذاء رياضي رجالي",cat:"أحذية وحقائب",sub:"أحذية رجالية",brand:"Syria Sport",price:1080,old:1800,sale:"-40%",rating:4.8,reviews:128,sold:320,color:"أسود",sizes:["40","41","42","43","44"],stock:18,desc:"حذاء رياضي مريح للاستخدام اليومي والمشي، ببطانة خفيفة ونعل مرن.",specs:{الخامة:"شبك + مطاط",الجنس:"رجالي",الاستخدام:"يومي ورياضة",اللون:"أسود"}},
{id:2,emoji:"👜",name:"حقيبة نسائية أنيقة",cat:"أزياء",sub:"حقائب نسائية",brand:"Syria Fashion",price:840,old:1200,sale:"-30%",rating:4.7,reviews:95,sold:210,color:"وردي",sizes:["موحد"],stock:24,desc:"حقيبة عملية وأنيقة للاستخدام اليومي، بمساحة داخلية متعددة الجيوب.",specs:{الخامة:"جلد صناعي",الحجم:"متوسط",الإغلاق:"سحاب",اللون:"وردي"}},
{id:3,emoji:"🎧",name:"سماعات لاسلكية Pro",cat:"إلكترونيات",sub:"سماعات",brand:"Syria Tech",price:710,old:950,sale:"-25%",rating:4.6,reviews:212,sold:540,color:"أبيض",sizes:["موحد"],stock:35,desc:"سماعات لاسلكية بصوت واضح، ميكروفون للمكالمات وعلبة شحن صغيرة.",specs:{الاتصال:"Bluetooth 5.3",البطارية:"حتى 24 ساعة مع العلبة",الشحن:"USB-C",اللون:"أبيض"}},
{id:4,emoji:"🧥",name:"سترة رجالية شتوية",cat:"أزياء",sub:"ملابس رجالية",brand:"Syria Fashion",price:1040,old:1600,sale:"-35%",rating:4.7,reviews:87,sold:180,color:"أسود",sizes:["M","L","XL","XXL"],stock:15,desc:"سترة شتوية دافئة بقصة عملية مناسبة للمدينة والسفر.",specs:{الخامة:"قماش مبطن",الموسم:"شتاء",الجنس:"رجالي",اللون:"أسود"}},
{id:5,emoji:"🌹",name:"عطر نسائي فاخر",cat:"عطور وجمال",sub:"عطور نسائية",brand:"Syria Beauty",price:1120,old:1400,sale:"-20%",rating:4.9,reviews:176,sold:390,color:"ذهبي",sizes:["50ml"],stock:20,desc:"عطر نسائي بتركيبة زهرية ناعمة وثبات مناسب للاستخدام اليومي والمناسبات.",specs:{الحجم:"50ml",النوع:"Eau de Parfum",العائلة:"زهرية",الجنس:"نسائي"}},
{id:6,emoji:"⌚",name:"ساعة ذكية Fit X",cat:"إلكترونيات",sub:"ساعات ذكية",brand:"Syria Tech",price:1250,old:1500,sale:"",rating:4.5,reviews:280,sold:460,color:"أسود",sizes:["موحد"],stock:22,desc:"ساعة ذكية لمتابعة النشاط والإشعارات ومعدل الحركة اليومية.",specs:{الشاشة:"1.8 بوصة",الاتصال:"Bluetooth",البطارية:"حتى 7 أيام",مقاومة:"رذاذ الماء"}},
{id:7,emoji:"🧥",name:"هودي رجالي",cat:"أزياء",sub:"ملابس رجالية",brand:"Syria Fashion",price:890,old:1100,sale:"",rating:4.6,reviews:190,sold:310,color:"بيج",sizes:["M","L","XL","XXL"],stock:27,desc:"هودي قطني ناعم بقصة مريحة مناسب للشتاء والخروج اليومي.",specs:{الخامة:"قطن",الموسم:"خريف وشتاء",الجنس:"رجالي",اللون:"بيج"}},
{id:8,emoji:"🍳",name:"طقم أواني طبخ 8 قطع",cat:"المنزل والمطبخ",sub:"أدوات المطبخ",brand:"Syria Home",price:1300,old:1650,sale:"",rating:4.8,reviews:150,sold:260,color:"فضي",sizes:["8 قطع"],stock:11,desc:"طقم أواني عملي للمطبخ المنزلي مع مقابض مريحة وسطح سهل التنظيف.",specs:{القطع:"8",الخامة:"ستانلس ستيل",الاستخدام:"غاز وكهرباء",اللون:"فضي"}},
{id:9,emoji:"💄",name:"مجموعة مكياج كاملة",cat:"عطور وجمال",sub:"مكياج",brand:"Syria Beauty",price:980,old:1250,sale:"",rating:4.5,reviews:410,sold:620,color:"متعدد",sizes:["مجموعة"],stock:30,desc:"مجموعة مختارة للاستخدام اليومي تشمل مستحضرات أساسية للوجه والعينين.",specs:{النوع:"مجموعة",الاستخدام:"يومي",العدد:"عدة منتجات",الجنس:"نسائي"}},
{id:10,emoji:"🚙",name:"سيارة أطفال كهربائية",cat:"ألعاب وهدايا",sub:"ألعاب أطفال",brand:"Syria Kids",price:670,old:850,sale:"",rating:4.4,reviews:230,sold:190,color:"أزرق",sizes:["موحد"],stock:9,desc:"سيارة أطفال بتصميم ممتع، مناسبة للعب المنزلي مع إشراف الأهل.",specs:{العمر:"3+ سنوات",الطاقة:"بطارية",اللون:"أزرق",الاستخدام:"ألعاب"}},
{id:11,emoji:"📱",name:"هاتف ذكي Nova 5G",cat:"إلكترونيات",sub:"هواتف",brand:"Syria Tech",price:6850,old:7200,sale:"",rating:4.7,reviews:92,sold:120,color:"أزرق",sizes:["128GB","256GB"],stock:7,desc:"هاتف ذكي بشاشة كبيرة واتصال 5G وكاميرا متعددة الاستخدامات.",specs:{الشبكة:"5G",التخزين:"128/256GB",الشاشة:"6.6 بوصة",الشحن:"سريع"}},
{id:12,emoji:"🧒",name:"طقم أطفال قطني",cat:"أزياء",sub:"ملابس أطفال",brand:"Syria Kids",price:520,old:690,sale:"-25%",rating:4.6,reviews:75,sold:155,color:"أزرق",sizes:["2Y","4Y","6Y","8Y"],stock:25,desc:"طقم أطفال قطني ناعم للاستخدام اليومي واللعب.",specs:{الخامة:"قطن",العمر:"2-8 سنوات",الجنس:"أطفال",اللون:"أزرق"}}
];


products.push(
{id:13,emoji:"💻",name:"لابتوب UltraBook 15",cat:"إلكترونيات",sub:"لابتوبات",brand:"Syria Tech",price:4890,old:5290,sale:"-8%",rating:4.8,reviews:64,sold:88,color:"فضي",sizes:["256GB","512GB"],stock:8,desc:"لابتوب سريع للدراسة والعمل والاستخدام اليومي.",specs:{المعالج:"Intel Core i5",الذاكرة:"16GB",التخزين:"256/512GB SSD",الشاشة:"15.6 بوصة"}},
{id:14,emoji:"📱",name:"iPhone Nova 256GB",cat:"إلكترونيات",sub:"آيفون",brand:"Syria Tech",price:7350,old:7800,sale:"-6%",rating:4.9,reviews:121,sold:140,color:"أسود",sizes:["256GB"],stock:6,desc:"هاتف ذكي حديث بسعة تخزين كبيرة وكاميرا عالية الدقة.",specs:{التخزين:"256GB",الشبكة:"5G",الشاشة:"6.5 بوصة",الشحن:"سريع"}},
{id:15,emoji:"📲",name:"Galaxy Tab 11",cat:"إلكترونيات",sub:"أيبادات",brand:"Syria Tech",price:3950,old:4200,sale:"",rating:4.7,reviews:83,sold:102,color:"رمادي",sizes:["128GB","256GB"],stock:12,desc:"جهاز لوحي للشغل والدراسة والترفيه بشاشة كبيرة.",specs:{التخزين:"128/256GB",الشاشة:"11 بوصة",الاتصال:"Wi-Fi",البطارية:"طويلة"}},
{id:16,emoji:"🖥️",name:"شاشة 27 بوصة 2K",cat:"إلكترونيات",sub:"شاشات",brand:"Syria Tech",price:2650,old:2900,sale:"",rating:4.6,reviews:51,sold:73,color:"أسود",sizes:["27\""],stock:10,desc:"شاشة عالية الدقة للعمل والألعاب.",specs:{الدقة:"2K",الحجم:"27 بوصة",التحديث:"100Hz",المداخل:"HDMI/DP"}}
);

const subcats={
"إلكترونيات":["موبايلات","آيفون","سامسونج","أيبادات","تابلت","كمبيوترات","لابتوبات","شاشات","سماعات","ساعات ذكية","كاميرات","إكسسوارات"],
"أزياء":["ملابس رجالية","ملابس نسائية","ملابس أطفال","فساتين","أحذية","حقائب","ملابس رياضية","إكسسوارات أزياء"],
"المنزل والمطبخ":["أدوات المطبخ","أواني الطبخ","أجهزة منزلية","أثاث","كنب","غرف نوم","ديكور","إضاءة","مفروشات"],
"عطور وجمال":["عطور نسائية","عطور رجالية","مكياج","عناية بالبشرة","عناية بالشعر","عناية شخصية","مستلزمات تجميل"],
"ألعاب وهدايا":["ألعاب أطفال","ألعاب تعليمية","ألعاب إلكترونية","هدايا","دمى","ألعاب خارجية"],
"أحذية وحقائب":["أحذية رجالية","أحذية نسائية","أحذية أطفال","حقائب رجالية","حقائب نسائية","حقائب سفر"],
"رياضة ولياقة":["ملابس رياضية","معدات رياضية","كمال أجسام","لياقة منزلية","كرة قدم","دراجات"],
"سيارات":["إكسسوارات سيارات","زيوت وفلاتر","إلكترونيات سيارات","تنظيف وعناية","إطارات"],
"مستلزمات مكتبية":["قرطاسية","طابعات","أحبار","مكاتب","كراسي مكتبية"],
"سوبرماركت":["مواد غذائية","مشروبات","منظفات","مستلزمات منزلية"]
};

let state={cat:"كل الأقسام",sub:"",sort:"featured",q:"",user:load(KEY.user,null),cart:load(KEY.cart,[]),fav:load(KEY.fav,[]),orders:load(KEY.orders,[]),recent:load(KEY.recent,[])};

function persist(){save(KEY.cart,state.cart);save(KEY.fav,state.fav);save(KEY.orders,state.orders);save(KEY.recent,state.recent);save(KEY.user,state.user)}
function cartQty(){return state.cart.reduce((s,x)=>s+x.qty,0)}
function toast(msg){let x=document.createElementr("div");x.className="toast";x.textContent=msg;document.body.appendChild(x);setTimeout(()=>x.remove(),2200)}
function modal(title,body,after){$("#modalContent").innerHTML=`<h2>${title}</h2>${body}`;$("#modal").classList.add("show");after?.($("#modalContent"))}
function closeModal(){$("#modal").classList.remove("show")}
function card(p){
 const fav=state.fav.includes(p.id);
 return `<article class="card" data-id="${p.id}"><button class="heart ${fav?"active":""}" data-fav="${p.id}">${fav?"♥":"♡"}</button>${p.sale?`<span class="sale">${p.sale}</span>`:""}<div class="pic" data-open="${p.id}">${p.emoji}</div><div class="stars">★★★★★ <small>(${p.reviews})</small></div><h3 data-open="${p.id}">${esc(p.name)}</h3><div class="price"><strong>${money(p.price)}</strong> <del>${money(p.old)}</del></div><small class="seller">يباع بواسطة ${esc(p.brand)}</small><div class="card-actions"><button class="add" data-add="${p.id}">أضف للسلة 🛒</button><button class="quick" data-open="${p.id}">التفاصيل</button></div></article>`
}
function filtered(){
 let a=products.filter(p=>(state.cat==="كل الأقسام"||p.cat===state.cat)&&(state.sub===""||p.sub===state.sub));
 if(state.q){let q=state.q.toLowerCase();a=a.filter(p=>(p.name+p.brand+p.cat+p.sub).toLowerCase().includes(q))}
 if(state.sort==="priceUp")a.sort((a,b)=>a.price-b.price);
 if(state.sort==="priceDown")a.sort((a,b)=>b.price-a.price);
 if(state.sort==="rating")a.sort((a,b)=>b.rating-a.rating);
 if(state.sort==="new")a.sort((a,b)=>b.id-a.id);
 return a
}
function renderProducts(){
 let a=filtered();
 $("#deals").innerHTML=products.filter(p=>p.sale).slice(0,5).map(card).join("");
 $("#best").innerHTML=products.slice().sort((a,b)=>b.sold-a.sold).slice(0,6).map(card).join("");
 let grid=$("#allProducts"); if(grid)grid.innerHTML=a.map(card).join("")||`<div class="empty">لا توجد منتجات مطابقة.</div>`;
 $("#resultTitle").textContent=state.q?`نتائج البحث عن "${state.q}"`:state.cat==="كل الأقسام"?"كل المنتجات":state.cat+(state.sub?" — "+state.sub:"");
 renderSubcats();
}
function renderSubcats(){
 let box=$("#subcats"); if(!box)return;
 const arr=state.cat==="كل الأقسام"?Object.keys(subcats):subcats[state.cat]||[];
 box.innerHTML=`<button data-cat="كل الأقسام" class="${state.cat==="كل الأقسام"?"on":""}">الكل</button>`+arr.map(s=>`<button data-sub="${esc(s)}" class="${state.sub===s?"on":""}">${esc(s)}</button>`).join("");
}
function renderUser(){
 const u=state.user;
 $("#accountBtn").innerHTML=`👤 <small>${u?"مرحباً، "+esc(u.name):"مرحباً، سجل الدخول"}</small><b>${u?"حسابي ▾":"تسجيل الدخول ▾"}</b>`;
}
function updateCounts(){$("#cartCount").textContent=cartQty()}
function add(id,qty=1,opts={}){
 const p=products.find(x=>x.id===id); if(!p)return;
 const found=state.cart.find(x=>x.id===id&&x.size===opts.size&&x.color===opts.color);
 if(found)found.qty+=qty;else state.cart.push({id,qty,size:opts.size||p.sizes[0],color:opts.color||p.color});
 persist();updateCounts();renderCart();toastr("تمت إضافة المنتج إلى السلة 🛒")
}
function removeCart(i){state.cart.splice(i,1);persist();renderCart();updateCounts()}
function renderCart(){
 let rows=state.cart.map((x,i)=>{let p=products.find(p=>p.id===x.id);return `<div class="cartrow"><span class="mini">${p.emoji}</span><div class="grow"><b>${esc(p.name)}</b><small>${x.size||""} ${x.color||""}</small><strong>${money(p.price*x.qty)}</strong><div class="qty"><button data-dec="${i}">−</button><b>${x.qty}</b><button data-inc="${i}">+</button><button class="remove" data-rem="${i}">حذف</button></div></div></div>`}).join("");
 $("#cartItems").innerHTML=rows||"<p class='empty'>السلة فارغة حالياً.</p>";
 $("#total").textContent=money(state.cart.reduce((s,x)=>s+products.find(p=>p.id===x.id).price*x.qty,0))
}
function remember(id){state.recent=[id,...state.recent.filter(x=>x!==id)].slice(0,10);persist()}
function productModal(id){
 const p=products.find(x=>x.id===id); if(!p)return; remember(id);
 const related=products.filter(x=>x.cat===p.cat&&x.id!==p.id).slice(0,4);
 modal(p.name,`<div class="product-detail"><div class="detail-image">${p.emoji}</div><div class="detail-info"><div class="stars">★★★★★ ${p.rating} (${p.reviews} تقييم)</div><span class="tag">${esc(p.brand)} • ${esc(p.cat)} • ${esc(p.sub)}</span><h1>${esc(p.name)}</h1><div class="detail-price">${money(p.price)} ${p.old?`<del>${money(p.old)}</del>`:""}</div><p>${esc(p.desc)}</p><div class="detail-meta"><b>متوفر: ${p.stock} قطعة</b><span>🚚 توصيل متوقع 1–4 أيام</span><span>↩️ إرجاع حسب سياسة المنتج</span></div><label>المقاس/الخيار<select id="sizeSel">${p.sizes.map(s=>`<option>${esc(s)}</option>`).join("")}</select></label><label>اللون<select id="colorSel"><option>${esc(p.color)}</option></select></label><div class="detail-actions"><button class="primary" id="addDetail">أضف إلى السلة</button><button class="primary buyDetail">اشترِ الآن</button><button class="secondary" id="favDetail">${state.fav.includes(p.id)?"♥ إزالة من المفضلة":"♡ أضف للمفضلة"}</button></div></div></div><div class="specs"><h3>تفاصيل المنتج</h3><table>${Object.entries(p.specs).map(([k,v])=>`<tr><th>${esc(k)}</th><td>${esc(v)}</td></tr>`).join("")}</table></div><div class="related"><h3>منتجات مشابهة</h3><div class="products">${related.map(card).join("")}</div></div>`,box=>{
  $("#addDetail",box).onclick=()=>{add(p.id,1,{size:$("#sizeSel").value,color:$("#colorSel").value});closeModal()};
  $(".buyDetail",box).onclick=()=>{add(p.id,1,{size:$("#sizeSel").value,color:$("#colorSel").value});closeModal();checkout()};
  $("#favDetail",box).onclick=()=>{toggleFav(p.id);closeModal();productModal(p.id)};
 });
}
function toggleFav(id){state.fav=state.fav.includes(id)?state.fav.filter(x=>x!==id):[...state.fav,id];persist();toast(state.fav.includes(id)?"تمت الإضافة للمفضلة":"تمت الإزالة من المفضلة");renderProducts()}
function authModal(){
 modal(state.user?"حسابك":"تسجيل الدخول / إنشاء حساب",state.user?`<div class="account-grid"><button data-account="orders">📦 طلباتك</button><button data-account="fav">♡ المفضلة (${state.fav.length})</button><button data-account="address">📍 عناوينك</button><button data-account="payments">💳 طرق الدفع</button><button data-account="recent">👁 شاهدته مؤخراً</button><button data-account="returns">↩️ الإرجاع والاسترداد</button><button data-logout>🚪 تسجيل الخروج</button></div>`:`<form id="loginForm" class="form"><input id="loginName" required placeholder="اسم المستخدم"><input id="loginPhone" required placeholder="رقم الهاتف"><input id="loginPass" type="password" required placeholder="كلمة المرور"><button class="primary">دخول / إنشاء الحساب</button></form>`,box=>{
   $("#loginForm",box)?.addEventListener("submit",e=>{e.preventDefault();state.user={name:$("#loginName").value.trim(),phone:$("#loginPhone").value.trim()};persist();renderUser();closeModal();toastr("تم إنشاء الحساب وتسجيل الدخول")});
   $$("[data-account]",box).forEach(b=>b.onclick=()=>accountSection(b.dataset.account));
   $("[data-logout]",box)?.addEventListener("click",()=>{state.user=null;persist();renderUser();closeModal();toastr("تم تسجيل الخروج")})
 });
}
function accountSection(type){
 if(type==="orders")return ordersModal();
 if(type==="fav")return favModal();
 if(type==="address")return addressModal();
 if(type==="payments")return paymentModal();
 if(type==="recent")return recentModal();
 if(type==="returns")return modal("الإرجاع والاسترداد",`<p>يمكنك طلب الإرجاع من تفاصيل أي طلب خلال المدة المحددة للمنتج.</p><p>للدعم: استخدم صفحة خدمة العملاء وأرسل رقم الطلب.</p>`);
}
function ordersModal(){
 let o=state.orders;
 modal("طلباتك",o.length?o.map(x=>`<div class="order"><div><b>طلب #${x.no}</b><span>${x.status}</span></div><small>${x.date} • ${money(x.total)}</small><p>${x.items.map(i=>esc(i.name)).join("، ")}</p><button class="secondary" data-track="${x.no}">تتبع الطلب</button></div>`).join(""):`<div class="empty">لا توجد طلبات بعد. أضف منتجات وأكمل الدفع لتظهر هنا.</div>`,box=>{$$("[data-track]",box).forEach(b=>b.onclick=()=>trackModal(b.dataset.track))})
}
function trackModal(no){
 const o=state.orders.find(x=>x.no===no);
 modal(`تتبع الطلب #${no}`,`<div class="timeline"><div class="done">✓ تم استلام الطلب</div><div class="done">✓ جاري تجهيز الطلب</div><div class="${o?.status==="في الطريق"||o?.status==="تم التسليم"?"done":""}">🚚 الشحنة في الطريق</div><div class="${o?.status==="تم التسليم"?"done":""}">🏠 تم التسليم</div></div>`)
}
function favModal(){
 let a=products.filter(p=>state.fav.includes(p.id));
 modal("قائمة المفضلة",a.length?`<div class="products">${a.map(card).join("")}</div>`:`<div class="empty">لم تضف أي منتج للمفضلة بعد.</div>`)
}
function recentModal(){
 let a=state.recent.map(id=>products.find(p=>p.id===id)).filter(Boolean);
 modal("المنتجات التي شاهدتها مؤخراً",a.length?`<div class="products">${a.map(card).join("")}</div>`:`<div class="empty">لا توجد منتجات شاهدتها مؤخراً.</div>`)
}
function addressModal(){
 let a=load(KEY.addresses,[]);
 modal("عناوينك",`<div id="addressList">${a.map((x,i)=>`<div class="address"><b>${esc(x.name)}</b><p>${esc(x.city)} — ${esc(x.address)}<br>${esc(x.phone)}</p><button data-deladdr="${i}">حذف</button></div>`).join("")||"<p>لا توجد عناوين محفوظة.</p>"}</div><form id="addressForm" class="form"><input name="name" required placeholder="اسم المستلم"><input name="phone" required placeholder="الهاتف"><input name="city" required placeholder="المدينة"><input name="address" required placeholder="العنوان التفصيلي"><button class="primary">حفظ العنوان</button></form>`,box=>{
 $("#addressForm",box).onsubmit=e=>{e.preventDefault();let f=new FormData(e.target),a=load(KEY.addresses,[]);a.push(Object.fromEntries(f));save(KEY.addresses,a);addressModal();toastr("تم حفظ العنوان")};
 $$("[data-deladdr]",box).forEach(b=>b.onclick=()=>{let a=load(KEY.addresses,[]);a.splice(+b.dataset.deladdr,1);save(KEY.addresses,a);addressModal()})
 })
}
function paymentModal(){
 let a=load(KEY.payments,[]);
 modal("طرق الدفع",`<div class="pay-options"><div>💳 بطاقة Visa / Mastercard <small>يتم تأكيد الدفع عند ربط بوابة الدفع</small></div><div>💚 شام كاش <small>الدفع اليدوي مع تأكيد التحويل</small></div><div>₮ USDT <small>الدفع عبر عنوان المحفظة عند تفعيله</small></div><div>💵 الدفع عند الاستلام <small>متاح حسب المدينة والمنتج</small></div></div><p>طرق الدفع المعروضة هنا جاهزة كواجهة. التحصيل الإلكتروني الحقيقي يحتاج مفاتيح وربط مزود دفع.</p>`)
}
function checkout(){
 if(!state.user)return authModal();
 if(!state.cart.length)return toastr("السلة فارغة");
 let addresses=load(KEY.addresses,[]);
 modal("إتمام الطلب",`<form id="checkoutForm" class="form"><h3>عنوان التوصيل</h3><select id="addr">${addresses.map((a,i)=>`<option value="${i}">${esc(a.name)} — ${esc(a.city)} — ${esc(a.address)}</option>`).join("")}</select>${addresses.length?"":"<p>لم تحفظ عنواناً بعد. أضف العنوان من حسابك أولاً.</p>"}<h3>طريقة الدفع</h3><select id="pay"><option>الدفع عند الاستلام</option><option>Visa / Mastercard</option><option>شام كاش</option><option>USDT</option></select><div class="checkout-summary">الإجمالي: <b>${money(state.cart.reduce((s,x)=>s+products.find(p=>p.id===x.id).price*x.qty,0))}</b></div><button class="primary" ${addresses.length?"":"disabled"}>تأكيد الطلب</button></form>`,box=>{
 $("#checkoutForm",box).onsubmit=e=>{e.preventDefault();let a=addresses[+$("#addr").value],items=state.cart.map(x=>{let p=products.find(p=>p.id===x.id);return {name:p.name,id:p.id,qty:x.qty,price:p.price}}),total=items.reduce((s,x)=>s+x.price*x.qty,0),no="SO"+Date.now().toString().slice(-8);state.orders.unshift({no,date:new Date().toLocaleString("ar"),items,total,payment:$("#pay").value,status:"تم استلام الطلب",address:a});state.cart=[];persist();updateCounts();renderCart();closeModal();toastr("تم إنشاء الطلب #"+no);ordersModal()}
 })
}
function searchRun(){
 state.q=$("#search").value.trim();state.cat=$("#searchCat").value||"كل الأقسام";state.sub="";renderProducts();
 $("#suggestions").innerHTML="";$("#allProducts")?.scrollIntoView({behavior:"smooth"})
}

const LANG_KEY="so_lang_v7";
const translations={
ar:{name:"العربية",search:"ابحث عن منتجات، ماركات أو أقسام...",all:"كل الأقسام",deals:"عروض اليوم",new:"وصل حديثاً",best:"الأكثر مبيعاً",help:"خدمة العملاء",orders:"تتبع الطلب",fav:"المفضلة",cart:"السلة",account:"حسابي",shop:"تسوق الآن",supportTitle:"خدمة العملاء",supportText:"كيف يمكننا مساعدتك؟",send:"إرسال",name:"الاسم",phone:"رقم الهاتف",message:"اكتب رسالتك",success:"تم إرسال طلبك لخدمة العملاء"},
en:{name:"English",search:"Search products, brands or categories...",all:"All Categories",deals:"Today's Deals",new:"New Arrivals",best:"Best Sellers",help:"Customer Service",orders:"Track Order",fav:"Wishlist",cart:"Cart",account:"Account",shop:"Shop Now",supportTitle:"Customer Service",supportText:"How can we help you?",send:"Send",name:"Name",phone:"Phone",message:"Write your message",success:"Your customer service request was sent"},
tr:{name:"Türkçe",search:"Ürün, marka veya kategori ara...",all:"Tüm Kategoriler",deals:"Günün Fırsatları",new:"Yeni Gelenler",best:"Çok Satanlar",help:"Müşteri Hizmetleri",orders:"Sipariş Takibi",fav:"Favoriler",cart:"Sepet",account:"Hesabım",shop:"Şimdi Alışveriş Yap",supportTitle:"Müşteri Hizmetleri",supportText:"Size nasıl yardımcı olabiliriz?",send:"Gönder",name:"Ad Soyad",phone:"Telefon",message:"Mesajınızı yazın",success:"Müşteri hizmetleri talebiniz gönderildi"}
};
let lang=localStorage.getItem(LANG_KEY)||"ar";
function tr(k){return translations[lang][k]||translations.ar[k]||k}
function setLang(next){
  lang=next;localStorage.setItem(LANG_KEY,lang);
  document.documentElement.lang=lang;document.documentElement.dir=lang==="ar"?"rtl":"ltr";
  const s=$("#search"); if(s)s.placeholder=tr("search");
  const sc=$("#searchCat"); if(sc && sc.options[0])sc.options[0].textContent=tr("all");
  const map={"footerContact":"contact","footerContact2":"contact","footerOrders":"orders","footerOrders2":"orders","footerReturns":"returns","footerReturns2":"returns","footerFaq":"contact","footerDeals":"deals","footerBest":"best","footerBrands":"brands","footerSell":"sell","footerAbout":"about","footerPrivacy":"privacy","footerTerms":"terms","footerShipping":"shipping"};
  Object.entries(map).forEach(([sel,key])=>{let x=$(sel);if(x)x.textContent=tr(key)});
  let label=$("#langCurrent");if(label)label.textContent=tr("name");
  toast(tr("name"));
}
function languageModal(){
 modal("🌐 اللغة / Language / Dil",`<div class="lang-options"><button data-lang="ar">🇸🇾 العربية</button><button data-lang="en">🇬🇧 English</button><button data-lang="tr">🇹🇷 Türkçe</button></div>`,box=>{
   $$("[data-lang]",box).forEach(b=>b.onclick=()=>{setLang(b.dataset.lang);closeModal()})
 })
}
function customerService(){
 modal(tr("supportTitle"),`<div class="support-head"><div>🎧</div><div><h3>${tr("supportText")}</h3><p>📞 +90 000 000 00 00 &nbsp; • &nbsp; 💬 دردشة الدعم</p><small>نرد على طلبات العملاء ونتابع مشاكل الطلبات والدفع والتوصيل.</small></div></div><form id="supportForm" class="form"><input id="supportName" required placeholder="${tr("name")}"><input id="supportPhone" required placeholder="${tr("phone")}"><select id="supportTopic"><option>استفسار عن طلب</option><option>الدفع</option><option>التوصيل</option><option>الإرجاع والاسترداد</option><option>مشكلة في الحساب</option><option>اقتراح</option></select><textarea id="supportMsg" required placeholder="${tr("message")}"></textarea><button class="primary">${tr("send")}</button></form>`,box=>{
   $("#supportForm",box).onsubmit=e=>{e.preventDefault();let tickets=load("so_support_v7",[]);tickets.unshift({id:"CS"+Date.now().toString().slice(-7),name:$("#supportName").value,phone:$("#supportPhone").value,topic:$("#supportTopic").value,message:$("#supportMsg").value,date:new Date().toLocaleString(),status:"مفتوح"});save("so_support_v7",tickets);closeModal();toast(tr("success"))}
 })
}


function footerPage(type){
 const pages={
  contact:["تواصل معنا",`<div class="footer-page"><h3>🎧 خدمة العملاء</h3><p>نحن جاهزون لمساعدتك في الطلبات والدفع والتوصيل والإرجاع.</p><button class="primary" id="openSupport">فتح خدمة العملاء</button><div class="contact-box">📞 +90 000 000 00 00<br>💬 دعم عبر الرسائل<br>⏰ يومياً 09:00–22:00</div></div>`],
  returns:["الإرجاع والاسترداد",`<div class="footer-page"><h3>↩️ طلب إرجاع</h3><p>يمكنك طلب الإرجاع من حسابك ثم اختيار الطلب والمنتج المطلوب إرجاعه.</p><button class="primary" id="openOrdersReturn">عرض طلباتي</button><h4>خطوات الإرجاع</h4><ol><li>افتح طلباتك.</li><li>اختر المنتج.</li><li>اختر سبب الإرجاع.</li><li>أرسل الطلب وانتظر تأكيد خدمة العملاء.</li></ol></div>`],
  about:["من نحن",`<div class="footer-page"><h3>سوريا أونلاين</h3><p>متجر إلكتروني يجمع منتجات متعددة في مكان واحد مع تجربة شراء سهلة، تتبع للطلبات وخدمة عملاء.</p><p>هدفنا تقديم تجربة واضحة وسريعة للمتسوق.</p></div>`],
  privacy:["سياسة الخصوصية",`<div class="footer-page"><h3>سياسة الخصوصية</h3><p>نستخدم بيانات الحساب والعنوان لإتمام الطلبات وخدمة العملاء. بيانات المتصفح المحلية مثل السلة والمفضلة تحفظ على جهازك في هذه النسخة.</p></div>`],
  terms:["شروط الاستخدام",`<div class="footer-page"><h3>شروط الاستخدام</h3><p>باستخدام المتجر توافق على استخدامه للشراء والتواصل ومتابعة الطلبات وفق الشروط المعروضة لكل خدمة.</p></div>`],
  shipping:["سياسة الشحن",`<div class="footer-page"><h3>🚚 سياسة الشحن</h3><p>مدة التوصيل تختلف حسب المدينة والمنتج. تظهر معلومات التوصيل في تفاصيل المنتج وعند إتمام الطلب.</p></div>`],
  deals:["العروض",`<div class="footer-page"><h3>🔥 عروض اليوم</h3><div class="products">${products.filter(p=>p.sale).map(card).join("")}</div></div>`],
  best:["الأكثر مبيعاً",`<div class="footer-page"><h3>🔥 الأكثر مبيعاً</h3><div class="products">${products.slice().sort((a,b)=>b.sold-a.sold).slice(0,10).map(card).join("")}</div></div>`],
  brands:["العلامات التجارية",`<div class="footer-page"><h3>🏷️ العلامات التجارية</h3><div class="brand-list">${[...new Set(products.map(p=>p.brand))].map(b=>`<button data-brand="${esc(b)}">${esc(b)}</button>`).join("")}</div></div>`],
  sell:["بيع معنا",`<div class="footer-page"><h3>🏪 بيع معنا</h3><p>يمكن للتاجر تجهيز بيانات المتجر والمنتجات ثم ربط لوحة البائع وقاعدة البيانات قبل الإطلاق الفعلي.</p><button class="primary" id="sellerSupport">تواصل مع خدمة العملاء</button></div>`]
 };
 const [title,body]=pages[type]||pages.about;
 modal(title,body,box=>{
   $("#openSupport",box)?.addEventListener("click",customerService);
   $("#openOrdersReturn",box)?.addEventListener("click",ordersModal);
   $("#sellerSupport",box)?.addEventListener("click",customerService);
   $$("[data-brand]",box).forEach(b=>b.onclick=()=>{closeModal();state.q=b.dataset.brand;$("#search").value=b.dataset.brand;searchRun()});
 });
}
function wireFooter(){
 const map={"footerContact":"contact","footerContact2":"contact","footerOrders":"orders","footerOrders2":"orders","footerReturns":"returns","footerReturns2":"returns","footerFaq":"contact","footerDeals":"deals","footerReturns":"returns","footerFaq":"contact","footerDeals":"deals","footerBest":"best","footerBrands":"brands","footerSell":"sell","footerAbout":"about","footerPrivacy":"privacy","footerTerms":"terms","footerShipping":"shipping"};
 Object.entries(map).forEach(([id,type])=>$("#"+id)?.addEventListener("click",()=>type==="orders"?ordersModal():footerPage(type)));
 $("#footerFav")?.addEventListener("click",favModal);
 $("#footerAddress")?.addEventListener("click",addressModal);
 $("#footerPayments")?.addEventListener("click",paymentModal);
}

function initExtraUI(){
 const main=$("main");
 if(!$("#languageBtn")){
   const top=$(".topin");
   if(top){
     const b=document.createElementr("button");b.id="languageBtn";b.className="language-btn";b.textContent="🌐 العربية";
     b.onclick=languageModal;top.appendChild(b);
   }
 }
 if(!$("#customerServiceBtn")){
   const b=document.createElementr("button");b.id="customerServiceBtn";b.className="customer-service-btn";b.textContent="🎧 "+tr("help");
   b.onclick=customerService;
   const nav=$(".navin"); if(nav)nav.appendChild(b);
 }
 if(!$("#catalogSection")){
   const sec=document.createElementr("section");sec.id="catalogSection";sec.className="section catalog section";
   sec.innerHTML=`<div class="sectitle"><div><h2 id="resultTitle">كل المنتجات</h2><a id="clearFilters">مسح الفلاتر</a></div><select id="sort"><option value="featured">الأكثر صلة</option><option value="new">وصل حديثاً</option><option value="rating">الأعلى تقييماً</option><option value="priceUp">السعر: من الأقل</option><option value="priceDown">السعر: من الأعلى</option></select></div><div id="subcats" class="subcats"></div><div id="allProducts" class="products catalog-grid"></div>`;
   main.appendChild(sec);
 }
 const footer=$("footer");
 if(!$("#serviceCards")){
   const sec=document.createElementr("section");sec.id="serviceCards";sec.className="wrap service-cards";
   sec.innerHTML=`<div><b>🚚 توصيل سريع</b><small>تتبع شحنتك من حسابك</small></div><div><b>🔒 دفع آمن</b><small>اختر طريقة الدفع المناسبة</small></div><div><b>↩️ إرجاع</b><small>اطلب الإرجاع من طلباتك</small></div><div><b>🎧 خدمة العملاء</b><small>مساعدة ومتابعة للطلبات</small></div>`;
   footer.before(sec)
 }
}
document.addEventListener("click",e=>{
 const open=e.target.closestr("[data-open]"); if(open){productModal(+open.dataset.open);return}
 const addBtn=e.target.closestr("[data-add]");if(addBtn){add(+addBtn.dataset.add);return}
 const fav=e.target.closestr("[data-fav]");if(fav){toggleFav(+fav.dataset.fav);return}
 const inc=e.target.closestr("[data-inc]");if(inc){state.cart[+inc.dataset.inc].qty++;persist();renderCart();updateCounts();return}
 const dec=e.target.closestr("[data-dec]");if(dec){let x=state.cart[+dec.dataset.dec];x.qty--;if(x.qty<1)state.cart.splice(+dec.dataset.dec,1);persist();renderCart();updateCounts();return}
 const rem=e.target.closestr("[data-rem]");if(rem){removeCart(+rem.dataset.rem);return}
 const sub=e.target.closestr("[data-sub]");if(sub){state.sub=sub.dataset.sub;renderProducts();return}
 const cat=e.target.closestr("[data-cat]");if(cat){state.cat=cat.dataset.cat;state.sub="";renderProducts();return}
 const ac=e.target.closestr("[data-account]");if(ac){accountSection(ac.dataset.account);return}
 if(e.target.closestr("#cartBtn")){$("#cartPanel").classList.add("open");return}
 if(e.target.closestr("#ordersBtn")){ordersModal();return}
 if(e.target.closestr("#favBtn")){favModal();return}
 if(e.target.closestr("#accountBtn")){authModal();return}
 if(e.target.closestr("#allBtn")){openDrawer();return}
 if(e.target.closestr("#languageBtn")){languageModal();return}
 if(e.target.closestr("#customerServiceBtn")){customerService();return}
 if(e.target.closestr(".checkout")){checkout();return}
 if(e.target.closestr("#clearFilters")){state={...state,cat:"كل الأقسام",sub:"",q:""};$("#search").value="";renderProducts();return}
 if(e.target.closestr(".heroMain button")||e.target.closestr(".side button")){$("#catalogSection").scrollIntoView({behavior:"smooth"});return}
});
const drawer=$("#drawer"),shade=$("#shade");
function openDrawer(){drawer?.classList.add("open");shade?.classList.add("show")}
function closeDrawer(){drawer?.classList.remove("open");shade?.classList.remove("show")}
$("#menuBtn")?.addEventListener("click",openDrawer);$("#closeMenu")?.addEventListener("click",closeDrawer);shade?.addEventListener("click",closeDrawer);
$("#modal .x")?.addEventListener("click",closeModal);
$("#cartPanel .panelhead button")?.addEventListener("click",()=>$("#cartPanel").classList.remove("open"));
$("#cartBtn")?.addEventListener("click",()=>$("#cartPanel").classList.add("open"));
$("#search")?.addEventListener("input",e=>{let q=e.target.value.trim().toLowerCase();let hits=products.filter(p=>(p.name+p.brand+p.cat+p.sub).toLowerCase().includes(q)).slice(0,6);$("#suggestions").innerHTML=q?hits.map(p=>`<div data-open="${p.id}">${p.emoji} ${esc(p.name)} <small>${esc(p.cat)}</small></div>`).join(""):""});
$("#search")?.addEventListener("keydown",e=>{if(e.key==="Enter")searchRun()});
$(".searchbox>button")?.addEventListener("click",searchRun);
$("#searchCat")?.addEventListener("change",e=>{state.cat=e.target.value==="كل الأقسام"?"كل الأقسام":e.target.value;state.q="";renderProducts()});
$("#sort")?.addEventListener("change",e=>{state.sort=e.target.value;renderProducts()});

let t=6*3600+25*60+18;
setInterval(()=>{t=Math.max(0,t-1);let h=Math.floor(t/3600),m=Math.floor(t%3600/60),s=t%60;let x=$("#timer");if(x)x.textContent=[h,m,s].map(n=>String(n).padStart(2,"0")).join(":")},1000);

initExtraUI();setLang(lang);renderProducts();renderCart();updateCounts();renderUser();wireFooter();
})();
