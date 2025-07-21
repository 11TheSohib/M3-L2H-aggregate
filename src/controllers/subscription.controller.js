import { PUDcontroller } from "../helpers/PUD.helper.js";
import { errorHelper } from "../helpers/send_error.helper.js";
import Sbc from "../models/subscriptions.model.js";

class SbcController extends PUDcontroller {
  constructor() {
    super(Sbc, `Subscription`);
    this.create = this.create.bind(this);
    this.getAll = this.getAll.bind(this);
    this.getById = this.getById.bind(this);
    this.update = this.update.bind(this);
    this.delete = this.delete.bind(this);
  }
}

const sbc = new SbcController(Sbc, `Subscription`);
export default sbc;
