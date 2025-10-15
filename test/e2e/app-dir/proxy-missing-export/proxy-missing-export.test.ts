import { nextTestSetup } from 'e2e-utils'

const errorMessage =
  'The Proxy "/proxy" must export a `proxy` or a `default` function'

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
