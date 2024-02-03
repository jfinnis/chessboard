import { useState } from 'react'
import type { MetaFunction } from '@remix-run/node'
import { Link } from '@remix-run/react'

import Chessboard from '~/components/Chessboard'
import { randomPosition, initialPosition, moveRandomPiece } from '~/utils/positions'
import type { PositionArray } from '~/utils/ts-helpers'

export const meta: MetaFunction = () => {
    return [
        { title: 'Chessboard Route' },
        { name: 'description', content: 'Chessboard Route' },
    ]
}

export default function ChessboardRoute() {
    const [showNotation, setShowNotation] = useState(true)
    const [showLastMove, setShowLastMove] = useState(true)
    return <>
        <Link to="/">Back</Link>
        <h1>Chessboard</h1>

        <div style={{ display: 'flex', gap: '1rem' }}>
            <label style={{ display: 'inline flex' }}>
                Hide Notation
                <input type="checkbox"
                    defaultValue={showNotation ? 0 : 1}
                    onChange={() => setShowNotation(!showNotation) }
                />
            </label>
            <label style={{ display: 'inline flex' }}>
                Hide Last Move
                <input type="checkbox"
                    defaultValue={showLastMove ? 0 : 1}
                    onChange={() => setShowLastMove(!showLastMove) }
                />
            </label>

            <button type="button" onClick={() => setPosition(initialPosition)} >
                Initial Position
            </button>

            <button type="button"
                onClick={() => setPosition(undefined)}
                disabled={!position}
            >
                Clear
            </button>

            <button type="button" onClick={() => setPosition(randomPosition())} >
                Randomize
            </button>

            <button type="button"
                onClick={() => setPosition(moveRandomPiece(position))}
                disabled={!position}
            >
                Yolo Move
            </button>
        </div>

        <div style={{ margin: '3rem', textAlign: 'center' }}>
            <Chessboard
                position={position}
                hideNotation={hideNotation}
            />
                    showNotation={showNotation}
                    showLastMove={showLastMove}
        </div>
    </>
}
