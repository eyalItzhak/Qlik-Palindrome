import mongoose from "mongoose";

// Interface that describes the properties that a User Document has
export enum Permissions {
  ADMIN = "ADMIN",
  USER  = "USER",
 }

export interface UserDoc extends mongoose.Document {
  email: string;
  password: string;
  permission : Permissions
}

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    permission: {  type: String, enum: Object.values(Permissions) , required: true, default: Permissions.USER },
  },
  {
   timestamps: true,
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.password;  // Retain this for privacy
        delete ret.__v;
      },
    },
  }
);
// Add middleware to automatically convert `id` to `_id` for queries
userSchema.pre(["find" ,"findOne" ,"findOneAndDelete"], function (next) {
  if (this.getQuery().id) {
    this.setQuery({ _id: this.getQuery().id });
    delete this.getQuery().id;  // Remove the `id` field after converting to `_id`
  }
  next();
});


userSchema.index({ email: 1 }, { unique: true }); 
userSchema.index({ permission: 1 }); 


// The model is defined directly without the UserAttrs interface
const User = mongoose.model<UserDoc>("User", userSchema);

export { User };
