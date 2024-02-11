import type { MetaFunction } from '@remix-run/node'
import { Link } from '@remix-run/react'
import { useRef, useState } from 'react'
import { useScreenshot } from 'use-react-screenshot'

import Chessboard from '~/components/Chessboard'
import { initialPosition, moveRandomPiece, randomPosition } from '~/utils/positions'
import type { PositionArray } from '~/utils/ts-helpers'

export const meta: MetaFunction = () => {
    return [{ title: 'Chessboard Route' }, { name: 'description', content: 'Chessboard Route' }]
}

function getScreenshotName() {
    return `chess-pos-${Date.now()}`
}

export default function ChessboardRoute() {
    const [showNotation, setShowNotation] = useState(true)
    const [showLastMove, setShowLastMove] = useState(true)
    const [position, setPosition] = useState<PositionArray | undefined>()

    const chessboardRef = useRef(null)
    const [image, takeScreenshot] = useScreenshot({
        type: 'image/jpeg',
        quality: 1.0
    })

    function downloadImage(image: string) {
        const a = document.createElement('a')
        a.href = image
        a.download = `${getScreenshotName()}.jpg`
        a.click()
    }

    return (
        <>
            <Link to="/">Back</Link>
            <h1>Chessboard</h1>

            <div style={{ display: 'flex', gap: '1rem' }}>
                <label style={{ display: 'inline flex' }}>
                    Hide Notation
                    <input
                        type="checkbox"
                        defaultValue={showNotation ? 0 : 1}
                        onChange={() => setShowNotation(!showNotation)}
                    />
                </label>
                <label style={{ display: 'inline flex' }}>
                    Hide Last Move
                    <input
                        type="checkbox"
                        defaultValue={showLastMove ? 0 : 1}
                        onChange={() => setShowLastMove(!showLastMove)}
                    />
                </label>

                <button type="button" onClick={() => setPosition(initialPosition)}>
                    Initial Position
                </button>

                <button type="button" onClick={() => setPosition(undefined)} disabled={!position}>
                    Clear
                </button>

                <button type="button" onClick={() => setPosition(randomPosition())}>
                    Randomize
                </button>

                <button
                    type="button"
                    onClick={() => setPosition(moveRandomPiece(position))}
                    disabled={!position}
                >
                    Yolo Move
                </button>

                <button type="button" onClick={() => takeScreenshot(chessboardRef.current)}>
                    Preview Screenshot
                </button>

                <button type="button" onClick={() => takeScreenshot(chessboardRef.current).then(downloadImage)} >
                    Download Screenshot
                </button>
            </div>

        <div ref={chessboardRef}
            style={{ padding: '3rem', textAlign: 'center', border: '1px solid black', background: 'aliceblue' }}>
            <Chessboard
                position={position}
                updatePosition={(position: PositionArray) => setPosition(position)}
                showNotation={showNotation}
                showLastMove={showLastMove}
            />
        </div>

        {image && <img width={400} src={image} alt={'Screenshot'} />}
    </>
    )
}
