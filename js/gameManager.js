//manages canvas objects and updates them
class gameManager {
    constructor(cv, gridRows, gridCols) {
        this.cv = cv;
        this.gridRows = gridRows;
        this.gridCols = gridCols;
        this.gridRowWidth = cv.canvas.width / gridRows;
        this.gridColWidth = cv.canvas.height / gridCols;
        this.objects = [];
        for (let i = 0; i < gridRows; i++) {
            this.objects.push([]);
            for (let j = 0; j < gridCols; j++) {
                this.objects[i].push({ l: false });
            }
        }
        cv.canvas.onclick = (e) => this.handleCvClick(e);
    }
    draw() {
        this.cv.clear();
        this.cv.grid(this.gridRows, this.gridCols, 'grey');
        for (let i = 0; i < this.gridRows; i++) {
            for (let j = 0; j < this.gridCols; j++) {
                if (this.objects[i][j].l) {
                    this.cv.cell(
                        i,
                        j,
                        '#' + Math.floor(Math.random() * 16777215).toString(16)
                    );
                }
            }
        }
    }
    cell(col, row) {
        this.objects[col][row].l = !this.objects[col][row].l;
        this.draw();
    }
    update() {
        /*
        1. Any live cell with fewer than two live neighbours dies
        2. Any live cell with two or three live neighbours lives on to the next generation.
        3. Any live cell with more than three live neighbours dies
        4. Any dead cell with exactly three live neighbours becomes a live cell
        */
        let newObjects = [];
        for (let i = 0; i < this.gridRows; i++) {
            newObjects.push([]);
            for (let j = 0; j < this.gridCols; j++) {
                newObjects[i].push({ l: false });
            }
        }
        for (let i = 0; i < this.gridRows; i++) {
            for (let j = 0; j < this.gridCols; j++) {
                let liveNeighbours = 0;
                if (i > 0) {
                    if (this.objects[i - 1][j].l) {
                        liveNeighbours++;
                    }
                    if (j > 0) {
                        if (this.objects[i - 1][j - 1].l) {
                            liveNeighbours++;
                        }
                    }
                    if (j < this.gridCols - 1) {
                        if (this.objects[i - 1][j + 1].l) {
                            liveNeighbours++;
                        }
                    }
                }
                if (i < this.gridRows - 1) {
                    if (this.objects[i + 1][j].l) {
                        liveNeighbours++;
                    }
                    if (j > 0) {
                        if (this.objects[i + 1][j - 1].l) {
                            liveNeighbours++;
                        }
                    }
                    if (j < this.gridCols - 1) {
                        if (this.objects[i + 1][j + 1].l) {
                            liveNeighbours++;
                        }
                    }
                }
                if (j > 0) {
                    if (this.objects[i][j - 1].l) {
                        liveNeighbours++;
                    }
                }
                if (j < this.gridCols - 1) {
                    if (this.objects[i][j + 1].l) {
                        liveNeighbours++;
                    }
                }
                if (this.objects[i][j].l) {
                    if (liveNeighbours < 2) {
                        newObjects[i][j].l = false;
                    } else if (liveNeighbours == 2 || liveNeighbours == 3) {
                        newObjects[i][j].l = true;
                    } else if (liveNeighbours > 3) {
                        newObjects[i][j].l = false;
                    }
                } else {
                    if (liveNeighbours == 3) {
                        newObjects[i][j].l = true;
                    }
                }
            }
        }
        this.objects = newObjects;

        this.draw();
    }
    handleCvClick(e) {
        let rect = this.cv.canvas.getBoundingClientRect();
        let x = Math.round(e.clientX - rect.left);
        let y = Math.round(e.clientY - rect.top);
        let col = Math.floor(x / this.gridRowWidth);
        let row = Math.floor(y / this.gridColWidth);
        this.cell(col, row);
    }
    reset() {
        for (let i = 0; i < this.gridRows; i++) {
            for (let j = 0; j < this.gridCols; j++) {
                this.objects[i][j].l = false;
            }
        }
        this.draw();
    }
    play(speed) {
        this.playing = true;
        this.update();
        this.interval = setInterval(() => {
            this.update();
        }, speed);
    }
    pause() {
        this.playing = false;
        clearInterval(this.interval);
    }
    speed(speed) {
        if (this.playing) {
            this.pause();
            this.play(speed);
        }
    }
}
