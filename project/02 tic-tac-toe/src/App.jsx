import { useState, useEffect } from "react";
import confetti from "canvas-confetti"
import { Square } from "./components/Square.jsx"
import { TURNS } from "./constants.js";
import { checkWinner, checkEndGame } from "./logic/board.js";
import { WinnerModal } from "./components/Winner.jsx";
import { saveGameToStorage, resetGameStorage } from "./logic/storage/index.js";
function App() {
  const [winner, setWinner] = useState(null);
  
  const [turn, setTurn] = useState(() => {
    const turnFromStorage = window.localStorage.getItem('turn');

    return JSON.parse(turnFromStorage) ?? TURNS.X;
  });
  
  const [board, setBoard] = useState(() => {
    const boardFromStorage = window.localStorage.getItem('board');

    if(boardFromStorage) return JSON.parse(boardFromStorage)
    return Array(9).fill(null);
  })


  const resetGame= () =>{
    setBoard(Array(9).fill(null))
    setWinner(null)
    setTurn(TURNS.X)
    resetGameStorage();
  }

  const updateBoard = (index) =>{
    //no actualizamos esta posición si ya tiene algo.
    if(board[index] || winner) return
    
    //cargar el tablero
    const newBoard = [...board]
    newBoard[index] = turn
    setBoard(newBoard)
    
    //cambiar el turno
    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X;
    setTurn(newTurn);

    //guardar partida
    saveGameToStorage(newBoard, newTurn)
    
    //comprobar si hay ganador
    const newWinner = checkWinner(newBoard);
    if(newWinner){
      confetti();
      setWinner(newWinner);
    }else if(checkEndGame(newBoard)) {
      setWinner(false);
    }
  }
  return (
    <main className="board">
      <h1>Tic tac toe</h1>
      <button onClick={resetGame}>Reset game</button>
      <section className="game">
        {
          board.map((_, index) => {
            return(
              <Square
                key = {index}
                index= {index}
                updateBoard={updateBoard}
              >
                {board[index]}
              </Square>
            )
          })
        }
      </section>
      <section className="turn">
        <Square isSelected = {turn === TURNS.X}>
          {TURNS.X}
        </Square>
        <Square isSelected = {turn === TURNS.O}>
          {TURNS.O}
        </Square>
      </section>
      <WinnerModal winner = {winner} resetGame = {resetGame}></WinnerModal>
    </main>
  )
}

export default App
