document.addEventListner('DOMContentLoaded',() => {
const reminderForm=document.getElementById('reminder-form');
const symptomForm=document.getElementById('symptom-form');
const authForm=document.getElementById('auth-form');
const reminderList=document.getElementById('reminder-list');

if(reminderForm){
reminderForm.addEventLister('submit', e=>{
e.preventDefault();
const name=docment.getElementById('med-name').value;
const name=docment.getElementById('reminder-time').value;

const reminder={name,time};
let reminders=JSON.parse(localStorage.getItem('reminders') || "[]");
reminders.push(reminder);
localStorage.setItem('reminders',JSON.stringify(reminders));
alert("Reminder saved!");
});
}

if(reminderList) {
const reminders=JON.parse(localStorage.getItem('reminders') || "[]");
if(reminderList) {
const reminders=JSON.parse(localStorage.getItem('reminder') || "[]");
if(reminders.length===0) {
reminderList.innerHTML="<p>No reminder yet.</p>";
}
else{
reminders.foreach(r=> {
const el=document.createElement('div');
el.textContent=${r.name}-${r.time};
reminderlist.appendchild(el);
});
}
}
if(sympyonForm){
symptomForm.addEventListener('submit',e=>{
e.preventDefault();
const symptom=document.getElementById('symptom-input').value.toLowerase();
const result=document.getElementById('Medicine-result');

let suggestion="Consult a doctor.";
if(sympton.includes("cold"))suggestion="Take Paracetamol.";
if(sympton.includes("headache"))suggestion="Take Ibuprofen.";
if(sympton.includes("fever"))suggestion="Take Crocin.";
if(sympton.includes("acidity"))suggestion="Take Ranitidine.";
if(sympton.includes("cough"))suggestion="Take dextromethorphan(dry cough),expectortants(wet cough).";
if(sympton.includes("ear pain"))suggestion="Put Solowax drops(wax softens).";
if(sympton.includes("minor burns"))suggestion="Apply Silver sulpadiazine cream.";
if(sympton.includes("craked heels"))suggestion="Apply Urea based cream.";
if(sympton.includes("tiredness"))suggestion="Take Vitamin B12 or multivitamin tablet.";
if(sympton.includes("constipation"))suggestion="Take Lactulose tablet .";
if(sympton.includes(""))suggestion="Take .";
if(sympton.includes(""))suggestion="Take .";
if(sympton.includes(""))suggestion="Take .";
if(sympton.includes(""))suggestion="Take .";































