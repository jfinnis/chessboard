import { Links, LiveReload, Meta, Outlet, Scripts, ScrollRestoration } from '@remix-run/react'

import '~/styles/reset.css'

// Keep space between these imports to avoid import reordering
import '~/styles/global.css'

export default function App() {
    return (
        <html lang="en">
            <head>
                <meta charSet="utf-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <Meta />
                <Links />
            </head>
            <body>
                <Outlet />
                <ScrollRestoration />
                <Scripts />
                <LiveReload />
            </body>
        </html>
    )
}
