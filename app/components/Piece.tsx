import { type PieceNotation } from '~/components/Chessboard'

import BlackKing from '~/images/bk.svg'
import BlackQueen from '~/images/bq.svg'
import BlackRook from '~/images/br.svg'
import BlackBishop from '~/images/bb.svg'
import BlackKnight from '~/images/bn.svg'
import BlackPawn from '~/images/bp.svg'
import WhiteKing from '~/images/wk.svg'
import WhiteQueen from '~/images/wq.svg'
import WhiteRook from '~/images/wr.svg'
import WhiteBishop from '~/images/wb.svg'
import WhiteKnight from '~/images/wn.svg'
import WhitePawn from '~/images/wp.svg'
import '~/styles/modules/piece.css'

type PieceProps = {
    piece: PieceNotation
}

const pieceImages: Record<PieceNotation, JSX.Element> = {
    BK: <img src={BlackKing} alt="Black King" />,
    BQ: <img src={BlackQueen} alt="Black Queen" />,
    BR: <img src={BlackRook} alt="Black Rook" />,
    BB: <img src={BlackBishop} alt="Black Bishop" />,
    BN: <img src={BlackKnight} alt="Black Knight" />,
    BP: <img src={BlackPawn} alt="Black Pawn" />,
    WK: <img src={WhiteKing} alt="White King" />,
    WQ: <img src={WhiteQueen} alt="White Queen" />,
    WR: <img src={WhiteRook} alt="White Rook" />,
    WB: <img src={WhiteBishop} alt="White Bishop" />,
    WN: <img src={WhiteKnight} alt="White Knight" />,
    WP: <img src={WhitePawn} alt="White Pawn" />
}

export default function({piece}: PieceProps) {
    return <span className="m-piece">
        {pieceImages[piece]}
    </span>
}
