import { DndContext, type DragEndEvent } from '@dnd-kit/core'
import { useState } from 'react'

import MoveArrowComponent from '~/components//MoveArrow'
import SquareComponent from '~/components/Square'
import { generateMoveFromDrop } from '~/utils/moves'
import { mapIndicesToNotation, mapNotationToSquareInfo } from '~/utils/notation'
import { mapIndicesToPositionIndex, movePiece } from '~/utils/positions'
import type { BoardIndex, Move, PositionArray } from '~/utils/ts-helpers'

import '~/styles/modules/move-arrow.css'
import '~/styles/modules/row.css'

type ChessboardProps = {
    position?: PositionArray
    updatePosition?: (position: PositionArray) => void
    showNotation?: boolean
    showLastMove?: boolean
    // Initialize chessboard with a "last move" already set.
    initialMove?: Move
}

export default function ChessboardComponent({
    position = Array(64).fill(undefined),
    updatePosition,
    showNotation = true,
    showLastMove = true,
    initialMove,
}: ChessboardProps): React.ReactElement {
    const [lastMove, setLastMove] = useState<Move | undefined>(() => initialMove)
    const boardIndices: BoardIndex[] = [0, 1, 2, 3, 4, 5, 6, 7]

    function dropChessPiece(event: DragEndEvent): void {
        if (!updatePosition) return

        const move = generateMoveFromDrop(event, position)
        if (!move) return
        const newPosition = movePiece(position, move.oldSquare, move.newSquare)
        setLastMove(move)
        updatePosition(newPosition)
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
