import mongoose from "mongoose";

const sessionSchema = mongoose.Schema(
  {
    sessionId: {
      type: String,
      required: true,
      trim: true,
    },
    sessionData: {
      type: String,
      required: true,
      trim: true,
    },
    shop: {
      type: String,
      trim: true,
    },
    accessToken: {
      type: String,
      trim: true,
    },
  },
  { timestamps: true }
);

const Session = mongoose.model("Session", sessionSchema);

export default Session;
