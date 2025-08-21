// Global variables
let selectedGame = {
  id: "sweet-bonanza",
  name: "Sweet Bonanza 1000",
  volatility: "Medium",
  bgImage: "/images/sweet-bonanza-bg.jpg",
  icon: "/images/sweet-bonanza-icon.png",
}

const gameData = {
  "sweet-bonanza": {
    name: "Sweet Bonanza 1000",
    volatility: "Medium",
    bgImage: "/images/sweet-bonanza-bg.jpg",
    icon: "/images/sweet-bonanza-icon.png",
    spins: [15, 20, 25, 30, 35],
  },
  "gates-olympus": {
    name: "Gates of Olympus",
    volatility: "High",
    bgImage: "/images/gates-olympus-bg.jpg",
    icon: "/images/gates-olympus-icon.png",
    spins: [18, 22, 28, 32, 38],
  },
  "dog-house": {
    name: "Dog House",
    volatility: "Medium",
    bgImage: "/images/dog-house-bg.jpg",
    icon: "/images/dog-house-icon.png",
    spins: [12, 18, 24, 28, 35],
  },
}

// Game selection functions
function selectGame(gameId, gameName) {
  selectedGame = gameData[gameId]
  selectedGame.id = gameId

  // Update UI elements
  document.getElementById("selected-game-name").textContent = selectedGame.name
  document.getElementById("selected-game-icon").src = selectedGame.icon
  document.getElementById("game-bg-image").src = selectedGame.bgImage

  // Hide game selection and show verification modal
  document.getElementById("game-selection-screen").style.display = "none"
  document.getElementById("verification-modal").style.display = "flex"
}

function goBackToGameSelection() {
  document.getElementById("main-game").style.display = "none"
  document.getElementById("game-selection-screen").style.display = "block"
}

// Signal generation
function getSignal() {
  const signal = document.getElementById("signal-card")
  const loading = document.getElementById("loading")
  const buttonGetSignal = document.getElementById("get-signal")
  const percentChance = document.getElementById("percent-chance")

  if (!signal || !loading || !buttonGetSignal) return

  // Hide signal card and show loading
  signal.classList.add("deactive")
  loading.classList.remove("deactive")
  buttonGetSignal.disabled = true

  // Update chance percentage
  percentChance.textContent = "CHANCE: " + getRandomNumber() + "%"
  percentChance.style.display = ""

  setTimeout(() => {
    loading.classList.add("deactive")
    signal.classList.remove("deactive")
    buttonGetSignal.disabled = false

    // Generate signal data
    generateSignalData()
  }, 3000)
}

function generateSignalData() {
  const spinsArray = gameData[selectedGame.id].spins
  const randomSpins = spinsArray[Math.floor(Math.random() * spinsArray.length)]

  // Update signal card
  document.getElementById("signal-game-name").textContent = selectedGame.name
  document.getElementById("signal-volatility-value").textContent = selectedGame.volatility
  document.getElementById("signal-spins-value").textContent = `${randomSpins} (Auto)`
  document.getElementById("signal-time-value").textContent = "5 minutes"
}

function getRandomNumber() {
  return (Math.random() * (95 - 80) + 80).toFixed(2)
}

// Modal functions
function showInsufficientFundsScreen() {
  document.getElementById("insufficient-funds-modal").style.display = "flex"
}

function hideInsufficientFundsModal() {
  document.getElementById("insufficient-funds-modal").style.display = "none"
}

// ID Verification Logic
function validateAccountId(id) {
  return /^13\d{8}$/.test(id)
}

function showModalError(message) {
  const errorElement = document.getElementById("modal-error-message")
  errorElement.textContent = message
  errorElement.style.display = "block"
}

function hideModalError() {
  document.getElementById("modal-error-message").style.display = "none"
}

