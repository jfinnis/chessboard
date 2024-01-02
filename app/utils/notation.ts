import { invariant } from '@epic-web/invariant'

export type Color = 'white' | 'black'
export type Notation = 'a8' | 'b8' | 'c8' | 'd8' | 'e8' | 'f8' | 'g8' | 'h8' | 'a7' | 'b7' | 'c7' | 'd7' | 'e7' | 'f7' | 'g7' | 'h7' | 'a6' | 'b6' | 'c6' | 'd6' | 'e6' | 'f6' | 'g6' | 'h6' | 'a5' | 'b5' | 'c5' | 'd5' | 'e5' | 'f5' | 'g5' | 'h5' | 'a4' | 'b4' | 'c4' | 'd4' | 'e4' | 'f4' | 'g4' | 'h4' | 'a3' | 'b3' | 'c3' | 'd3' | 'e3' | 'f3' | 'g3' | 'h3' | 'a2' | 'b2' | 'c2' | 'd2' | 'e2' | 'f2' | 'g2' | 'h2' |'a1' | 'b1' | 'c1' | 'd1' | 'e1' | 'f1' | 'g1' | 'h1'

/**
 * Squares will be stored in an 8x8 array starting from the top left and we need to map to
 * chessboard notation.
 */
// TODO: have a proper generics type for notation
export function mapIndicesToNotation(row: number, column: number): Notation {
    invariant(row >= 0 && row < 8, `Row index '${row}' must be between 0 and 7.`)
    invariant(column >=0 && column < 8, `Column index '${column}' must be between 0 and 7.`)
    const squares: Notation[][] = [
        [ 'a8', 'b8', 'c8', 'd8', 'e8', 'f8', 'g8', 'h8' ],
        [ 'a7', 'b7', 'c7', 'd7', 'e7', 'f7', 'g7', 'h7' ],
        [ 'a6', 'b6', 'c6', 'd6', 'e6', 'f6', 'g6', 'h6' ],
        [ 'a5', 'b5', 'c5', 'd5', 'e5', 'f5', 'g5', 'h5' ],
        [ 'a4', 'b4', 'c4', 'd4', 'e4', 'f4', 'g4', 'h4' ],
        [ 'a3', 'b3', 'c3', 'd3', 'e3', 'f3', 'g3', 'h3' ],
        [ 'a2', 'b2', 'c2', 'd2', 'e2', 'f2', 'g2', 'h2' ],
        [ 'a1', 'b1', 'c1', 'd1', 'e1', 'f1', 'g1', 'h1' ],
    ]
    return squares[row][column]
}

export type SquareInfo = {
    notation: Notation
    rowIndex: number
    colIndex: number
    color: Color
}

/**
 * Return the row/column/color of a given square by notation.
 */
