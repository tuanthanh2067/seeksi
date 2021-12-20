import User from "./user";

export default class PotentialMatch {
  _id: string;
  // TODO: Replace with _userId after experimenting
  _pair: [User];
  _matchScore: number;
  _status: [Status];

  constructor(first: User, second: User) {}
}
