
(() => {
const $=(s,r=document)=>r.querySelector(s), $$=(s,r=document)=>[...r.querySelectorAll(s)];
const KEY={user:"so_user_v6",account:"so_account_v10",cart:"so_cart_v6",fav:"so_fav_v6",orders:"so_orders_v6",recent:"so_recent_v6",addresses:"so_addresses_v6",payments:"so_payments_v6"};
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

// Admin-managed catalog overlay: products created/edited from /admin.html
// are merged into the storefront without removing the built-in demo catalog.
const ADMIN_PRODUCTS_KEY="so_admin_products_v1";
function applyAdminCatalog(){
  const custom=load(ADMIN_PRODUCTS_KEY,[]);
  if(!Array.isArray(custom)) return;
  const byId=new Map(products.map(p=>[Number(p.id),p]));
  custom.forEach(p=>{
    const id=Number(p.id);
    if(!id)return;
    if(p.active===false){byId.delete(id);return;}
    byId.set(id,{...p,id,price:Number(p.price||0),old:Number(p.old||p.price||0),rating:Number(p.rating||5),reviews:Number(p.reviews||0),sold:Number(p.sold||0),stock:Number(p.stock||0),sizes:Array.isArray(p.sizes)&&p.sizes.length?p.sizes:["موحد"],specs:p.specs||{}});
  });
  products.splice(0,products.length,...byId.values());
}
applyAdminCatalog();

const categoryOrder=["إلكترونيات","أزياء","المنزل والمطبخ","عطور وجمال","أحذية وحقائب","رياضة ولياقة","ألعاب وهدايا","سيارات","مستلزمات مكتبية","سوبرماركت"];
const subcats={
"إلكترونيات":["موبايلات","آيفون","سامسونج","هواتف","أيبادات","تابلت","كمبيوترات","لابتوبات","شاشات","سماعات","ساعات ذكية","كاميرات","إكسسوارات"],
"أزياء":["ملابس رجالية","ملابس نسائية","ملابس أطفال","فساتين","جاكيتات","بناطيل","حقائب نسائية","حقائب رجالية","إكسسوارات"],
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
function toast(msg){let x=document.createElement("div");x.className="toast";x.textContent=msg;document.body.appendChild(x);setTimeout(()=>x.remove(),2200)}
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
 const ub=$("#drawerUserBox");
 if(ub) ub.innerHTML=u?`👤 <b>مرحباً، ${esc(u.name)}</b><small>ملفك الشخصي جاهز</small>`:`👤 <b>مرحباً بك</b><div class="auth-drawer-actions"><button id="drawerLogin">تسجيل الدخول</button><button id="drawerSignup">إنشاء حساب</button></div>`;
 const logout=$("#drawerLogout");
 if(logout){ logout.style.display=u?"block":"none"; }
}
function updateCounts(){$("#cartCount").textContent=cartQty()}
function add(id,qty=1,opts={}){
 const p=products.find(x=>x.id===id); if(!p)return;
 const found=state.cart.find(x=>x.id===id&&x.size===opts.size&&x.color===opts.color);
 if(found)found.qty+=qty;else state.cart.push({id,qty,size:opts.size||p.sizes[0],color:opts.color||p.color});
 persist();updateCounts();renderCart();toast("تمت إضافة المنتج إلى السلة 🛒")
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
 if(state.user){
   modal("حسابي",`<div class="profile-summary"><div class="profile-avatar">👤</div><div><h3>${esc(state.user.name)}</h3><p>${esc(state.user.email||state.user.phone||"")}</p></div></div><div class="account-grid"><button data-account="profile">👤 ملفي الشخصي</button><button data-account="orders">📦 طلباتك</button><button data-account="fav">♡ المفضلة (${state.fav.length})</button><button data-account="address">📍 عناوينك</button><button data-account="payments">💳 طرق الدفع</button><button data-account="recent">👁 شاهدته مؤخراً</button><button data-account="returns">↩️ الإرجاع والاسترداد</button><button data-logout>🚪 تسجيل الخروج</button></div>`,box=>{
     $$('[data-account]',box).forEach(b=>b.onclick=()=>accountSection(b.dataset.account));
     $(`[data-logout]`,box)?.addEventListener("click",()=>{state.user=null;persist();renderUser();closeModal();toast("تم تسجيل الخروج")});
   });
   return;
 }
 modal("أهلاً بك في سوريا أونلاين",`<div class="auth-choice"><p>إذا كان لديك حساب من قبل سجّل دخولك، وإذا كنت جديداً أنشئ حساباً جديداً.</p><div class="auth-choice-buttons"><button class="primary" id="openLogin">🔐 تسجيل الدخول</button><button class="secondary" id="openSignup">👤 إنشاء حساب جديد</button></div></div>`,box=>{
   $("#openLogin",box).onclick=loginModal;
   $("#openSignup",box).onclick=signupModal;
 });
}
function signupModal(){
 modal("إنشاء حساب جديد",`<div class="signup-note">أدخل بياناتك الأساسية لإنشاء حسابك، وبعد التسجيل سيظهر اسمك في ملفك الشخصي.</div><form id="signupForm" class="form signup-form">
   <div class="form-row"><label>الاسم<input id="signupFirst" required placeholder="الاسم الأول"></label><label>الكنية / اسم العائلة<input id="signupLast" required placeholder="اسم العائلة"></label></div>
   <label>الجنس<select id="signupGender"><option value="">اختر الجنس</option><option value="ذكر">ذكر</option><option value="أنثى">أنثى</option></select></label>
   <label>تاريخ الميلاد<input id="signupBirth" type="date" required></label>
   <label>البريد الإلكتروني<input id="signupEmail" type="email" required placeholder="example@email.com"></label>
   <div class="form-row"><label>رمز الدولة<select id="signupCode"><option value="+90">🇹🇷 +90</option><option value="+963">🇸🇾 +963</option><option value="+49">🇩🇪 +49</option><option value="+33">🇫🇷 +33</option></select></label><label>رقم الهاتف<input id="signupPhone" required inputmode="tel" placeholder="5xxxxxxxxx"></label></div>
   <label>كلمة المرور<input id="signupPass" type="password" minlength="6" required placeholder="6 أحرف أو أكثر"></label>
   <label class="checkline"><input id="signupMarketing" type="checkbox"> أريد تلقي العروض والتنبيهات الجديدة</label>
   <button class="primary" type="submit">إنشاء الحساب</button>
 </form><p class="login-hint">لديك حساب مسبقاً؟ <a href="#" id="switchToLogin">تسجيل الدخول</a></p>`,box=>{
   $("#switchToLogin",box).onclick=e=>{e.preventDefault();loginModal()};
   $("#signupForm",box).addEventListener("submit",e=>{
     e.preventDefault();
     const first=$("#signupFirst",box).value.trim(), last=$("#signupLast",box).value.trim();
     const email=$("#signupEmail",box).value.trim(), phone=$("#signupPhone",box).value.trim(), pass=$("#signupPass",box).value;
     const account={name:`${first} ${last}`.trim(),firstName:first,lastName:last,gender:$("#signupGender",box).value,birthDate:$("#signupBirth",box).value,email,countryCode:$("#signupCode",box).value,phone,marketing:$("#signupMarketing",box).checked,password:pass};
     save(KEY.account,account);
     state.user={...account}; delete state.user.password;
     persist();renderUser();closeModal();toast("تم إنشاء حسابك بنجاح 🎉");
     setTimeout(profileModal,180);
   });
 });
}
function loginModal(){
 modal("تسجيل الدخول",`<div class="signup-note">سجّل الدخول باستخدام البريد الإلكتروني أو رقم الهاتف وكلمة المرور.</div><form id="loginForm" class="form signup-form">
   <label>البريد الإلكتروني أو رقم الهاتف<input id="loginId" required placeholder="example@email.com أو رقم الهاتف"></label>
   <label>كلمة المرور<input id="loginPass" type="password" required placeholder="كلمة المرور"></label>
   <button class="primary" type="submit">تسجيل الدخول</button>
 </form><p class="login-hint">ما عندك حساب؟ <a href="#" id="switchToSignup">إنشاء حساب جديد</a></p>`,box=>{
   $("#switchToSignup",box).onclick=e=>{e.preventDefault();signupModal()};
   $("#loginForm",box).addEventListener("submit",e=>{
     e.preventDefault();
     const id=$("#loginId",box).value.trim().toLowerCase(), pass=$("#loginPass",box).value;
     const account=load(KEY.account,null);
     if(!account){toast("لا يوجد حساب محفوظ. أنشئ حساباً جديداً أولاً");return}
     const matches=id===String(account.email||"").toLowerCase() || id===String(account.phone||"").toLowerCase() || id===String((account.countryCode||"")+String(account.phone||"")).toLowerCase();
     if(!matches || pass!==account.password){toast("بيانات تسجيل الدخول غير صحيحة");return}
     state.user={...account}; delete state.user.password;
     persist();renderUser();closeModal();toast("تم تسجيل الدخول بنجاح 👋");
   });
 });
}

function profileModal(){
 if(!state.user)return authModal();
 const u=state.user;
 modal("👤 ملفي الشخصي",`<div class="profile-card"><div class="profile-avatar">👤</div><h2>${esc(u.name)}</h2><p>${esc(u.email||"")}</p></div><div class="profile-fields">
   <div><b>الاسم الكامل</b><span>${esc(u.name)}</span></div>
   <div><b>الجنس</b><span>${esc(u.gender||"غير محدد")}</span></div>
   <div><b>تاريخ الميلاد</b><span>${esc(u.birthDate||"غير محدد")}</span></div>
   <div><b>البريد الإلكتروني</b><span>${esc(u.email||"-")}</span></div>
   <div><b>الهاتف</b><span>${esc((u.countryCode||"")+" "+(u.phone||""))}</span></div>
   <div><b>العروض والإشعارات</b><span>${u.marketing?"مفعلة":"غير مفعلة"}</span></div>
 </div><button class="secondary profile-edit" id="editProfile">تعديل بياناتي</button>`,box=>{$("#editProfile",box).onclick=()=>editProfileModal()});
}
function editProfileModal(){
 const u=state.user||{};
 modal("تعديل الملف الشخصي",`<form id="editProfileForm" class="form signup-form">
   <div class="form-row"><label>الاسم<input id="editFirst" required value="${esc(u.firstName||u.name||"")}"></label><label>الكنية / اسم العائلة<input id="editLast" required value="${esc(u.lastName||"")}"></label></div>
   <label>الجنس<select id="editGender"><option value="">اختر الجنس</option><option ${u.gender==="ذكر"?"selected":""}>ذكر</option><option ${u.gender==="أنثى"?"selected":""}>أنثى</option></select></label>
   <label>تاريخ الميلاد<input id="editBirth" type="date" value="${esc(u.birthDate||"")}"></label>
   <label>البريد الإلكتروني<input id="editEmail" type="email" required value="${esc(u.email||"")}"></label>
   <div class="form-row"><label>رمز الدولة<select id="editCode"><option value="+90" ${u.countryCode==="+90"?"selected":""}>🇹🇷 +90</option><option value="+963" ${u.countryCode==="+963"?"selected":""}>🇸🇾 +963</option><option value="+49" ${u.countryCode==="+49"?"selected":""}>🇩🇪 +49</option><option value="+33" ${u.countryCode==="+33"?"selected":""}>🇫🇷 +33</option></select></label><label>رقم الهاتف<input id="editPhone" required value="${esc(u.phone||"")}"></label></div>
   <label class="checkline"><input id="editMarketing" type="checkbox" ${u.marketing?"checked":""}> أريد تلقي العروض والتنبيهات الجديدة</label>
   <button class="primary" type="submit">حفظ التعديلات</button>
 </form>`,box=>{$("#editProfileForm",box).onsubmit=e=>{e.preventDefault();const first=$("#editFirst",box).value.trim(),last=$("#editLast",box).value.trim();state.user={...state.user,name:`${first} ${last}`.trim(),firstName:first,lastName:last,gender:$("#editGender",box).value,birthDate:$("#editBirth",box).value,email:$("#editEmail",box).value.trim(),countryCode:$("#editCode",box).value,phone:$("#editPhone",box).value.trim(),marketing:$("#editMarketing",box).checked};persist();renderUser();closeModal();toast("تم تحديث الملف الشخصي");setTimeout(profileModal,150)}});
}

function accountSection(type){
 closeDrawer();
 if(type==="profile")return profileModal();
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
 $("#addressForm",box).onsubmit=e=>{e.preventDefault();let f=new FormData(e.target),a=load(KEY.addresses,[]);a.push(Object.fromEntries(f));save(KEY.addresses,a);addressModal();toast("تم حفظ العنوان")};
 $$("[data-deladdr]",box).forEach(b=>b.onclick=()=>{let a=load(KEY.addresses,[]);a.splice(+b.dataset.deladdr,1);save(KEY.addresses,a);addressModal()})
 })
}
function paymentModal(){
 const title=currentLang==="ar"?"طرق الدفع":currentLang==="tr"?"Ödeme Yöntemleri":"Payment Methods";
 const labels=currentLang==="ar"
  ?{card:"بطاقة Visa / Mastercard",cardSub:"أدخل بيانات البطاقة لإتمام الدفع",cash:"شام كاش",cashSub:"أدخل بيانات التحويل لتأكيد الدفع",usdt:"USDT ₮",usdtSub:"أدخل بيانات محفظتك لتأكيد التحويل",cod:"الدفع عند الاستلام",codSub:"أدخل بيانات الاستلام للتأكيد",name:"الاسم الكامل",phone:"رقم الهاتف",cardNo:"رقم البطاقة",expiry:"تاريخ الانتهاء",cvv:"CVV",ref:"رقم/مرجع التحويل",wallet:"عنوان المحفظة",network:"الشبكة",address:"عنوان التوصيل",confirm:"تأكيد البيانات",saved:"تم حفظ بيانات الدفع",required:"يرجى تعبئة جميع البيانات المطلوبة"}
  :currentLang==="tr"
  ?{card:"Visa / Mastercard",cardSub:"Ödeme için kart bilgilerinizi girin",cash:"Sham Cash",cashSub:"Ödemeyi doğrulamak için transfer bilgilerini girin",usdt:"USDT ₮",usdtSub:"Transferi doğrulamak için cüzdan bilgilerinizi girin",cod:"Kapıda Ödeme",codSub:"Teslimat bilgilerinizi girin",name:"Ad Soyad",phone:"Telefon",cardNo:"Kart Numarası",expiry:"Son Kullanma",cvv:"CVV",ref:"Transfer Referansı",wallet:"Cüzdan Adresi",network:"Ağ",address:"Teslimat Adresi",confirm:"Bilgileri Onayla",saved:"Ödeme bilgileriniz kaydedildi",required:"Lütfen gerekli tüm alanları doldurun"}
  :{card:"Visa / Mastercard Card",cardSub:"Enter your card details to complete payment",cash:"Sham Cash",cashSub:"Enter transfer details to confirm payment",usdt:"USDT ₮",usdtSub:"Enter wallet details to confirm the transfer",cod:"Cash on Delivery",codSub:"Enter delivery details to confirm",name:"Full Name",phone:"Phone Number",cardNo:"Card Number",expiry:"Expiry Date",cvv:"CVV",ref:"Transfer Reference",wallet:"Wallet Address",network:"Network",address:"Delivery Address",confirm:"Confirm Details",saved:"Payment details saved",required:"Please fill in all required fields"};

 modal(title,`
 <div class="pay-options" id="paymentChoices">
   <button type="button" data-pay-choice="card"><b>💳 ${labels.card}</b><small>${labels.cardSub}</small></button>
   <button type="button" data-pay-choice="cash"><b>💚 ${labels.cash}</b><small>${labels.cashSub}</small></button>
   <button type="button" data-pay-choice="usdt"><b>₮ ${labels.usdt}</b><small>${labels.usdtSub}</small></button>
   <button type="button" data-pay-choice="cod"><b>💵 ${labels.cod}</b><small>${labels.codSub}</small></button>
 </div>
 <div id="paymentFormArea"></div>
 <p class="payment-note">${currentLang==="ar"?"بعد اختيار طريقة الدفع، ستظهر لك خانات تعبئة البيانات الخاصة بها.":currentLang==="tr"?"Ödeme yöntemini seçtikten sonra ilgili bilgi alanları açılacaktır.":"Choose a payment method to open its required information fields."}</p>
 `,box=>{
   const area=$("#paymentFormArea",box);
   $$("[data-pay-choice]",box).forEach(btn=>btn.onclick=()=>{
     const type=btn.dataset.payChoice;
     const formClass="form payment-entry-form";
     let fields="";
     if(type==="card") fields=`
       <input name="name" required placeholder="${labels.name}">
       <input name="phone" required inputmode="tel" placeholder="${labels.phone}">
       <input name="cardNo" required inputmode="numeric" maxlength="19" placeholder="${labels.cardNo}">
       <div class="form-row"><input name="expiry" required placeholder="${labels.expiry}"><input name="cvv" required inputmode="numeric" maxlength="4" placeholder="${labels.cvv}"></div>`;
     if(type==="cash") fields=`
       <input name="name" required placeholder="${labels.name}">
       <input name="phone" required inputmode="tel" placeholder="${labels.phone}">
       <input name="ref" required placeholder="${labels.ref}">`;
     if(type==="usdt") fields=`
       <input name="name" required placeholder="${labels.name}">
       <input name="wallet" required placeholder="${labels.wallet}">
       <input name="network" required placeholder="${labels.network}">
       <input name="ref" required placeholder="${labels.ref}">`;
     if(type==="cod") fields=`
       <input name="name" required placeholder="${labels.name}">
       <input name="phone" required inputmode="tel" placeholder="${labels.phone}">
       <textarea name="address" required placeholder="${labels.address}"></textarea>`;
     area.innerHTML=`<form id="selectedPaymentForm" class="${formClass}" data-type="${type}">
       <h3>${type==="card"?"💳 ":type==="cash"?"💚 ":type==="usdt"?"₮ ":"💵 "}${type==="card"?labels.card:type==="cash"?labels.cash:type==="usdt"?labels.usdt:labels.cod}</h3>
       ${fields}
       <button class="primary" type="submit">${labels.confirm}</button>
     </form>`;
     $("#selectedPaymentForm",box).onsubmit=e=>{
       e.preventDefault();
       const data=Object.fromEntries(new FormData(e.currentTarget).entries());
       data.type=type; data.updatedAt=new Date().toISOString();
       save("so_payment_profile_v6",data);
       toast(labels.saved);
     };
     area.scrollIntoView({behavior:"smooth",block:"nearest"});
   });
 });
}
function checkout(){
 if(!state.user)return authModal();
 if(!state.cart.length)return toast("السلة فارغة");
 let addresses=load(KEY.addresses,[]);
 modal("إتمام الطلب",`<form id="checkoutForm" class="form"><h3>عنوان التوصيل</h3><select id="addr">${addresses.map((a,i)=>`<option value="${i}">${esc(a.name)} — ${esc(a.city)} — ${esc(a.address)}</option>`).join("")}</select>${addresses.length?"":"<p>لم تحفظ عنواناً بعد. أضف العنوان من حسابك أولاً.</p>"}<h3>طريقة الدفع</h3><select id="pay"><option>الدفع عند الاستلام</option><option>Visa / Mastercard</option><option>شام كاش</option><option>USDT</option></select><div class="checkout-summary">الإجمالي: <b>${money(state.cart.reduce((s,x)=>s+products.find(p=>p.id===x.id).price*x.qty,0))}</b></div><button class="primary" ${addresses.length?"":"disabled"}>تأكيد الطلب</button></form>`,box=>{
 $("#checkoutForm",box).onsubmit=e=>{e.preventDefault();let a=addresses[+$("#addr").value],items=state.cart.map(x=>{let p=products.find(p=>p.id===x.id);return {name:p.name,id:p.id,qty:x.qty,price:p.price}}),total=items.reduce((s,x)=>s+x.price*x.qty,0),no="SO"+Date.now().toString().slice(-8);state.orders.unshift({no,date:new Date().toLocaleString("ar"),items,total,payment:$("#pay").value,status:"تم استلام الطلب",address:a});state.cart=[];persist();updateCounts();renderCart();closeModal();toast("تم إنشاء الطلب #"+no);ordersModal()}
 })
}
function searchRun(){
 state.q=$("#search").value.trim();state.cat=$("#searchCat").value||"كل الأقسام";state.sub="";renderProducts();
 $("#suggestions").innerHTML="";$("#allProducts")?.scrollIntoView({behavior:"smooth"})
}

