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

  async like(req, res, next) {
    const { user_id, bid_id } = req.body;
    try {
      const prevLike = await bidService.findLike(user_id, bid_id);
      if (prevLike) {
        return res.status(409).json({ message: "Like already exists!" });
      } else {
        const newLike = await bidService.createLike(user_id, bid_id);
        return res.status(201).json(newLike);
      }
    } catch (error) {
      next(error);
    }
  }

  async unlike(req, res, next) {
    const { user_id, bid_id, bids_id } = req.body;
    try {
      const prevLike = await bidService.findLike(user_id, bids_id);
      if (prevLike) {
        const unlike = await bidService.unlike(user_id, bids_id);
        if (unlike) {
          	res.status(204).json({ user_id, bids_id });
        }
      } else {
        return res.status(404).json({ message: "Like not found!" });
      }
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new BidController();
