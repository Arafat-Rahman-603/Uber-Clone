import { createRide } from "../services/ride.service.js";
import { getNearbyRiders,gateAddressCordinate } from "../services/map.service.js";
import { sendMessageToSocketId } from "../socket.js";
import riderModel from "../models/rider.model.js";

export const createRideController = async (req, res) => {
  try {
    const {
      pickupLocation,
      dropoffLocation,
      vehicleType,
      orderId,
      signature,
    } = req.body;

    if (!pickupLocation || !dropoffLocation) {
      return res
        .status(400)
        .json({ message: "pickupLocation and dropoffLocation are required" });
    }

    const rideData = {
      ...req.body,
      userId: req.user ? req.user._id : req.body.userId,
      
      orderId,
      signature,
      pickupLocation,
      dropoffLocation,
      vehicleType,
    };

    console.log(rideData);

    const result = await createRide(rideData);

    const pickUpCordinate = await gateAddressCordinate(pickupLocation);

    const riderInRadius = await getNearbyRiders(pickUpCordinate.lat, pickUpCordinate.lng, 5000);

    // ride.otp = "";
    console.log("ride",result.ride._id);
    const rideWithUser = await riderModel.findById({ _id:result.ride._id }).populate("User");
    console.log("rideWithUser",rideWithUser);
    riderInRadius.map((rider)=>{
      sendMessageToSocketId(rider.soketId, {
        event: "ride-request",
        data: rideWithUser
      })
  })
        
    return res.status(201).json(result);

  } catch (error) {
    console.error("Error creating ride:", error);
    if (!res.headersSent) {
      return res.status(500).json({ message: "Failed to create ride" });
    }
  }
}; 