/* V6 FULL activation: all visible navigation, footer, language and customer-service controls */
const LANG_KEY="so_lang_v6";
const LANG={
ar:{dir:"rtl",name:"العربية",search:"إبحث عن منتجات، ماركات أو أقسام...",all:"كل الأقسام",deals:"عروض اليوم",new:"وصل حديثاً",best:"الأكثر مبيعاً",featured:"المنتجات المميزة",brands:"العلامات التجارية",gift:"بطاقات الهدايا",sell:"بيع معنا",help:"المساعدة",track:"تتبع الطلب",service:"خدمة العملاء",shop:"تسوق الآن",clear:"مسح الفلاتر",related:"منتجات مشابهة",details:"تفاصيل المنتج"},
en:{dir:"ltr",name:"English",search:"Search products, brands or categories...",all:"All Categories",deals:"Today's Deals",new:"New Arrivals",best:"Best Sellers",featured:"Featured Products",brands:"Brands",gift:"Gift Cards",sell:"Sell With Us",help:"Help",track:"Track Order",service:"Customer Service",shop:"Shop Now",clear:"Clear Filters",related:"Related Products",details:"Product Details"},
tr:{dir:"ltr",name:"Türkçe",search:"Ürün, marka veya kategori ara...",all:"Tüm Kategoriler",deals:"Günün Fırsatları",new:"Yeni Gelenler",best:"Çok Satanlar",featured:"Öne Çıkanlar",brands:"Markalar",gift:"Hediye Kartları",sell:"Bizimle Sat",help:"Yardım",track:"Sipariş Takibi",service:"Müşteri Hizmetleri",shop:"Şimdi Alışveriş Yap",clear:"Filtreleri Temizle",related:"Benzer Ürünler",details:"Ürün Detayları"}
};
let currentLang=localStorage.getItem(LANG_KEY)||"ar";
function languageModal(){
 modal("🌐 اللغة / Language / Dil",`<div class="lang-options"><button data-lang="ar">🇸🇾 العربية</button><button data-lang="en">🇬🇧 English</button><button data-lang="tr">🇹🇷 Türkçe</button></div>`,box=>{
  $$("[data-lang]",box).forEach(b=>b.onclick=()=>{setLanguage(b.dataset.lang);closeModal()})
 })
}
function setLanguage(lang){
 currentLang=LANG[lang]?lang:"ar";localStorage.setItem(LANG_KEY,currentLang);
 document.documentElement.lang=currentLang;document.documentElement.dir=LANG[currentLang].dir;
 const t=LANG[currentLang];
 $("#search").placeholder=t.search;
 if($("#searchCat")?.options[0])$("#searchCat").options[0].textContent=t.all;
 const texts={
  "#helpTop":t.help,"#trackTop":t.track,"#serviceTop":t.service,
  "#navDeals":t.deals,"#navNew":t.new,"#navBest":t.best,"#navFeatured":t.featured,"#navBrands":t.brands,"#navGift":t.gift,"#navSell":t.sell,
  "#heroShop":t.shop,"#heroElectronics":t.shop,"#heroHome":t.shop,"#featureToys":t.shop,"#featureHome":t.shop,"#featureBeauty":t.shop,
  "#clearFilters":t.clear
 };
 Object.entries(texts).forEach(([s,v])=>{const x=$(s);if(x)x.textContent=v});
 $("#languageBtn").textContent=`🌐 ${t.name}`;
}
function customerService(){
 modal(currentLang==="ar"?"خدمة العملاء":currentLang==="tr"?"Müşteri Hizmetleri":"Customer Service",`
 <div class="support-box"><h3>🎧 ${currentLang==="ar"?"كيف يمكننا مساعدتك؟":currentLang==="tr"?"Size nasıl yardımcı olabiliriz?":"How can we help you?"}</h3>
 <p>📞 +90 000 000 00 00 &nbsp; • &nbsp; 💬 الدعم عبر الرسائل</p>
 <form id="supportForm" class="form">
 <input id="supportName" required placeholder="${currentLang==="ar"?"الاسم":currentLang==="tr"?"Ad Soyad":"Name"}">
 <input id="supportPhone" required placeholder="${currentLang==="ar"?"رقم الهاتف":currentLang==="tr"?"Telefon":"Phone"}">
 <select id="supportTopic"><option>استفسار عن طلب</option><option>الدفع</option><option>التوصيل</option><option>الإرجاع والاسترداد</option><option>الحساب</option><option>اقتراح</option></select>
 <textarea id="supportMsg" required placeholder="${currentLang==="ar"?"اكتب رسالتك":currentLang==="tr"?"Mesajınızı yazın":"Write your message"}"></textarea>
 <button class="primary">${currentLang==="ar"?"إرسال":currentLang==="tr"?"Gönder":"Send"}</button></form></div>`,box=>{
  $("#supportForm",box).onsubmit=e=>{e.preventDefault();let a=load("so_support_v6",[]);a.unshift({id:"CS"+Date.now().toString().slice(-8),name:$("#supportName").value,phone:$("#supportPhone").value,topic:$("#supportTopic").value,message:$("#supportMsg").value,date:new Date().toLocaleString(),status:"مفتوح"});save("so_support_v6",a);closeModal();toast(currentLang==="ar"?"تم إرسال طلب خدمة العملاء":currentLang==="tr"?"Talebiniz gönderildi":"Your support request was sent")}
 })
}
function simpleInfo(title,body){modal(title,`<div class="info-page">${body}</div>`)}
const SETTINGS_NOTIF_KEY="so_notifications_v6";
const SETTINGS_CURRENCY_KEY="so_currency_v6";
function settingsModal(){
 const notif=localStorage.getItem(SETTINGS_NOTIF_KEY)!=="0";
 const currency=localStorage.getItem(SETTINGS_CURRENCY_KEY)||"TRY";
 modal("⚙️ الإعدادات العامة",`<div class="settings-list">
  <div class="settings-item"><div class="settings-info"><b>🌐 اللغة</b><small>لغة واجهة المتجر</small></div><button id="settingsLanguage">${LANG[currentLang].name}</button></div>
  <div class="settings-item"><div class="settings-info"><b>💱 العملة</b><small>العملة المفضلة لعرض الأسعار</small></div><select id="settingsCurrency"><option value="TRY">الليرة التركية TRY</option><option value="SYP">الليرة السورية SYP</option></select></div>
  <div class="settings-item"><div class="settings-info"><b>🔔 إشعارات الطلبات</b><small>تنبيهات حالة الطلب وخدمة العملاء</small></div><button id="settingsNotif" class="settings-toggle ${notif?"on":""}" aria-label="الإشعارات"></button></div>
  <div class="settings-item"><div class="settings-info"><b>🔒 الخصوصية</b><small>إدارة بيانات الحساب المحفوظة على هذا الجهاز</small></div><button id="settingsPrivacy">عرض</button></div>
 </div>`,box=>{
  $("#settingsCurrency",box).value=currency;
  $("#settingsLanguage",box).onclick=()=>{closeModal();languageModal()};
  $("#settingsCurrency",box).onchange=e=>{localStorage.setItem(SETTINGS_CURRENCY_KEY,e.target.value);toast(e.target.value==="TRY"?"تم اختيار الليرة التركية":"تم اختيار الليرة السورية")};
  $("#settingsNotif",box).onclick=e=>{const on=!e.currentTarget.classList.contains("on");e.currentTarget.classList.toggle("on",on);localStorage.setItem(SETTINGS_NOTIF_KEY,on?"1":"0");toast(on?"تم تفعيل الإشعارات":"تم إيقاف الإشعارات")};
  $("#settingsPrivacy",box).onclick=()=>simpleInfo("الخصوصية","<p>بيانات السلة والمفضلة وبعض إعدادات الموقع تُحفظ محلياً على هذا الجهاز في هذا الإصدار.</p>");
 });
}
function brandModal(){
 const brands=[...new Set(products.map(p=>p.brand))];
 modal("العلامات التجارية",`<div class="brand-list">${brands.map(b=>`<button data-brand="${esc(b)}">${esc(b)}</button>`).join("")}</div>`,box=>$$("[data-brand]",box).forEach(b=>b.onclick=()=>{state.q=b.dataset.brand;$("#search").value=b.dataset.brand;closeModal();renderProducts();$("#catalogSection").scrollIntoView({behavior:"smooth"})}))
}
function giftModal(){simpleInfo("بطاقات الهدايا","<h3>🎁 بطاقات الهدايا</h3><p>يمكن تجهيز بطاقات هدايا بالقيمة المطلوبة وربطها بالدفع عند تفعيل بوابة الدفع.</p><button class='primary' id='giftSupport'>طلب بطاقة</button>");$("#giftSupport")?.addEventListener("click",customerService)}
function sellModal(){simpleInfo("بيع معنا","<h3>🏪 افتح متجرك معنا</h3><p>أرسل بياناتك وبيانات المنتجات لفريق المتجر لبدء تجهيز حساب البائع.</p><button class='primary' id='sellSupport'>تواصل مع خدمة العملاء</button>");$("#sellSupport")?.addEventListener("click",customerService)}

