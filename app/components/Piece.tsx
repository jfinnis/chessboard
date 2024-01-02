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

export default function({piece}: PieceProps) {
    let image: JSX.Element
    switch (piece) {
        case 'BK':
            image = <img src={BlackKing} alt="Black King" />
            break
        case 'BQ':
            image = <img src={BlackQueen} alt="Black Queen" />
            break
        case 'BR':
            image = <img src={BlackRook} alt="Black Rook" />
            break
        case 'BB':
            image = <img src={BlackBishop} alt="Black Bishop" />
            break
        case 'BK':
            image = <img src={BlackKnight} alt="Black Knight" />
            break
        case 'BP':
            image = <img src={BlackPawn} alt="Black Pawn" />
            break
        case 'WK':
            image = <img src={WhiteKing} alt="White King" />
            break
        case 'WQ':
            image = <img src={WhiteQueen} alt="White Queen" />
            break
        case 'WR':
            image = <img src={WhiteRook} alt="White Rook" />
            break
        case 'WB':
            image = <img src={WhiteBishop} alt="White Bishop" />
            break
        case 'WK':
            image = <img src={WhiteKnight} alt="White Knight" />
            break
        case 'WP':
            image = <img src={WhitePawn} alt="White Pawn" />
            break
        default:
            throw new Error('Invalid Piece to display')
    }
    return <span className="m-piece">
        {image}
    </span>
}
