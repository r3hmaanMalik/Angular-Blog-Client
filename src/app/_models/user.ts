export class User {
    id: number;
    _id: string;
    username: string;
    password: string;
    firstName: string;
    lastName: string;
    createdDate: string;
    token: string;
    friends: [{
    id: {
      type: String
    }
  }]
}
