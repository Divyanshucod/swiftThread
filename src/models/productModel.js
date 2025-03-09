import mongoose from "mongoose";


const productSchema = new mongoose.Schema({
    title: {
      type: String,
      required: true,
      unique: true,
    },
    price: {
      type: String, 
      required: true, // Store the hashed password for manual sign-up
    },
    description: {
      type: String,
      required: false,
    },
    sizes: {
      type: [String],
      required: false,
    },
    gender: {
      type: String, 
    },
    material: {
      type: String, // ID provided by the auth provider (e.g., Google user ID)  
    },
    productImages:{
            type: [String], // ID provided by the auth provider (e.g., Google user ID)
    },
    discountedPrice:{
      type:String
    },
    category:{
      type:String
    },
    embedding:{
      type: [Number]
    },
    starDistribution:{
        fiveStar:{type:Number},
        oneStar:{type:Number},
        twoStar:{type:Number},
        threeStar:{type:Number},
        fourStar:{type:Number}
    },
    comments:[
      {
        name:{type:String,required:true},
        profileImage:{type:String},
        comment:{type:String},
        rating:{type:Number}
      }
    ],
    brand:{
      type:String
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
  });

  const Product =mongoose.models.products || mongoose.model('products',productSchema)

  export default Product;
  