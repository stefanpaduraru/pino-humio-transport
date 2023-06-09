export interface HumioTransportOptions {
  baseURL?: string
  ingestToken: string
  callback?: (..._: any) => void
  additionalAttributes?: Record<string, unknown>
  timezone?: string
  silent?: boolean
  ignore?: string
}

const defaultOptions: HumioTransportOptions = {
  baseURL: '',
  ingestToken: '',
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  callback: () => {},
  additionalAttributes: {},
  silent: true,
  ignore: '',
}

export let options: HumioTransportOptions

export function setOptions(newOptions: Partial<HumioTransportOptions>): void {
  options = {
    ...defaultOptions,
    ...newOptions,
  }
}
