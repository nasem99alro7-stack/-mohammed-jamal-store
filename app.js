const products=[
["👟","حذاء رياضي رجالي","1080","1800","-40%"],["👜","حقيبة نسائية أنيقة","840","1200","-30%"],["🎧","سماعات لاسلكية","710","950","-25%"],["🧥","سترة رجالية شتوية","1040","1600","-35%"],["🌹","عطر نسائي فاخر","1120","1400","-20%"],["⌚","ساعة ذكية","1250","1500",""],["🧥","هودي رجالي","890","1100",""],["🍳","طقم أواني طبخ","1300","1650",""],["💄","مجموعة مكياج","980","1250",""],["🚙","سيارة أطفال","670","850",""]];
let cart=[],count=0;
function card(p,i){return `<article class="card" data-name="${p[1]}"><span class="heart">♡</span>${p[4]?`<span class="sale">${p[4]}</span>`:""}<div class="pic">${p[0]}</div><div class="stars">★★★★★ <small>( ${80+i*31} )</small></div><h3>${p[1]}</h3><div class="price"><strong>₺${p[2]}</strong> <del>₺${p[3]}</del></div><button class="add" data-i="${i}">أضف إلى السلة 🛒</button></article>`}
document.querySelector("#deals").innerHTML=products.slice(0,5).map(card).join("");
document.querySelector("#best").innerHTML=products.slice(5).map((p,i)=>card(p,i+5)).join("");
document.addEventListener("click",e=>{
 if(e.target.matches(".add")){const i=+e.target.dataset.i;cart.push(products[i]);count++;document.querySelector("#cartCount").textContent=count;e.target.textContent="✓ تمت الإضافة";setTimeout(()=>e.target.textContent="أضف إلى السلة 🛒",800);renderCart()}
 if(e.target.closest("#cartBtn"))document.querySelector("#cartPanel").classList.add("open");
 if(e.target.closest("#cartPanel .panelhead button"))document.querySelector("#cartPanel").classList.remove("open");
});
function renderCart(){const el=document.querySelector("#cartItems");el.innerHTML=cart.length?cart.map(p=>`<div class="cartrow"><span class="mini">${p[0]}</span><div><b>${p[1]}</b><br><strong>₺${p[2]}</strong></div></div>`).join(""):"<p>السلة فارغة حالياً.</p>";document.querySelector("#total").textContent="₺"+cart.reduce((s,p)=>s+Number(p[2]),0).toLocaleString()}
const drawer=document.querySelector("#drawer"),shade=document.querySelector("#shade");
function openDrawer(){drawer.classList.add("open");shade.classList.add("show")}function closeDrawer(){drawer.classList.remove("open");shade.classList.remove("show")}
document.querySelector("#menuBtn").onclick=openDrawer;document.querySelector("#allBtn").onclick=openDrawer;document.querySelector("#closeMenu").onclick=closeDrawer;shade.onclick=closeDrawer;
function modal(title,body){document.querySelector("#modalContent").innerHTML=`<h2>${title}</h2>${body}`;document.querySelector("#modal").classList.add("show")}
document.querySelector("#modal .x").onclick=()=>document.querySelector("#modal").classList.remove("show");
document.querySelector("#accountBtn").onclick=()=>modal("حسابك",`<div class="accountlinks"><button>📦 طلباتك</button><button>♡ قائمتك المفضلة</button><button>📍 عناوينك</button><button>💳 طرق الدفع</button><button>↩️ الإرجاع والاسترداد</button><button>👁 المنتجات التي شاهدتها مؤخراً</button></div>`);
document.querySelector("#ordersBtn").onclick=()=>modal("تتبع طلبك",`<p>أدخل رقم الطلب لمعرفة حالة الشحنة.</p><input style="width:100%;padding:12px;border:1px solid #ddd;border-radius:6px" placeholder="رقم الطلب"><button style="margin-top:10px;width:100%;padding:11px;background:#42a943;color:#fff;border:0;border-radius:6px">تتبع الطلب</button>`);
document.querySelector("#favBtn").onclick=()=>modal("قائمتك المفضلة","<p>ستظهر هنا المنتجات التي تحفظها للمراجعة والشراء لاحقاً.</p>");
const search=document.querySelector("#search"),suggest=document.querySelector("#suggestions");
search.addEventListener("input",()=>{const q=search.value.trim();if(!q){suggest.innerHTML="";return}const hits=products.filter(p=>p[1].includes(q)).slice(0,5);suggest.innerHTML=hits.map(p=>`<div>${p[0]} ${p[1]}</div>`).join("")||"<div>لا توجد نتائج مطابقة</div>"});
let t=6*3600+25*60+18;setInterval(()=>{t=Math.max(0,t-1);let h=Math.floor(t/3600),m=Math.floor(t%3600/60),s=t%60;document.querySelector("#timer").textContent=[h,m,s].map(x=>String(x).padStart(2,"0")).join(":")},1000);