function activateServiceCardsV6(){
 const box=$("#serviceCards");
 if(!box) return;
 const actions={
  shipping:ordersModal,
  payment:paymentModal,
  returns:()=>accountSection("returns"),
  support:customerService
 };
 box.querySelectorAll("[data-service]").forEach(card=>{
  const fn=actions[card.dataset.service];
  if(fn){card.style.cursor="pointer";card.addEventListener("click",fn)}
 });
}
function renderDrawerCategories(){
 const box=$("#drawerCategories"); if(!box)return;
 box.innerHTML=categoryOrder.map(cat=>`<div class="drawer-cat">
  <button type="button" class="drawer-cat-main" data-drawer-cat="${esc(cat)}"><span>${esc(cat)}</span><span class="drawer-arrow">‹</span></button>
  <div class="drawer-subs">${(subcats[cat]||[]).map(sub=>`<button type="button" data-drawer-sub="${esc(sub)}" data-drawer-parent="${esc(cat)}">${esc(sub)}</button>`).join("")}</div>
 </div>`).join("");
 box.querySelectorAll("[data-drawer-cat]").forEach(b=>b.onclick=()=>{
   const parent=b.closest(".drawer-cat");
   box.querySelectorAll(".drawer-cat.open").forEach(x=>{if(x!==parent)x.classList.remove("open")});
   parent.classList.toggle("open");
 });
 box.querySelectorAll("[data-drawer-sub]").forEach(b=>b.onclick=()=>{
   state.cat=b.dataset.drawerParent; state.sub=b.dataset.drawerSub; state.q="";
   closeDrawer(); renderProducts(); $("#catalogSection")?.scrollIntoView({behavior:"smooth"});
 });
}
function activateV6(){
 const on=(id,fn)=>$("#"+id)?.addEventListener("click",fn);
 on("helpTop",customerService);on("serviceTop",customerService);on("trackTop",ordersModal);
 on("allBtn",()=>{renderDrawerCategories();openDrawer();});
 on("navDeals",()=>{state.q="";state.cat="كل الأقسام";renderProducts();$("#deals")?.scrollIntoView({behavior:"smooth"})});
 on("navNew",()=>{state.sort="new";renderProducts();$("#catalogSection").scrollIntoView({behavior:"smooth"})});
 on("navBest",()=>{state.sort="featured";$("#best")?.scrollIntoView({behavior:"smooth"})});
 on("navFeatured",()=>{$("#catalogSection")?.scrollIntoView({behavior:"smooth"})});
 on("navBrands",brandModal);on("navGift",giftModal);on("navSell",sellModal);
 on("showDeals",()=>$("#deals")?.scrollIntoView({behavior:"smooth"}));
 on("showBest",()=>$("#best")?.scrollIntoView({behavior:"smooth"}));
 on("heroShop",()=>{$("#catalogSection")?.scrollIntoView({behavior:"smooth"})});
 on("heroElectronics",()=>{state.cat="إلكترونيات";state.sub="";renderProducts();$("#catalogSection").scrollIntoView({behavior:"smooth"})});
 on("heroHome",()=>{state.cat="المنزل والمطبخ";state.sub="";renderProducts();$("#catalogSection").scrollIntoView({behavior:"smooth"})});
 on("featureToys",()=>{state.cat="ألعاب وهدايا";state.sub="ألعاب أطفال";renderProducts();$("#catalogSection").scrollIntoView({behavior:"smooth"})});
 on("featureHome",()=>{state.cat="المنزل والمطبخ";state.sub="";renderProducts();$("#catalogSection").scrollIntoView({behavior:"smooth"})});
 on("featureBeauty",()=>{state.cat="عطور وجمال";state.sub="";renderProducts();$("#catalogSection").scrollIntoView({behavior:"smooth"})});
 const quick={cat_offers:()=>$("#deals")?.scrollIntoView({behavior:"smooth"}),cat_women:()=>{state.cat="أزياء";state.sub="ملابس نسائية";renderProducts();$("#catalogSection").scrollIntoView({behavior:"smooth"})},cat_men:()=>{state.cat="أزياء";state.sub="ملابس رجالية";renderProducts();$("#catalogSection").scrollIntoView({behavior:"smooth"})},cat_kidswear:()=>{state.cat="أزياء";state.sub="ملابس أطفال";renderProducts();$("#catalogSection").scrollIntoView({behavior:"smooth"})},cat_electronics:()=>{state.cat="إلكترونيات";state.sub="";renderProducts();$("#catalogSection").scrollIntoView({behavior:"smooth"})},cat_home:()=>{state.cat="المنزل والمطبخ";state.sub="";renderProducts();$("#catalogSection").scrollIntoView({behavior:"smooth"})},cat_beauty:()=>{state.cat="عطور وجمال";state.sub="";renderProducts();$("#catalogSection").scrollIntoView({behavior:"smooth"})},cat_shoes:()=>{state.cat="أحذية وحقائب";state.sub="";renderProducts();$("#catalogSection").scrollIntoView({behavior:"smooth"})},cat_sport:()=>{state.cat="رياضة ولياقة";state.sub="";renderProducts();$("#catalogSection").scrollIntoView({behavior:"smooth"})},cat_toys:()=>{state.cat="ألعاب وهدايا";state.sub="";renderProducts();$("#catalogSection").scrollIntoView({behavior:"smooth"})}};
 Object.entries(quick).forEach(([id,fn])=>on(id,fn));
 on("footerContact",customerService);on("footerTrack",ordersModal);on("footerReturns",()=>accountSection("returns"));on("footerFaq",customerService);
 on("footerOrders",ordersModal);on("footerFav",favModal);on("footerAddress",addressModal);on("footerPayments",paymentModal);
 on("footerDeals",()=>$("#deals")?.scrollIntoView({behavior:"smooth"}));on("footerBest",()=>$("#best")?.scrollIntoView({behavior:"smooth"}));on("footerBrands",brandModal);on("footerSell",sellModal);
 on("footerAbout",()=>simpleInfo("من نحن","<p>سوريا أونلاين متجر إلكتروني متعدد الأقسام يجمع المنتجات في مكان واحد.</p>"));
 on("footerPrivacy",()=>simpleInfo("سياسة الخصوصية","<p>تُستخدم بيانات الحساب والعنوان لإتمام الطلب وخدمة العملاء. السلة والمفضلة محفوظتان محلياً في هذا الإصدار.</p>"));
 on("footerTerms",()=>simpleInfo("شروط الاستخدام","<p>باستخدام المتجر توافق على شروط الشراء والدفع والتوصيل والإرجاع المعروضة في الموقع.</p>"));
 on("footerShipping",()=>simpleInfo("سياسة الشحن","<p>مدة الشحن تختلف حسب المدينة والمنتج وتظهر أثناء إتمام الطلب.</p>"));
 on("languageBtn",languageModal);on("drawerSettings",()=>{closeDrawer();settingsModal();});
 on("drawerLogin",()=>{closeDrawer();loginModal();}); on("drawerSignup",()=>{closeDrawer();signupModal();});
 on("drawerLogout",()=>{if(!state.user)return;state.user=null;persist();renderUser();closeDrawer();closeModal();toast("تم تسجيل الخروج بنجاح");});
 on("currencyTRY",()=>toast("العملة الحالية: الليرة التركية TRY"));on("currencySYP",()=>toast("العملة الحالية: الليرة السورية SYP"));
 setLanguage(currentLang);
 activateServiceCardsV6();
}

