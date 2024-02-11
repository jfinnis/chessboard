import { describe, expect, test } from 'bun:test'
import { type DragEndEvent, type Over } from '@dnd-kit/core'
import { invariant } from '@epic-web/invariant'

import { generateMoveFromDrop } from '~/utils/moves'
import { mapNotationToSquareInfo } from '~/utils/notation'
import { initialPosition, mapIndicesToPositionIndex } from '~/utils/positions'
import type { Notation, PositionArray } from '~/utils/ts-helpers'

const eventTemplate: DragEndEvent = {
    activatorEvent: {} as PointerEvent,
    active: {
        id: '',
        data: { current: undefined },
        rect: { current: { initial: null, translated: null } },
    },
    collisions: [],
    delta: { x: 1.5, y: -137 },
    over: {
        id: '',
        data: { current: undefined },
        rect: { width: 74, left: 340, top: 490, height: 74, bottom: 562, right: 414 },
        disabled: false,
    },
}

describe('generateMoveFromDrop', () => {
    test('throws errors for invalid drop events', () => {
        const event = {
            ...eventTemplate,
            active: {
                ...eventTemplate.active,
                id: 'not-a-piece',
            },
        }
        expect(() => generateMoveFromDrop(event, initialPosition)).toThrow(
            'Cannot drop an undefined piece.',
        )
    })

    test('creates a move for moving a piece to an empty square', () => {
        const event = testDropEvent('e2', 'e4', initialPosition)
        expect(generateMoveFromDrop(event, initialPosition)).toEqual({
            oldSquare: 'e2',
            newSquare: 'e4',
            piece: 'WP',
            isCapture: false,
        })
    })

    test('creates a move for moving a piece to an occupied square', () => {
        const event = testDropEvent('e2', 'e7', initialPosition)
        expect(generateMoveFromDrop(event, initialPosition)).toEqual({
            oldSquare: 'e2',
            newSquare: 'e7',
            piece: 'WP',
            isCapture: true,
        })
    })

    test('cannot move to same square', () => {
        const event = testDropEvent('a1', 'a1', initialPosition)
        expect(generateMoveFromDrop(event, initialPosition)).toBeNull()
    })
})

function testDropEvent(
    oldSquare: Notation,
    newSquare: Notation,
    position: PositionArray,
): DragEndEvent {
    const oldSquareInfo = mapNotationToSquareInfo(oldSquare)
    const pieceId =
        position[mapIndicesToPositionIndex(oldSquareInfo.rowIndex, oldSquareInfo.colIndex)]
    invariant(pieceId, 'Square must correspond to a position.')
    return {
        ...eventTemplate,
        active: {
            ...eventTemplate.active,
            id: pieceId.id,
        },
        over: {
            ...(eventTemplate.over as Over),
            id: newSquare,
        },
    }
}
