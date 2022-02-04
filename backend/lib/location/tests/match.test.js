const { distanceTo } = require("geolocation-utils");
const { isCompatibleByDistance } = require("../match");

test('two users compatible by distance preference', () => {
  const user = {
    location: {
      latitude: 43.651070,
      longitude: -79.347015
    },
    preference: {
      distance: 30
    }
  };
  const partner = {
    location: {
      latitude: 43.837208,
      longitude: -79.508278
    },
    preference: {
      distance: 25
    }
  };
  const distance = Math.ceil(distanceTo(
    { lat: user.location.latitude, lon: user.location.longitude },
    { lat: partner.location.latitude, lon: partner.location.longitude }
  ) / 1000);

  expect(distance).toBe(25);
  expect(isCompatibleByDistance(user, partner)).toBe(true);
});

test('two users incompatible by distance preference', () => {
  const user = {
    location: {
      latitude: 43.651070,
      longitude: -79.347015
    },
    preference: {
      distance: 30
    }
  };
  const partner = {
    location: {
      latitude: 43.837208,
      longitude: -79.508278
    },
    preference: {
      distance: 20
    }
  };
  const distance = Math.ceil(distanceTo(
    { lat: user.location.latitude, lon: user.location.longitude },
    { lat: partner.location.latitude, lon: partner.location.longitude }
  ) / 1000);

  expect(distance).toBe(25);
  expect(isCompatibleByDistance(user, partner)).toBe(false);
});

test('user missing location data', () => {
  const user = {
    preference: {
      distance: 30
    }
  };
  const partner = {
    location: {
      latitude: 43.837208,
      longitude: -79.508278
    },
    preference: {
      distance: 20
    }
  };

  expect(() => {
    isCompatibleByDistance(user, partner)
  }).toThrow(/location not found/);
});

test('partner missing location data', () => {
  const user = {
    location: {
      latitude: 43.651070,
      longitude: -79.347015
    },
    preference: {
      distance: 30
    }
  };
  const partner = {
    preference: {
      distance: 20
    }
  };

  expect(() => {
    isCompatibleByDistance(user, partner)
  }).toThrow(/location not found/);
});
