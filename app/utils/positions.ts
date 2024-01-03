import { invariant } from '@epic-web/invariant'

import { type PieceNotation } from '~/components/Chessboard'
import { mapIndicesToNotation, mapNotationToSquareInfo, type Notation } from '~/utils/notation'

export type PositionArray = (PieceNotation | undefined)[]

/**
 * Take row/column indices and turn it into a number from 0 - 63.
 */
export function mapIndicesToPositionIndex(row: number, column: number): number {
    invariant(row >= 0 && row < 8, `Row index '${row}' must be between 0 and 7.`)
    invariant(column >=0 && column < 8, `Column index '${column}' must be between 0 and 7.`)
    return (row * 8) + column
}

export const initialPosition: PositionArray = [
    'BR', 'BN', 'BB', 'BQ', 'BK', 'BB', 'BN', 'BR',
    'BP', 'BP', 'BP', 'BP', 'BP', 'BP', 'BP', 'BP',
    undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined,
    undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined,
    undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined,
    undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined,
    'WP', 'WP', 'WP', 'WP', 'WP', 'WP', 'WP', 'WP',
    'WR', 'WN', 'WB', 'WQ', 'WK', 'WB', 'WN', 'WR',
]

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
    const positions = new Array(64).fill(undefined)

    // Select a random amount of pieces to place
    let newPieceArray = [...allPieces]
    shuffleArray(newPieceArray)
    const numPieces = getRandomInt(32)
    newPieceArray = newPieceArray.slice(0, numPieces)

    // Make sure both kings are in this array
    if (!newPieceArray.includes('WK')) newPieceArray.push('WK')
    if (!newPieceArray.includes('BK')) newPieceArray.push('BK')

    // Randomly place pieces in full board
    while (newPieceArray.length > 0) {
        const piece = newPieceArray.pop() as PieceNotation
        let i: number
        while (i = getRandomInt(64)) {
            if (!positions[i]) {
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
function shuffleArray(array: any[]) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function getRandomInt(max: number): number {
  return Math.floor(Math.random() * max);
}

export function moveRandomPiece(oldPosition: PositionArray| undefined): PositionArray {
    invariant(oldPosition, 'Position array must exist.')
    const pieceIndexes: number[] = Array.from(Array(oldPosition.length).keys()).filter(
        index => oldPosition[index] !== undefined
    )

    // Calculate the old square from the pieces array.
    const positionIndex = pieceIndexes[Math.floor(Math.random() * pieceIndexes.length)]
    const oldSquare = mapIndicesToNotation(Math.floor(positionIndex / 8), positionIndex % 8)

    // Randomly choose a new square.
    let newPositionIndex: number
    while (newPositionIndex = Math.floor(Math.random() * oldPosition.length)) {
        // If we randomly chose the same square to move to then try again.
        if (newPositionIndex !== positionIndex)
            break
    }
    const newSquare = mapIndicesToNotation(Math.floor(newPositionIndex / 8), newPositionIndex % 8)

    return movePiece(oldPosition, oldSquare, newSquare)
}

/**
 * Given a position array of pieces, move a piece from the old square to the new square. The rules
 * of chess don't apply here, any piece can move to any square regardless of what occupies it.
 */
export function movePiece(oldPosition: PositionArray, oldSquare: Notation = 'e6', newSquare: Notation = 'e7'): PositionArray {
    invariant(oldPosition, 'Position array must exist.')
    console.log('move called with array',oldPosition)

    const oldSquareInfo = mapNotationToSquareInfo(oldSquare)
    const oldSquarePositionIndex = mapIndicesToPositionIndex(oldSquareInfo.rowIndex, oldSquareInfo.colIndex)
    invariant(oldSquarePositionIndex < oldPosition.length, `Cannot move from a square '${oldSquare}' that does not exist.`)
    const piece = oldPosition[oldSquarePositionIndex]
    invariant(piece, `There is no piece on square '${oldSquare}' to move.`)

    const newSquareInfo = mapNotationToSquareInfo(newSquare)
    const newSquarePositionIndex = mapIndicesToPositionIndex(newSquareInfo.rowIndex, newSquareInfo.colIndex)
    invariant(newSquarePositionIndex < oldPosition.length, `Cannot move to a square '${newSquare}' that does not exist.`)

    // Copy the position array and update the old/new squares to the new values
    const newPosition = [...oldPosition]
    newPosition[oldSquarePositionIndex] = undefined
    newPosition[newSquarePositionIndex] = oldPosition[oldSquarePositionIndex]
    return newPosition
}
