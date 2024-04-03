let timeLeft = 120;
let timerId;
let foundDifferences = 0;
const totalDifferences = 5; // 假设总差异数为5
const tolerance = 20; // 允许的点击误差范围

// 假设的差异点坐标
const differences = [
    { x: 180, y: 1000, tolerance: 50, found: false },
    { x: 970, y: 1174, tolerance: 50, found: false },
    { x: 630, y: 634, tolerance: 50, found: false },
    { x: 362, y: 282, tolerance: 50, found: false },
    { x: 920, y: 390, tolerance: 50, found: false },
    // 根据实际情况添加更多差异点
];

function updateTimer() {
    if (timeLeft > 0) {
        timeLeft -= 1;
        document.getElementById('time').textContent = timeLeft;
    } else {
        endGame(false);
    }
}

function startGame() {
    document.getElementById('start-button').disabled = true;
    timerId = setInterval(updateTimer, 1000);
    // 重置差异点的发现状态
    differences.forEach(diff => diff.found = false);
    foundDifferences = 0;
    document.getElementById('found').textContent = `${foundDifferences}/${totalDifferences}`;
}

function endGame(win) {
    clearInterval(timerId);
    document.getElementById('start-button').disabled = false;
    alert(win ? '恭喜！你找到了所有的差异！' : '时间到！再试一次吧！');
    resetGame();
}

function checkDifference(event, imageNumber) {
    // 获取图片元素
    const image = document.getElementById(`image${imageNumber}`);

    // 获取图片的显示尺寸
    const displayedWidth = image.offsetWidth;
    const displayedHeight = image.offsetHeight;

    // 获取图片的实际尺寸
    const actualWidth = image.naturalWidth;
    const actualHeight = image.naturalHeight;

    // 计算缩放比例
    const scaleX = actualWidth / displayedWidth;
    const scaleY = actualHeight / displayedHeight;

    // 调整点击坐标，以匹配原始图片尺寸
    const clickX = (event.offsetX * scaleX);
    const clickY = (event.offsetY * scaleY);

    // 检查点击位置是否接近任一差异点
    const differenceFound = differences.some(diff => {
        const distance = Math.sqrt(Math.pow(clickX - diff.x, 2) + Math.pow(clickY - diff.y, 2));
        if (!diff.found && distance <= diff.tolerance) {
            diff.found = true;
            return true;
        }
        return false;
    });

    if (differenceFound) {
        foundDifferences++;
        document.getElementById('found').textContent = `${foundDifferences}/${totalDifferences}`;
        if (foundDifferences === totalDifferences) {
            endGame(true);
        }
    }
}



function resetGame() {
    timeLeft = 120;
    foundDifferences = 0;
    document.getElementById('time').textContent = timeLeft;
    document.getElementById('found').textContent = `${foundDifferences}/${totalDifferences}`;
}

document.getElementById('start-button').addEventListener('click', startGame);
