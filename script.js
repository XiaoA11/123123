document.addEventListener('DOMContentLoaded', () => {
    const grid = document.querySelector('#game');
    const width = 8;
    let squares = [];
    let score = 0;

function createBoard() {
    for (let i = 0; i < width * width; i++) {
        const square = document.createElement('div');
        square.setAttribute('id', i.toString());
        square.setAttribute('class', 'square');
        square.style.backgroundColor = getRandomColor();
        grid.appendChild(square);
        squares.push(square);
    }
    // 添加拖动事件监听器
    addDragListeners();
}

function addDragListeners() {
    squares.forEach(square => {
        square.setAttribute('draggable', 'true');
        square.addEventListener('dragstart', dragStart);
        square.addEventListener('dragover', e => e.preventDefault());
        square.addEventListener('dragenter', e => e.preventDefault());
        square.addEventListener('dragleave', e => e.preventDefault());
        square.addEventListener('drop', dragDrop);
        square.addEventListener('dragend', dragEnd);
    });
}

    function getRandomColor() {
        const colors = ['#FF5733', '#33FF57', '#3357FF', '#F333FF', '#FF3388'];
        return colors[Math.floor(Math.random() * colors.length)];
    }

    let squareBeingDragged = null;
    let squareBeingReplaced = null;
    let squareIdBeingDragged = null;
    let squareIdBeingReplaced = null;

    function dragStart() {
        squareBeingDragged = this;
        squareIdBeingDragged = parseInt(squareBeingDragged.id);
    }

    function dragDrop() {
        squareBeingReplaced = this;
        squareIdBeingReplaced = parseInt(squareBeingReplaced.id);
    }

   
       function dragEnd() {
    // 定义有效移动的位置索引
    const validMoves = [
        squareIdBeingDragged - 1,
        squareIdBeingDragged + 1,
        squareIdBeingDragged - width,
        squareIdBeingDragged + width
    ];
    const validMove = validMoves.includes(squareIdBeingReplaced);

    // 如果是有效移动，则交换颜色
    if (validMove) {
        let tempColor = squareBeingDragged.style.backgroundColor;
        squareBeingDragged.style.backgroundColor = squareBeingReplaced.style.backgroundColor;
        squareBeingReplaced.style.backgroundColor = tempColor;

        // 这里检查匹配
        checkRowForThree();
        checkColumnForThree();
    }
}
    // 在此添加 checkRowForThree, checkColumnForThree, moveIntoSquareBelow 等函数
function checkRowForThree() {
    for (let i = 0; i < squares.length; i++) {
        let rowOfThree = [i, i + 1, i + 2];
        let decidedColor = squares[i].style.backgroundColor;
        const isBlank = decidedColor === '';

        // 排除行末尾的两个方块
        if (rowOfThree.some(index => index % width > width - 3)) continue;

        if (rowOfThree.every(index => squares[index].style.backgroundColor === decidedColor && !isBlank)) {
            score += 3;
            rowOfThree.forEach(index => squares[index].style.backgroundColor = '');
            updateScore();
        }
    }
}

function checkColumnForThree() {
    for (let i = 0; i < width * (width - 2); i++) { // 更新循环条件以覆盖所有列
        let columnOfThree = [i, i + width, i + width * 2];
        let decidedColor = squares[i].style.backgroundColor;
        const isBlank = decidedColor === '';

        if (columnOfThree.every(index => squares[index].style.backgroundColor === decidedColor && !isBlank)) {
            score += 3;
            columnOfThree.forEach(index => {
                squares[index].style.backgroundColor = ''; // 或者设为特定的背景色，如 'white'
            });
            updateScore();
        }
    }
}

function moveIntoSquareBelow() {
    for (i = 0; i < 55; i++) {
        if(squares[i + width].style.backgroundColor === '') {
            squares[i + width].style.backgroundColor = squares[i].style.backgroundColor;
            squares[i].style.backgroundColor = getRandomColor();
        }
    }
}

 function updateGame() {
        moveIntoSquareBelow();
        checkRowForThree();
        checkColumnForThree();
        // 可能还需要添加更多的游戏更新逻辑
    }

    function updateScore() {
        document.getElementById('score').innerText = `Score: ${score}`;
    }

    createBoard();
    setInterval(updateGame, 100);
});
