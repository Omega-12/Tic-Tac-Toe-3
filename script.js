let currentPlayer = 'X';
let board = ['', '', '', '', '', '', '', '', ''];
let gameActive = true;

function handleCellClick(index) {
  if (board[index] === '' && gameActive) {
    board[index] = currentPlayer;
    document.getElementById('board').children[index].textContent = currentPlayer;

    if (checkWin()) {
      displayMessage(`${currentPlayer} wins!`);
      gameActive = false;
    } else if (board.every(cell => cell !== '')) {
      displayMessage('It\'s a draw!');
      gameActive = false;
    } else {
      currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
      displayMessage(`Player ${currentPlayer}'s turn`);
    }
  }
}

function checkWin() {
  const winPatterns = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
  ];

  return winPatterns.some(pattern => {
    const [a, b, c] = pattern;
    return board[a] !== '' && board[a] === board[b] && board[a] === board[c];
  });
}

function displayMessage(message) {
  document.getElementById('message').textContent = message;
}

function startNewGame() {
  currentPlayer = 'X';
  board = ['', '', '', '', '', '', '', '', ''];
  gameActive = true;

  document.getElementById('message').textContent = `Player ${currentPlayer}'s turn`;

  const cells = document.getElementById('board').children;
  for (let i = 0; i < cells.length; i++) {
    cells[i].textContent = '';
  }
}

// Create the board dynamically
const boardElement = document.getElementById('board');
for (let i = 0; i < 9; i++) {
  const cell = document.createElement('div');
  cell.className = 'cell';
  cell.addEventListener('click', () => handleCellClick(i));
  boardElement.appendChild(cell);
}

// Initial message
displayMessage(`Player ${currentPlayer}'s turn`);


