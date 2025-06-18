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
function checkUserId() {
  const userId = document.getElementById("user-id").value.trim();
  const loader = document.getElementById("loader");

  // Проверка: ID должен начинаться с "12" и быть не короче 6 цифр
  if (!/^12\d{4,}$/.test(userId)) {
    alert("Введите корректный ID 1xBet (начинается с 12)");
    return;
  }

  // Показываем загрузку
  loader.style.display = "block";

  // Подделка задержки (например, 2.5 сек)
  setTimeout(() => {
    loader.style.display = "none";
    
    // Скрываем форму и показываем основной экран
    document.getElementById("id-screen").style.display = "none";
    document.querySelector(".container").style.display = "flex"; // или другой основной блок

  }, 2500);
}
