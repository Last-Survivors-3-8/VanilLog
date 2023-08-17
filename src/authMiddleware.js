import { NextResponse } from 'next/server';
import admin from 'firebase-admin';

if (!admin.apps.length) {
  const serviceAccount = require('../vanillog-firebase-adminsdk-ybr8s-5cbb74cc85.json');
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'https://vanillog.firebaseio.com',
  });
}

export async function middleware(req) {
  try {
    const idToken = req.headers.get('authorization')?.split('Bearer ')[1];

    if (!idToken) {
      return NextResponse.error(403, 'Unauthorized: No token provided');
    }

    const decodedToken = await admin.auth().verifyIdToken(idToken);
    req.uid = decodedToken.uid;
    return NextResponse.next();
  } catch (error) {
    return NextResponse.error(403, 'Unauthorized: Invalid token');
  }
}
