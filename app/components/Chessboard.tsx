import Square from '~/components/Square'
import { mapIndicesToNotation, mapNotationToSquareInfo } from '~/utils/notation'
import { type PositionArray, mapIndicesToPositionIndex } from '~/utils/positions'

import '~/styles/modules/row.css'

export type PieceNotation = 'WP' | 'WN' | 'WB' | 'WR' | 'WQ' | 'WK'
                          | 'BP' | 'BN' | 'BB' | 'BR' | 'BQ' | 'BK'

type ChessboardProps = {
    position?: PositionArray
    hideNotation?: boolean
}

export default function Chessboard({
    position = Array(64).fill(undefined),
    hideNotation = false
}: ChessboardProps): JSX.Element {
    return <span className="m-board">
        {[...Array(8)].map((_, rowIndex) => {
            return <div key={`row-${rowIndex}`} className="m-row">
                {[...Array(8)].map((_, colIndex) => {
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
}
