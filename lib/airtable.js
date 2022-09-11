const AirtablePlus = require('airtable-plus')

const API_KEY = process.env.AIRTABLE;

export const registrationsAirtable = new AirtablePlus({
  baseID: 'appW4yWG1c2pnbcNT',
  apiKey: API_KEY,
  tableName: 'Registrations',
})
