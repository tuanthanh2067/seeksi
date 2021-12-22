import Location from "./location";
import Preference from "./preference";


enum Sex {
  FEMALE,
  MALE,
}

export default class User {
  public _firstName: string;
  public _lastName: string;
  
  private _id: string;
  private _dob: Date;
  private _hobbies: Array<string>;
  private _sex: Sex;
  private _location: Location;
  private _preference: Preference;

  constructor(data: any) {
    const { city, province, latitude, longitude } = data.location;
    const { gender, distance, minAge, maxAge, longTerm, shortTerm } =
      data.preference;
    const sex: Sex = Sex[<keyof typeof Sex>data.sex.toUpperCase()];

    this._id = data.userId.$oid;
    this._firstName = data.first_name;
    this._lastName = data.last_name;
    this._dob = data.dob;
    this._sex = sex;
    this._hobbies = data.hobbies;
    this._location = new Location(city, province, latitude, longitude);
    this._preference = new Preference(
      gender,
      distance,
      minAge,
      maxAge,
      longTerm,
      shortTerm
    );
  }

  /**
   * Check if a user matches this user's preferences.
   * 
   * @param user another user that can be matched
   */
  prefer(another: User): boolean {
    // TODO: Check if another user's gender matches gender preference
    // TODO: Check if another user's location matches distance preference
    // TODO: Check if another user's age matches age preference
    // TODO: Check if another user's relationship goal matches preference
    return false;
  }

  // TODO: Add getters & setters for private fields
}
