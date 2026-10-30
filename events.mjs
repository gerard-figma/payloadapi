// Load the Payload SDK, the client for a Payload REST API.
import { PayloadSDK } from '@payloadcms/sdk'

// Create one client. The address comes from .env.
const sdk = new PayloadSDK({
  baseURL: process.env.PAYLOAD_API_URL,
})

// Read the events collection, soonest first, and keep only these fields.
const { docs } = await sdk.find({
  collection: 'events',
  limit: 20,
  sort: 'startDate',
  select: {
    title: true,
    eventType: true,
    startDate: true,
    location: true,
    registrationOpen: true,
  },
})

// docs is the array of events. Print it.
console.log(docs)



// The API key in .env stands in for an admin user on later calls.
const auth = {
  headers: {
    Authorization: `admins API-Key ${process.env.PAYLOAD_API_KEY}`,
  },
}



// Read every registration back.
const { docs: registrations } = await sdk.find(
  {
    collection: 'registrations',
    pagination: false,
    sort: '-createdAt',
    depth: 0,
    select: {
      fullName: true,
      email: true,
      status: true,
      event: true,
    },
  },
  auth,
)

console.log(registrations)

