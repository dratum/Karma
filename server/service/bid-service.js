const { Bid } = require("../db/models");
const { Op } = require("sequelize");

class BidService {
  async getAllBids(userId) {
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
}
module.exports = new BidService();
