import { useDraggable } from '@dnd-kit/core'
import { CSS } from '@dnd-kit/utilities'

import type { Piece, PieceNotation } from '~/utils/ts-helpers'

import BlackBishop from '~/images/bb.svg'
import BlackKing from '~/images/bk.svg'
import BlackKnight from '~/images/bn.svg'
import BlackPawn from '~/images/bp.svg'
import BlackQueen from '~/images/bq.svg'
import BlackRook from '~/images/br.svg'
import WhiteBishop from '~/images/wb.svg'
import WhiteKing from '~/images/wk.svg'
import WhiteKnight from '~/images/wn.svg'
import WhitePawn from '~/images/wp.svg'
import WhiteQueen from '~/images/wq.svg'
import WhiteRook from '~/images/wr.svg'
import '~/styles/modules/piece.css'

const pieceImageProps: Record<PieceNotation, { src: string; alt: string }> = {
    BK: { src: BlackKing, alt: 'Black King' },
    BQ: { src: BlackQueen, alt: 'Black Queen' },
    BR: { src: BlackRook, alt: 'Black Rook' },
    BB: { src: BlackBishop, alt: 'Black Bishop' },
    BN: { src: BlackKnight, alt: 'Black Knight' },
    BP: { src: BlackPawn, alt: 'Black Pawn' },
    WK: { src: WhiteKing, alt: 'White King' },
    WQ: { src: WhiteQueen, alt: 'White Queen' },
    WR: { src: WhiteRook, alt: 'White Rook' },
    WB: { src: WhiteBishop, alt: 'White Bishop' },
    WN: { src: WhiteKnight, alt: 'White Knight' },
    WP: { src: WhitePawn, alt: 'White Pawn' },
}

type PieceProps = {
    piece: Piece
}

export default function PieceComponent({ piece }: PieceProps) {
    const { attributes, listeners, setNodeRef, transform } = useDraggable({ id: piece.id })

    const style = transform
        ? {
              transform: CSS.Translate.toString(transform),
              zIndex: 2, // appear over other pieces
          }
        : undefined

    const pieceProps = pieceImageProps[piece.piece]
    return (
        <img
            id={piece.id}
            className="m-piece"
            style={style}
            ref={setNodeRef}
            {...listeners}
            {...attributes}
            src={pieceProps.src}
            alt={pieceProps.alt}
        />
    )
}