function initExtraUI(){
 const main=$("main");
 if(!$("#catalogSection")){
   const sec=document.createElement("section");sec.id="catalogSection";sec.className="section catalog section";
   sec.innerHTML=`<div class="sectitle"><div><h2 id="resultTitle">كل المنتجات</h2><a id="clearFilters">مسح الفلاتر</a></div><select id="sort"><option value="featured">الأكثر صلة</option><option value="new">وصل حديثاً</option><option value="rating">الأعلى تقييماً</option><option value="priceUp">السعر: من الأقل</option><option value="priceDown">السعر: من الأعلى</option></select></div><div id="subcats" class="subcats"></div><div id="allProducts" class="products catalog-grid"></div>`;
   main.appendChild(sec);
 }
 const footer=$("footer");
 if(!$("#serviceCards")){
   const sec=document.createElement("section");sec.id="serviceCards";sec.className="wrap service-cards";
   sec.innerHTML=`<div data-service="shipping"><b>🚚 توصيل سريع</b><small>تتبع شحنتك من حسابك</small></div><div data-service="payment"><b>🔒 دفع آمن</b><small>اختر طريقة الدفع المناسبة</small></div><div data-service="returns"><b>↩️ إرجاع</b><small>اطلب الإرجاع من طلباتك</small></div><div data-service="support"><b>🎧 خدمة العملاء</b><small>مساعدة ومتابعة للطلبات</small></div>`;
   footer.before(sec)
 }
}
document.addEventListener("click",e=>{
 const open=e.target.closest("[data-open]"); if(open){productModal(+open.dataset.open);return}
 const addBtn=e.target.closest("[data-add]");if(addBtn){add(+addBtn.dataset.add);return}
 const fav=e.target.closest("[data-fav]");if(fav){toggleFav(+fav.dataset.fav);return}
 const inc=e.target.closest("[data-inc]");if(inc){state.cart[+inc.dataset.inc].qty++;persist();renderCart();updateCounts();return}
 const dec=e.target.closest("[data-dec]");if(dec){let x=state.cart[+dec.dataset.dec];x.qty--;if(x.qty<1)state.cart.splice(+dec.dataset.dec,1);persist();renderCart();updateCounts();return}
 const rem=e.target.closest("[data-rem]");if(rem){removeCart(+rem.dataset.rem);return}
 const sub=e.target.closest("[data-sub]");if(sub){state.sub=sub.dataset.sub;renderProducts();return}
 const cat=e.target.closest("[data-cat]");if(cat){state.cat=cat.dataset.cat;state.sub="";renderProducts();return}
 const ac=e.target.closest("[data-account]");if(ac){accountSection(ac.dataset.account);return}
 if(e.target.closest("#cartBtn")){$("#cartPanel").classList.add("open");return}
 if(e.target.closest("#ordersBtn")){ordersModal();return}
 if(e.target.closest("#favBtn")){favModal();return}
 if(e.target.closest("#accountBtn")){authModal();return}
 if(e.target.closest("#allBtn")){openDrawer();return}
 if(e.target.closest(".checkout")){checkout();return}
 if(e.target.closest("#clearFilters")){state={...state,cat:"كل الأقسام",sub:"",q:""};$("#search").value="";renderProducts();return}
 if(e.target.closest(".heroMain button")||e.target.closest(".side button")){$("#catalogSection").scrollIntoView({behavior:"smooth"});return}
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

initExtraUI();renderProducts();renderCart();updateCounts();renderUser();activateV6();
})();

window.addEventListener("DOMContentLoaded",renderDrawerCategories);
