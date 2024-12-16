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
}
module.exports = new BidService();
