import { invariant } from '@epic-web/invariant'

import { mapIndicesToNotation, mapNotationToSquareInfo } from '~/utils/notation'
import type { BoardIndex, Notation, Piece, PieceNotation, PositionArray } from '~/utils/ts-helpers'

/**
 * Turn row/column indices into a number from 0 - 63.
 */
export function mapIndicesToPositionIndex(row: BoardIndex, column: BoardIndex): number {
    invariant(row >= 0 && row < 8, `Row index "${row}" must be between 0 and 7.`)
    invariant(column >= 0 && column < 8, `Column index "${column}" must be between 0 and 7.`)
    return row * 8 + column
}

/**
 * Turn a number from 0 - 63 into row/column indices..
 */
export function mapPositionIndexToIndices(index: number): { row: BoardIndex; column: BoardIndex } {
    invariant(index >= 0 && index < 64, `Position index "${index}" must be between 0 and 63.`)
    return {
        row: Math.floor(index / 8) as BoardIndex,
        column: (index % 8) as BoardIndex,
    }
}

// biome-ignore format: pretty format
const tempInitialPosition: (PieceNotation | undefined)[] = [
    'BR', 'BN', 'BB', 'BQ', 'BK', 'BB', 'BN', 'BR',
    'BP', 'BP', 'BP', 'BP', 'BP', 'BP', 'BP', 'BP',
    undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined,
    undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined,
    undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined,
    undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined,
    'WP', 'WP', 'WP', 'WP', 'WP', 'WP', 'WP', 'WP',
    'WR', 'WN', 'WB', 'WQ', 'WK', 'WB', 'WN', 'WR',
]
export const initialPosition: PositionArray = tempInitialPosition.map((piece, index) => {
    const squareIndices = mapPositionIndexToIndices(index)
    return piece
        ? ({
              id: crypto.randomUUID(),
              piece,
              squarePos: squareIndices,
              square: mapIndicesToNotation(squareIndices.row, squareIndices.column),
          } as Piece)
        : undefined
})

// biome-ignore format: pretty format
const allPieces: PieceNotation[] = [
    'BR', 'BN', 'BB', 'BQ', 'BK', 'BB', 'BN', 'BR',
    'BP', 'BP', 'BP', 'BP', 'BP', 'BP', 'BP', 'BP',
    'WP', 'WP', 'WP', 'WP', 'WP', 'WP', 'WP', 'WP',
    'WR', 'WN', 'WB', 'WQ', 'WK', 'WB', 'WN', 'WR',
]

/**
 * Create an empty array and fill it with pieces.
 */
export function randomPosition(): PositionArray {
    const positions: PositionArray = new Array(64).fill(undefined)

    // Select a random amount of pieces to place
    let newPieceArray: PieceNotation[] = [...allPieces]
    shuffleArray(newPieceArray)
    const numPieces = getRandomInt(32)
    newPieceArray = newPieceArray.slice(0, numPieces)

    // Make sure both kings are in this array
    if (!newPieceArray.includes('WK')) newPieceArray.push('WK')
    if (!newPieceArray.includes('BK')) newPieceArray.push('BK')

    // Randomly place pieces in full board
    while (newPieceArray.length > 0) {
        const pieceNotation = newPieceArray.pop()
        invariant(pieceNotation, 'Could not get piece from random list.')
        while (true) {
            const i = getRandomInt(64)
            if (!positions[i]) {
                const squareIndices = mapPositionIndexToIndices(i)
                const notation = mapIndicesToNotation(squareIndices.row, squareIndices.column)
                const piece: Piece = {
                    id: crypto.randomUUID(),
                    piece: pieceNotation,
                    square: notation,
                    squarePos: squareIndices,
                }

                positions[i] = piece
                break
            }
        }
    }
    return positions
}

/**
 * Implementation from https://stackoverflow.com/a/12646864
 */
function shuffleArray<T>(array: T[]) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 0.99))
        // @ts-ignore
        ;[array[i], array[j]] = [array[j], array[i]]
    }
}

function getRandomInt(max: number): number {
    return Math.floor(Math.random() * max)
}

export function moveRandomPiece(oldPosition: PositionArray | undefined): PositionArray {
    invariant(oldPosition, 'Position cannot be empty to move random piece.')
    const pieceIndexes: number[] = Array.from(Array(oldPosition.length).keys()).filter(
        index => oldPosition[index] !== undefined,
    )

    // Calculate the old square from the pieces array.
    const positionIndex = pieceIndexes[Math.floor(Math.random() * pieceIndexes.length)]
    invariant(positionIndex || positionIndex === 0, 'PositionIndex is out of range.')
    const oldSquare = mapIndicesToNotation(Math.floor(positionIndex / 8), positionIndex % 8)

    let newPositionIndex: number
    while (true) {
        // Randomly choose a new square.
        newPositionIndex = Math.floor(Math.random() * oldPosition.length)
        // If we randomly chose the same square to move to then try again.
        if (newPositionIndex !== positionIndex) break
    }
    const newSquare = mapIndicesToNotation(Math.floor(newPositionIndex / 8), newPositionIndex % 8)

    return movePiece(oldPosition, oldSquare, newSquare)
}

// TODO: if this were a method of some GameManager class that held position as state, the interface could just be
// movePiece('e2', 'e4')
/**
 * Given a position array of pieces, move a piece from the old square to the new square. The rules
 * of chess don't apply here, any piece can move to any square regardless of what occupies it.
 */
export function movePiece(
    oldPosition: PositionArray,
    oldSquare: Notation,
    newSquare: Notation,
): PositionArray {
    invariant(oldPosition, 'Position array must exist.')

    // Grab the information for both squares including what pieces are on them.
    const oldSquareInfo = mapNotationToSquareInfo(oldSquare)
    const oldSquarePositionIndex = mapIndicesToPositionIndex(
        oldSquareInfo.rowIndex,
        oldSquareInfo.colIndex,
    )
    invariant(
        oldSquarePositionIndex < oldPosition.length,
        `Cannot move from a square '${oldSquare}' that does not exist.`,
    )
    const piece = oldPosition[oldSquarePositionIndex]
    invariant(piece, `There is no piece on square '${oldSquare}' to move.`)

    // Find the new square and update the piece to match its location.
    const newSquareInfo = mapNotationToSquareInfo(newSquare)
    const newSquarePositionIndex = mapIndicesToPositionIndex(
        newSquareInfo.rowIndex,
        newSquareInfo.colIndex,
    )
    invariant(
        newSquarePositionIndex < oldPosition.length,
        `Cannot move to a square '${newSquare}' that does not exist.`,
    )
    piece.square = newSquare
    piece.squarePos = { row: newSquareInfo.rowIndex, column: newSquareInfo.colIndex }
    // console.log('move',moveNotation(piece, oldSquare, newSquare, oldPosition))

    // Copy the position array and update the old/new squares to the new values
    const newPosition = [...oldPosition]
    newPosition[oldSquarePositionIndex] = undefined
    newPosition[newSquarePositionIndex] = oldPosition[oldSquarePositionIndex]
    return newPosition
}
