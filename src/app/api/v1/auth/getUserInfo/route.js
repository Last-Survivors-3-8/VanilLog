import { middleware as verifyToken } from '@src/authMiddleware';
import { NextResponse } from 'next/server';

export async function GET(req) {
  try {
    const result = await verifyToken(req);

    if (result.status === 403) {
      return new NextResponse({ status: 403 }).send(result.statusText);
    }

    return NextResponse.json({
      email: result.user.email,
    });
  } catch (error) {
    return NextResponse.json({ success: false });
  }
}
