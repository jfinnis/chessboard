/// <reference lib="dom" />
import { afterEach, describe, expect, test } from 'bun:test'
import { cleanup, render, screen } from '@testing-library/react'

import Square from '~/components/Square'
import { mapNotationToSquareInfo } from '~/utils/notation'

describe('Square component', function() {
    afterEach(function() {
        cleanup()
    })

    test('renders without errors', function() {
        render(
            <Square
                squareInfo={{ rowIndex: 0, colIndex: 0, color: 'white', notation: 'a8' }}
                piece={undefined}
            />
        )
    })

    test('renders row notation on bottom row', function() {
        render(
            <Square
                squareInfo={mapNotationToSquareInfo('a1')}
                piece={undefined}
            />
        )
        expect(screen.queryAllByText('a').length).toEqual(1)
        expect(screen.getByText('a').parentElement?.dataset.notation).toEqual('a1')
    })

    test('does not render row notation on other rows', function() {
        render(
            <Square
                squareInfo={mapNotationToSquareInfo('a3')}
                piece={undefined}
            />
        )
        expect(screen.queryAllByText('a').length).toEqual(0)
    })

    test('renders column notation on left column', function() {
        render(
            <Square
                squareInfo={mapNotationToSquareInfo('a3')}
                piece={undefined}
            />
        )
        expect(screen.queryAllByText('3').length).toEqual(1)
        expect(screen.getByText('3').parentElement?.dataset.notation).toEqual('a3')
    })

    test('does not render column notation on other columns', function() {
        render(
            <Square
                squareInfo={mapNotationToSquareInfo('c3')}
                piece={undefined}
            />
        )
        expect(screen.queryAllByText('3').length).toEqual(0)
    })

    test('renders piece in square if provided', function() {
        render(
            <Square
                squareInfo={mapNotationToSquareInfo('c3')}
                piece={'BK'}
            />
        )
        expect(document.querySelector('img')).not.toBeNull()
        expect(screen.getByAltText('Black King')).toBeTruthy()
    })

    test('does not render piece if param is undefined', function() {
        render(
            <Square
                squareInfo={mapNotationToSquareInfo('c3')}
                piece={undefined}
            />
        )
        expect(document.querySelector('img')).toBeNull()
    })
})
