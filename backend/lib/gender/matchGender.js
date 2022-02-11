/**
 * Check if two users prefer each other by their gender preference.
 *
 * Two users must have set their gender preference and their gender
 *
 * @param {Object} user a user with gender preference
 * @param {Object} partner another user with gender preference
 * @returns {Boolean}
 */

const MatchGenderEnum = require("../../src/enum/MatchGender");

function isCompatibleByGenderPreference(user, partner) {
  //checks if user gender is set
  console.log("user:" + user.sex + " partner: " + partner.sex);
  if (!Object.values(MatchGenderEnum).includes(user.sex)) {
    throw new Error("User's sex not found");
  }
  if (!Object.values(MatchGenderEnum).includes(partner.sex)) {
    throw new Error("Partner's sex not found");
  }
  //checks if user gender preference is set
  if (!Object.values(MatchGenderEnum).includes(user.preference.gender)) {
    throw new Error("User's gender preference not found");
  }

  if (!Object.values(MatchGenderEnum).includes(partner.preference.gender)) {
    throw new Error("Partner's gender preference not found");
  }

  const prefEveryone = [MatchGenderEnum.MALE, MatchGenderEnum.FEMALE];
  let userPrefGender = [];
  let partPrefGender = [];

  if (user.preference.gender === MatchGenderEnum.EVERYONE) {
    userPrefGender = prefEveryone.slice();
  } else {
    userPrefGender[0] = user.preference.gender;
  }
  if (partner.preference.gender === MatchGenderEnum.EVERYONE) {
    partPrefGender = prefEveryone.slice();
  } else {
    partPrefGender[0] = partner.preference.gender;
  }

  //best way to handle this is to use Exclusion method.
  //this only checks if user sex is not in the list of partner gender preference and vice versa.

  //user pref gender list must include partner sex
  if (userPrefGender.indexOf(partner.sex) < 0) {
    return false;
  }
  //user sex must be in the list of partner pref gender
  if (partPrefGender.indexOf(user.sex) < 0) {
    return false;
  }
  return true;
}

module.exports = {
  isCompatibleByGenderPreference,
};
