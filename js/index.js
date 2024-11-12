let padding = 10;
let desiredTileSize =
    new URLSearchParams(window.location.search).get('tileSize') || 30;
let canvasHeight = window.innerHeight / 1.5;
let canvasWidth = window.innerWidth - padding * 2;
let gridRows = Math.round(canvasWidth / desiredTileSize);
let gridRowWidth = canvasWidth / gridRows;
let gridCols = Math.floor(canvasHeight / gridRowWidth);
let gridColWidth = canvasHeight / gridCols;

let cv = new canvas('gameCanvas', canvasWidth, canvasHeight, 'white');

let gm = new gameManager(cv, gridRows, gridCols);

let gameSpeed = 500;

function resetGame() {
    gm.reset();
    gm.pause();
    playPauseButton.children[0].classList.remove('hidden');
    playPauseButton.children[1].classList.add('hidden');
    playPauseButton.children[2].innerHTML = 'Play';
    gm.cell(5, 5);
    gm.cell(6, 5);
    gm.cell(7, 5);
    gm.cell(7, 4);
    gm.cell(6, 3);
}

let playPauseButton = document.getElementById('playPauseButton');

function togglePlayPause() {
    gameSpeed = Math.abs(document.getElementById('speedInput').value);
    if (gm.playing) {
        gm.pause();
        playPauseButton.children[0].classList.remove('hidden');
        playPauseButton.children[1].classList.add('hidden');
        playPauseButton.children[2].innerHTML = 'Play';
        return;
    }
    gm.play(gameSpeed);
    playPauseButton.children[0].classList.add('hidden');
    playPauseButton.children[1].classList.remove('hidden');
    playPauseButton.children[2].innerHTML = 'Pause';
}

resetGame();
