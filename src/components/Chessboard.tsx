import { DndContext, type DragEndEvent } from '@dnd-kit/core'
import { invariant } from '@epic-web/invariant'
import { useState } from 'react'

import MoveArrowComponent from '~/components//MoveArrow'
import SquareComponent from '~/components/Square'
import { mapIndicesToNotation, mapNotationToSquareInfo } from '~/utils/notation'
import { mapIndicesToPositionIndex, movePiece } from '~/utils/positions'
import type { BoardIndex, Move, Notation, PositionArray } from '~/utils/ts-helpers'

import '~/styles/modules/move-arrow.css'
import '~/styles/modules/row.css'

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

type ChessboardProps = {
    position?: PositionArray
    setPosition?: () => void
    showNotation?: boolean
    showLastMove?: boolean
    // Initialize chessboard with a "last move" already set.
    initialMove?: Move
}

export default function ChessboardComponent({
    position = Array(64).fill(undefined),
    setPosition,
    showNotation = true,
    showLastMove = true,
    initialMove,
}: ChessboardProps): React.ReactElement {
    const [lastMove, setLastMove] = useState<Move | undefined>(() => initialMove)
    const boardIndices: BoardIndex[] = [0, 1, 2, 3, 4, 5, 6, 7]

    function dropChessPiece(event: DragEndEvent): void {
        if (!setPosition) return
        const move = generateMoveFromDrop(event, position)
        if (!move) return
        const newPosition = movePiece(position, move.oldSquare, move.newSquare)
        setLastMove(move)
        setPosition(newPosition)
    }

    return (
        <DndContext onDragEnd={dropChessPiece}>
            <span className="m-board">
                {boardIndices.map(rowIndex => {
                    return (
                        <div key={`row-${rowIndex}`} className="m-row">
                            {boardIndices.map(colIndex => {
                                const notation = mapIndicesToNotation(rowIndex, colIndex)
                                const squareInfo = mapNotationToSquareInfo(notation)
                                const positionIndex = mapIndicesToPositionIndex(rowIndex, colIndex)
                                return (
                                    <SquareComponent
                                        key={notation}
                                        squareInfo={squareInfo}
                                        piece={position[positionIndex]}
                                        showNotation={showNotation}
                                    />
                                )
                            })}
                        </div>
                    )
                })}
            </span>
            {showLastMove && lastMove && (
                <MoveArrowComponent startId={lastMove.oldSquare} endId={lastMove.newSquare} />
            )}
        </DndContext>
    )
}
