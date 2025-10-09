import { setTimeout } from 'node:timers/promises'
import { access } from 'node:fs/promises'
import path from 'node:path'
import React from 'react'

export default async function waitForMarkerFileInner() {
  const abortSignal = React.cacheSignal()
  let start = Date.now()
  while (true) {
    if (abortSignal?.aborted) {
      return
    }
    if (Date.now() - start > 30_000) {
      // really long timeout: should never be hit
      throw new Error('slowComponentReady marker file was never written')
    }
    try {
      await access(path.join(process.cwd(), 'slowComponentReady'))
      return
    } catch (e) {
      await setTimeout(100, { signal: abortSignal })
      continue
    }
  }
}
