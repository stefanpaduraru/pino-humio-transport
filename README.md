# pino-humio-transport

[![NPM version](https://img.shields.io/npm/v/pino-humio-transport.svg?style=flat-square)](https://www.npmjs.com/package/pino-humio-transport)
[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

A simple [pino v7+](https://github.com/pinojs/pino) transport for sending logs to [Humio Cloud](https://humio.com/).

It takes the log object, performs some transformations and sends it to Humio cloud.
It only works for structured logs.

- Does not feature batching, every log entry is being sent separately
- Does not retry failed pushes

## Table of Contents

<!-- TOC -->

- [Installation](#installation)
- [Configuration options](#configuration-options)

<!-- TOC END -->

## Installation

`npm install pino-humio-transport`

```typescript
import { LoggerOptions, pino } from 'pino'

const pinoConf: LoggerOptions = {
  level: 'trace',
}

const logger = pino(
  pinoConf,
  pino.transport({
    target: 'pino-humio-transport',
    options: {
      baseURL: 'https://cloud.community.humio.com',
      ingestToken: '...',
      timezone: 'Europe/Berlin',
      additionalAttributes: { env: env.ENV_NAME },
      ignore: 'pid,hostname',
      silent: true,
    },
  }),
)
```

## Configuration options

```typescript
export interface HumioTransportOptions {
  /**
   * The base URL.
   * By default it points to https://cloud.community.humio.com
   * */
  baseURL?: string
  /**
   * Your Humio ingest token
   * */
  ingestToken: string
  /**
   * A callback function that gets called at the end of the request
   * */
  callback?: (..._: any) => void
  /**
   * Additional attributes that get sent with every log object
   * */
  additionalAttributes?: Record<string, unknown>
  /**
   * Timezone. If you want to be extra precise.
   * */
  timezone?: string
  /**
   * Inhibits logs to console in case of errors
   * */
  silent?: boolean
  /**
   * Log object attributes to ignore.
   * Format: field1,field2,...
   * */
  ignore?: string
}
```
