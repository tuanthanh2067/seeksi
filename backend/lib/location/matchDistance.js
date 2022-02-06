const { distanceTo } = require("geolocation-utils");

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
  if (!user.location?.longitude || !user.location?.latitude) {
    throw new Error("User's geolocation not found.");
  }
  if (!partner.location?.longitude || !partner.location?.latitude) {
    throw new Error("Partner's geolocation not found.");
  }

  const userDistancePref = user.preference?.distance || Number.MAX_SAFE_INTEGER;
  const partnerDistancePref =
    partner.preference?.distance || Number.MAX_SAFE_INTEGER;
  const distance = Math.ceil(
    distanceTo(
      { lat: user.location.latitude, lon: user.location.longitude },
      { lat: partner.location.latitude, lon: partner.location.longitude }
    ) / 1000
  );

  const roundToNearestTen = (number) => Math.ceil(number / 10) * 10;

  return (
    roundToNearestTen(userDistancePref) >= roundToNearestTen(distance) &&
    roundToNearestTen(partnerDistancePref) >= roundToNearestTen(distance)
  );
}

module.exports = {
  isCompatibleByDistance,
};
