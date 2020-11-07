const squares = document.querySelectorAll("[data-input]")
const play_again = document.querySelector("[play-again]")
const reset = document.querySelector("[reset-game]")
const board = document.getElementsByClassName("game_grid")[0]
const playerOneScore = document.getElementById("playerOneScore");
const playerTwoScore = document.getElementById("playerTwoScore");
const declareWinner = document.getElementById("declare_winner");
const content = document.getElementById('content')
const overlay = document.querySelector('.overlay')
const close = document.querySelector('.overlay .close')

let player_one = "X";
let player_two = "O";
let counter = 0;
let countForTie = 0;
let grid = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[2,4,6],[0,4,8]]
playerOneScore.innerHTML=0;
playerOneScore.innerHTML=0;

winnerX=()=>{ 
  [player_one, player_two] = ["X","O"];
}

winnerO=()=>{
  [player_one, player_two] = ["O","X"];
}

playAgain= () => {
  for(var i=0; i<9; i++){
    board.children[i].innerHTML = "";
    counter = 0;
    countForTie = 0;
  }
}

resetTheGame = () => {
  for(var i=0; i<9; i++){
    board.children[i].innerHTML = "";
    counter = 0;
    countForTie = 0;
    playerOneScore.innerHTML=0;
    playerTwoScore.innerHTML=0;
  }
}


removeClassList = (item) => {
  //debugger;
  if((item===0)||(item===1)||(item===2)){
    for(var j=0; j<3; j++){
      board.children[grid[item][j]].classList.remove("row_strikeout")
    }
  }
  else if((item===3)||(item===4)||(item===5)){
    for(var j=0; j<3; j++){
      board.children[grid[item][j]].classList.remove("col_strikeout")
    }
  }
  else if(item===6){
    for(var j=0; j<3; j++){
      board.children[grid[item][j]].classList.remove("diagonalOne_strikeout")
    }
  }
  else{
    for(var j=0; j<3; j++){
      board.children[grid[item][j]].classList.remove("diagonalTwo_strikeout")
    }
  }
  return
}

freezeScreen=()=> {
  content.classList.add('freeze')
  overlay.classList.remove('hidden')
}

startGame = (event) =>{
  checkTheWinner = (toggleInput) => {
    for(let i=0; i<grid.length; i++){
      if (((board.children[grid[i][0]].innerHTML)===toggleInput) &&
          ((board.children[grid[i][1]].innerHTML)===toggleInput)  && 
          ((board.children[grid[i][2]].innerHTML) === toggleInput)
        ){
          if((i===0)||(i===1)||(i===2)){
            board.children[grid[i][0]].classList.add("row_strikeout")
            board.children[grid[i][1]].classList.add("row_strikeout")
            board.children[grid[i][2]].classList.add("row_strikeout")
          }
          else if((i===3)||(i===4)||(i===5)){
            board.children[grid[i][0]].classList.add("col_strikeout")
            board.children[grid[i][1]].classList.add("col_strikeout")
            board.children[grid[i][2]].classList.add("col_strikeout")
          }
          else if(i===6){
            board.children[grid[i][0]].classList.add("diagonalOne_strikeout")
            board.children[grid[i][1]].classList.add("diagonalOne_strikeout")
            board.children[grid[i][2]].classList.add("diagonalOne_strikeout")
          }
          else if(i===7){
            board.children[grid[i][0]].classList.add("diagonalTwo_strikeout")
            board.children[grid[i][1]].classList.add("diagonalTwo_strikeout")
            board.children[grid[i][2]].classList.add("diagonalTwo_strikeout")
          }
          if(toggleInput==="X") {
            playerOneScore.innerHTML++;
            declareWinner.innerHTML="Winner is X";
            winnerX();
          }else{
            playerTwoScore.innerHTML++;
            declareWinner.innerHTML = "Winner is O"            
            winnerO();
          }
          setTimeout(()=>{freezeScreen()},100)
          close.addEventListener('click', e => {
            e.preventDefault()
            content.classList.remove('freeze')
            overlay.classList.add('hidden')
            removeClassList(i)
            playAgain()
          })
          return
        }
      else{
        countForTie++
      }
    }
    if(countForTie===40){
      declareWinner.innerHTML="It's a tie"
      freezeScreen()
      close.addEventListener('click', e => {
        e.preventDefault()
        content.classList.remove('freeze')
        overlay.classList.add('hidden')
        playAgain()
      })
      return
    }
  }
  
  if(event.target.innerHTML === ""){
    counter++;
    (counter%2!==0) ? toggleInput = player_one : toggleInput = player_two;
    event.target.innerHTML = toggleInput;
    if(counter >= 5){
      checkTheWinner(toggleInput)
    }
  }  
}


squares.forEach(item=>{
  item.addEventListener("click", startGame)
})


reset.addEventListener("click", resetTheGame)