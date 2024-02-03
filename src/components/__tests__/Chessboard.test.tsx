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
            let squareEl = document.querySelector(`[data-notation=${squareNotation}]`)
            expect(squareEl?.className).toInclude('m-square--light')
        })
        // Dark squares
        ;['a1', 'h8', 'd4', 'e5'].forEach(squareNotation => {
            let squareEl = document.querySelector(`[data-notation=${squareNotation}]`)
            expect(squareEl?.className).toInclude('m-square--dark')
        })
    })

    test('renders pieces in the squares indicated by `position`', function() {
        render(<Chessboard position={initialPosition} />)

        // Check that both kings are on the right squares in the initial position.
        const blackKingSquareEl = screen.getByAltText('Black King').closest('.m-square')
        expect(blackKingSquareEl).toBeInstanceOf(HTMLElement)
        if (blackKingSquareEl instanceof HTMLElement)
            expect(blackKingSquareEl.dataset.notation).toEqual('e8')

        const whiteKingSquareEl = screen.getByAltText('White King').closest('.m-square')
        expect(whiteKingSquareEl).toBeInstanceOf(HTMLElement)
        if (whiteKingSquareEl instanceof HTMLElement)
            expect(whiteKingSquareEl.dataset.notation).toEqual('e1')
    })

    describe('showNotation option', function() {
        test('shows notation on the squares by default', function() {
            render(<Chessboard />)

            let squareEl = document.querySelector(`[data-notation=a1]`)
            expect(squareEl?.querySelector('.m-square__x-notation')?.textContent).toEqual('a')
            expect(squareEl?.querySelector('.m-square__y-notation')?.textContent).toEqual('1')
        })

        test('shows notation on the squares when showNotation=true', function() {
            render(<Chessboard showNotation={true} />)

            let squareEl = document.querySelector(`[data-notation=a1]`)
            expect(squareEl?.querySelector('.m-square__x-notation')?.textContent).toEqual('a')
            expect(squareEl?.querySelector('.m-square__y-notation')?.textContent).toEqual('1')
        })

        test('does not show notation on the squares when showNotation=false', function() {
            render(<Chessboard showNotation={false} />)

            let squareEl = document.querySelector(`[data-notation=a1]`)
            expect(squareEl?.querySelector('.m-square__x-notation')).toBeNull()
            expect(squareEl?.querySelector('.m-square__y-notation')).toBeNull()
        })
    })

    // Todo: Seems to be an issue rendering during tests of the react-xarrows library 
    // with no resolution: https://github.com/Eliav2/react-xarrows/issues/110
    // describe('showLastMove option', function() {
    //     const initialMove: Move = { oldSquare: 'e2', newSquare: 'e4', isCapture: false, piece: 'WP' }
    //
    //     // test('shows move arrow by default', function() {})
    //     test('shows move arrow when showLastMove=true', function() {
    //         act(render(<Chessboard showLastMove={true} initialMove={initialMove} />))
    //
    //         let arrowEl = document.querySelector('.m-move-arrow')
    //         expect(arrowEl).not.toBeNull()
    //     })
    //
    //     test('does not show move arrow when showLastMove=false', function() {
    //         render(<Chessboard showLastMove={false} />)
    //
    //         let arrowEl = document.querySelector('.m-move-arrow')
    //         expect(arrowEl).toBeNull()
    //     })
    // })
})
