/* ==========================================
   VERSION 3.1 – DETERMINISTIC ENGINE
========================================== */

let user={},current=0,time=5400,timerInt;
let selectedMock=[];
let answers={},review={};

function populateMocks(){
let sel=document.getElementById("mockSelect");
for(let i=1;i<=20;i++){
let opt=document.createElement("option");
opt.value=i;
opt.innerText="Mock Test "+i;
sel.appendChild(opt);
}
}
populateMocks();

function startExam(){
let name=document.getElementById("username").value;
if(!name)return alert("Enter Name");

user.name=name;
user.lang=document.getElementById("language").value;

let mock=parseInt(document.getElementById("mockSelect").value);

selectedMock=generateMock(mock);

answers={};review={};current=0;time=5400;

document.getElementById("login").classList.add("hidden");
document.getElementById("exam").classList.remove("hidden");

buildPalette();
showQuestion();
timerInt=setInterval(updateTimer,1000);
}

/* ---------- MOCK GENERATOR ---------- */

function generateMock(mockNumber){

let difficulty = mockNumber<=5?"easy":
                 mockNumber<=10?"moderate":
                 mockNumber<=15?"hard":"rank";

let seed = mockNumber * PRIME;

let questions=[];

/* GA */
let topics = Object.keys(GA_MASTER);
for(let i=0;i<40;i++){
let t = topics[i % topics.length];
let bank = GA_MASTER[t];
let item = bank[(seed+i)%bank.length];
questions.push({
topic:t,
question:item.q,
options:item.a,
answer:item.ans,
explanation:item.exp
});
}

/* MATH */
for(let i=0;i<30;i++){
questions.push(arithmetic(seed+i,difficulty));
}

/* REASONING */
for(let i=0;i<15;i++){
questions.push(coding(seed+i));
}
for(let i=0;i<15;i++){
questions.push(bloodRelation());
}

return questions;
}

/* ---------- UI ---------- */

function updateTimer(){
time--;
let m=Math.floor(time/60);
let s=time%60;
document.getElementById("timer").innerText="Time: "+m+":"+String(s).padStart(2,'0');
if(time<=0)submitExam();
}

function showQuestion(){
let q=selectedMock[current];
document.getElementById("questionBox").innerText=(current+1)+". "+q.question;

let optBox=document.getElementById("optionsBox");
optBox.innerHTML="";

q.options.forEach((opt,i)=>{
let div=document.createElement("div");
div.className="option";
div.innerText=opt;
if(answers[current]===i)div.classList.add("selected");
div.onclick=()=>{
answers[current]=i;
updatePalette();
showQuestion();
};
optBox.appendChild(div);
});
}

function nextQuestion(){if(current<99){current++;showQuestion();}}
function prevQuestion(){if(current>0){current--;showQuestion();}}
function markReview(){review[current]=true;updatePalette();}

function buildPalette(){
let pal=document.getElementById("palette");
pal.innerHTML="";
for(let i=0;i<100;i++){
let d=document.createElement("div");
d.innerText=i+1;
d.onclick=()=>{current=i;showQuestion();}
pal.appendChild(d);
}
}

function updatePalette(){
let pal=document.getElementById("palette").children;
for(let i=0;i<100;i++){
pal[i].classList.remove("answered","review");
if(answers[i]!==undefined)pal[i].classList.add("answered");
if(review[i])pal[i].classList.add("review");
}
}

function submitExam(){
clearInterval(timerInt);
document.getElementById("exam").classList.add("hidden");
document.getElementById("result").classList.remove("hidden");

let correct=0,wrong=0,attempt=0,topicStats={};

selectedMock.forEach((q,i)=>{
if(answers[i]!==undefined){
attempt++;
if(answers[i]===q.answer)correct++;
else{
wrong++;
topicStats[q.topic]=(topicStats[q.topic]||0)+1;
}
}
});

let score=correct-(wrong/3);

document.getElementById("result").innerHTML=`
<h3>${user.name} – Result</h3>
Attempted: ${attempt}<br>
Correct: ${correct}<br>
Wrong: ${wrong}<br>
Raw Marks: ${score.toFixed(2)}<br><br>
<h4>Weak Areas:</h4>
${Object.keys(topicStats).map(t=>`<div>${t}</div>`).join("")}
<button onclick="reviewMode()">Review Mode</button>
`;
}

function reviewMode(){
let out="<h3>Review Mode</h3>";
selectedMock.forEach((q,i)=>{
out+=`<div class="explanation">
<b>Q${i+1}:</b> ${q.question}<br>
Correct: ${q.options[q.answer]}<br>
Explanation: ${q.explanation}
</div>`;
});
document.getElementById("result").innerHTML=out;
}