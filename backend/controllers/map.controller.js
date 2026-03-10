import { gateAddressCordinate, getDistanceTime, searchPlaces } from "../services/map.service.js";

export const getDistanceTimeController = async (req, res) => {

  const { origin, destination } = req.query;

  if (!origin || !destination) {
    return res.status(400).json({
      message: "Origin and destination are required"
    });
  }

  try {

    const originCoords = await gateAddressCordinate(origin);
    const destinationCoords = await gateAddressCordinate(destination);

    const distanceData = await getDistanceTime(originCoords, destinationCoords);

    res.status(200).json(distanceData);

  } catch (error) {

    res.status(500).json({
      message: "Failed to calculate distance"
    });

  }
};

export const searchLocationController = async (req, res) => {

  const { input } = req.query;

  if (!input) {
    return res.status(400).json({
      message: "Search input required"
    });
  }

  try {

    const results = await searchPlaces(input);

    res.status(200).json(results);

  } catch (error) {

    res.status(500).json({
      message: "Location search failed"
    });

  }

};