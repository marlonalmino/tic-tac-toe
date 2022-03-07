const statusDisplay = document.querySelector('.game--status')

let gameActive = true

let currentPlayer = 'X'

let gameState = ['', '', '', '', '', '', '', '', '']

const winningConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
]

const winningMessage = () => `Player ${currentPlayer} has won!`
const drawMessage = () => `Game ended in a draw!`
const currentPlayerTurn = () => `It's ${currentPlayer}'s turn`

statusDisplay.innerHTML = currentPlayerTurn()

function handleCellPlayed(clickedCell, clickedCellIndex) {
  gameState[clickedCellIndex] = currentPlayer
  clickedCell.innerHTML = currentPlayer
}

function handlePlayerChange() {}

function handleResultValidation() {
  let roundWon = false

  for (let i = 0; i <= 7; i++) {
    const winContidion = winningConditions[i]
    let a = gameState[winContidion[0]]
    let b = gameState[winContidion[1]]
    let c = gameState[winContidion[2]]

    if (a === '' || b === '' || c === '') {
      continue
    }

    if (a === b && b === c) {
      roundWon = true
      break
    }
  }

  if (roundWon) {
    statusDisplay.innerHTML = winningMessage()
    gameActive = false
    return
  }
}

function handleCellClick(clickedCellEvent) {
  const clickedCell = clickedCellEvent.target

  const clickedCellIndex = parseInt(clickedCell.getAttribute('data-cell-index'))

  if (gameState[clickedCellIndex] !== '' || !gameActive) {
    return
  }

  handleCellPlayed(clickedCell, clickedCellIndex)
  handleResultValidation()
}

function handleRestartGame() {}

document
  .querySelectorAll('.cell')
  .forEach((cell) => cell.addEventListener('click', handleCellClick))

document
  .querySelector('.game--restart')
  .addEventListener('click', handleRestartGame)
