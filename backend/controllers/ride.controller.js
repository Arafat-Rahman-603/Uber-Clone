import { createRide } from "../services/ride.service.js";
import {
  getNearbyRiders,
  gateAddressCordinate,
} from "../services/map.service.js";
import { sendMessageToSocketId } from "../socket.js";
import Ride from "../models/ride.model.js";

export const createRideController = async (req, res) => {
  try {
    const { pickupLocation, dropoffLocation, vehicleType, orderId, signature } =
      req.body;

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

    // Find nearby riders and determine which vehicle types are available
    const pickUpCordinate = await gateAddressCordinate(pickupLocation);

    const riderInRadius = await getNearbyRiders(
      pickUpCordinate.lat,
      pickUpCordinate.lng,
      5000,
    );

    // Build availability map based on nearby riders' vehicle types
    const availableVehicles = {
      car: false,
      bike: false,
      auto: false,
    };

    riderInRadius.forEach((rider) => {
      const type = rider.vehicle?.vehicleType;
      if (type === "car") availableVehicles.car = true;
      if (type === "bike") availableVehicles.bike = true;
      if (type === "scooter" || type === "auto") availableVehicles.auto = true;
    });

    console.log("availableVehicles", availableVehicles);

    // Do NOT emit ride-request here — wait for user to confirm
    return res.status(201).json({ ...result, availableVehicles });
  } catch (error) {
    console.error("Error creating ride:", error);
    if (!res.headersSent) {
      return res.status(500).json({ message: "Failed to create ride" });
    }
  }
};

export const confirmRideController = async (req, res) => {
  try {
    const { rideId, vehicleType } = req.body;

    if (!rideId || !vehicleType) {
      return res
        .status(400)
        .json({ message: "rideId and vehicleType are required" });
    }

    // Update the ride with the confirmed vehicle type and selected price
    const ride = await Ride.findById(rideId);
    if (!ride) {
      return res.status(404).json({ message: "Ride not found" });
    }

    // Update selected price based on confirmed vehicle type
    const selectedPrice =
      vehicleType === "auto"
        ? ride.price.auto
        : vehicleType === "bike"
          ? ride.price.bike
          : ride.price.car;

    ride.vehicleType = vehicleType;
    ride.price.selected = selectedPrice;
    ride.status = "confirmed";
    await ride.save();

    // Re-fetch ride with populated user data
    const rideWithUser = await Ride.findById(rideId).populate("user");

    // Find nearby riders with matching vehicle type
    const pickUpCordinate = await gateAddressCordinate(ride.pickupLocation);

    const riderInRadius = await getNearbyRiders(
      pickUpCordinate.lat,
      pickUpCordinate.lng,
      5000,
    );

    // Map frontend vehicle types to rider model vehicle types
    const matchTypes =
      vehicleType === "auto" ? ["scooter", "auto"] : [vehicleType];

    // Emit ride-request only to riders with matching vehicle type
    let notifiedCount = 0;
    riderInRadius.forEach((rider) => {
      const riderType = rider.vehicle?.vehicleType;
      if (rider.soketId && matchTypes.includes(riderType)) {
        sendMessageToSocketId(rider.soketId, {
          event: "ride-request",
          data: rideWithUser,
        });
        notifiedCount++;
      }
    });

    console.log(`Ride confirmed. Notified ${notifiedCount} riders.`);

    return res
      .status(200)
      .json({ message: "Ride confirmed", notifiedRiders: notifiedCount });
  } catch (error) {
    console.error("Error confirming ride:", error);
    if (!res.headersSent) {
      return res.status(500).json({ message: "Failed to confirm ride" });
    }
  }
};
