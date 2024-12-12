const { Bid } = require("../db/models");

class ProfileService {
  async getSourceBids(userId, status) {
    const bids = await Bid.findAll({
      where: { author_id: userId, status },
      raw: true,
    });
    return bids;
  }
}

module.exports = new ProfileService();
