import { NextResponse } from 'next/server';

// This route is deprecated. Authentication now happens client-side via
// signInWithEmailAndPassword in the Login page. Kept for backward compatibility.
export async function POST() {
  return NextResponse.json({ 
    error: 'This endpoint is deprecated. Please use the /login page directly.' 
  }, { status: 410 });
}
