const { Bid, Like } = require("../db/models");
const { Op } = require("sequelize");

class BidService {
  async getSourceBids(userId) {
    const bids = await Bid.findAll({
      where: {
        status: "create",
        author_id: {
          [Op.ne]: userId,
        },
      },
      raw: true,
    });
    return bids;
  }

  async getLikes() {
    const likes = await Like.findAll({ raw: true });
    return likes;
  }

  async findLike(user_id, bid_id) {
    const like = Like.findOne({
      where: { user_id: Number(user_id), bids_id: bid_id },
    });
    return like;
  }

  async createLike(user_id, bid_id) {
    const newLike = await Like.create({ user_id, bids_id: bid_id });
    return newLike;
  }

  async unlike(user_id, bids_id) {
    await Like.destroy({ where: { user_id: Number(user_id), bids_id } });
  }
}
module.exports = new BidService();
