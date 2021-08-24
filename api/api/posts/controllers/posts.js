'use strict';

const { sanitizeEntity } = require('strapi-utils');

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-controllers)
 * to customize this controller
 */

module.exports = {
  async like(ctx) {
    let { id } = ctx.params;
    let user = ctx.state.user;
    let userid = user.id

    let post_entity = await strapi.services.posts.findOne({ id });
    if (post_entity === undefined) {
      ctx.response.status = 404 // Missing
    }

    // Check if already liked by user
    if (!post_entity.user_likes.includes(userid)) {
      post_entity.user_likes.push(userid);
      post_entity = await strapi.services.posts.update({ id }, post_entity);
      ctx.response.status = 200
      return sanitizeEntity(post_entity, { model: strapi.models.posts });
    } else {
      ctx.response.status = 409 // Conflict
    }
  },
  async unlike(ctx) {
    let { id } = ctx.params;
    let user = ctx.state.user;
    let userid = user.id

    let post_entity = await strapi.services.posts.findOne({ id });
    if (post_entity === undefined) {
      ctx.response.status = 404 // Missing
    }

    // Check if already liked by user
    if (!post_entity.user_likes.includes(userid)) {
      post_entity.user_likes.pop(userid);
      post_entity = await strapi.services.posts.update({ id }, post_entity);
      ctx.response.status = 200
      return sanitizeEntity(post_entity, { model: strapi.models.posts });
    } else {
      ctx.response.status = 409 // Conflict
    }
  }
};
