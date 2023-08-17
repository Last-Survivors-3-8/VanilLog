import User from '@models/User';
import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    const { uid } = req.body;
    let user = await User.findOne({ _id: uid });

    if (!user) {
      user = new User({ uid: uid });
      await user.save();
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message });
  }
}
