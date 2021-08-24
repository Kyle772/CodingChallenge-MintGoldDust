'use strict';

const { sanitizeEntity } = require('strapi-utils');

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-controllers)
 * to customize this controller
 */

module.exports = {
  async like(ctx) {
    let { id } = ctx.params;
    let { userid } = ctx.request.body;
    strapi.log.debug("id: " + id)
    strapi.log.debug("userid: " + userid)

    let post_entity = await strapi.services.posts.findOne({ id });
    // Check if already liked by user
    strapi.log.debug("post_entity: ", post_entity)
    if (post_entity === undefined) {
      ctx.response.status = 404 // Missing
    }

    if (!post_entity.user_likes.includes(userid)) {
      post_entity.user_likes.push(userid);
      post_entity = await strapi.services.posts.update({ id }, post_entity);
      return sanitizeEntity(post_entity, { model: strapi.models.posts });
    } else {
      ctx.response.status = 409 // Conflict
    }
  },
  async unlike(ctx) {
    let { id } = ctx.params;
    let { userid } = ctx.request.body;

    let post_entity = await strapi.services.posts.findOne({ id });
    // Check if already liked by user
    strapi.log.debug("post_entity: ", post_entity)
    if (post_entity === undefined) {
      ctx.response.status = 404 // Missing
    }

    if (!post_entity.user_likes.includes(userid)) {
      post_entity.user_likes.remove(userid);
      post_entity = await strapi.services.posts.update({ id }, post_entity);
      return sanitizeEntity(post_entity, { model: strapi.models.posts });
    } else {
      ctx.response.status = 409 // Conflict
    }
  }
};
