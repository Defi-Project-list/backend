export const sslConfig = () => ({
    cert: process.env.SSL_CERT,
    key: process.env.SSL_KEY
})