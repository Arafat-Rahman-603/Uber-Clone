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
        type:Object,
        required:true,
    },
    paymentId:{
        type:String,
    },
    orderId:{
        type:String,
    },
    signature:{
        type:String,
    },
    status:{
        type:String,
        enum:['pending','accepted','ongoing','completed','cancelled'],
        default:'pending',
    },
    otp:{
        type:String,
        select:false,
    },
  
});

const Ride = mongoose.model('Ride',rideSchema);

export default Ride;