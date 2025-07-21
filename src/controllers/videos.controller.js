import { PUDcontroller } from "../helpers/PUD.helper.js";
import { errorHelper } from "../helpers/send_error.helper.js";
import Video from "../models/video.model.js";

class VideoController extends PUDcontroller {
  constructor() {
    super(Video, `Video`);
    this.create = this.create.bind(this);
    this.getAll = this.getAll.bind(this);
    this.getById = this.getById.bind(this);
    this.update = this.update.bind(this);
    this.delete = this.delete.bind(this);
    this.getPopularCategories = this.getPopularCategories.bind(this);
    this.getUserVideoStats = this.getUserVideoStats.bind(this);
  }

  async getUserVideoStats(req, res) {
    try {
      const data = await Video.aggregate([
        {
          $lookup: {
            from: "comments",
            localField: "_id",
            foreignField: "video_id",
            as: "comments",
          },
        },
        {
          $lookup: {
            from: "users",
            localField: "uploader_id",
            foreignField: "_id",
            as: "user",
          },
        },
        { $unwind: "$user" },
        {
          $group: {
            _id: "$uploader_id",
            username: { $first: "$user.username" },
            avgLikes: { $avg: "$likes" },
            avgComments: { $avg: { $size: "$comments" } },
            totalVideos: { $sum: 1 },
          },
        },
        {
          $project: {
            username: 1,
            avgLikes: { $round: ["$avgLikes", 1] },
            avgComments: { $round: ["$avgComments", 1] },
            totalVideos: 1,
          },
        },
        { $sort: { avgLikes: -1 } },
      ]);

      return res.status(200).json({
        statusCode: 200,
        message: "success",
        data: data,
      });
    } catch (error) {
      return errorHelper(error, res, 500);
    }
  }

  async getPopularCategories(req, res) {
    try {
      const data = await Video.aggregate([
        {
          $group: {
            _id: "$category",
            totalVideos: { $sum: 1 },
            totalViews: { $sum: "$views" },
            totalLikes: { $sum: "$likes" },
            avgViews: { $avg: "$views" },
          },
        },
        {
          $project: {
            category: "$_id",
            totalVideos: 1,
            totalViews: 1,
            totalLikes: 1,
            avgViews: { $round: ["$avgViews", 0] },
          },
        },
        { $sort: { totalViews: -1 } },
      ]);

      return res.status(200).json({
        statusCode: 200,
        message: "success",
        data: data,
      });
    } catch (error) {
      return errorHelper(error, res, 500);
    }
  }
}

const video = new VideoController(Video, `Video`);
export default video;
