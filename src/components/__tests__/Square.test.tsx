/// <reference lib="dom" />
import { afterEach, describe, expect, test } from 'bun:test'
import { cleanup, render, screen } from '@testing-library/react'

import Square from '~/components/Square'
import { mapNotationToSquareInfo } from '~/utils/notation'
import type { BoardIndex, Notation, PieceNotation } from '~/utils/ts-helpers'

describe('Square component', () => {
    afterEach(() => {
        cleanup()
    })

    test('renders without errors', () => {
        render(
            <Square
                squareInfo={{ rowIndex: 0, colIndex: 0, color: 'white', notation: 'a8' }}
                piece={undefined}
                showNotation={true}
            />,
        )
    })

    describe('square notation', () => {
        test('renders row notation on bottom row', () => {
            render(
                <Square
                    squareInfo={mapNotationToSquareInfo('a1')}
                    piece={undefined}
                    showNotation={true}
                />,
            )
            expect(screen.queryAllByText('a').length).toEqual(1)
            expect(screen.getByText('a').parentElement?.dataset.notation).toEqual('a1')
        })

        test('does not render row notation on other rows', () => {
            render(
                <Square
                    squareInfo={mapNotationToSquareInfo('a3')}
                    piece={undefined}
                    showNotation={true}
                />,
            )
            expect(screen.queryAllByText('a').length).toEqual(0)
        })

        test('renders column notation on left column', () => {
            render(
                <Square
                    squareInfo={mapNotationToSquareInfo('a3')}
                    piece={undefined}
                    showNotation={true}
                />,
            )
            expect(screen.queryAllByText('3').length).toEqual(1)
            expect(screen.getByText('3').parentElement?.dataset.notation).toEqual('a3')
        })

        test('does not render column notation on other columns', () => {
            render(
                <Square
                    squareInfo={mapNotationToSquareInfo('c3')}
                    piece={undefined}
                    showNotation={true}
                />,
            )
            expect(screen.queryAllByText('3').length).toEqual(0)
        })

        test('hides notation if showNotation is set to false', () => {
            render(
                <Square
                    squareInfo={mapNotationToSquareInfo('a1')}
                    piece={undefined}
                    showNotation={false}
                />,
            )
            expect(screen.queryAllByText('a').length).toEqual(0)
            expect(screen.queryAllByText('1').length).toEqual(0)
        })
    })

    describe('pieces', () => {
        test('renders piece in square if provided', () => {
            const piece = {
                id: crypto.randomUUID(),
                piece: 'BK' as PieceNotation,
                square: 'c3' as Notation,
                squarePos: { row: 5 as BoardIndex, column: 2 as BoardIndex },
            }
            render(
                <Square
                    squareInfo={mapNotationToSquareInfo('c3')}
                    piece={piece}
                    showNotation={true}
                />,
            )
            expect(document.querySelector('img')).not.toBeNull()
            expect(screen.getByAltText('Black King')).toBeTruthy()
        })

        test('does not render piece if param is undefined', () => {
            render(
                <Square
                    squareInfo={mapNotationToSquareInfo('c3')}
                    piece={undefined}
                    showNotation={true}
                />,
            )
            expect(document.querySelector('img')).toBeNull()
        })
    })
})
