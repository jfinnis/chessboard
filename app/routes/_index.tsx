import type { MetaFunction } from '@remix-run/node'
import { Link } from '@remix-run/react'

import '~/styles/global.css'

export const meta: MetaFunction = () => {
    return [
        { title: 'New Remix App' },
        { name: 'description', content: 'Chessboard' },
    ]
}

export default function Index() {
    return <div style={{ fontFamily: 'system-ui, sans-serif', lineHeight: '1.8' }}>
        <Link to="/chessboard">Chessboard</Link>
    </div>
}
