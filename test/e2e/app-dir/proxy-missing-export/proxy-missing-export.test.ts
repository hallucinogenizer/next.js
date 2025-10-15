import { nextTestSetup } from 'e2e-utils'

const errorMessage = `The file proxy must export a function, either as a default export or as a named proxy export.
This function is what Next.js runs for every request handled by this proxy (previously called middleware).

Why this happens:
- The file exists but doesn't export a function.
- The export is not a function (e.g., an object or constant).
- There's a syntax error preventing the export from being recognized.

To fix it:
- Check your "proxy" file.
- Ensure it has either a default or "proxy" function export.
- Restart the dev server if the error persists.`

describe('proxy-missing-export', () => {
  const { next, isNextDev, skipped } = nextTestSetup({
    files: __dirname,
    skipDeployment: true,
    skipStart: true,
  })

  if (skipped) {
    return
  }

  it('should error when proxy file is missing a correct export', async () => {
    if (isNextDev) {
      await next.start().catch(() => {})
      // Errors during runtime
      await next.browser('/')
      expect(next.cliOutput).toContain(errorMessage)
    } else {
      const { cliOutput } = await next.build()
      expect(cliOutput).toContain(errorMessage)
    }
  })
})
