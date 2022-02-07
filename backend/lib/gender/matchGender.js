/**
 * Check if two users prefer each other by their gender preference.
 *
 * Two users must have set their gender preference and their gender
 *
 * @param {Object} user a user with gender preference
 * @param {Object} partner another user with gender preference
 * @returns {Boolean}
 */

function isCompatibleByGenderPreference(user, partner) {
  //checks if user gender is set
  if (!user.sex) {
    throw new Error("User's gender not found");
  }
  if (!partner.sex) {
    throw new Error("Partner's gender not found");
  }
  //checks if user gender preference is set
  if (!user.preference.gender) {
    throw new Error("User's gender preference not found");
  }

  if (!partner.preference.gender) {
    throw new Error("Partner's gender preference not found");
  }
  //user pref gender must match partner sex
  if (user.preference.gender !== partner.sex) {
    return false;
  }
  //user sex must match partner pref gender
  if (user.sex !== partner.preference.gender) {
    return false;
  }
  return true;
}

module.exports = {
  isCompatibleByGenderPreference,
};
