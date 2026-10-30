# Gather events

One script that reads events from the Gather site with the [Payload SDK](https://payloadcms.com/docs/rest-api/overview#payload-rest-api-sdk).

```bash
npm install
npm start
```

`npm start` loads `.env`, then runs `events.mjs`. It prints the events, creates one registration with `PAYLOAD_API_KEY`, then prints every registration.
