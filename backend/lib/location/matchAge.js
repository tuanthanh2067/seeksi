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

function isCompatibleByAge(user, partner) {
  if (!user.dob) {
    throw new Error("User's birthday not found");
  }

  if (!partner.dob) {
    throw new Error("Partner's birthday not found");
  }

  const userBirthday = calculateAge(user.dob);
  const partnerBirthday = calculateAge(partner.dob);

  if (!user.preference) {
    throw new Error("User's preference is not set");
  }

  if (!partner.preference) {
    throw new Error("Partner's preference is not set");
  }

  if (
    user.preference.minAge >= partnerBirthday ||
    user.preference.maxAge <= partnerBirthday
  ) {
    return false;
  }

  if (
    partner.preference.minAge >= userBirthday ||
    partner.preference.maxAge <= userBirthday
  ) {
    return false;
  }

  return true;
}

function calculateAge(birthday) {
  const userDOB = new Date(birthday);
  const diff = Date.now() - userDOB.getTime();
  const age = new Date(diff);

  return Math.abs(age.getUTCFullYear() - 1970);
}

module.exports = {
  isCompatibleByAge,
};
