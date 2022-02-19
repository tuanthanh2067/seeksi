const { distanceTo } = require("geolocation-utils");

/**
 * Calculate the distance between two users.
 *
 * Two users must have `latitude` & `longitude` in their `location`
 * attribute.
 *
 * @param {Object} user a user with coordinates for their location
 * @param {Object} partner another user with coordinates for their location
 * @returns {Number} the distance in kilometers
 */
function calculateDistance(user, partner) {
  if (!user.location?.longitude || !user.location?.latitude) {
    throw new Error("User's geolocation not found.");
  }
  if (!partner.location?.longitude || !partner.location?.latitude) {
    throw new Error("Partner's geolocation not found.");
  }

  return Math.ceil(
    distanceTo(
      { lat: user.location.latitude, lon: user.location.longitude },
      { lat: partner.location.latitude, lon: partner.location.longitude }
    ) / 1000
  );
}

/**
 * Check if two users prefer each other by their distance preference.
 *
 * Two users must have `latitude` & `longitude` in their `location`
 * attribute.
 *
 * @param {Object} user a user with distance preference
 * @param {Object} partner another user with distance preference
 * @returns {Boolean}
 */
function isCompatibleByDistance(user, partner) {
  const distance = calculateDistance(user, partner);

  const userDistancePref = user.preference?.distance || Number.MAX_SAFE_INTEGER;
  const partnerDistancePref =
    partner.preference?.distance || Number.MAX_SAFE_INTEGER;

  const roundToNearestTen = (number) => Math.ceil(number / 10) * 10;

  return (
    roundToNearestTen(userDistancePref) >= roundToNearestTen(distance) &&
    roundToNearestTen(partnerDistancePref) >= roundToNearestTen(distance)
  );
}

module.exports = {
  calculateDistance,
  isCompatibleByDistance,
};
