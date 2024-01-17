export type BoardIndex = RangeType<7>

export type Color = 'white' | 'black'

export type Notation = 'a8' | 'b8' | 'c8' | 'd8' | 'e8' | 'f8' | 'g8' | 'h8' | 'a7' | 'b7' | 'c7' | 'd7' | 'e7' | 'f7' | 'g7' | 'h7' | 'a6' | 'b6' | 'c6' | 'd6' | 'e6' | 'f6' | 'g6' | 'h6' | 'a5' | 'b5' | 'c5' | 'd5' | 'e5' | 'f5' | 'g5' | 'h5' | 'a4' | 'b4' | 'c4' | 'd4' | 'e4' | 'f4' | 'g4' | 'h4' | 'a3' | 'b3' | 'c3' | 'd3' | 'e3' | 'f3' | 'g3' | 'h3' | 'a2' | 'b2' | 'c2' | 'd2' | 'e2' | 'f2' | 'g2' | 'h2' |'a1' | 'b1' | 'c1' | 'd1' | 'e1' | 'f1' | 'g1' | 'h1'

export type PieceNotation = 'WP' | 'WN' | 'WB' | 'WR' | 'WQ' | 'WK'
                          | 'BP' | 'BN' | 'BB' | 'BR' | 'BQ' | 'BK'

export type PositionArray = (Piece | undefined)[]

export type Piece = {
    id: string
    piece: PieceNotation
    square: Notation
    squarePos: { row: BoardIndex, column: BoardIndex }
}

export type SquareInfo = {
    notation: Notation
    rowIndex: BoardIndex
    colIndex: BoardIndex
    color: Color
}


/**
 * Typescript nonsense to create a type that represents a range of numbers.
 * From https://stackoverflow.com/a/68633667
 * */
type _Range<T extends number, R extends unknown[]> = R['length'] extends T ? R['length'] : R['length'] | _Range<T, [T, ...R]>
export type RangeType<T extends number> = number extends T ? number : _Range<T, []>