function showProgress() {
  document.getElementById("verification-progress").style.display = "block"
  document.getElementById("modal-verify-button").style.display = "none"

  let progress = 0
  const progressBar = document.getElementById("progress-bar-fill")
  const progressText = document.getElementById("progress-text")

  const interval = setInterval(() => {
    progress += 2
    progressBar.style.width = progress + "%"
    progressText.textContent = `Checking... ${progress}%`

    if (progress >= 100) {
      clearInterval(interval)
      showSuccess()
    }
  }, 60)
}

function showSuccess() {
  document.getElementById("verification-progress").style.display = "none"
  document.getElementById("success-message").style.display = "block"

  // Show main game screen after 2 seconds
  setTimeout(() => {
    document.getElementById("verification-modal").style.display = "none"
    document.getElementById("main-game").style.display = "block"

    // Show insufficient funds modal after 3 seconds
    setTimeout(() => {
      showInsufficientFundsScreen()
    }, 3000)
  }, 2000)
}

function verifyModalAccount() {
  const accountId = document.getElementById("modal-account-id").value

  hideModalError()

  if (!validateAccountId(accountId)) {
    showModalError("Invalid account ID format")
    return
  }

  showProgress()
  localStorage.setItem("account_verified", "true")
  localStorage.setItem("account_id", accountId)
}

// Unlock Bot Logic
function unlockBot() {
  const unlockCode = document.getElementById("unlock-code-input").value
  const errorElement = document.getElementById("unlock-error")
  const successElement = document.getElementById("unlock-success")

  errorElement.style.display = "none"
  successElement.style.display = "none"

  if (unlockCode === "6923") {
    successElement.style.display = "block"
    localStorage.setItem("bot_unlocked", "true")

    setTimeout(() => {
      document.getElementById("insufficient-funds-modal").style.display = "none"
    }, 2000)
  } else {
    errorElement.style.display = "block"
  }
}

// Developer chat functions
function openDeveloperChatForActivation() {
  const developerUsername = "TsantosI_PH_bot"
  const prefillMessage = "Hi! I want to activate my account for signals 💰"
  const telegramUrl = `https://t.me/${developerUsername}?text=${encodeURIComponent(prefillMessage)}`

  if (window.Telegram && window.Telegram.WebApp) {
    window.Telegram.WebApp.openTelegramLink(telegramUrl)
  } else {
    window.open(telegramUrl, "_blank")
  }
}

function openDeveloperChatForId() {
  const developerUsername = "TsantosI_PH_bot"
  const prefillMessage = "Hi! I want to get my 1xBet ID ✅"
  const telegramUrl = `https://t.me/${developerUsername}?text=${encodeURIComponent(prefillMessage)}`

  if (window.Telegram && window.Telegram.WebApp) {
    window.Telegram.WebApp.openTelegramLink(telegramUrl)
  } else {
    window.open(telegramUrl, "_blank")
  }
}

// Event listeners
document.getElementById("get-signal").onclick = getSignal
document.getElementById("modal-verify-button").onclick = verifyModalAccount
document.getElementById("modal-get-id-button").onclick = openDeveloperChatForId
document.getElementById("unlock-bot-button").onclick = unlockBot
document.getElementById("activate-now-button").onclick = openDeveloperChatForActivation

// Enter key handlers
document.getElementById("modal-account-id").addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    verifyModalAccount()
  }
})

document.getElementById("unlock-code-input").addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    unlockBot()
  }
})

// Clear error on input
document.getElementById("modal-account-id").addEventListener("input", () => {
  hideModalError()
})

document.getElementById("unlock-code-input").addEventListener("input", () => {
  document.getElementById("unlock-error").style.display = "none"
  document.getElementById("unlock-success").style.display = "none"
})

// Check verification status on load
window.addEventListener("load", () => {
  const botUnlocked = localStorage.getItem("bot_unlocked")
  const accountVerified = localStorage.getItem("account_verified")

  if (botUnlocked === "true" && accountVerified === "true") {
    document.getElementById("game-selection-screen").style.display = "none"
    document.getElementById("main-game").style.display = "block"
  }
})
