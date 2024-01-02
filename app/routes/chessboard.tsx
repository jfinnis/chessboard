import { useState } from 'react'
import type { MetaFunction } from '@remix-run/node'
import { Link } from '@remix-run/react'

import Chessboard, { type PieceNotation } from '~/components/Chessboard'
import { type PositionArray, randomPosition } from '~/utils/positions'

export const meta: MetaFunction = () => {
    return [
        { title: 'Chessboard Route' },
        { name: 'description', content: 'Chessboard Route' },
    ]
}

export default function Index() {
    const [hideNotation, setHideNotation] = useState(false)
    const [position, setPosition] = useState<PositionArray>()
    return <>
        <Link to="/">Back</Link>
        <h1>Chessboard</h1>

        <div style={{ display: 'flex', gap: '1rem' }}>
            <label style={{ display: 'inline flex' }}>
                Hide Notation
                <input id="cbHideNotation"
                    type="checkbox"
                    defaultValue={hideNotation ? 1 : 0}
                    onChange={() => setHideNotation(!hideNotation) }
                />
            </label>
            <button type="button"
                onClick={() => setPosition(randomPosition())}
            >
                Randomize
            </button>
        </div>

        <div style={{ margin: '3rem', textAlign: 'center' }}>
            <Chessboard
                position={position}
                hideNotation={hideNotation}
            />
        </div>
    </>
}
