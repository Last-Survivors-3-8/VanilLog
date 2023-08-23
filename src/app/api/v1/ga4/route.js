import { getPageviews } from '@utils/ga';
import { NextResponse } from 'next/server';
import { sendErrorResponse } from '@utils/response';

async function GET(req, res) {
  try {
    const pageviews = await getPageviews('7daysAgo', 'today');

    return NextResponse.json({ status: 'success', data: pageviews });
  } catch (error) {
    return sendErrorResponse(error);
  }
}

export { GET };
