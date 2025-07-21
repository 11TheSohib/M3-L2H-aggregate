import { PUDcontroller } from "../helpers/PUD.helper.js";
import { errorHelper } from "../helpers/send_error.helper.js";
import Comment from "../models/commet.model.js";

class CommentController extends PUDcontroller {
  constructor() {
    super(Comment, `Comment`);
    this.create = this.create.bind(this);
    this.getAll = this.getAll.bind(this);
    this.getById = this.getById.bind(this);
    this.update = this.update.bind(this);
    this.delete = this.delete.bind(this);
  }
}

const commet = new CommentController();
export default commet;
