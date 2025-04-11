function registerUser() {
  const phone = document.getElementById('phone').value;
  const pass = document.getElementById('pass').value;
  const caretaker = document.getElementById('caretaker').value;
  if (!phone || !pass || !caretaker) return alert("Fill all fields");
  localStorage.setItem('user-' + phone, JSON.stringify({ pass, caretaker }));
  alert("Registered successfully!");
}

function loginUser() {
  const phone = document.getElementById('loginPhone').value;
  const pass = document.getElementById('loginPass').value;
  const user = JSON.parse(localStorage.getItem('user-' + phone));
  if (user && user.pass === pass) {
    localStorage.setItem('loggedInUser', phone);
    location.href = "home.html";
  } else {
    alert("Invalid login");
  }
}

function addReminder() {
  const medName = document.getElementById('medName').value;
  const medTime = document.getElementById('medTime').value;
  const phone = localStorage.getItem('loggedInUser');
  const reminder = { medName, medTime, taken: false };
  const reminders = JSON.parse(localStorage.getItem('reminders-' + phone)) || [];
  reminders.push(reminder);
  localStorage.setItem('reminders-' + phone, JSON.stringify(reminders));
  alert("Reminder saved!");
  location.reload();
}

function loadReminders() {
  const phone = localStorage.getItem('loggedInUser');
  const list = document.getElementById('reminderList');
  const reminders = JSON.parse(localStorage.getItem('reminders-' + phone)) || [];
  list.innerHTML = "";
  reminders.forEach((rem, index) => {
    const li = document.createElement('li');
    li.innerHTML = `${rem.medName} - ${new Date(rem.medTime).toLocaleString()} 
    [<a href="#" onclick="markTaken(${index})">Mark as Taken</a>]`;
    list.appendChild(li);
  });
}

function markTaken(index) {
  const phone = localStorage.getItem('loggedInUser');
  const reminders = JSON.parse(localStorage.getItem('reminders-' + phone)) || [];
  reminders[index].taken = true;
  localStorage.setItem('reminders-' + phone, JSON.stringify(reminders));
  alert("Marked as taken!");
  location.reload();
}

function suggestMedicine() {
  const symptom = document.getElementById("symptom").value;
  const suggestions = {
    cold: "Cetrizine",
    fever: "Paracetamol",
    headache: "Aspirin",
    cough: "Benadryl",
    sorethroat: "Strepsils",
    stomachpain: "Meftal",
    vomiting: "Ondem",
    diarrhea: "Loperamide",
    dizziness: "Vertin",
    constipation: "Lactulose",
    acne: "Clindamycin",
    rash: "Cetirizine",
    fatigue: "Vitamin B12",
    eyePain: "Lubricant drops",
    earPain: "Ciplox Ear Drops",
    musclePain: "Ibuprofen"
  };
  document.getElementById("medResult").innerText =
    suggestions[symptom] || "Consult a doctor";
}
