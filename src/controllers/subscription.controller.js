import { PUDcontroller } from "../helpers/PUD.helper.js";
import { errorHelper } from "../helpers/send_error.helper.js";
import Sbc from "../models/subscriptions.model.js";

class SbcController extends PUDcontroller {
  constructor() {
    super(Sbc, `Subscription`);
  }
}

const sbc = new SbcController(Sbc, `Subscription`);
export default sbc;
