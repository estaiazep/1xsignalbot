const buttonGetSignal = document.getElementById("get-signal")
const loadingSignal = document.getElementById("loading")
const screenStart = document.getElementById("screenStart")
const signal = document.getElementById("canvas")
const buttonChoseTraps = document.getElementById("chose-traps")
const selectIndex = document.getElementById("select-index")
const percentChance = document.getElementById("percent-chance")
const mainScreen = document.getElementById("main-screen")
const trapsScreen = document.getElementById("traps-screen")

function showInsufficientFundsScreen() {
  document.getElementById("insufficient-funds-modal").style.display = "flex"
}

function hideInsufficientFundsModal() {
  document.getElementById("insufficient-funds-modal").style.display = "none"
}

if (buttonGetSignal) {
  buttonGetSignal.onclick = getSignal
}

function getSignal() {
  if (
    !signal ||
    !screenStart ||
    !loadingSignal ||
    !buttonGetSignal ||
    !percentChance ||
    !selectIndex ||
    !mainScreen ||
    !trapsScreen
  ) {
    return
  }

  signal.classList.add("deactive")
  screenStart.classList.add("deactive")
  loadingSignal.classList.remove("deactive")
  buttonGetSignal.disabled = true

  mainScreen.style.display = ""
  trapsScreen.style.display = "none"

  percentChance.textContent = "ШАНС: " + getRandomNumber() + "%"
  percentChance.style.display = ""

  setTimeout(() => {
    if (!loadingSignal || !signal || !buttonGetSignal || !selectIndex) return
    loadingSignal.classList.add("deactive")
    signal.classList.remove("deactive")
    buttonGetSignal.disabled = false

    // Create simple canvas visualization
    const canvas = document.getElementById("canvas")
    if (canvas) {
      const ctx = canvas.getContext("2d")
      canvas.width = 224
      canvas.height = 224

      // Clear canvas
      ctx.fillStyle = "#0a0f1d"
      ctx.fillRect(0, 0, 224, 224)

      // Draw grid
      ctx.strokeStyle = "#2a3145"
      ctx.lineWidth = 1
      for (let i = 0; i <= 5; i++) {
        ctx.beginPath()
        ctx.moveTo(i * 44.8, 0)
        ctx.lineTo(i * 44.8, 224)
        ctx.stroke()

        ctx.beginPath()
        ctx.moveTo(0, i * 44.8)
        ctx.lineTo(224, i * 44.8)
        ctx.stroke()
      }

      // Draw some highlighted cells
      const mines = Number(selectIndex.textContent) || 3
      const safeCells = []

      // Generate random safe positions
      for (let i = 0; i < 25 - mines; i++) {
        let pos
        do {
          pos = Math.floor(Math.random() * 25)
        } while (safeCells.includes(pos))
        safeCells.push(pos)
      }

      // Highlight first few safe cells
      safeCells.slice(0, Math.min(8, safeCells.length)).forEach((pos) => {
        const row = Math.floor(pos / 5)
        const col = pos % 5

        ctx.fillStyle = "rgba(0, 255, 136, 0.3)"
        ctx.fillRect(col * 44.8 + 2, row * 44.8 + 2, 40.8, 40.8)

        ctx.strokeStyle = "#00ff88"
        ctx.lineWidth = 2
        ctx.strokeRect(col * 44.8 + 2, row * 44.8 + 2, 40.8, 40.8)
      })
    }
  }, 3000)
}

function handleClick(element) {
  if (!selectIndex) return
  const value = element.querySelector("a").innerText
  selectIndex.textContent = value
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
