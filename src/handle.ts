import { TransformCallback } from 'through2'

import submitLogItem from './send-logs'

export function handleLogItem(log: Record<string, unknown>, callback?: TransformCallback): void {
  submitLogItem({ log })

  callback?.()
}
