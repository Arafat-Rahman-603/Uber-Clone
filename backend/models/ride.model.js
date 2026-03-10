import mongoose from 'mongoose';

const rideSchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true,
    },
    rider:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Rider',
        required:true,
    },
    pickupLocation:{
        type:String,
        required:true,
    },
    dropoffLocation:{
        type:String,
        required:true,
    },
    distance:{
        type:Number,
        required:true,
    },
    duration:{
        type:Number,
        required:true,
    },
    price:{
        type:Number,
        required:true,
    },
    paymentId:{
        type:String,
        required:true,
    },
    orderId:{
        type:String,
        required:true,
    },
    signature:{
        type:String,
        required:true,
    },
    status:{
        type:String,
        enum:['pending','accepted','ongoing','completed','cancelled'],
        default:'pending',
    },
  
});

const Ride = mongoose.model('Ride',rideSchema);

export default Ride;