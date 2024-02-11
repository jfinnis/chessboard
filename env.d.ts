/// <reference types="@remix-run/node" />
/// <reference types="vite/client" />

declare module 'use-react-screenshot' {
    type UseScreenshot = (options?: {
        type: 'image/jpeg' | 'image/png'
        quality: number
    }) => [string | null, (node: HTMLDivElement | null, options?: unknown) => Promise<string, void>]
    declare const useScreenshot: UseScreenshot
    export { useScreenshot }
}
