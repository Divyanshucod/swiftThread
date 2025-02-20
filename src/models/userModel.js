import mongoose from "mongoose";


const userSchema = new mongoose.Schema({
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password:{
      type: String,  // Store the hashed password for manual sign-up
    },
    firstName: {
      type: String,
    },
    lastName: {
      type: String,
    },
    profilePicture: {
      type: String, // URL to profile picture (optional)
    },
    providerId: {
      type: String, // allow multiple null values
    },
    provider: {
      type: String, // Store the auth provider (e.g., 'google')
      enum: ['google', 'manual'], // This helps differentiate between manual and OAuth logins
      required: true,  // This field is essential to know which login method was used
    },
    cartProducts:[{
      type: mongoose.Schema.Types.ObjectId, 
        ref: "products" 
    }],
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
  });

  const User =mongoose.models.users || mongoose.model('users',userSchema)

  export default User;
  