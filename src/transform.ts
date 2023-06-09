import { options } from './options'

export const convertLevel = (level: number | string): string => {
  if (typeof level === 'string') {
    return level
  }

  if (level >= 60) {
    return 'fatal'
  }
  if (level >= 50) {
    return 'error'
  }
  if (level >= 40) {
    return 'warning'
  }
  if (level >= 30) {
    return 'info'
  }
  if (level >= 20) {
    return 'debug'
  }

  return 'trace'
}

type LogItem = {
  attributes: Record<string, number>
  timestamp: string | number
}

export function parseLog(log: Record<string, number>): LogItem {
  let level = log?.level ?? ''
  const timestamp = log?.timestamp || log?.time || new Date().getTime()

  if (log?.level) {
    level = convertLevel(log.level)
  }
  const attributes = (options?.ignore || '').split(',')
  attributes.forEach((attribute) => delete log[attribute])

  return {
    attributes: { ...log, level, ...options.additionalAttributes },
    timestamp,
    timezone: options?.timezone,
  } as LogItem
}