// TODO: have a proper generics type for notation
export function mapNotationToSquareInfo(notation: string): SquareInfo {
    const squares: {[n: string]: SquareInfo} = {
        'a8': { notation: 'a8', rowIndex: 0, colIndex: 0, color: 'white' },
        'b8': { notation: 'b8', rowIndex: 0, colIndex: 1, color: 'black' },
        'c8': { notation: 'c8', rowIndex: 0, colIndex: 2, color: 'white' },
        'd8': { notation: 'd8', rowIndex: 0, colIndex: 3, color: 'black' },
        'e8': { notation: 'e8', rowIndex: 0, colIndex: 4, color: 'white' },
        'f8': { notation: 'f8', rowIndex: 0, colIndex: 5, color: 'black' },
        'g8': { notation: 'g8', rowIndex: 0, colIndex: 6, color: 'white' },
        'h8': { notation: 'h8', rowIndex: 0, colIndex: 7, color: 'black' },

        'a7': { notation: 'a7', rowIndex: 1, colIndex: 0, color: 'black' },
        'b7': { notation: 'b7', rowIndex: 1, colIndex: 1, color: 'white' },
        'c7': { notation: 'c7', rowIndex: 1, colIndex: 2, color: 'black' },
        'd7': { notation: 'd7', rowIndex: 1, colIndex: 3, color: 'white' },
        'e7': { notation: 'e7', rowIndex: 1, colIndex: 4, color: 'black' },
        'f7': { notation: 'f7', rowIndex: 1, colIndex: 5, color: 'white' },
        'g7': { notation: 'g7', rowIndex: 1, colIndex: 6, color: 'black' },
        'h7': { notation: 'h7', rowIndex: 1, colIndex: 7, color: 'white' },

        'a6': { notation: 'a6', rowIndex: 2, colIndex: 0, color: 'white' },
        'b6': { notation: 'b6', rowIndex: 2, colIndex: 1, color: 'black' },
        'c6': { notation: 'c6', rowIndex: 2, colIndex: 2, color: 'white' },
        'd6': { notation: 'd6', rowIndex: 2, colIndex: 3, color: 'black' },
        'e6': { notation: 'e6', rowIndex: 2, colIndex: 4, color: 'white' },
        'f6': { notation: 'f6', rowIndex: 2, colIndex: 5, color: 'black' },
        'g6': { notation: 'g6', rowIndex: 2, colIndex: 6, color: 'white' },
        'h6': { notation: 'h6', rowIndex: 2, colIndex: 7, color: 'black' },

        'a5': { notation: 'a5', rowIndex: 3, colIndex: 0, color: 'black' },
        'b5': { notation: 'b5', rowIndex: 3, colIndex: 1, color: 'white' },
        'c5': { notation: 'c5', rowIndex: 3, colIndex: 2, color: 'black' },
        'd5': { notation: 'd5', rowIndex: 3, colIndex: 3, color: 'white' },
        'e5': { notation: 'e5', rowIndex: 3, colIndex: 4, color: 'black' },
        'f5': { notation: 'f5', rowIndex: 3, colIndex: 5, color: 'white' },
        'g5': { notation: 'g5', rowIndex: 3, colIndex: 6, color: 'black' },
        'h5': { notation: 'h5', rowIndex: 3, colIndex: 7, color: 'white' },

        'a4': { notation: 'a4', rowIndex: 4, colIndex: 0, color: 'white' },
        'b4': { notation: 'b4', rowIndex: 4, colIndex: 1, color: 'black' },
        'c4': { notation: 'c4', rowIndex: 4, colIndex: 2, color: 'white' },
        'd4': { notation: 'd4', rowIndex: 4, colIndex: 3, color: 'black' },
        'e4': { notation: 'e4', rowIndex: 4, colIndex: 4, color: 'white' },
        'f4': { notation: 'f4', rowIndex: 4, colIndex: 5, color: 'black' },
        'g4': { notation: 'g4', rowIndex: 4, colIndex: 6, color: 'white' },
        'h4': { notation: 'h4', rowIndex: 4, colIndex: 7, color: 'black' },

        'a3': { notation: 'a3', rowIndex: 5, colIndex: 0, color: 'black' },
        'b3': { notation: 'b3', rowIndex: 5, colIndex: 1, color: 'white' },
        'c3': { notation: 'c3', rowIndex: 5, colIndex: 2, color: 'black' },
        'd3': { notation: 'd3', rowIndex: 5, colIndex: 3, color: 'white' },
        'e3': { notation: 'e3', rowIndex: 5, colIndex: 4, color: 'black' },
        'f3': { notation: 'f3', rowIndex: 5, colIndex: 5, color: 'white' },
        'g3': { notation: 'g3', rowIndex: 5, colIndex: 6, color: 'black' },
        'h3': { notation: 'h3', rowIndex: 5, colIndex: 7, color: 'white' },

        'a2': { notation: 'a2', rowIndex: 6, colIndex: 0, color: 'white' },
        'b2': { notation: 'b2', rowIndex: 6, colIndex: 1, color: 'black' },
        'c2': { notation: 'c2', rowIndex: 6, colIndex: 2, color: 'white' },
        'd2': { notation: 'd2', rowIndex: 6, colIndex: 3, color: 'black' },
        'e2': { notation: 'e2', rowIndex: 6, colIndex: 4, color: 'white' },
        'f2': { notation: 'f2', rowIndex: 6, colIndex: 5, color: 'black' },
        'g2': { notation: 'g2', rowIndex: 6, colIndex: 6, color: 'white' },
        'h2': { notation: 'h2', rowIndex: 6, colIndex: 7, color: 'black' },

        'a1': { notation: 'a1', rowIndex: 7, colIndex: 0, color: 'black' },
        'b1': { notation: 'b1', rowIndex: 7, colIndex: 1, color: 'white' },
        'c1': { notation: 'c1', rowIndex: 7, colIndex: 2, color: 'black' },
        'd1': { notation: 'd1', rowIndex: 7, colIndex: 3, color: 'white' },
        'e1': { notation: 'e1', rowIndex: 7, colIndex: 4, color: 'black' },
        'f1': { notation: 'f1', rowIndex: 7, colIndex: 5, color: 'white' },
        'g1': { notation: 'g1', rowIndex: 7, colIndex: 6, color: 'black' },
        'h1': { notation: 'h1', rowIndex: 7, colIndex: 7, color: 'white' },
    }
    const squareInfo = squares[notation]
    invariant(squareInfo, `Notation '${notation}' is invalid.`)
    return squareInfo as SquareInfo
}

/**
 * Take row/column indices and turn it into a number from 0 - 63.
 */
export function mapIndicesToPositionIndex(row: number, column: number): number {
    invariant(row >= 0 && row < 8, `Row index '${row}' must be between 0 and 7.`)
    invariant(column >=0 && column < 8, `Column index '${column}' must be between 0 and 7.`)
    return (row * 8) + column
}
