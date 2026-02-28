/* ==========================================
   VERSION 3.1 – EXPANDED MASTER BANKS
========================================== */

const PRIME = 97;

/* ---------- GA MASTER TOPIC STRUCTURE ---------- */

const GA_MASTER = {
History: [
{q:"Who gave the slogan 'Do or Die'?", a:["Mahatma Gandhi","Nehru","Subhash Bose","Tilak"], ans:0,
exp:"The slogan 'Do or Die' was given by Mahatma Gandhi during the Quit India Movement in 1942."},
{q:"In which year did the Revolt of 1857 begin?", a:["1857","1856","1858","1860"], ans:0,
exp:"The Revolt of 1857 started in Meerut in May 1857."}
],

Polity:[
{q:"Article 324 deals with?", a:["Election Commission","Finance Commission","Supreme Court","CAG"], ans:0,
exp:"Article 324 gives powers to Election Commission."},
{q:"Fundamental Duties were added by which amendment?", a:["42nd","44th","86th","73rd"], ans:0,
exp:"The 42nd Constitutional Amendment added Fundamental Duties."}
],

Geography:[
{q:"Source of Narmada River?", a:["Amarkantak","Gangotri","Yamunotri","Satpura"], ans:0,
exp:"The Narmada River originates from Amarkantak plateau."}
],

Science:[
{q:"SI unit of Pressure?", a:["Pascal","Newton","Joule","Watt"], ans:0,
exp:"Pascal is the SI unit of pressure."}
]
};

/* ---------- MATH GENERATORS ---------- */

function arithmetic(seed,difficulty){
let a=(seed*7)%90+10;
let b=(seed*13)%80+20;
if(difficulty==="easy"){
return {
topic:"Arithmetic",
question:`What is ${a} + ${b}?`,
options:[a+b,a+b+1,a+b-1,a+b+2],
answer:0,
explanation:`Add ${a} and ${b}. The correct answer is ${a+b}.`
};
}
if(difficulty==="moderate"){
return {
topic:"Arithmetic",
question:`What is ${a} × ${b}?`,
options:[a*b,a*b+10,a*b-5,a*b+20],
answer:0,
explanation:`Multiply ${a} and ${b}.`
};
}
return {
topic:"Arithmetic",
question:`If ${a}% of X = ${b}, find X.`,
options:[(b*100)/a,(b*100)/(a+5),(b*100)/(a-5),b],
answer:0,
explanation:`Use formula: X = (Value × 100) / percentage.`
};
}

/* ---------- REASONING GENERATORS ---------- */

function coding(seed){
let word="CAT";
let shifted="";
for(let i=0;i<word.length;i++){
shifted+=String.fromCharCode(word.charCodeAt(i)+1);
}
return {
topic:"Coding-Decoding",
question:`If CAT is coded as ${shifted}, DOG is coded as ?`,
options:["EPH","EOH","FQI","EPI"],
answer:0,
explanation:"Each letter is shifted by +1."
};
}

function bloodRelation(){
return {
topic:"Blood Relation",
question:"Pointing to a man, a woman says, 'He is my mother's only son.' Who is he?",
options:["Brother","Father","Son","Uncle"],
answer:0,
explanation:"Mother's only son is her brother."
};
}