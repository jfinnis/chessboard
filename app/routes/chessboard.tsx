import { useState } from 'react'
import type { MetaFunction } from '@remix-run/node'
import { Link } from '@remix-run/react'

import Chessboard, { type PieceNotation } from '~/components/Chessboard'

export const meta: MetaFunction = () => {
    return [
        { title: 'Chessboard Route' },
        { name: 'description', content: 'Chessboard Route' },
    ]
}

const position: (PieceNotation | undefined)[] = [
    undefined, 'WP', undefined, 'WK', undefined, undefined, undefined, undefined, 
    undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, 
    undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, 
    undefined, 'BP', undefined, undefined, undefined, undefined, 'BK', 'BQ', 
    undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, 
    undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, 
    undefined, undefined, undefined, undefined, undefined, undefined, undefined, 'BR', 
    'BR', undefined, undefined, undefined, undefined, undefined, undefined, undefined, 
]

export default function Index() {
    const [hideNotation, setHideNotation] = useState(false)

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
        </div>

        <div style={{ margin: '3rem', textAlign: 'center' }}>
            <Chessboard
                position={position}
                hideNotation={hideNotation}
            />
        </div>
    </>
}
