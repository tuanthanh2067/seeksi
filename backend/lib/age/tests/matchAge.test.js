const { isCompatibleByAge, calculateAge } = require("../matchAge");

describe("match age test block", () => {
  test("calculate function", () => {
    const birthday = Date.now();
    const age = calculateAge(birthday);
    expect(age).toEqual(0);
  });

  test("two users compatible by age", () => {
    const userBirthYear = new Date().getFullYear() - 22;
    const partnerBirthYear = new Date().getFullYear() - 24;

    user = {
      dob: `${userBirthYear}-03-05T23:09:16Z`,
      preference: {
        minAge: 21,
        maxAge: 25,
      },
    };

    partner = {
      dob: `${partnerBirthYear}-03-05T23:09:16Z`,
      preference: {
        minAge: 21,
        maxAge: 24,
      },
    };

    expect(isCompatibleByAge(user, partner)).toBe(true);
  });

  test("one user has greater age compared to partner's preference", () => {
    const userBirthYear = new Date().getFullYear() - 22;
    const partnerBirthYear = new Date().getFullYear() - 24;

    user = {
      dob: `${userBirthYear}-03-05T23:09:16Z`,
      preference: {
        minAge: 18,
        maxAge: 22,
      },
    };

    partner = {
      dob: `${partnerBirthYear}-03-05T23:09:16Z`,
      preference: {
        minAge: 18,
        maxAge: 24,
      },
    };

    expect(isCompatibleByAge(user, partner)).toBe(false);
  });

  test("two users don't have the same preference", () => {
    const userBirthYear = new Date().getFullYear() - 22;
    const partnerBirthYear = new Date().getFullYear() - 24;

    user = {
      dob: `${userBirthYear}-03-05T23:09:16Z`,
      preference: {
        minAge: 30,
        maxAge: 40,
      },
    };

    partner = {
      dob: `${partnerBirthYear}-03-05T23:09:16Z`,
      preference: {
        minAge: 50,
        maxAge: 60,
      },
    };

    expect(isCompatibleByAge(user, partner)).toBe(false);
  });

  test("user's dob not found", () => {
    user = {
      dob: "",
      preference: {
        minAge: 30,
        maxAge: 40,
      },
    };

    partner = {
      dob: "",
      preference: {
        minAge: 30,
        maxAge: 40,
      },
    };

    expect(() => {
      isCompatibleByAge(user, partner);
    }).toThrow(/User's birthday not found/);
  });

  test("user's age range preference not found", () => {
    user = {
      dob: "2000-03-05T23:09:16Z",
      preference: null,
    };

    partner = {
      dob: "2000-03-05T23:09:16Z",
      preference: {
        minAge: 30,
        maxAge: 40,
      },
    };

    expect(() => {
      isCompatibleByAge(user, partner);
    }).toThrow(/User's preference is not set/);
  });
});
