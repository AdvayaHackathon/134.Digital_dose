const BACKEND_URL = 'http://127.0.0.1:5000';

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

  // Schedule notification check
  scheduleCheck(reminder, phone);

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

function scheduleCheck(reminder, phone) {
  const reminderTime = new Date(reminder.medTime).getTime();
  const now = Date.now();
  const delay = reminderTime - now;

  if (delay > 0) {
    setTimeout(() => {
      const reminders = JSON.parse(localStorage.getItem('reminders-' + phone)) || [];
      const index = reminders.findIndex(r => r.medName === reminder.medName && r.medTime === reminder.medTime);
      if (index !== -1 && !reminders[index].taken) {
        // Send caretaker alert
        const user = JSON.parse(localStorage.getItem('user-' + phone));
        fetch(`${BACKEND_URL}/alert-caretaker`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            user: phone,
            caretaker: user.caretaker
          })
        }).then(res => res.json())
          .then(data => console.log(data));
      } else {
        // Send user notification (optional)
        fetch(`${BACKEND_URL}/send-notification`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            user: phone,
            message: `Time to take your medication: ${reminder.medName}`
          })
        }).then(res => res.json())
          .then(data => console.log(data));
      }
    }, delay);
  }
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

// Auto run reminder checks if page is open
if (window.location.pathname.includes("reminder.html")) {
  window.onload = loadReminders;
}
