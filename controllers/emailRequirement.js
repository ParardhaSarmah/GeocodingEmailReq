const axios = require("axios");
const dotenv = require("dotenv").config();
const getPrice = require("./../utils/getPrice");
const checkConditions = require("./../utils/checkConditions");
const api_key = process.env.RADAR_API_KEY;
exports.emailRequirement = async (req, res) => {
  try {
    //Missing request body info
    if (!(req.body.to && req.body.from && req.body.Vehicle_type)) {
      throw "Invalid Request Body";
    }
    const url1 =
      "https://api.radar.io/v1/geocode/forward" +
      encodeURI(`?query=${req.body.from}`);
    const url2 =
      "https://api.radar.io/v1/geocode/forward" +
      encodeURI(`?query=${req.body.to}`);
    //Getting data from Radar API
    let from = await axios.get(url1, {
      headers: { Authorization: `${api_key}` },
    });
    let to = await axios.get(url2, {
      headers: { Authorization: `${api_key}` },
    });
    console.log(from.data.addresses);
    console.log(to.data.addresses);
    //Objects to pass to helper functions
    let fromCoordinates = {
      latitude: from.data.addresses[0].latitude,
      longitude: from.data.addresses[0].longitude,
      city: from.data.addresses[0].city,
    };
    let toCoordinates = {
      latitude: to.data.addresses[0].latitude,
      longitude: to.data.addresses[0].longitude,
      city: to.data.addresses[0].city,
    };
    console.log(fromCoordinates, toCoordinates);
    //Request to get distance between 2 points by coordinates
    const dist_url =
      "https://api.radar.io/v1/route/distance" +
      encodeURI(
        `?origin=${fromCoordinates.latitude},${fromCoordinates.longitude}&destination=${toCoordinates.latitude},${toCoordinates.longitude}&modes=car&units=metric`
      );
    console.log(dist_url);
    let distance = await axios.get(dist_url, {
      headers: { Authorization: `${api_key}` },
    });
    console.log(distance.data.routes.car.distance.value);
    distance_metres = distance.data.routes.car.distance.value;
    console.log(distance_metres / 1000);
    //Check if
    if (distance_metres / 1000 > 1000) {
      res.status(200).json({
        status: "Too far to offer ride",
      });
    } else {
      //Getting price
      let price = await getPrice(
        fromCoordinates,
        toCoordinates,
        distance_metres,
        req.body.Vehicle_type
      );
      console.log(price);
      //Checking conditions
      let conditionResult = await checkConditions(
        distance_metres,
        price,
        toCoordinates
      );
      console.log(conditionResult);
      //Sending response
      res.send(Boolean(conditionResult));
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({
      status: "Bad Request",
      reason: error,
    });
  }
};
