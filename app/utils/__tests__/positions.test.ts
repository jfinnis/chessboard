import { describe, expect, test } from 'bun:test'

import { mapIndicesToPositionIndex } from '~/utils/positions'
import { errorMessageExpectation, falseExpectation } from '~/utils/test'

describe('mapIndicesToPositionIndex()', function() {
    test('throws an error for invalid row or column parameters', function() {
        ;[-1, 8, 144].forEach((rowIndex: number) => {
            try {
                mapIndicesToPositionIndex(rowIndex, 3)
                falseExpectation()
            } catch (e) {
                errorMessageExpectation(e, `Row index '${rowIndex}' must be between 0 and 7.`)
            }
        })
        ;[-1, 8, 144].forEach((colIndex: number) => {
            try {
                mapIndicesToPositionIndex(3, colIndex)
                falseExpectation()
            } catch (e) {
                errorMessageExpectation(e, `Column index '${colIndex}' must be between 0 and 7.`)
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
