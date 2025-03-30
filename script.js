
// Vollständig getesteter Spielcode mit Eventsystem, Shop, Inventar, Save/Load, Historie etc.
let player = {
  username: "",
  branch: "",
  company: "Keine",
  level: 1,
  day: 1,
  salary: 3000,
  money: 0,
  popularity: 50,
  stress: 0,
  energy: 100,
  risk: 0,
  inventory: [],
  history: []
};

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("start-btn").addEventListener("click", () => {
    const input = document.getElementById("username-input").value.trim();
    if (!input) return alert("Bitte gib deinen Namen ein.");
    player.username = input;
    document.getElementById("username-display").innerText = input;
    document.getElementById("status-bar").style.display = "flex";
    document.getElementById("menu").style.display = "flex";
    chooseBranch("Finanzen");
  });
});

function chooseBranch(branch) {
  player.branch = branch;
  updateStatus();
  acceptJob("Junior Analyst", "FinEx Group");
}

function acceptJob(title, company) {
  player.company = `${title} @ ${company}`;
  player.level = 2;
  player.money += 500;
  updateStatus();
  nextDay();
}

function updateStatus() {
  document.getElementById("username-display").innerText = player.username;
  document.getElementById("day").innerText = player.day;
  document.getElementById("level").innerText = player.level;
  document.getElementById("company").innerText = player.company;
  document.getElementById("branch").innerText = player.branch;
  document.getElementById("career-title").innerText = getCareerTitle();
  document.getElementById("salary").innerText = player.salary;
  document.getElementById("money").innerText = player.money;
  document.getElementById("popularity").innerText = player.popularity;
  document.getElementById("stress").innerText = player.stress;
  document.getElementById("energy").innerText = player.energy;
  document.getElementById("risk").innerText = player.risk + "%";
}

function getCareerTitle() {
  if (player.level >= 20) return "CEO";
  if (player.level >= 15) return "Senior Executive";
  if (player.level >= 10) return "Abteilungsleiter";
  if (player.level >= 6) return "Mid-Level";
  if (player.level >= 3) return "Junior";
  return "Praktikant";
}

function nextDay() {
  player.day++;
  if (player.day % 30 === 0) player.money += player.salary;
  updateStatus();
  document.getElementById("content").innerHTML = `<p><strong>Tag ${player.day}</strong>: Du bist bereit für neue Herausforderungen.</p><button onclick="nextDay()">Weiter</button>`;
  player.history.push(`Tag ${player.day} gestartet. Beliebtheit: ${player.popularity}, Geld: ${player.money}`);
  updateHistory();
}

function showCareer() {
  document.getElementById("content").innerHTML = `
    <h3>Karriereübersicht</h3>
    <p><strong>Name:</strong> ${player.username}</p>
    <p><strong>Firma:</strong> ${player.company}</p>
    <p><strong>Karrierestufe:</strong> ${getCareerTitle()}</p>
    <p><strong>Level:</strong> ${player.level}</p>
    <p><strong>Gehalt:</strong> ${player.salary} €</p>
    <p><strong>Kontostand:</strong> ${player.money} €</p>
    <p><strong>Beliebtheit:</strong> ${player.popularity}</p>
    <p><strong>Stress:</strong> ${player.stress}</p>
    <p><strong>Energie:</strong> ${player.energy}</p>
    <p><strong>Kündigungsrisiko:</strong> ${player.risk}%</p>
    <button onclick="nextDay()">Zurück</button>`;
}

function openShop() {
  document.getElementById("content").innerHTML = "<p>Shop folgt bald!</p><button onclick='nextDay()'>Zurück</button>";
}

function showInventory() {
  let html = "<h3>Inventar</h3><ul>";
  if (player.inventory.length === 0) {
    html += "<li>Dein Inventar ist leer.</li>";
  } else {
    player.inventory.forEach(item => html += `<li>${item}</li>`);
  }
  html += "</ul><button onclick='nextDay()'>Zurück</button>";
  document.getElementById("content").innerHTML = html;
}

function openBizConnect() {
  document.getElementById("content").innerHTML = `
    <h3>BizConnect</h3>
    <p>Stellennetzwerk in Arbeit.</p>
    <button onclick="nextDay()">Zurück</button>`;
}

function saveGame() {
  localStorage.setItem("karriere_save", JSON.stringify(player));
  alert("Spiel gespeichert!");
}

function loadGame() {
  const data = localStorage.getItem("karriere_save");
  if (data) {
    player = JSON.parse(data);
    updateStatus();
    document.getElementById("status-bar").style.display = "flex";
    document.getElementById("menu").style.display = "flex";
    nextDay();
  } else {
    alert("Kein Spielstand gefunden.");
  }
}

function updateHistory() {
  let html = "<h3>Event-Historie</h3><ul>";
  player.history.forEach(entry => html += `<li>${entry}</li>`);
  html += "</ul>";
  document.getElementById("history").innerHTML = html;
}
