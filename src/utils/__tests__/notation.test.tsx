import { describe, expect, test } from 'bun:test'

import { mapIndicesToNotation, mapNotationToSquareInfo } from '~/utils/notation'
import { errorMessageExpectation, falseExpectation } from '~/utils/test'

describe('mapIndicesToNotation()', function() {
    test('throws an error for invalid row or column parameters', function() {
        ;[-1, 8, 144].forEach((rowIndex: number) => {
            try {
                mapIndicesToNotation(rowIndex, 3)
                falseExpectation()
            } catch (e) {
                errorMessageExpectation(e, `Row index '${rowIndex}' must be between 0 and 7.`)
            }
        })
        ;[-1, 8, 144].forEach((colIndex: number) => {
            try {
                mapIndicesToNotation(3, colIndex)
                falseExpectation()
            } catch (e) {
                errorMessageExpectation(e, `Column index '${colIndex}' must be between 0 and 7.`)
            }
        })
    })

    test('returns the notation of the square', function() {
        expect(mapIndicesToNotation(0, 0)).toEqual('a8')
        expect(mapIndicesToNotation(0, 7)).toEqual('h8')
        expect(mapIndicesToNotation(7, 0)).toEqual('a1')
        expect(mapIndicesToNotation(7, 7)).toEqual('h1')
        expect(mapIndicesToNotation(2, 2)).toEqual('c6')
        expect(mapIndicesToNotation(6, 5)).toEqual('f2')
    })
})

describe('mapNotationToSquareInfo()', function() {
    test('throws an error for bad notations', function() {
        ;['a0', 'h9', 'i3', 'abcd'].forEach((notation: string) => {
            try {
                mapNotationToSquareInfo(notation)
                falseExpectation()
            } catch (e) {
                errorMessageExpectation(e, `Notation '${notation}' is invalid.`)
            }
        })
    })

    test('returns the square info of a notation', function() {
        expect(mapNotationToSquareInfo('a8')).toEqual({ notation: 'a8', rowIndex: 0, colIndex: 0, color: 'white' })
        expect(mapNotationToSquareInfo('c5')).toEqual({ notation: 'c5', rowIndex: 3, colIndex: 2, color: 'black' })
        expect(mapNotationToSquareInfo('h1')).toEqual({ notation: 'h1', rowIndex: 7, colIndex: 7, color: 'white' })
    })
})
