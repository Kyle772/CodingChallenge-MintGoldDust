module.exports = ({ env }) => ({
    host: env('HOST', '0.0.0.0'),
    port: env.int('PORT', 1337),
    url: env('ADMIN_URL'),
    admin: {
        url: env('ADMIN_URL') + "/admin",
        auth: {
            secret: env('ADMIN_JWT_SECRET', '92a4e0d0fec5ec27b7dfed273a103656'),
        }
    },
});