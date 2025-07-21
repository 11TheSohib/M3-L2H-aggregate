import { PUDcontroller } from "../helpers/PUD.helper.js";
import { errorHelper } from "../helpers/send_error.helper.js";
import User from "../models/user.model.js";

class UserController extends PUDcontroller {
  constructor() {
    super(User, `User`);
    this.create = this.create.bind(this);
    this.getAll = this.getAll.bind(this);
    this.getById = this.getById.bind(this);
    this.update = this.update.bind(this);
    this.delete = this.delete.bind(this);
    this.getTopBloggers = this.getTopBloggers.bind(this);
  }

  async getTopBloggers(req, res) {
    try {
      const data = await User.aggregate([
        {
          $lookup: {
            from: "subscriptions",
            localField: "_id",
            foreignField: "followee_id",
            as: "subs",
          },
        },
        {
          $project: {
            username: 1,
            subscribersCount: {
              $size: {
                $filter: {
                  input: "$subs",
                  cond: { $eq: ["$$this.isActive", true] },
                },
              },
            },
          },
        },
        { $sort: { subscribersCount: -1 } },
        { $limit: 10 },
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

const user = new UserController();
export default user;
