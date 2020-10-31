document.addEventListener('DOMContentLoaded',() => {
    const gridDisplay = document.querySelector('.grid')
    const scoreDisplay = document.getElementById('score')
    const resultDisplay = document.getElementById('result')
    const width = 4
    let squares = []
    let score =  0

    //crete a board 
    function createBoard(){
        
        for(let i=0; i < width*width; i++){
            square = document.createElement('div')
            square.innerHTML = 0
            
            gridDisplay.appendChild(square)
            squares.push(square)
        }
        generate() //call to generate number at starting
        generate()
    }
    createBoard()


    //generate a number randomly
    function generate(){
        let randomNumber = Math.floor(Math.random() * squares.length)
        if(squares[randomNumber].innerHTML == 0){
            squares[randomNumber].innerHTML = 2
            checkForGameOver()
        }else generate()
    }



    //swipe right
    function moveRight() {
        for(let i=0; i < 16; i++){
            if(i % 4 === 0){
                let totalOne = squares[i].innerHTML
                let totalTwo = squares[i+1].innerHTML
                let totalThree = squares[i+2].innerHTML
                let totalFour = squares[i+3].innerHTML
                let row = [parseInt(totalOne), parseInt(totalTwo), parseInt(totalThree), parseInt(totalFour)]

               

                let filteredRow = row.filter(num => num)
                let missing = 4 - filteredRow.length
                let zeros = Array(missing).fill(0)
                let newRow = zeros.concat(filteredRow)

                squares[i].innerHTML = newRow[0]
                squares[i+1].innerHTML = newRow[1]
                squares[i+2].innerHTML = newRow[2]
                squares[i+3].innerHTML = newRow[3]
            }
        }
    }

   


//swipe left
function moveLeft() {
    for(let i=0; i < 16; i++){
        if(i % 4 === 0){
            let totalOne = squares[i].innerHTML
            let totalTwo = squares[i+1].innerHTML
            let totalThree = squares[i+2].innerHTML
            let totalFour = squares[i+3].innerHTML
            let row = [parseInt(totalOne), parseInt(totalTwo), parseInt(totalThree), parseInt(totalFour)]

            

            let filteredRow = row.filter(num => num)
            let missing = 4 - filteredRow.length
            let zeros = Array(missing).fill(0)
            let newRow = filteredRow.concat(zeros)
           

            squares[i].innerHTML = newRow[0]
            squares[i+1].innerHTML = newRow[1]
            squares[i+2].innerHTML = newRow[2]
            squares[i+3].innerHTML = newRow[3]
        }
    }
}
//swipe down
function moveDown(){
    for(let i=0; i < 4; i++){
        let totalOne = squares[i].innerHTML
        let totalTwo = squares[i+width].innerHTML
        let totalThree = squares[i+(width*2)].innerHTML
        let totalFour = squares[i+(width*3)].innerHTML
        let column = [parseInt(totalOne), parseInt(totalTwo), parseInt(totalThree), parseInt(totalFour)]

        let filteredCloumn = column.filter(num => num)
        let missing = 4 - filteredCloumn.length
        let zeros = Array(missing).fill(0)
        let newColumn = zeros.concat(filteredCloumn)

        squares[i].innerHTML = newColumn[0]
        squares[i+width].innerHTML = newColumn[1]
        squares[i+(width*2)].innerHTML = newColumn[2]
        squares[i+(width*3)].innerHTML = newColumn[3]
    }
}





//swipe up
function moveUp(){
    for(let i=0; i < 4; i++){
        let totalOne = squares[i].innerHTML
        let totalTwo = squares[i+width].innerHTML
        let totalThree = squares[i+(width*2)].innerHTML
        let totalFour = squares[i+(width*3)].innerHTML
        let column = [parseInt(totalOne), parseInt(totalTwo), parseInt(totalThree), parseInt(totalFour)]

        let filteredCloumn = column.filter(num => num)
        let missing = 4 - filteredCloumn.length
        let zeros = Array(missing).fill(0)
        let newColumn = filteredCloumn.concat(zeros)

        squares[i].innerHTML = newColumn[0]
        squares[i+width].innerHTML = newColumn[1]
        squares[i+(width*2)].innerHTML = newColumn[2]
        squares[i+(width*3)].innerHTML = newColumn[3]
    }
}






function combineRow(){
    for(let i=0; i < 15; i++){
        if(squares[i].innerHTML === squares[i+1].innerHTML){
            let combineTotal = parseInt(squares[i].innerHTML) + parseInt(squares[i+1].innerHTML)
            squares[i].innerHTML = combineTotal
            squares[i+1].innerHTML = 0
            score += combineTotal
            scoreDisplay.innerHTML = score
        }
    }
    checkForWin()
}


function combineColumn(){
    for(let i=0; i < 12; i++){
        if(squares[i].innerHTML === squares[i+width].innerHTML){
            let combineTotal = parseInt(squares[i].innerHTML) + parseInt(squares[i+width].innerHTML)
            squares[i].innerHTML = combineTotal
            squares[i+width].innerHTML = 0
            score += combineTotal
            scoreDisplay.innerHTML = score
        }
    }
    checkForWin()
}

//assign keycodes
function control(e){
    if(e.keyCode === 39){
        keyRight()   
    }else if(e.keyCode ===37){
        keyLeft()
    }else if(e.keyCode ===38){
        keyUp()
    }else if(e.keyCode ===40){
        keyDown()
    }
} 
document.addEventListener('keyup', control)

function keyRight(){
    moveRight()
    combineRow()
    moveRight()
    generate()
}
function keyLeft(){
    moveLeft()
    combineRow()
    moveLeft()
    generate()

}

function keyDown(){
    moveDown()
    combineColumn()
    moveDown()
    generate()

}
function keyUp(){
    moveUp()
    combineColumn()
    moveUp()
    generate()
}

//check for the number 2048 in the squres to win 
function checkForWin(){
    for(let i=0; i < squares.length; i++){
      if(squares[i].innerHTML == 2048){
          resultDisplay.innerHTML = 'You Win!'
          document.removeEventListener('keyup', control)
      }  
    }
}

//check if there are no zero on the board to lose
function checkForGameOver(){
    let zeros = 0 
    for(let i=0; i < squares.length; i++){
        if(squares[i].innerHTML == 0){
            zeros++
        }
    }
    if(zeros === 0){
        resultDisplay.innerHTML = 'You Lose Noob Go Home and Cry!!!!! No need to try again!!!!'
        alert('You Lose Noob Go Home and Cry!!!!!')
        document.removeEventListener('keyup', control)
    }
}

  //clear timer
  function clear() {
    clearInterval(myTimer)
  }

function addColours() {
    for (let i=0; i < squares.length; i++) {
      if (squares[i].innerHTML == 0) squares[i].style.backgroundColor = '#D3C033'
      else if (squares[i].innerHTML == 2) squares[i].style.backgroundColor = '#C70039  '
      else if (squares[i].innerHTML  == 4) squares[i].style.backgroundColor = '#FFC300' 
      else if (squares[i].innerHTML  == 8) squares[i].style.backgroundColor = '#581845' 
      else if (squares[i].innerHTML  == 16) squares[i].style.backgroundColor = '#26B333' 
      else if (squares[i].innerHTML  == 32) squares[i].style.backgroundColor = '#040AE8 ' 
      else if (squares[i].innerHTML == 64) squares[i].style.backgroundColor = '#118049 ' 
      else if (squares[i].innerHTML == 128) squares[i].style.backgroundColor = '#EC05CC' 
      else if (squares[i].innerHTML == 256) squares[i].style.backgroundColor = '#DAF7A6 ' 
      else if (squares[i].innerHTML == 512) squares[i].style.backgroundColor = '#34495E ' 
      else if (squares[i].innerHTML == 1024) squares[i].style.backgroundColor = '#D35400 ' 
      else if (squares[i].innerHTML == 2048) squares[i].style.backgroundColor = '#145A32' 
    }
}
addColours()
var myTimer = setInterval(addColours, 50)

})