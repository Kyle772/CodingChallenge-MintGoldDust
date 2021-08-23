'use strict';

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#lifecycle-hooks)
 * to customize this model
 */

const slugify = require('slugify');

module.exports = {
    lifecycles: {
        async beforeUpdate(params, data) {
            if (data.title) {
                data.slug = slugify(data.title, { lower: true });
            }
        },
        async beforeCreate(data) {
            if (data.title) {
                data.slug = slugify(data.title, { lower: true });
            }
        },
    },
};