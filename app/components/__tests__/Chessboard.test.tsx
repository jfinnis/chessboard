/// <reference lib="dom" />
import { afterEach, describe, expect, test } from 'bun:test'
import { cleanup, render, screen } from '@testing-library/react'

import Chessboard from '~/components/Chessboard'
import { initialPosition } from '~/utils/positions'

describe('Chessboard component', function() {
    afterEach(function() {
        cleanup()
    })

    test('renders squares in the correct colors', function() {
        render(<Chessboard />)
        // Light squares
        ;['a8', 'h1', 'd5', 'e4'].forEach(squareNotation => {
            let square = document.querySelector(`[data-notation=${squareNotation}]`)
            expect(square?.className).toInclude('m-square--light')
        })
        // Dark squares
        ;['a1', 'h8', 'd4', 'e5'].forEach(squareNotation => {
            let square = document.querySelector(`[data-notation=${squareNotation}]`)
            expect(square?.className).toInclude('m-square--dark')
        })
    })

    test('renders pieces in the squares indicated by `position`', function() {
        render(<Chessboard position={initialPosition} />)

        // Check that both kings are on the right squares in the initial position.
        const blackKingSquare = screen.getByAltText('Black King').closest('.m-square')
        expect(blackKingSquare).toBeInstanceOf(HTMLElement)
        if (blackKingSquare instanceof HTMLElement)
            expect(blackKingSquare.dataset.notation).toEqual('e8')

        const whiteKingSquare = screen.getByAltText('White King').closest('.m-square')
        expect(whiteKingSquare).toBeInstanceOf(HTMLElement)
        if (whiteKingSquare instanceof HTMLElement)
            expect(whiteKingSquare.dataset.notation).toEqual('e1')
    })
})
