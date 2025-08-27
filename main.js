const gameBoard = (()=>{
        const arr = [];
        for(let i= 0; i< 9; i++){
            arr[i] = "";
        }
        const updateArray = (index, value)=>{
            arr[index] = value;
        }
        const getValue =(index)=>{
            return arr[index];
        }
        return {
            updateArray,
            getValue,
        }
    }
)()

const gameController = (()=>{
    let currentPlayer = "X";
    const getCurrentPlayer = ()=> currentPlayer;
    const setCurrentPlayer = (player)=>{
        currentPlayer = player;
    }
    const changeTurn = ()=>{
        currentPlayer = currentPlayer === "X"? "O" : "X";
    }
    const update = (index)=>{
        gameBoard.updateArray(index, currentPlayer);
    }
    const winCondition = ()=>{
        const winArr = [[0, 1, 2], [3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];
        for(let arr of winArr){
            let [a, b, c] = [gameBoard.getValue(arr[0]), gameBoard.getValue(arr[1]), gameBoard.getValue(arr[2])];
            if(a === ""){
                continue;
            }
            else{
                if( a === b && b === c){
                    return true;
                }
            }
        }
        return false;
    }
    const isDraw = ()=>{
        for(let i = 0; i<9; i++){
            if(gameBoard.getValue(i) === ""){
                return false;
            }
        }
        return true;
    }

    return{
        getCurrentPlayer,
        setCurrentPlayer,
        changeTurn,
        update,
        winCondition,
        isDraw,
    }
}
)();

const displayController = (()=>{

        const playerArr = [];
        let gameContinue = false;

        const blocks = document.querySelectorAll(".btn");
        const players = document.querySelectorAll(".player");
        const form = document.querySelector(".form");
        const winner = document.querySelector(".winner");
        const winnerName = document.querySelector(".winner p");

        const playerName = document.querySelector("#playerName");
        const playerOne = document.querySelector(".one h1");
        const playerTwo = document.querySelector(".two h1");

        const startBtn = document.querySelector(".start");
        const restartBtn = document.querySelector(".restart");
        const playerBtn = document.querySelector(".btn-submit");
        
        


        startBtn.addEventListener('click', ()=>{
            startBtn.setAttribute("disabled", "");
            startGame();
        });
        restartBtn.addEventListener('click', ()=> restart());
        form.addEventListener("submit", event=> event.preventDefault());
        
        playerBtn.addEventListener('click', ()=>{
            if(playerArr.length < 2){
                const player = new Player(playerName.value);
                playerArr.push(player);
                playerName.value = "";
                if(playerArr.length ===1)  playerOne.textContent = playerArr[0].name;
                else if(playerArr.length === 2){
                    form.style.display ="none";
                    playerTwo.textContent = playerArr[1].name;
                } 
            }                 
        } );

        for(let i=0; i<9; i++){
            blocks[i].setAttribute("disabled", '');
            blocks[i].addEventListener("click", ()=>{
                let currentPlayer = gameController.getCurrentPlayer();
                gameController.update(i);
                blocks[i].textContent = currentPlayer;
                blocks[i].setAttribute("disabled", '');
                hasWonOrDraw(currentPlayer, gameController.winCondition());
                gameController.changeTurn();
                
            });
        }

        function hasWonOrDraw(currentPlayer, win){
            let draw = gameController.isDraw();
            if(win || draw ){
                winner.style.display = "flex";
                startBtn.disabled = false;
                gameContinue = true;
                for(let i=0; i<9; i++){
                    gameBoard.updateArray(i, "");
                    blocks[i].textContent = "";
                    blocks[i].disabled = true;
                }
                if(win){
                    if(currentPlayer === "X"){
                        winnerName.textContent = playerArr[0].name;
                    }
                    else{
                        winnerName.textContent = playerArr[1].name;
                    }
                }
                else{
                    winnerName.textContent = "It's a Draw!";
                }
            }
        }

        function Player(name){
            this.name = name;
            this.score = 0;
        }

        function startGame(){
            for(let i =0; i < 9; i++){
                blocks[i].disabled = false;
            }
            if(gameContinue){
                form.style.display = "none";
            }
            else{
                form.style.display = "flex";
            }
            gameController.setCurrentPlayer("X");
            winner.style.display = "none";
            
            
        }

        function restart(){
            for(let i=0; i<9; i++){
                gameBoard.updateArray(i, "");
                blocks[i].textContent = "";
                blocks[i].disabled = true;
            }

            gameContinue = false;

            playerArr.length = 0;
            gameController.setCurrentPlayer("X");
            winner.style.display = "none";
            playerOne.textContent = "-----";
            playerTwo.textContent = "-----";
            startBtn.disabled = false;
            form.style.display ="none";
        }

        return{
            blocks,
            players,
            form,
            winner,
        }
    }
)();
