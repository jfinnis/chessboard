import { invariant } from '@epic-web/invariant'

import { type PieceNotation } from '~/components/Chessboard'

export type PositionArray = (PieceNotation | undefined)[]

/**
 * Take row/column indices and turn it into a number from 0 - 63.
 */
export function mapIndicesToPositionIndex(row: number, column: number): number {
    invariant(row >= 0 && row < 8, `Row index '${row}' must be between 0 and 7.`)
    invariant(column >=0 && column < 8, `Column index '${column}' must be between 0 and 7.`)
    return (row * 8) + column
}

const position: PositionArray = [
    undefined, 'WP', undefined, 'WK', undefined, undefined, undefined, undefined, 
    undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, 
    undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, 
    undefined, 'BP', undefined, undefined, undefined, undefined, 'BK', 'BQ', 
    undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, 
    undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, 
    undefined, undefined, undefined, undefined, undefined, undefined, undefined, 'BR', 
    'BR', undefined, undefined, undefined, undefined, undefined, undefined, undefined, 
]

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
