const profileService = require("../service/profile-service");

class ProfileController {
  async getSourceBids(req, res, next) {
    const { userId, status } = req.query;
    try {
      const sourceBids = await profileService.getSourceBids(userId, status);
      res.json(sourceBids);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new ProfileController();
