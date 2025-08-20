const buttonGetSignal = document.getElementById("get-signal")
const loadingSignal = document.getElementById("loading")
const screenStart = document.getElementById("screenStart")
const signalResult = document.getElementById("signal-result")
const spinsNumber = document.getElementById("spins-number")
const percentChance = document.getElementById("percent-chance")
const gameTitle = document.getElementById("game-title")

let selectedGame = null

// Game data
const games = {
  "dog-house": {
    name: "THE DOG HOUSE",
    minSpins: 8,
    maxSpins: 25,
  },
  "gates-olympus": {
    name: "GATES OF OLYMPUS",
    minSpins: 12,
    maxSpins: 30,
  },
  "sweet-bonanza": {
    name: "SWEET BONANZA",
    minSpins: 10,
    maxSpins: 28,
  },
}

if (buttonGetSignal) {
  buttonGetSignal.onclick = getSignal
}

function getSignal() {
  if (!signalResult || !screenStart || !loadingSignal || !buttonGetSignal || !percentChance || !spinsNumber) {
    return
  }

  signalResult.classList.add("deactive")
  screenStart.classList.add("deactive")
  loadingSignal.classList.remove("deactive")
  buttonGetSignal.disabled = true

  percentChance.textContent = "ANALYZING: " + getRandomNumber() + "%"
  percentChance.style.display = ""

  setTimeout(() => {
    if (!loadingSignal || !signalResult || !buttonGetSignal || !spinsNumber) return

    loadingSignal.classList.add("deactive")
    signalResult.classList.remove("deactive")
    buttonGetSignal.disabled = false

    // Generate random spins count based on selected game
    const gameData = games[selectedGame] || games["sweet-bonanza"]
    const spinsCount = Math.floor(Math.random() * (gameData.maxSpins - gameData.minSpins + 1)) + gameData.minSpins
    spinsNumber.textContent = spinsCount

    percentChance.style.display = "none"
  }, 3000)
}

function getRandomNumber() {
  return (Math.random() * (95 - 80) + 80).toFixed(2)
}

// ID Verification Logic with Progress Bar
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

  // Show game selection modal after 2 seconds
  setTimeout(() => {
    document.getElementById("verification-modal").style.display = "none"
    document.getElementById("game-selection-modal").style.display = "flex"
  }, 2000)
}

function verifyModalAccount() {
  const accountId = document.getElementById("modal-account-id").value

  hideModalError()

  if (!validateAccountId(accountId)) {
    showModalError("Invalid account ID format")
    return
  }

  // Start progress bar
  showProgress()

  // Save verification status
  localStorage.setItem("account_verified", "true")
  localStorage.setItem("account_id", accountId)
}

// Game Selection Logic
function selectGame(gameKey) {
  selectedGame = gameKey
  const gameData = games[gameKey]

  // Update game title
  if (gameTitle) {
    gameTitle.textContent = gameData.name
  }

  // Save selected game
  localStorage.setItem("selected_game", gameKey)

  // Hide game selection modal and show deposit modal
  document.getElementById("game-selection-modal").style.display = "none"
  document.getElementById("deposit-modal").style.display = "flex"
}

// Unlock Bot Logic
function unlockBot() {
  const unlockCode = document.getElementById("unlock-code-input").value
  const errorElement = document.getElementById("unlock-error")
  const successElement = document.getElementById("unlock-success")

  // Hide previous messages
  errorElement.style.display = "none"
  successElement.style.display = "none"

  if (unlockCode === "6923") {
    successElement.style.display = "block"
    localStorage.setItem("bot_unlocked", "true")

    // Close modal after 2 seconds
    setTimeout(() => {
      document.getElementById("deposit-modal").style.display = "none"
    }, 2000)
  } else {
    errorElement.style.display = "block"
  }
}

// Function to open developer chat for activation
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

// Function to open developer chat for ID
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

// Set event handlers
document.getElementById("modal-verify-button").onclick = verifyModalAccount
document.getElementById("modal-get-id-button").onclick = openDeveloperChatForId
document.getElementById("unlock-bot-button").onclick = unlockBot
document.getElementById("activate-now-button").onclick = openDeveloperChatForActivation

// Game selection event handlers
document.addEventListener("DOMContentLoaded", () => {
  const gameOptions = document.querySelectorAll(".game-option")
  gameOptions.forEach((option) => {
    option.addEventListener("click", function () {
      const gameKey = this.getAttribute("data-game")
      selectGame(gameKey)
    })
  })
})

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
  const savedGame = localStorage.getItem("selected_game")

  // Load saved game if exists
  if (savedGame && games[savedGame]) {
    selectedGame = savedGame
    gameTitle.textContent = games[savedGame].name
  }

  // Show verification modal immediately if not verified
  if (accountVerified !== "true" || botUnlocked !== "true") {
    setTimeout(() => {
      document.getElementById("verification-modal").style.display = "flex"
    }, 500)
  }
})
