import fetch from 'node-fetch'
import { options } from './options'

export default function submitLogItem({ log }: { log: Record<string, any> }) {
  const { baseURL, ingestToken, silent, callback } = options
  const url = (baseURL.length ? baseURL : 'https://cloud.community.humio.com') + '/api/v1/ingest/humio-structured'

  const headers = {
    'Content-Type': 'application/json',
    Authorization: 'Bearer ' + ingestToken,
  }
  const data = [
    {
      events: [log],
    },
  ]

  fetch(url, {
    method: 'POST',
    headers,
    body: JSON.stringify(data),
  })
    .then((result: any) => {
      return callback ? callback(result) : null
    })
    .catch((error: any) => {
      if (!silent) {
        console.error(error)
      }
      return callback ? callback(error) : null
    })
}
