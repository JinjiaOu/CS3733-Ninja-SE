
import { Coordinate, Cell, Key } from '../model/Model.js'
import { redrawCanvas } from '../boundary/Boundary.js'

export function key(model, canvasRef) {
    let coord = model.ninjaloc
    if (model.puzzle.cells[coord.x][coord.y].genre == 3) {
        if (model.puzzle.key != null) {
            let temp = model.puzzle.key.color
            model.puzzle.key 
            = new Key(model.puzzle.cells[coord.x][coord.y].color)
            model.puzzle.cells[coord.x][coord.y] 
            = new Cell(coord.x, coord.y, temp, 3)
        }
        else {
            model.puzzle.key = new Key(model.puzzle.cells[coord.x][coord.y].color)
            model.puzzle.cells[coord.x][coord.y] 
            = new Cell(coord.x, coord.y, 'white', 0)
        }
    }
    redrawCanvas(model, canvasRef.current)
}

export function canMove(num, model, canvasRef) {
    if (model.puzzle.doors == model.fin) {
        return
    }
    let coord = new Coordinate(0, 0)
    switch (num) {
        case 1:
            coord = new Coordinate(model.ninjaloc.x - 1, model.ninjaloc.y)
            if (model.puzzle.cells[coord.x][coord.y].genre == 1) {
                 if(this.isCovered(new Coordinate(coord.row ++, coord.column - 1))) {
                    model.fin = false;
                    break;
                }
            }
            model.moves ++
            model.ninjaloc = coord
            redrawCanvas(model, canvasRef.current)
            break
        case 2:
            coord = new Coordinate(model.ninjaloc.x, model.ninjaloc.y - 1)
            if (model.puzzle.cells[coord.x][coord.y].genre == 1) {
                 if (model.puzzle.key.color 
                    == model.puzzle.cells[coord.x][coord.y].color) {
                    model.puzzle.cells[coord.x][coord.y] 
                    = new Cell(coord.x, coord.y, 'white', 0)
                    model.puzzle.key = null
                    model.fin ++
                }

                else if(this.isCovered(new Coordinate(coord.row ++, coord.column - 1))) {
                    model.fin = false;
                    break;
                }
                
            }
            model.moves ++
            model.ninjaloc = coord
            redrawCanvas(model, canvasRef.current)
            break
        case 3:
            coord = new Coordinate(model.ninjaloc.x + 1, model.ninjaloc.y)
            if (model.puzzle.cells[coord.x][coord.y].genre == 1) {

                if (model.puzzle.key == null) {
                    break
                }
            
                else if(this.isCovered(new Coordinate(coord.row ++, coord.column - 1))) {
                    model.fin = false;
                    break;
                }
            }
            model.moves ++
            model.ninjaloc = coord
            redrawCanvas(model, canvasRef.current)
            break
        case 4:
            coord = new Coordinate(model.ninjaloc.x, model.ninjaloc.y + 1)
            if (model.puzzle.cells[coord.x][coord.y].genre == 1) {
                if (model.puzzle.key == null) {
                    break
                }
                else if (model.puzzle.key.color 
                    == model.puzzle.cells[coord.x][coord.y].color) {
                    model.puzzle.cells[coord.x][coord.y] 
                    = new Cell(coord.x, coord.y, 'white', 0)
                    model.puzzle.key = null
                    model.fin ++
                }
                else if(this.isCovered(new Coordinate(coord.row ++, coord.column - 1))) {
                    model.fin = false;
                    break;
                }
            }
            model.moves ++
            model.ninjaloc = coord
            redrawCanvas(model, canvasRef.current)
        default:
            break
    }
}
