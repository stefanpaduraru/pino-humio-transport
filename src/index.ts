import Pumpify from 'pumpify'
import split from 'split2'
import through from 'through2'
import { setOptions, HumioTransportOptions } from './options'
import { handleLogItem } from './handle'
import { parseLog } from './transform'

function safelyParseJSON(source: string): any {
  try {
    const parsedObject = JSON.parse(source)

    return parsedObject
  } catch (e) {
    console.log(e, source)
  }
}

function streamHandler() {
  return through.obj((log: Record<string, number>, _enc: any, callback: any) => {
    const humioLogItem = parseLog(log)
    handleLogItem(humioLogItem, callback)
  })
}

export default function createWriteStream(options: HumioTransportOptions): Pumpify {
  if (!options.ingestToken) {
    throw new Error('The Humio ingest token is required')
  }
  setOptions(options)
  return new Pumpify(split(safelyParseJSON), streamHandler())
}
