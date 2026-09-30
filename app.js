const $=id=>document.getElementById(id);
let history=JSON.parse(localStorage.getItem("aiTradingHistory")||"[]");
const configs={
"الذهب XAUUSD":{p:2648,s:2635,r:2672,vol:"مرتفع"},
"Bitcoin BTCUSD":{p:114200,s:112800,r:116500,vol:"مرتفع"},
"EURUSD":{p:1.1732,s:1.1685,r:1.1788,vol:"متوسط"},
"S&P 500":{p:5780,s:5725,r:5840,vol:"متوسط"},
"NASDAQ 100":{p:24950,s:24620,r:25380,vol:"مرتفع"}
};
function runAnalysis(){
 const asset=$("asset").value, c=configs[asset], tf=$("tf").value;
 const seed=asset.length*31+tf.length*17;
 const r=(n,m)=>{let x=Math.sin(seed+n*12.9898)*43758.5453;return Math.abs(x-Math.floor(x))*m};
 const bias=r(1,100)>48?"صاعد":"هابط";
 const price=c.p*(1+(r(2,1)-.5)*.008), support=c.s, resistance=c.r;
 const rsi=Math.round(42+r(3,25)), macd=(r(4,2)-1).toFixed(2);
 $("chartTitle").textContent=asset+" · "+tf;
 $("bias").textContent=bias==="صاعد"?"ميل صاعد":"ميل هابط";
 $("bias").style.background=bias==="صاعد"?"#20382f":"#3b252d"; $("bias").style.color=bias==="صاعد"?"#62e6b8":"#ff8e9b";
 $("summary").textContent=bias==="صاعد"?"السعر فوق منطقة الدعم مع زخم إيجابي؛ راقب اختراق المقاومة قبل أي قرار.":"السعر قريب من مناطق حساسة والزخم أضعف؛ راقب كسر الدعم وتأكيد الحركة.";
 $("support").textContent=format(support); $("resistance").textContent=format(resistance);
 $("rsi").textContent=rsi; $("macd").textContent=macd; $("volume").textContent=c.vol;
 $("bull").textContent=`اختراق ${format(resistance)} والثبات فوقها قد يدعم امتداد الحركة.`;
 $("bear").textContent=`كسر ${format(support)} قد يفتح مجالاً لاختبار مستويات أدنى.`;
 $("entry").textContent=format(price);
 $("sl").textContent=format(bias==="صاعد"?support:resistance);
 $("tp").textContent=format(bias==="صاعد"?resistance: support-(support*0.006));
 drawChart(price,support,resistance,seed);
 calcRisk();
 history.unshift({time:new Date().toLocaleString("ar-SY",{hour:"2-digit",minute:"2-digit",day:"2-digit",month:"2-digit"}),asset,tf,bias,rsi});
 history=history.slice(0,8); localStorage.setItem("aiTradingHistory",JSON.stringify(history)); renderHistory();
}
function format(n){return n<10?n.toFixed(4):"$"+Math.round(n).toLocaleString()}
function drawChart(p,s,res,seed){
 const el=$("chart");el.innerHTML="";
 const min=s-(res-s)*.5,max=res+(res-s)*.5;
 const y=v=>100-((v-min)/(max-min))*100;
 const sl=document.createElement("div");sl.className="level supportLine";sl.style.top=y(s)+"%";el.appendChild(sl);
 const rl=document.createElement("div");rl.className="level resistLine";rl.style.top=y(res)+"%";el.appendChild(rl);
 for(let i=0;i<44;i++){const rnd=Math.sin(seed+i*9.1)*43758.5;const q=Math.abs(rnd-Math.floor(rnd));const val=p+(q-.5)*(res-s)*.95;const h=18+q*75;
  const c=document.createElement("div");c.className="candle "+(i%7===0?"down":"");c.style.left=(4+i*2.15)+"%";c.style.height=h/3+"%";c.style.bottom=(25+y(val)*.65)+"%";el.appendChild(c);
  const w=document.createElement("div");w.className="wick";w.style.left=(4+i*2.15)+"%";w.style.height=h+"%";w.style.bottom=(20+y(val)*.65)+"%";el.appendChild(w);
 }
}
function calcRisk(){const cap=+($("capital").value||0), risk=+($("risk").value||0);$("riskAmount").textContent="$"+(cap*risk/100).toFixed(2);$("position").textContent="$"+cap.toLocaleString()}
function renderHistory(){const h=$("history");if(!history.length){h.innerHTML='<div class="empty">لا توجد تحليلات محفوظة بعد.</div>';return}h.innerHTML=history.map(x=>`<div class="historyRow"><span>${x.time}</span><b>${x.asset}</b><span>${x.tf}</span><span>${x.bias} · RSI ${x.rsi}</span></div>`).join("")}
function clearHistory(){history=[];localStorage.removeItem("aiTradingHistory");renderHistory()}
function showHelp(){alert("هذه أداة تحليل تعليمية. المؤشرات والسيناريوهات ليست ضماناً للربح ولا تُعد توصية استثمارية. استخدم إدارة المخاطر ولا تخاطر بأموال لا تستطيع تحمل خسارتها.")}
renderHistory();runAnalysis();