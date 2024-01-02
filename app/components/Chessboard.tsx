import Square from '~/components/Square'
import { mapIndicesToNotation, mapIndicesToPositionIndex, mapNotationToSquareInfo } from '~/utils/notation'

import '~/styles/modules/row.css'

export type PieceNotation = 'WP' | 'WN' | 'WB' | 'WR' | 'WQ' | 'WK'
                  | 'BP' | 'BN' | 'BB' | 'BR' | 'BQ' | 'BK'

type ChessboardProps = {
    rows?: number,
    columns?: number
    position?: (PieceNotation | undefined)[]
}

export default function Chessboard({
    rows = 8,
    columns = 8,
    position = Array(64).fill(undefined)
}: ChessboardProps): JSX.Element {
    console.log('-R- Chessboard with position',position)
    return <span className="m-board">
        {[...Array(rows)].map((_, rowIndex) => {
            return <div key={`row-${rowIndex}`} className="m-row">
                {[...Array(columns)].map((_, colIndex) => {
                    const notation = mapIndicesToNotation(rowIndex, colIndex)
                    const squareInfo = mapNotationToSquareInfo(notation)
                    const positionIndex = mapIndicesToPositionIndex(rowIndex, colIndex)
                    return <Square key={notation}
                        squareInfo={squareInfo}
                        piece={position[positionIndex]}
                    />
                })}
            </div>
        })}
    </span>
}
