/// <reference lib="dom" />
import { describe, expect, test } from 'bun:test'
import { render, screen } from '@testing-library/react'

import Chessboard from '~/components/Chessboard'

describe('Chessboard component', function() {
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

    test.todo('renders pieces in the squares indicated by `position`', function() {

    })
})
