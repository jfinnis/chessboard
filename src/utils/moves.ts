import { type DragEndEvent } from '@dnd-kit/core'
import { invariant } from '@epic-web/invariant'

import { mapNotationToSquareInfo } from '~/utils/notation'
import { mapIndicesToPositionIndex } from '~/utils/positions'
import type { Move, Notation, PositionArray } from '~/utils/ts-helpers'

/**
 * Given a position, return the Move represented by the drag-and-drop or else null.
 */
export function generateMoveFromDrop(event: DragEndEvent, position: PositionArray): Move | null {
    const pieceId = event.active.id
    const movingPiece = position.find(piece => piece?.id === pieceId)
    invariant(movingPiece, 'Cannot drop an undefined piece.')

    // Don't move a piece to the same square it is on
    const dropSquare = event?.over?.id as Notation | undefined
    if (dropSquare && movingPiece.square !== dropSquare) {
        const dropSquareInfo = mapNotationToSquareInfo(dropSquare)
        const pieceOnNewSquare =
            position[mapIndicesToPositionIndex(dropSquareInfo.rowIndex, dropSquareInfo.colIndex)]
        const move: Move = {
            oldSquare: movingPiece.square,
            newSquare: dropSquare,
            piece: movingPiece.piece,
            isCapture: Boolean(pieceOnNewSquare),
        }
        return move
    }
    // If piece wasn't dropped on an appropriate square, just ignore.
    return null
}
