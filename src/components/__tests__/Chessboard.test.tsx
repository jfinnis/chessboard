/// <reference lib="dom" />
import { afterEach, describe, expect, test } from 'bun:test'
import { cleanup, render, screen } from '@testing-library/react'

import Chessboard from '~/components/Chessboard'
import { initialPosition } from '~/utils/positions'

describe('Chessboard component', () => {
    afterEach(() => {
        cleanup()
    })

    test('renders squares in the correct colors', () => {
        render(<Chessboard />)
        // Light squares
        for (const squareNotation of ['a8', 'h1', 'd5', 'e4']) {
            const squareEl = document.querySelector(`[data-notation=${squareNotation}]`)
            expect(squareEl?.className).toInclude('m-square--light')
        }
        // Dark squares
        for (const square of ['a1', 'h8', 'd4', 'e5']) {
            const squareEl = document.querySelector(`[data-notation=${square}]`)
            expect(squareEl?.className).toInclude('m-square--dark')
        }
    })

    test('renders pieces in the squares indicated by `position`', () => {
        render(<Chessboard position={initialPosition} />)

        // Check that both kings are on the right squares in the initial position.
        const blackKingSquareEl = screen.getByAltText('Black King').closest('.m-square')
        expect(blackKingSquareEl).toBeInstanceOf(HTMLElement)
        if (blackKingSquareEl instanceof HTMLElement) {
            expect(blackKingSquareEl.dataset.notation).toEqual('e8')
        }

        const whiteKingSquareEl = screen.getByAltText('White King').closest('.m-square')
        expect(whiteKingSquareEl).toBeInstanceOf(HTMLElement)
        if (whiteKingSquareEl instanceof HTMLElement) {
            expect(whiteKingSquareEl.dataset.notation).toEqual('e1')
        }
    })

    describe('showNotation option', () => {
        test('shows notation on the squares by default', () => {
            render(<Chessboard />)

            const squareEl = document.querySelector('[data-notation=a1]')
            expect(squareEl?.querySelector('.m-square__x-notation')?.textContent).toEqual('a')
            expect(squareEl?.querySelector('.m-square__y-notation')?.textContent).toEqual('1')
        })

        test('shows notation on the squares when showNotation=true', () => {
            render(<Chessboard showNotation={true} />)

            const squareEl = document.querySelector('[data-notation=a1]')
            expect(squareEl?.querySelector('.m-square__x-notation')?.textContent).toEqual('a')
            expect(squareEl?.querySelector('.m-square__y-notation')?.textContent).toEqual('1')
        })

        test('does not show notation on the squares when showNotation=false', () => {
            render(<Chessboard showNotation={false} />)

            const squareEl = document.querySelector('[data-notation=a1]')
            expect(squareEl?.querySelector('.m-square__x-notation')).toBeNull()
            expect(squareEl?.querySelector('.m-square__y-notation')).toBeNull()
        })
    })

    // Todo: Seems to be an issue rendering during tests of the react-xarrows library
    // with no resolution: https://github.com/Eliav2/react-xarrows/issues/110
    // describe('showLastMove option', () => {
    //     const initialMove: Move = { oldSquare: 'e2', newSquare: 'e4', isCapture: false, piece: 'WP' }
    //
    //     // test('shows move arrow by default', () => {})
    //     test('shows move arrow when showLastMove=true', () => {
    //         act(render(<Chessboard showLastMove={true} initialMove={initialMove} />))
    //
    //         let arrowEl = document.querySelector('.m-move-arrow')
    //         expect(arrowEl).not.toBeNull()
    //     })
    //
    //     test('does not show move arrow when showLastMove=false', () => {
    //         render(<Chessboard showLastMove={false} />)
    //
    //         let arrowEl = document.querySelector('.m-move-arrow')
    //         expect(arrowEl).toBeNull()
    //     })
    // })
})
