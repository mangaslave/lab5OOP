import { userInfo } from "os";

const database: Express.User[] = [
  {
    id: 1,
    name: "Jimmy Smith",
    email: "jimmy123@gmail.com",
    password: "jimmy123!",
    role: true,
  },
  {
    id: 2,
    name: "Johnny Doe",
    email: "johnny123@gmail.com",
    password: "johnny123!",
  },
  {
    id: 3,
    name: "Jonathan Chen",
    email: "jonathan123@gmail.com",
    password: "jonathan123!",
  },
];

const userModel:any = {

  /* FIX ME (types) 😭 */
  findOne: (email: string) => {
    const user = database.find((user) => user.email === email);
    if (user) {
      return user;
    }
    // throw new Error(`Couldn't find user with email: ${email}`);
    return null;
  },
  /* FIX ME (types) 😭 */
  findById: (id: number) => {
    const user = database.find((user) => user.id === id);
    if (user) {
      return user;
    }
    //throw new Error(`Couldn't find user with id: ${id}`);
    return null;
  },

  // Add these methods to userModel.ts or adjust according to your model structure

  findOrCreate: (profile: any) => {
    const githubId = profile.id;
  
    let user = database.find(user => user.id === githubId);
  
    if (!user) {
      user = {
        name: profile.username,
        email: '',
        password: '',
        id: githubId,
      };
      database.push(user); 
      return user;
    }
    return user;

  },
}

export { database, userModel };
