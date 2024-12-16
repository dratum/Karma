const bidService = require("../service/bid-service");

class BidController {
  async getAllBids(req, res, next) {
    try {
      const { userId } = req.query;
      const bids = await bidService.getSourceBids(userId);
      res.status(200).json(bids);
    } catch (error) {
      next(error);
    }
  }

  async getAllLikes(req, res, next) {
    try {
      const likes = await bidService.getLikes();
      res.status(200).json(likes);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new BidController();
