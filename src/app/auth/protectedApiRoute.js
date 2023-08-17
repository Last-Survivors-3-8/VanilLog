import { NextResponse } from 'next/server';
import { middleware as verifyToken } from '../../authMiddleware';

export async function GET(req) {
  try {
    const result = await verifyToken(req);

    if (result.status === 403) {
      return new NextResponse({ status: 403 }).send(result.statusText);
    }

    return NextResponse.json('Protected data');
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message });
  }
}
