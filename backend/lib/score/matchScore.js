const MatchStatus = require("../../src/enum/MatchStatus");

const STATUS_SCORE = 100;

/**
 * Get the number of shared hobbies between user and partner.
 * 
 * `user` and `partner` must have a list of hobbies stored
 * in their `hobbies` attribute.
 * 
 * @param {Object} user a user with hobbies
 * @param {Object} partner another user with hobbies
 * @returns {Number} the number of shared hobbies
 */
function countCommonHobbies(user, partner) {
  if (!user.hobbies || !Array.isArray(user.hobbies)) {
    throw new Error("User's hobbies not found.");
  }
  if (!partner.hobbies || !Array.isArray(partner.hobbies)) {
    throw new Error("Partner's hobbies not found.");
  }

  const userHobbies = user.hobbies
    .filter((hobby) => typeof hobby === "string")
    .map((hobby) => hobby.trim().toLowerCase());

  const partnerHobbies = partner.hobbies
    .filter((hobby) => typeof hobby === "string")
    .map((hobby) => hobby.trim().toLowerCase());

  const commonHobbies = userHobbies.filter((hobby) =>
    partnerHobbies.includes(hobby)
  );

  return commonHobbies.length;
}

/**
 * Get the match score based on the potential partner's match status.
 * 
 * @param {String} status the match status of a potential partner
 * @returns {Number} the score calculated based on the status
 */
function calculateStatusScore(status) {
  return status === MatchStatus.LIKED ? STATUS_SCORE : 0;
}

/**
 * Get the compatibility score of a pair of users.
 * 
 * Current attributes of `options` are:
 * - `user`: an instance of `User` model
 * - `partner`: an instance of `User` model
 * - `partnerStatus`: the match `status` of the partner in this pair
 * 
 * @param {Object} options the elements to be considered for match score
 * @returns {Number} the compatibility score of a pair
 */
function calculateMatchScore(options) {
  const { user, partner, partnerStatus } = options;

  return (
    countCommonHobbies(user, partner) + calculateStatusScore(partnerStatus)
  );
}

module.exports = {
  calculateMatchScore,
  calculateStatusScore,
  countCommonHobbies
};
