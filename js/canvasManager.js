class canvas {
    constructor(id, width, height, color) {
        this.canvas = document.getElementById(id);
        this.ctx = this.canvas.getContext("2d");
        this.canvas.width = width;
        this.width = width;
        this.canvas.height = height;
        this.height = height;
        this.ctx.fillStyle = color;
        this.bg = color;
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }
    clear() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
    rect(drawPoint, dimensions, color, stroke = color) {
        this.ctx.fillStyle = color;
        this.ctx.strokeStyle = stroke;
        this.ctx.fillRect(
            drawPoint[0],
            drawPoint[1],
            dimensions[0] || dimensions,
            dimensions[1] || dimensions
        );
    }
    circle(x, y, r, color, stroke = color) {
        this.ctx.fillStyle = color;
        this.ctx.strokeStyle = stroke;
        this.ctx.beginPath();
        this.ctx.arc(x, y, r, 0, 2 * Math.PI);
        this.ctx.fill();
    }
    text(x, y, text, color, font = "30px Arial") {
        this.ctx.fillStyle = color;
        this.ctx.font = font;
        this.ctx.fillText(text, x, y);
    }
    line(p1, p2, color) {
        this.ctx.strokeStyle = color;
        this.ctx.beginPath();
        this.ctx.moveTo(p1[0], p1[1]);
        this.ctx.lineTo(p2[0], p2[1]);
        this.ctx.stroke();
    }
    fline(drawPoint, angle, color) {
        let radians = angle * (Math.PI / 180);
        this.ctx.strokeStyle = color;
        this.ctx.beginPath();
        this.ctx.moveTo(drawPoint[0], drawPoint[1]);
        this.ctx.lineTo(
            drawPoint[0] +
                Math.cos(radians) * (this.canvas.width + this.canvas.height),
            drawPoint[1] +
                Math.sin(radians) * (this.canvas.width + this.canvas.height)
        );
        this.ctx.stroke();
    }
    grid(rows, cols, color) {
        let rowWidth = this.canvas.width / rows;
        let colWidth = this.canvas.height / cols;
        this.gridRows = rows;
        this.gridCols = cols;
        this.gridRowWidth = rowWidth;
        this.gridColWidth = colWidth;
        for (let i = 0; i < rows; i++) {
            this.fline([rowWidth * i, 0], 90, color);
        }
        for (let i = 0; i < cols; i++) {
            this.fline([0, colWidth * i], 0, color);
        }
    }
    cell(col, row, color) {
        this.rect(
            [this.gridRowWidth * col, this.gridColWidth * row],
            [this.gridRowWidth, this.gridColWidth],
            color
        );
    }
}
