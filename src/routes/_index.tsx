import type { MetaFunction } from '@remix-run/node'
import { Link } from '@remix-run/react'

export const meta: MetaFunction = () => {
    return [{ title: 'New Remix App' }, { name: 'description', content: 'Chessboard' }]
}

export default function IndexRoute() {
    return (
        <div
            style={{
                fontFamily: 'system-ui, sans-serif',
                lineHeight: '1.8',
                display: 'flex',
                flexDirection: 'column',
            }}
        >
            <Link to="/chessboard">Chessboard</Link>
        </div>
    )
}
