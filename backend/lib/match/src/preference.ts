enum Gender {
  FEMALE,
  MALE,
  NON_BINARY,
}

export default class Preference {
  public _distance: number;
  public _longTerm: boolean;
  public _shortTerm: boolean;
  public _gender: Gender;

  private _minAge: number;
  private _maxAge: number;

  constructor(
    gender: Gender,
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
  
  get minAge(): number {
    return this._minAge;
  }

  set minAge(age: number) {
    if (this._maxAge < age) {
      this._minAge = age;
    } else {
      throw "Mininum age is greater than maximum age!";
    }
  }

  get maxAge(): number {
    return this._maxAge;
  }

  set maxAge(age: number) {
    if (age < this._minAge) {
      this._minAge = age;
    } else {
      throw "Maximum age is less than minimum age!";
    }
  }
}
