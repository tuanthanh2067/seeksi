enum Gender {
  FEMALE,
  MALE,
  NON_BINARY,
}

export default class Preference {
  _gender: string;
  _distance: number;
  _minAge: number;
  _maxAge: number;
  _longTerm: boolean;
  _shortTerm: boolean;

  constructor(
    gender: string,
    distance: number,
    minAge: number,
    maxAge: number,
    longTerm: boolean,
    shortTerm: boolean
  ) {
    this._gender = gender;
    this._distance = distance;
    this._minAge = minAge;
    this._maxAge = maxAge;
    this._longTerm = longTerm;
    this._shortTerm = shortTerm;
  }
}
