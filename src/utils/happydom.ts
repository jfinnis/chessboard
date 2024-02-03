import { GlobalRegistrator } from '@happy-dom/global-registrator'

/**
 * Register with happy-dom to make browser APIs like document available in the global scope
 * for testing DOM-related things.
 *
 * Restore the console to fix a happy-dom related issue of not being able to log in tests.
 */
const oldConsole = console
GlobalRegistrator.register()
window.console = oldConsole
