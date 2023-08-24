import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const MONGO_URI = process.env.MONGODB_URI;

describe('Mongoose Connection', () => {
  beforeAll(async () => {
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  });

  it('successfully connects to the database', () => {
    expect(mongoose.connection.readyState).toBe(1);
  });

  afterAll(async () => {
    await mongoose.disconnect();
  });
});
