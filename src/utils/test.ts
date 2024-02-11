import { expect } from 'bun:test'

/**
 * Call this after the command that should throw an error to make sure it doesn't succeed without error.
 */
export function falseExpectation(): void {
    expect('An error was not thrown.').toEqual('An error was thrown.')
}

/**
 * Check the error message is what we expected. Also check that an Error was thrown as opposed to a Response/string/etc.
 */
export function errorMessageExpectation(error: unknown, message: string): void {
    if (error instanceof Error) {
        expect(error.message).toEqual(message)
    } else {
        expect('Item thrown was not an instance of Error').toEqual('Threw an error')
    }
}
