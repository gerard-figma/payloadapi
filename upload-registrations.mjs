import { readFileSync } from 'node:fs'
import { PayloadSDK } from '@payloadcms/sdk'

// Create one client. The address comes from .env.
const sdk = new PayloadSDK({
  baseURL: process.env.PAYLOAD_API_URL,
})

// The API key in .env stands in for an admin user.
const auth = {
  headers: {
    Authorization: `admins API-Key ${process.env.PAYLOAD_API_KEY}`,
  },
}

// One registration, written out by hand.
await sdk.create(
  {
    collection: 'registrations',
    data: {
      fullName: 'Demo Guest',
      email: 'demo.guest@example.com',
      event: '57374b90-1c04-4995-8542-be4ae0a6204c',
    },
  },
  auth,
)

// Skip the header row. Each remaining line is one registration.
const rows = readFileSync('registrations.csv', 'utf8').trim().split('\n').slice(1)

for (const row of rows) {
  const [fullName, email, event] = row.split(',')

  // The event value is already the event id. Payload assigns the registration id.
  await sdk.create(
    {
      collection: 'registrations',
      data: { fullName, email, event },
    },
    auth,
  )
}

console.log(`Created ${rows.length} registrations.`)
