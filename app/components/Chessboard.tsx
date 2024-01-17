import { DndContext, type DragEndEvent } from '@dnd-kit/core'
import { invariant } from '@epic-web/invariant'

import Square from '~/components/Square'
import { mapIndicesToNotation, mapNotationToSquareInfo } from '~/utils/notation'
import { mapIndicesToPositionIndex, movePiece } from '~/utils/positions'
import type { BoardIndex, Notation, PositionArray } from '~/utils/ts-helpers'

import '~/styles/modules/row.css'

export function dropPieceOnSquare(event: DragEndEvent, position: PositionArray): PositionArray {
    if (event?.over?.id) {
        const pieceId = event.active.id
        const piece = position.find(piece => piece?.id === pieceId)
        invariant(piece, 'Cannot drop an undefined piece.')

        const dropSquare = event.over.id as Notation
        const newPosition = movePiece(position, piece.square, dropSquare)
        return newPosition
    }
    // If piece wasn't dropped on an appropriate square, just ignore.
    return position
}

type ChessboardProps = {
    position?: PositionArray
    hideNotation?: boolean
    setPosition?: Function
}

export default function Chessboard({
    position = Array(64).fill(undefined),
    setPosition,
    hideNotation = false,
}: ChessboardProps): JSX.Element {
    const boardIndices: BoardIndex[] = [0, 1, 2, 3, 4, 5, 6, 7]
    return <DndContext
        onDragEnd={
            (event: DragEndEvent) => setPosition && setPosition(dropPieceOnSquare(event, position))
        }
    >
        <span className="m-board">
            {boardIndices.map((rowIndex) => {
                return <div key={`row-${rowIndex}`} className="m-row">
                    {boardIndices.map((colIndex) => {
                        const notation = mapIndicesToNotation(rowIndex, colIndex)
                        const squareInfo = mapNotationToSquareInfo(notation)
                        const positionIndex = mapIndicesToPositionIndex(rowIndex, colIndex)
                        return <Square key={notation}
                            squareInfo={squareInfo}
                            piece={position[positionIndex]}
                            hideNotation={hideNotation}
                        />
                    })}
                </div>
            })}
        </span>
    </DndContext>
}
