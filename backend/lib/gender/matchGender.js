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

  const prefEveryone = ["male", "female"];
  const userPrefGender = [];
  const partPrefGender = [];

  if (user.preference.gender === "everyone") {
    userPrefGender = prefEveryone.slice();
  } else {
    userPrefGender[0] = user.preference.gender;
  }
  if (partner.preference.gender === "everyone") {
    partPrefGender = prefEveryone.slice();
  } else {
    partPrefGender[0] = partner.preference.gender;
  }

  //best way to handle this is to use Exclusion method.
  //this only checks if user sex is not in the list of partner gender preference and vice versa.

  //user pref gender must match partner sex
  if (userPrefGender.indexOf(partner.sex) < 0) {
    return false;
  }
  //user sex must match partner pref gender
  if (partPrefGender.indexOf(user.sex) < 0) {
    return false;
  }
  return true;
}

module.exports = {
  isCompatibleByGenderPreference,
};
