/**
 * Check if two users prefer each other by their age preference.
 *
 * Two users must have set their age preference and their age
 *
 * @param {Object} user a user with age preference
 * @param {Object} partner another user with age preference
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
    user.preference.minAge > partnerBirthday ||
    user.preference.maxAge < partnerBirthday
  ) {
    return false;
  }

  if (
    partner.preference.minAge > userBirthday ||
    partner.preference.maxAge < userBirthday
  ) {
    return false;
  }

  return true;
}

function calculateAge(birthday) {
  const userDOB = new Date(birthday);
  const today = new Date();

  let age = today.getFullYear() - userDOB.getFullYear();
  const month = today.getMonth() - userDOB.getMonth();

  if (month < 0 || (month === 0 && today.getDate() < userDOB.getDate())) {
    age--;
  }
  return age;
}

module.exports = {
  isCompatibleByAge,
  calculateAge,
};
