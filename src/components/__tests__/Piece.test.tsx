/// <reference lib="dom" />
import { afterEach, describe, expect, test } from 'bun:test'
import { cleanup, render, screen } from '@testing-library/react'

import PieceComponent from '~/components/Piece'
import type { Piece } from '~/utils/ts-helpers'

describe('Piece component', () => {
    afterEach(() => {
        cleanup()
    })

    test('renders without errors', () => {
        const piece: Piece = {
            id: crypto.randomUUID(),
            piece: 'WK',
            square: 'a8',
            squarePos: { row: 0, column: 0 },
        }
        render(<PieceComponent piece={piece} />)
        const pieceEl = screen.getByAltText('White King')
        expect(pieceEl).toBeInstanceOf(HTMLImageElement)
    })
})
