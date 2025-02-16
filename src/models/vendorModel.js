import mongoose from "mongoose";


const vendorSchema = new mongoose.Schema({
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
    createdProducts: [{ 
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

  const Vendor =mongoose.models.vendors || mongoose.model('vendors',vendorSchema)

  export default Vendor;
  