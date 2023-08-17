import { NextResponse } from 'next/server';

export const Get = async (request) => {
  return new NextResponse('It works!', { status: 200 });
};
