const { isCompatibleByGenderPreference } = require("../matchGender");

describe("match gender preference test block", () => {
  test("user's sex not found", () => {
    user = {
      sex: "",
      preference: {
        gender: "male",
      },
    };
    partner = {
      sex: "male",
      preference: {
        gender: "female",
      },
    };
    expect(() => {
      isCompatibleByGenderPreference(user, partner);
    }).toThrow(/User's sex not found/);
  });
  test("partner's gender not found", () => {
    user = {
      sex: "female",
      preference: {
        gender: "male",
      },
    };
    partner = {
      sex: "",
      preference: {
        gender: "female",
      },
    };
    expect(() => {
      isCompatibleByGenderPreference(user, partner);
    }).toThrow(/Partner's sex not found/);
  });
  test("user's gender preference not found", () => {
    user = {
      sex: "female",
      preference: {
        gender: "",
      },
    };
    partner = {
      sex: "male",
      preference: {
        gender: "female",
      },
    };
    expect(() => {
      isCompatibleByGenderPreference(user, partner);
    }).toThrow(/User's gender preference not found/);
  });
  test("partner's gender preference not found", () => {
    user = {
      sex: "female",
      preference: {
        gender: "male",
      },
    };
    partner = {
      sex: "male",
      preference: {
        gender: "",
      },
    };
    expect(() => {
      isCompatibleByGenderPreference(user, partner);
    }).toThrow(/Partner's gender preference not found/);
  });
  test("a female user that prefers male should not match a female partner that prefers female", () => {
    user = {
      sex: "female",
      preference: {
        gender: "male",
      },
    };
    partner = {
      sex: "female",
      preference: {
        gender: "female",
      },
    };
    expect(isCompatibleByGenderPreference(user, partner)).toBe(false);
  });
  test("a male user that prefers male should not match a female partner that prefers female", () => {
    user = {
      sex: "male",
      preference: {
        gender: "male",
      },
    };
    partner = {
      sex: "female",
      preference: {
        gender: "female",
      },
    };
    expect(isCompatibleByGenderPreference(user, partner)).toBe(false);
  });
  test("a male user that prefers female should match a female partner that prefers male", () => {
    user = {
      sex: "male",
      preference: {
        gender: "female",
      },
    };
    partner = {
      sex: "female",
      preference: {
        gender: "male",
      },
    };
    expect(isCompatibleByGenderPreference(user, partner)).toBe(true);
  });

  test("a male user that prefers everyone should not match a female partner that prefers female", () => {
    user = {
      sex: "male",
      preference: {
        gender: "everyone",
      },
    };
    partner = {
      sex: "female",
      preference: {
        gender: "female",
      },
    };
    //eventhough user likes everyone, but female partner only wants female => false
    expect(isCompatibleByGenderPreference(user, partner)).toBe(false);
  });
  test("both prefer everyone should match", () => {
    user = {
      sex: "male",
      preference: {
        gender: "everyone",
      },
    };
    partner = {
      sex: "female",
      preference: {
        gender: "everyone",
      },
    };
    //both want everyone so it should return true
    expect(isCompatibleByGenderPreference(user, partner)).toBe(true);
  });
});
