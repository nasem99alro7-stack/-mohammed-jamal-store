const products=[
{id:1,name:"فلتر زيت Toyota / Lexus",cat:"زيوت وفلاتر",price:12,old:15,stock:18,icon:"🛢️",tag:"الأكثر طلباً"},
{id:2,name:"فلتر هواء Hyundai / Kia",cat:"زيوت وفلاتر",price:14,old:17,stock:14,icon:"🔧",tag:"متوفر"},
{id:3,name:"مسّاحات زجاج 24/18",cat:"إكسسوارات",price:10,old:13,stock:30,icon:"🚘",tag:"عرض"},
{id:4,name:"حامل موبايل مغناطيسي",cat:"إكسسوارات",price:9,old:12,stock:40,icon:"📱",tag:"الأكثر طلباً"},
{id:5,name:"شاحن سيارة USB-C سريع",cat:"كهربائيات",price:11,old:14,stock:25,icon:"🔌",tag:"جديد"},
{id:6,name:"لمبات LED H7",cat:"كهربائيات",price:22,old:27,stock:12,icon:"💡",tag:"جديد"},
{id:7,name:"فحمات فرامل أمامية",cat:"فرامل",price:35,old:42,stock:8,icon:"🛞",tag:"متوفر"},
{id:8,name:"سائل فرامل DOT 4",cat:"فرامل",price:9,old:11,stock:22,icon:"🧴",tag:"متوفر"},
{id:9,name:"سير محرك متعدد الاستخدام",cat:"محرك",price:24,old:29,stock:9,icon:"⚙️",tag:"متوفر"},
{id:10,name:"منظف بخاخ للمحرك",cat:"تنظيف",price:8,old:10,stock:31,icon:"🧽",tag:"عرض"},
{id:11,name:"عطر سيارة فاخر",cat:"إكسسوارات",price:7,old:9,stock:50,icon:"✨",tag:"جديد"},
{id:12,name:"كابل تشغيل بطارية",cat:"إكسسوارات",price:18,old:22,stock:13,icon:"🔋",tag:"متوفر"}
];
let cart=JSON.parse(localStorage.getItem("syriaAutoCart")||"[]");
function money(n){return "$"+n.toFixed(2)}
function render(){
 const q=(document.getElementById("search")?.value||"").trim().toLowerCase(), c=document.getElementById("category")?.value||"", s=document.getElementById("sort")?.value||"featured";
 let a=products.filter(p=>(!q||`${p.name} ${p.cat}`.toLowerCase().includes(q))&&(!c||p.cat===c));
 if(s==="low")a.sort((x,y)=>x.price-y.price); if(s==="high")a.sort((x,y)=>y.price-x.price);
 document.getElementById("products").innerHTML=a.map(p=>`<article class="card"><div class="photo"><span>${p.icon}</span><small>${p.tag}</small></div><div class="cardBody"><span class="cat">${p.cat}</span><h3>${p.name}</h3><div class="stars">★★★★★ <i>4.8</i></div><div class="price">${money(p.price)} <del>${money(p.old)}</del></div><div class="stock">● متوفر — ${p.stock} قطع</div><button class="add" onclick="add(${p.id})">أضف للسلة</button><button class="more" onclick="details(${p.id})">تصفح المنتج</button></div></article>`).join("")||`<div class="empty">ما لقينا المنتج. <button onclick="requestPart()">اطلب القطعة بالاسم أو رقمها</button></div>`;
 updateCart();
}
function add(id){let p=products.find(x=>x.id===id),i=cart.find(x=>x.id===id); if(i)i.qty++;else cart.push({id,qty:1}); save(); toast("تمت إضافة المنتج للسلة")}
function save(){localStorage.setItem("syriaAutoCart",JSON.stringify(cart));updateCart()}
function updateCart(){document.getElementById("cartCount").textContent=cart.reduce((a,x)=>a+x.qty,0)}
function details(id){let p=products.find(x=>x.id===id); open(`<span class="cat">${p.cat}</span><h2>${p.name}</h2><div class="detailIcon">${p.icon}</div><p>منتج تجريبي ضمن كتالوج سوريا أوتو. التوفر النهائي والتوافق والسعر يؤكدها فريقنا قبل تثبيت الطلب.</p><b class="big">${money(p.price)}</b><div class="panelBtns"><button class="primary" onclick="add(${p.id});closeModal()">أضف للسلة</button><button class="secondary" onclick="requestPart();closeModal()">تأكد من التوافق</button></div>`)}
function openCart(){let items=cart.map(x=>{let p=products.find(y=>y.id===x.id);return `<div class="line"><span>${p.icon} ${p.name}</span><b>${x.qty} × ${money(p.price)}</b><button onclick="removeItem(${p.id})">×</button></div>`}).join("");let total=cart.reduce((a,x)=>a+(products.find(p=>p.id===x.id).price*x.qty),0);open(`<h2>سلة المشتريات</h2>${items||"<p>السلة فارغة.</p>"}<hr><div class="total">الإجمالي <b>${money(total)}</b></div>${cart.length?`<button class="primary full" onclick="checkout()">متابعة الطلب</button>`:""}`)}
function removeItem(id){cart=cart.filter(x=>x.id!==id);save();openCart()}
function checkout(){open(`<h2>تأكيد الطلب</h2><div class="form"><input id="name" placeholder="الاسم الكامل"><input id="phone" placeholder="رقم الهاتف"><select id="city"><option>دمشق</option><option>ريف دمشق</option><option>حلب</option><option>حمص</option><option>حماة</option><option>اللاذقية</option><option>طرطوس</option><option>إدلب</option><option>درعا</option><option>السويداء</option><option>دير الزور</option><option>الرقة</option><option>الحسكة</option></select><textarea id="address" placeholder="العنوان بالتفصيل"></textarea><textarea id="notes" placeholder="ملاحظات أو نوع السيارة (اختياري)"></textarea><button class="primary full" onclick="placeOrder()">إرسال الطلب</button></div>`)}
function placeOrder(){let n=document.getElementById("name").value.trim(),p=document.getElementById("phone").value.trim(),a=document.getElementById("address").value.trim();if(!n||!p||!a){toast("أكمل الاسم والهاتف والعنوان");return}let msg=`طلب جديد من سوريا أوتو%0Aالاسم: ${encodeURIComponent(n)}%0Aالهاتف: ${encodeURIComponent(p)}%0Aالعنوان: ${encodeURIComponent(a)}%0Aالمنتجات:%0A`+cart.map(x=>{let z=products.find(p=>p.id===x.id);return encodeURIComponent(`${z.name} × ${x.qty}`)}).join("%0A"); window.open("https://wa.me/?text="+msg,"_blank"); cart=[];save();open(`<div class="success">✅<h2>تم تجهيز الطلب</h2><p>سيتم تأكيد التوفر والسعر معك قبل تثبيت الطلب.</p><button class="primary" onclick="closeModal()">العودة للمتجر</button></div>`)}
function requestPart(){open(`<h2>طلب قطعة غير موجودة</h2><p>أرسل معلومات سيارتك وسنبحث لك عند الموردين.</p><div class="form"><input id="rqcar" placeholder="الماركة والموديل والسنة"><input id="rqpart" placeholder="اسم القطعة أو رقمها"><input id="rqphone" placeholder="رقم الهاتف / واتساب"><textarea id="rqnote" placeholder="ملاحظات أو رابط/صورة القطعة"></textarea><button class="primary full" onclick="sendRequest()">إرسال الطلب</button></div>`)}
function sendRequest(){let c=document.getElementById("rqcar").value,p=document.getElementById("rqpart").value,t=document.getElementById("rqphone").value;if(!c||!p||!t){toast("أكمل البيانات المطلوبة");return}let msg=`طلب قطعة من سوريا أوتو%0Aالسيارة: ${encodeURIComponent(c)}%0Aالقطعة: ${encodeURIComponent(p)}%0Aالهاتف: ${encodeURIComponent(t)}`;window.open("https://wa.me/?text="+msg,"_blank");closeModal()}
function searchProducts(){document.getElementById("catalog").scrollIntoView();render()}
function searchOEM(){let x=document.getElementById("oem").value;document.getElementById("search").value=x;searchProducts()}
function filterCat(c){document.getElementById("category").value=c;document.getElementById("catalog").scrollIntoView();render()}
function openAccount(){open(`<h2>حسابي</h2><p>سجّل لاحقاً لمتابعة الطلبات والمفضلة. النسخة الحالية تسمح بالطلب المباشر بدون تسجيل.</p><button class="primary full" onclick="closeModal()">متابعة التصفح</button>`)}
function open(html){document.getElementById("panel").innerHTML=html;document.getElementById("modal").classList.remove("hidden")}
function closeModal(){document.getElementById("modal").classList.add("hidden")}
function toast(t){let x=document.createElement("div");x.className="toast";x.textContent=t;document.body.appendChild(x);setTimeout(()=>x.remove(),2200)}
document.getElementById("search").addEventListener("keydown",e=>{if(e.key==="Enter")searchProducts()});render();