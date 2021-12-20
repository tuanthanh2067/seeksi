export default class Location {
  _city: string;
  _province: string;
  _longitude: number;
  _latitude: number;

  constructor(
    city: string,
    province: string,
    latitude: number,
    longitude: number
  ) {
    this._city = city;
    this._province = province;
    this._latitude = latitude;
    this._longitude = longitude;
  }

  /**
   * Calculate the distance to another location based on Haversine formula.
   * 
   * @param another the location to which the distance is calculated
   * @link https://en.wikipedia.org/wiki/Haversine_formula
   */
  getDistance(another: Location): number {
    // TODO: Implement this function
  }
}
