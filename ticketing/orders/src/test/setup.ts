import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken'
declare global {
  var signin: () => string[];
}

jest.mock('../nats-wrapper');

let mongo: any;

beforeAll(async () => {
  process.env.JWT_KEY = 'asdfsds';

  mongo = await MongoMemoryServer.create();
  const mongoUri =  mongo.getUri();

  await mongoose.connect(mongoUri, {})
});

beforeEach(async () => {
  jest.clearAllMocks();
  const collections = await mongoose.connection.db.collections();

  for (let collection of collections) {
    await collection.deleteMany({});
  }
});

afterAll(async () => {
  await mongoose.connection.close();
  if(mongo){
    await mongo.stop();
  }
})

global.signin = () => {
  // Build a JWT payload. {id,email}
  const payload = {
    id: new mongoose.Types.ObjectId().toHexString(),
    email: 'test@test.com'
  };
  // Create the JWT!
  const token = jwt.sign(payload, process.env.JWT_KEY!);
  // Build a session Object. {jwt: MY_JWT}
  const session = {jwt: token};
  // Turn that sessio into JSON
  const sessionJSON = JSON.stringify(session);
  // Take JSON and encode it as base64
  const base64 = Buffer.from(sessionJSON).toString('base64');
  // return a string thats the cookie with the encoded data
  return [`session=${base64}`];
  // const email = 'test@test.com';
  // const password = 'password';

  // const response = await request(app)
  //   .post('/api/users/signup')
  //   .send({
  //     email, password
  //   })
  //   .expect(201);

  // const cookie = response.get('Set-Cookie');

  // return cookie!;
}


