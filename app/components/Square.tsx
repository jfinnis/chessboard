import { useDroppable } from '@dnd-kit/core'

import PieceComponent from '~/components/Piece'
import type { Piece, SquareInfo } from '~/utils/ts-helpers'

import '~/styles/modules/square.css'

// TODO: work in matt pocock infer generic type string literals so that notation is typed as row-column?
type SquareProps = {
    squareInfo: SquareInfo
    piece: Piece | undefined
    hideNotation: boolean
}

export default function SquareComponent({ squareInfo, piece, hideNotation }: SquareProps) {
    // const { isOver, setNodeRef } = useDroppable({ id: squareInfo.notation })
    const { setNodeRef } = useDroppable({ id: squareInfo.notation })

    // const outlineStyle = { outline: isOver ? '2px solid darkgreen' : undefined }
    const colorCss = squareInfo.color === 'white' ? 'm-square--light' : 'm-square--dark'

    return <span
        id={squareInfo.notation}
        className={`m-square ${colorCss}`}
        data-notation={squareInfo.notation}
        ref={setNodeRef}
    >
        {!hideNotation && squareInfo.rowIndex === 7 &&
            <span className="m-square__x-notation">{squareInfo.notation.charAt(0)}</span>
        }
        {!hideNotation && squareInfo.colIndex === 0 &&
            <span className="m-square__y-notation">{squareInfo.notation.charAt(1)}</span>
        }
        {piece && <PieceComponent piece={piece} />}
    </span>
}
