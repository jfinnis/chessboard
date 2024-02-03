import { describe, expect, test } from 'bun:test'

import { mapNotationToSquareInfo, type Notation } from '~/utils/notation'
import { initialPosition, mapIndicesToPositionIndex, mapPositionIndexToIndices, moveNotation, movePiece, type PositionArray } from '~/utils/positions'
import { errorMessageExpectation, falseExpectation } from '~/utils/test'

describe('mapIndicesToPositionIndex()', function() {
    test('throws an error for invalid row or column parameters', function() {
        ;[-1, 8, 144].forEach((rowIndex: number) => {
            try {
                //@ts-ignore-error
                mapIndicesToPositionIndex(rowIndex, 3)
                falseExpectation()
            } catch (e) {
                errorMessageExpectation(e, `Row index "${rowIndex}" must be between 0 and 7.`)
            }
        })
        ;[-1, 8, 144].forEach((colIndex: number) => {
            try {
                //@ts-ignore-error
                mapIndicesToPositionIndex(3, colIndex)
                falseExpectation()
            } catch (e) {
                errorMessageExpectation(e, `Column index "${colIndex}" must be between 0 and 7.`)
            }
        })
    })

    test('returns the number of the square', function() {
        expect(mapIndicesToPositionIndex(0, 0)).toEqual(0)
        expect(mapIndicesToPositionIndex(0, 7)).toEqual(7)
        expect(mapIndicesToPositionIndex(7, 0)).toEqual(56)
        expect(mapIndicesToPositionIndex(7, 7)).toEqual(63)
        expect(mapIndicesToPositionIndex(2, 2)).toEqual(18)
        expect(mapIndicesToPositionIndex(6, 5)).toEqual(53)
    })
})

describe('mapPositionIndexToIndices()', function() {
    test('throws an error for invalid row or column parameters', function() {
        ;[-1, 64].forEach(index => {
            try {
                mapPositionIndexToIndices(index)
                falseExpectation()
            } catch (e) {
                errorMessageExpectation(e, `Position index "${index}" must be between 0 and 63.`)
            }
        })
    })

    test('returns the correct indices to match the position array', function() {
        expect(mapPositionIndexToIndices(0)).toEqual({ row: 0, column: 0 })
        expect(mapPositionIndexToIndices(33)).toEqual({ row: 4, column: 1 })
        expect(mapPositionIndexToIndices(63)).toEqual({ row: 7, column: 7 })
    })
})


describe('movePiece()', function() {
    test('throws error if no position exists', function() {
        try {
            ///@ts-ignore-error
            movePiece(undefined, 'e2', 'e4')
            falseExpectation()
        } catch (e) {
            errorMessageExpectation(e, 'Position array must exist.')
        }
    })

    test('throws error if moving from a bad square', function() {
        try {
            // Make the position array smaller just to test this.
            movePiece(initialPosition.slice(0, 15), 'e2', 'e7')
            falseExpectation()
        } catch (e) {
            errorMessageExpectation(e, "Cannot move from a square 'e2' that does not exist.")
        }
    })

    test('throws error if moving to a bad square', function() {
        try {
            // Make the position array smaller just to test this.
            movePiece(initialPosition.slice(0, 15), 'e7', 'e2')
            falseExpectation()
        } catch (e) {
            errorMessageExpectation(e, "Cannot move to a square 'e2' that does not exist.")
        }
    })

    test('throws error if trying to move a piece from a square without a piece', function() {
        try {
            movePiece(initialPosition, 'e3', 'e4')
            falseExpectation()
        } catch (e) {
            errorMessageExpectation(e, `There is no piece on square 'e3' to move.`)
        }
    })

    test('moves a piece to a square without a piece', function() {
        const oldSquare: Notation = 'e2'
        const oldSquareInfo = mapNotationToSquareInfo(oldSquare)
        const newSquare: Notation = 'e4'
        const newSquareInfo = mapNotationToSquareInfo(newSquare)

        // e2 currently contains a White Pawn, e4 contains nothing
        expect(initialPosition[mapIndicesToPositionIndex(oldSquareInfo.rowIndex, oldSquareInfo.colIndex)]).toMatchObject({ piece: 'WP' })
        expect(initialPosition[mapIndicesToPositionIndex(newSquareInfo.rowIndex, newSquareInfo.colIndex)]).toBeUndefined()

        // New position has nothing at e2, a White Pawn at e4
        const newPosition = movePiece(initialPosition, oldSquare, newSquare)
        expect(newPosition[mapIndicesToPositionIndex(oldSquareInfo.rowIndex, oldSquareInfo.colIndex)]).toBeUndefined()
        expect(newPosition[mapIndicesToPositionIndex(newSquareInfo.rowIndex, newSquareInfo.colIndex)]).toMatchObject({ piece: 'WP' })

        // No pieces were captured so total number should stay the same.
        const numPieces = (position: PositionArray) => position.filter(p => p !== undefined).length
        expect(numPieces(initialPosition)).toEqual(numPieces(newPosition))
    })

    test('moves a piece to a square with a piece', function() {
        const oldSquare: Notation = 'e2'
        const oldSquareInfo = mapNotationToSquareInfo(oldSquare)
        const newSquare: Notation = 'h8'
        const newSquareInfo = mapNotationToSquareInfo(newSquare)

        // e2 currently contains a White Pawn, h8 contains a Black Rook
        expect(initialPosition[mapIndicesToPositionIndex(oldSquareInfo.rowIndex, oldSquareInfo.colIndex)]).toMatchObject({ piece: 'WP' })
        expect(initialPosition[mapIndicesToPositionIndex(newSquareInfo.rowIndex, newSquareInfo.colIndex)]).toMatchObject({ piece: 'BR' })

        // New position has nothing at e2, a White Pawn at e4
        const newPosition = movePiece(initialPosition, oldSquare, newSquare)
        expect(newPosition[mapIndicesToPositionIndex(oldSquareInfo.rowIndex, oldSquareInfo.colIndex)]).toBeUndefined()
        expect(newPosition[mapIndicesToPositionIndex(newSquareInfo.rowIndex, newSquareInfo.colIndex)]).toMatchObject({ piece: 'WP' })

        // One piece was captured, so initial position should have one extra.
        const numPieces = (position: PositionArray) => position.filter(p => p !== undefined).length
        expect(numPieces(initialPosition)).toEqual(numPieces(newPosition) + 1)
    })
})
