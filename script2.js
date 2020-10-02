var arr = [[], [], [], [], [], [], [], [], []]
var temp = [[], [], [], [], [], [], [], [], []]

for (var i = 0; i < 9; i++) {
    for (var j = 0; j < 9; j++) {
        arr[i][j] = document.getElementById(i * 9 + j);

    }
}

function initializeTemp(temp) {

    for (var i = 0; i < 9; i++) {
        for (var j = 0; j < 9; j++) {
            temp[i][j] = false;

        }
    }
}


function setTemp(board, temp) {

    for (var i = 0; i < 9; i++) {
        for (var j = 0; j < 9; j++) {
            if (board[i][j] != 0) {
                temp[i][j] = true;
            }

        }
    }
}


function setColor(temp) {

    for (var i = 0; i < 9; i++) {
        for (var j = 0; j < 9; j++) {
            if (temp[i][j] == true) {
                arr[i][j].style.color = "#DC3545";
            }

        }
    }
}

function resetColor() {

    for (var i = 0; i < 9; i++) {
        for (var j = 0; j < 9; j++) {

            arr[i][j].style.color = "green";


        }
    }
}

var board = [[], [], [], [], [], [], [], [], []]


let button = document.getElementById('generate-sudoku')
let solve = document.getElementById('solve')

console.log(arr)
function changeBoard(board) {
    for (var i = 0; i < 9; i++) {
        for (var j = 0; j < 9; j++) {
            if (board[i][j] != 0) {

                arr[i][j].innerText = board[i][j]
            }

            else
                arr[i][j].innerText = ''
        }
    }
}


button.onclick = function () {
    var xhrRequest = new XMLHttpRequest()
    xhrRequest.onload = function () {
        var response = JSON.parse(xhrRequest.response)
        console.log(response)
        initializeTemp(temp)
        resetColor()

        board = response.board
        setTemp(board, temp)
        setColor(temp)
        changeBoard(board)
    }
    xhrRequest.open('get', 'https://sugoku.herokuapp.com/board?difficulty=easy')
    //we can change the difficulty of the puzzle the allowed values of difficulty are easy, medium, hard and random
    xhrRequest.send()
}

//to be completed by student
function isPossible(board, sr, sc, val) {
    for(var i=0; i<9; i++){
        if(board[i][sc] == val || board[sr][i] == val){
            return false;
        }
    }
    // Subgrid
    var r = sr-sr%3;
    var c = sc-sc%3;
    for(var i=r; i<r+3; i++){
        for(var j=c; j<c+3; j++){
            if(board[i][j] == val){
                return false;
            }
        }
    }
    return true;
}

//to be completed by student
function solveSudokuHelper(board, r, c) {
    if(r==9){
        changeBoard(board);
        return;
    }
    if(c==9){
        solveSudokuHelper(board, r+1, 0);
        return;
    }

    // Skip pre-filled cell
    if(board[r][c] != 0){
        solveSudokuHelper(board, r, c+1);
        return;
    }

    // There is a 0 in current location
    for(var i=1; i<=9; i++){
        if(isPossible(board, r, c, i)){
            board[r][c] = i;
            var success = solveSudokuHelper(board, r, c+1);
            if(success){
                return true;
            }
            // Backtrack
            board[r][c] = 0;
        }
    }
    return false;
}

function solveSudoku(board) {
    solveSudokuHelper(board, 0, 0)
}

solve.onclick = function () {
    solveSudoku(board)

}
