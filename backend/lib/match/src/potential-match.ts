import User from "./user";


enum Status {
  PENDING,
  LIKED,
  REJECTED,
}

export default class PotentialMatch {
  private _id: string;
  // TODO: Replace with _userId after experimenting
  private _pair: [User, User];
  // _matchScore should only be updated/initialized internally
  // according to our rule. It shouldn't be set anywhere outside
  // of this class.
  private _matchScore: number;
  private _status: [Status, Status];

  constructor(first: User, second: User) {
    this._id = new Date().toLocaleString();
    this._pair = [first, second];
    this._status = [Status.PENDING, Status.PENDING];
    this._matchScore = 0;
    this.updateScore();
  }

  get pair(): [User, User] {
    return this._pair;
  }

  set pair(pair: [User, User]) {
    this._pair = pair;
    this.updateScore();
  }

  get matchScore(): number {
    return this._matchScore;
  }

  private updateScore(): void {
    // TODO: Implement this function
    this._matchScore = 0;
  }

  get status(): [Status, Status] {
    return this._status;
  }

  set status(status: [Status, Status]) {
    this._status[0] = status[0];
    this._status[1] = status[1];
    this.updateScore()
  }

  setStatus(user: User, status: Status) {
    if (this._pair[0] === user) {
      this._status[0] = status;
    } else {
      this._status[1] = status;
    }
  }
}
