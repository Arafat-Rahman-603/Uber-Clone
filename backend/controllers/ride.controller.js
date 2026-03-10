import { createRide } from "../services/ride.service.js";

export const createRideController = async (req, res) => {
  try {
    const {
      pickupLocation,
      dropoffLocation,
      vehicleType,
      paymentId,
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
      paymentId,
      orderId,
      signature,
      pickupLocation,
      dropoffLocation,
      vehicleType,
    };

    const result = await createRide(rideData);

    return res.status(201).json(result);
  } catch (error) {
    return res.status(500).json({ message: "Failed to create ride" });
  }
};
