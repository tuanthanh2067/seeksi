export default class Location {
  public _city: string;
  public _province: string;
  public _longitude: number;
  public _latitude: number;

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
k   * @param another the location to which the distance is calculated
   * @link https://en.wikipedia.org/wiki/Haversine_formula
   */
  getDistance(another: Location): number {
    // TODO: Implement this function
    return 0;
  }
}
