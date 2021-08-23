module.exports = ({ env }) => ({
    // ...
    email: {
        provider: 'sendgrid',
        providerOptions: {
            apiKey: env('SENDGRID_API_KEY'),
        },
        settings: {
            defaultFrom: 'no-reply@KyleDiggs.com',
            testAddress: 'Contact@KyleDiggs.com',
        },
    },
    graphql: {
        endpoint: '/graphql',
        shadowCRUD: true,
        playgroundAlways: true,
        depthLimit: 7,
        amountLimit: 100,
        apolloServer: {
            tracing: false,
        },
    },
    // ...
});