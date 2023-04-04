
import { Coordinate } from '../model/Model'

// redraw the Puzzle so I can see it

// Scaling Constants for Canvas
var BOXSIZE = 100
const OFFSET = 8

/** Represents a rectangle. */
export class Square {
    constructor(x, y, size) {
        this.x = x
        this.y = y
        this.size = size
    }
}

export function computeSquare(cell) {
    return new Square(BOXSIZE * cell.column + OFFSET, BOXSIZE * cell.row + OFFSET, BOXSIZE - 2 * OFFSET, BOXSIZE - 2 * OFFSET)
}

/** Redraw entire canvas from model. */
export function redrawCanvas(model, canvasObj) {
    const ctx = canvasObj.getContext('2d')
    ctx.clearRect(0, 0, canvasObj.width, canvasObj.height)
    ctx.font = '30px serif'
    ctx.fillStyle = '#ff0000'
    ctx.fillText("Move counter: " + model.moves, 500, 400)
    ctx.fillText("Level " + model.ln, 560, 50)

    // showing the outermost information
    let nr = model.puzzle.nr
    let nc = model.puzzle.nc

    document.getElementById("pick").disabled = (model.puzzle.cells[model.ninjaloc.x][model.ninjaloc.y].genre === 3) ? false : true
    let coord = new Coordinate(model.ninjaloc.x, model.ninjaloc.y)
    
    document.getElementById("a").disabled = (coord.x < 0 
        || coord.y < 0 || coord.x >= model.puzzle.nr
        || model.puzzle.cells[coord.x][coord.y].genre === 1)
    coord = new Coordinate(model.ninjaloc.x, model.ninjaloc.y - 1)
    document.getElementById("b").disabled = (coord.x < 0 
        || coord.y < 0 || coord.x >= model.puzzle.nr
        || model.puzzle.cells[coord.x][coord.y].genre === 2 )
    coord = new Coordinate(model.ninjaloc.x, model.ninjaloc.y + 1)
    document.getElementById("c").disabled = (coord.x < 0 
        || coord.y < 0 || coord.x >= model.puzzle.nr 
        || coord.y >= model.puzzle.nc )
    coord = new Coordinate(model.ninjaloc.x + 1, model.ninjaloc.y)

    for (let r = 0; r < nr; r++) {
        for (let c = 0; c < nc; c++) {
            let cell = model.puzzle.cells[r][c]
            let sq = computeSquare(cell)
            switch (cell.genre) {
                case 0:
                    ctx.fillStyle = '#f5f0f0'
                    ctx.beginPath()
                    ctx.rect(sq.x, sq.y, sq.size, sq.size)
                    ctx.fill()
                    ctx.stroke()
                    continue
                case 1:
                    ctx.fillStyle = cell.color
                    ctx.beginPath()
                    ctx.rect(sq.x, sq.y, sq.size, sq.size)
                    ctx.fill()
                    ctx.stroke()
                    ctx.fillStyle = '#f5f0f0'
                    continue
                case 2:
                    ctx.fillStyle = '#0f0f0f'
                    ctx.beginPath()
                    ctx.rect(sq.x, sq.y, sq.size, sq.size)
                    ctx.fill()
                    ctx.stroke()
                    continue
                case 3:
                    ctx.fillStyle = '#f5f0f0'
                    ctx.fillStyle = cell.color
                    ctx.beginPath()
                    ctx.rect(sq.x + sq.size * .25, sq.y + sq.size * .25, sq.size * .5, sq.size * .5)
                    ctx.fill()
                    ctx.stroke()
                    continue
                default:
                    continue
            }
        }
    }
    let cell1 = model.puzzle.cells[model.ninjaloc.x][model.ninjaloc.y]
    let sq1 = computeSquare(cell1)
    ctx.fillStyle = '#a349a4'
    ctx.beginPath()
    ctx.rect(2 * OFFSET * (model.ninjaloc.y) 
    + OFFSET + model.ninjaloc.y * sq1.size, BOXSIZE * model.ninjaloc.x + OFFSET, sq1.size, sq1.size)
    ctx.fill()

    if (model.puzzle.key != null) {
        ctx.fillStyle = model.puzzle.key.color
        ctx.rect(2 * OFFSET * (model.ninjaloc.y) 
        + OFFSET + 30 + model.ninjaloc.y * sq1.size, BOXSIZE * model.ninjaloc.x + OFFSET + 30, sq1.size - 60, sq1.size - 60)
        ctx.fill()
        ctx.stroke()
    }

    if (model.puzzle.doors === model.fin) {
            ctx.fill()
            ctx.stroke()
            ctx.fillStyle = '#0f0f0f'
            ctx.fillText("Congratulations, you're done", 50 * nc / 2, OFFSET * 2 * nr + BOXSIZE * nr, 400)
    }
}
