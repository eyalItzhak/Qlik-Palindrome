import mongoose from "mongoose";

export interface MessageDoc extends mongoose.Document {
  userId: mongoose.Types.ObjectId;
  content: string;
  isPalindrome : boolean
}

const messageSchema = new mongoose.Schema(
  {
    userId:{ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    content: {
      type: String,
      required: true,
    },
    isPalindrome: {  type: Boolean, required: true },
  },
  {
    timestamps: true,
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
      },
    },
  }
);
// Add middleware to automatically convert `id` to `_id` for queries
messageSchema.pre(["find", "findOne", "deleteOne", "updateOne" ,"countDocuments"], function (next) {
  const query = this.getQuery();
  if (query.id) {
    query._id = query.id;
    delete query.id; 
  }
  next();
});

// The model is defined directly without the UserAttrs interface
const Message = mongoose.model<MessageDoc>("Message", messageSchema);

export { Message };
