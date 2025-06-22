const buttonGetSignal = document.getElementById("get-signal")
const loadingSignal = document.getElementById("loading")
const screenStart = document.getElementById("screenStart")
const signal = document.getElementById("canvas")
const buttonChoseTraps = document.getElementById("chose-traps")
const selectIndex = document.getElementById("select-index")
const percentChance = document.getElementById("percent-chance")
const mainScreen = document.getElementById("main-screen")
const trapsScreen = document.getElementById("traps-screen")

if (buttonGetSignal) {
  buttonGetSignal.onclick = getSignal
}

function getSignal() {
  if (!signal || !screenStart || !loadingSignal || !buttonGetSignal || !percentChance || !selectIndex) {
    return
  }

  signal.classList.add("deactive")
  screenStart.classList.add("deactive")
  loadingSignal.classList.remove("deactive")
  buttonGetSignal.disabled = true

  if (mainScreen) mainScreen.style.display = ""
  if (trapsScreen) trapsScreen.style.display = "none"

  percentChance.textContent = "CHANCE: " + getRandomNumber() + "%"
  percentChance.style.display = ""

  setTimeout(() => {
    loadingSignal.classList.add("deactive")
    signal.classList.remove("deactive")
    buttonGetSignal.disabled = false
    handleScenario(Number(selectIndex.textContent))
  }, 3000)
}

function handleClick(element) {
  const value = element.querySelector("a").innerText
  if (selectIndex) {
    selectIndex.textContent = value
  }
  getSignal()
}

function getRandomNumber() {
  return (Math.random() * (95 - 80) + 80).toFixed(2)
}

function activeTrapsScreen() {
  if (!mainScreen || !trapsScreen) return

  if (mainScreen.style.display === "none") {
    mainScreen.style.display = ""
    trapsScreen.style.display = "none"
  } else {
    mainScreen.style.display = "none"
    trapsScreen.style.display = ""
  }
}

function handleScenario(trapCount) {
  // Ваша логика обработки сценария
  console.log("Handling scenario with", trapCount, "traps")
}
