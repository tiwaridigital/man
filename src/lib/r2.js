import { S3Client } from '@aws-sdk/client-s3'

export const r2 = new S3Client({
  region: 'auto',
  endpoint: 'https://d15eb0203fe48da452c69098092ecf46.r2.cloudflarestorage.com',
  credentials: {
    accessKeyId: '3aefb2c6e1b09b3f002fe1619f507f91',
    secretAccessKey:
      '25dd0b7c00a90d6ab31227e81702731de25d4a18b6aec66be818460ee87d8324',
  },
})
