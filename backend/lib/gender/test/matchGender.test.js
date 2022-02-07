const { isCompatibleByGenderPreference } = require("../matchGender");

describe("match gender preference test block", () => {
  test("user's gender not found", () => {
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
    }).toThrow(/User's gender not found/);
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
    }).toThrow(/Partner's gender not found/);
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
  test("user's gender preference is not equal to partner sex", () => {
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
    expect(() => {
      isCompatibleByGenderPreference(user, partner).toBe(false);
    });
  });
  test("user's sex is not equal to partner gender preference", () => {
    user = {
      sex: "male",
      preference: {
        gender: "male",
      },
    };
    partner = {
      sex: "others",
      preference: {
        gender: "female",
      },
    };
    expect(() => {
      isCompatibleByGenderPreference(user, partner).toBe(false);
    });
  });
  test("user's sex is equal to partner gender preference and vice versa", () => {
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
    expect(() => {
      isCompatibleByGenderPreference(user, partner).toBe(true);
    });
  });
});
