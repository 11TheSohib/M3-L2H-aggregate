import { PUDcontroller } from "../helpers/PUD.helper.js";
import { errorHelper } from "../helpers/send_error.helper.js";
import Comment from "../models/commet.model.js";

class CommentController extends PUDcontroller {
  constructor() {
    super(Comment, `Comment`);
  }
}

const commet = new CommentController();
export default commet;
