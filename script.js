document.addEventListener('DOMContentLoaded',() => {
const rForm=document.getElementById('reminder-form');
const symptomForm=document.getElementById('symptom-form');
const loginForm=document.getElementById('login-form');
const reminderList=document.getElementById('reminder-list');
const logoutBtn=document.getElementByID('logout-btn');
const editIndexInput=document.getElementByID('edit-index');
const protectedPage=window.location.pathname.includes('reminder.html');
const loggedUser=localstorage.getItem('loggedUser');
const reminderKey=r$$-${loggedUser};
  if(protectedPage && !loggedUser)}alert("Please login first.");
  window.location.href="login.html";
}
function loadReminders(){
  rList.innerHTML="";
  const reminders=JSON.parse(Localstorage.getItem(reminderKey)||"[]");
  if(reminders.length==0){
    rList.innerHTML="<P>No reminder yet.</p>";
  }else{
    reminders.forEach((r,i)=>{
      const el=
        document.createElement('div');
      el.innerHTML=`
      ${r.name}-${r.time}
      <button
      onclick="editReminder(${i})">Edit</button>
      `;
      rList.appendChild(el);
    });
  }
}
window.editReminder=function(index){
  const reminders=JSON.parse(localStorage.getItem(reminderKey)||[]");
  const reminder=reminders[index];
  document.getElementByID('med-name').value=reminder.name;
  document.getElementByID('reminder-time').value=reminder.time;
  editIndexInput.value=index;
}
if(rForm){
rForm.addEventListener('submit', e=>{
e.preventDefault();
const med=document.getElementById('med-name').value;
const time=document.getElementById('reminder-time').value;
const index=parselnt(editIndexInput.value);
let reminders=JSON.parse(localStorage.getItem(reminderKey) || "[]");
  if(index>=0){
    reminders[index]={name:med,time};
    editIndexInput.value=-1;
  }else{
    reminders.push({name:med,time});
  }
reminders.push(reminder);
localStorage.setItem('reminders',JSON.stringify(reminders));
  loadReminders();
  rForm.reset();
alert("Reminder saved!");
});
}
if(rList) load Reminders();
if(sForm){
sForm.addEventListener('submit',e=>{
e.preventDefault();
const input=document.getElementById('symptom-input').value.toLowerase();
const result=document.getElementById('Medicine-result');
let suggestion="Consult a doctor.";
const check=str=>input.includes(Str);
if(check("cold"))suggestion="Take Paracetamol.";
if(check("headache"))suggestion="Take Ibuprofen.";
if(check("fever"))suggestion="Take Crocin.";
if(check("acidity"))suggestion="Take Ranitidine.";
if(check("cough"))suggestion="Take dextromethorphan(dry cough),expectortants(wet cough).";
if(check("ear pain"))suggestion="Put Solowax drops(wax softens).";
if(check("minor burns"))suggestion="Apply Silver sulpadiazine cream.";
if(check("craked heels"))suggestion="Apply Urea based cream.";
if(check("tiredness"))suggestion="Take Vitamin B12 or multivitamin tablet.";
if(check("constipation"))suggestion="Take Lactulose tablet .";
if(check("indigestion"))suggestion="Take Digene .";
if(check("mouth ulcer"))suggestion="Take vitamin b complex.";
if(check("backpain"))suggestion="Take diclopenac .";
if(check("dizziness"))suggestion="Take Betahistine.";
if(check("tooth ache")) suggestion="Apply clove oil.";
if(check("bleeding gums")) suggestion="Vitamin c.";
result.innerHTML=`<p><strong>suggested medicine:</strong>${suggestion}</p>;
});
}
  if(loginForm) {
    loginForm.addEventListener('submit',e=>{
      e.preventDefault();
      const user=document.getElementByID('username').value;
      const pass=document.getElementByID('password').value;
      let stored=JSON.parse(localstorage.getltem('u$$')||'{}');
      if(stored[user]&&stored[user]!==pass){
      alert("Incorrect password!");
      return;
      }
      stored[user]=pass;
      localStorage.setItem('u&&',JSON.stringfy(stored));
      localStorage.setItem('loggedUser',User);
      alert("Login successful!");
      window.location.href="remainder.html";
      });
      }
      if(logoutBtn){
      logoutBtn.addEventListener('click',()=>{
      localStorage.removeItem('logged User');
      alert("Logged out.");
      window.location.href="login.html";
    });
  }
});


























      






























