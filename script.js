let buttonGetSignal = document.getElementById("get-signal");
let loadingSignal = document.getElementById("loading");
let screenStart = document.getElementById("screenStart");
let signal = document.getElementById("canvas");
let buttonChoseTraps = document.getElementById("chose-traps");
let selectIndex = document.getElementById("select-index");
let percentChance = document.getElementById("percent-chance");
let mainScreen = document.getElementById("main-screen");
let trapsScreen = document.getElementById("traps-screen");
buttonGetSignal.onclick = getSignal;
    function getSignal() {
    signal.classList.add("deactive");
    screenStart.classList.add("deactive");
    loadingSignal.classList.remove("deactive");
    buttonGetSignal.disabled = true;
    // const randomPhotoNumber = Math.floor(Math.random() * (109 - 1) + 1);
    // signal.src = `static/mines/signals/Screenshot_${randomPhotoNumber}.png`;
    mainScreen.style.display="";
    trapsScreen.style.display="none";
    percentChance.textContent = "CHANCE: "+ getRandomNumber()+"%";
    percentChance.style.display = '';
    setTimeout(function(){
    loadingSignal.classList.add("deactive");
    signal.classList.remove("deactive");
    buttonGetSignal.disabled = false;
    handleScenario(Number(selectIndex.textContent));

}, 3000);
}
function handleClick(element) {
    const value = element.querySelector('a').innerText;
    selectIndex.textContent = value;
    getSignal();
}

function getRandomNumber() {
    return (Math.random() * (95 - 80) + 80).toFixed(2);
}
function activeTrapsScreen() {
    if(mainScreen.style.display === "none") {
        mainScreen.style.display = "";
        trapsScreen.style.display = "none";
    }else {
        mainScreen.style.display = "none";
        trapsScreen.style.display= "";
    }
}
let signalCount = 0;
let isBlocked = false;
const MAX_FREE_SIGNALS = 2;
const SECRET_WORD = "abrakadabra"; // Замени на своё

document.getElementById("get-signal").addEventListener("click", () => {␊
  if (isBlocked) {
    showSignalError("❌ На вашем аккаунте недостаточно средств. Пополните и введите секретное слово.");
    return;␊
  }

  signalCount++;
  if (signalCount > MAX_FREE_SIGNALS) {
    isBlocked = true;
    showSignalError("⚠️ На вашем аккаунте недостаточно средств. Пополните и введите секретное слово.");
  } else {
    getSignal(); // вызывается твоя логика сигнала␊
  }
});

function showSignalError(message) {
  const errorEl = document.getElementById("signal-error");
  errorEl.textContent = message;
  errorEl.style.display = "block";
  errorEl.classList.remove("shake");
  void errorEl.offsetWidth;
  errorEl.classList.add("shake");

  setTimeout(() => {
    errorEl.style.display = "none";
  }, 4000);
}

function unlockAccess() {
  const code = document.getElementById("unlock-code").value.trim().toLowerCase();
  if (code === SECRET_WORD) {
    isBlocked = false;
    signalCount = 0;
    showSignalError("✅ Доступ восстановлен!");
  } else {
    showSignalError("❌ Неверный код доступа.");
  }
}

