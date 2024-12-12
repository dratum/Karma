const bidService = require("../service/bid-service");

class BidController {
  async getAllBids(req, res, next) {
    try {
      const { userId } = req.query;
      const bids = await bidService.getAllBids(userId);
      res.status(200).json(bids);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new BidController();
