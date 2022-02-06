const MatchStatus = require("../../../src/enum/MatchStatus");
const { calculateMatchScore, calculateStatusScore, countCommonHobbies } = require("../matchScore");

describe("count common hobbies test block", () => {
  test("should count common hobbies accurately", () => {
    const user = {
      hobbies: [
        "Ice skating",
        "Proofreading and editing",
        "Palmistry",
        "Engraving",
        "Baking",
        "Woodworking",
      ]
    };
    const partner = {
      hobbies: [
        "Digital arts",
        "Giving advice",
        "Upcycling",
        "Puzzles",
        "Engraving",
        "Gaming",
        "Baking",
        "Writing",
      ]
    };

    expect(countCommonHobbies(user, partner)).toBe(2);
  });

  test("should throw error when user doesn't have hobbies", () => {
    const user = {};
    const partner = {
      hobbies: [
        "Digital arts",
        "Giving advice",
        "Upcycling",
        "Puzzles",
        "Engraving",
        "Gaming",
        "Baking",
        "Writing",
      ]
    };

    expect(() => {
      countCommonHobbies(user, partner);
    }).toThrow(/hobbies not found/);
  });

  test("should throw error when partner doesn't have hobbies", () => {
    const user = {
      hobbies: [
        "Digital arts",
        "Giving advice",
        "Upcycling",
        "Puzzles",
        "Engraving",
        "Gaming",
        "Baking",
        "Writing",
      ]
    };
    const partner = {};

    expect(() => {
      countCommonHobbies(user, partner);
    }).toThrow(/hobbies not found/);
  });
});

describe("calculate status score test block", () => {
  test("should return 100 when status is LIKED", () => {
    expect(calculateStatusScore(MatchStatus.LIKED)).toBe(100);
  });

  test("should return 0 when status is PENDING or REJECTED", () => {
    expect(calculateStatusScore(MatchStatus.PENDING)).toBe(0);
    expect(calculateStatusScore(MatchStatus.REJECTED)).toBe(0);
  });
});

describe("calculate match score", () => {
  test("should return 102 when status is LIKED & common hobbies count is 2", () => {
    const user = {
      hobbies: [
        "Ice skating",
        "Proofreading and editing",
        "Palmistry",
        "Engraving",
        "Baking",
        "Woodworking",
      ]
    };
    const partner = {
      hobbies: [
        "Digital arts",
        "Giving advice",
        "Upcycling",
        "Puzzles",
        "Engraving",
        "Gaming",
        "Baking",
        "Writing",
      ]
    };
    const partnerStatus = MatchStatus.LIKED;

    expect(calculateMatchScore({ user, partner, partnerStatus })).toBe(102);
  });

  test("should return 2 when status is PENDING & common hobbies count is 2", () => {
    const user = {
      hobbies: [
        "Ice skating",
        "Proofreading and editing",
        "Palmistry",
        "Engraving",
        "Baking",
        "Woodworking",
      ]
    };
    const partner = {
      hobbies: [
        "Digital arts",
        "Giving advice",
        "Upcycling",
        "Puzzles",
        "Engraving",
        "Gaming",
        "Baking",
        "Writing",
      ]
    };
    const partnerStatus = MatchStatus.PENDING;

    expect(calculateMatchScore({ user, partner, partnerStatus })).toBe(2);
  });
});
