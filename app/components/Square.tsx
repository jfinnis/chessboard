import { type PieceNotation } from '~/components/Chessboard'
import Piece from '~/components/Piece'
import { type SquareInfo } from '~/utils/notation'

import '~/styles/modules/square.css'

// TODO: work in matt pocock infer generic type string literals so that notation is typed as row-column?
type SquareProps = {
    squareInfo: SquareInfo
    piece: PieceNotation | undefined
}

export default function({ squareInfo, piece }: SquareProps) {
    const colorCss = squareInfo.color === 'white' ? 'm-square--light' : 'm-square--dark'
    return <span className={`m-square ${colorCss}`}
        data-notation={squareInfo.notation}
        draggable={true}
    >{/* draggable goes on item not square */}
        {squareInfo.rowIndex === 7 &&
            <span className="m-square__x-notation">{squareInfo.notation.charAt(0)}</span>
        }
        {squareInfo.colIndex === 0 &&
            <span className="m-square__y-notation">{squareInfo.notation.charAt(1)}</span>
        }
        {piece && <Piece piece={piece} />}
    </span>
}
