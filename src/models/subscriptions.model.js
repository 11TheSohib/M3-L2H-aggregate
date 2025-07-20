import { Schema, model } from "mongoose";

const subscriptionSchema = new Schema(
  {
    isActive: {
      type: Boolean,
      default: true,
    },
    follower_id: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    followee_id: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const Subscription = model(`Subscription`, subscriptionSchema);

export default Subscription;
