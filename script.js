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
<script>
function handleStart() {
  const id = document.getElementById("user-id").value.trim();
  const spinner = document.getElementById("loading-spinner");
  const statusText = document.getElementById("status-text");

  if (!id.startsWith("12") || id.length < 5) {
    alert("❌ Введите корректный ID, начинающийся на 12");
    return;
  }

  spinner.style.display = "block";
  statusText.style.display = "block";

  setTimeout(() => {
    document.getElementById("start-screen").style.display = "none";
    document.querySelector(".container").style.display = "flex";
  }, 2000);
}

