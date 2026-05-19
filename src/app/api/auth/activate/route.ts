import { NextResponse } from 'next/server';
import { adminDb, adminAuth } from '@/firebase/admin';

// Default mock data for new profiles
const DEFAULT_PROFILE = {
  header: "Hi, I'm [Your Name]! Welcome to my profile.",
  bio: "Tap the edit button to customize your digital identity.",
  email: "",
  phone: "",
  themeColors: { bgColor: '#0a0a0a', cardColor: '#324444', textColor: '#ffffff' },
  typography: { displayFont: 'Anton', bodyFont: 'Inter' },
  effects: { blur: 4, transparency: 0.01 },
  chosenLayout: '4-col',
  careerData: [
    { id: 1, role: 'Your Role', company: 'Your Company', year: '2024', description: 'What you did', url: '', source: 'manual' },
  ],
  widgetStates: [
    { 
      id: 'card-1', type: 'quote', title: 'Client Voice', width: 1, height: 'auto', order: 0,
      content: { quote: "Add a testimonial from your best client here.", attribution: "Client Name, Position — Company", bgColor: '#324444' }
    },
    { 
      id: 'card-2', type: 'contact', title: 'Reach Me', width: 1, height: 'auto', order: 1,
      content: { email: '', phone: '', socialLinks: [] }
    },
  ],
  mediaUrls: {
    backgroundVideo: '',
    tenMVideo: '',
    dailySoftwareVideo: '',
    clientVoiceImage: '',
    reachMeImage: ''
  },
  isPublished: false,
};

export async function POST(req: Request) {
  try {
    // --- Guard: Ensure Admin SDK is initialized ---
    if (!adminDb || !adminAuth) {
      console.error('Firebase Admin SDK not initialized. Check FIREBASE_PROJECT_ID, FIREBASE_CLIENT_EMAIL, FIREBASE_PRIVATE_KEY env vars.');
      return NextResponse.json({ error: 'Server configuration error. Firebase Admin SDK not available.' }, { status: 500 });
    }

    const { code, username, password } = await req.json();

    // --- Validate inputs ---
    if (!code || !username || !password) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const cleanUsername = username.toLowerCase().trim();

    // Username format validation: 3-20 chars, lowercase alphanumeric + underscores
    if (!/^[a-z0-9_]{3,20}$/.test(cleanUsername)) {
      return NextResponse.json({ 
        error: 'Username must be 3-20 characters, using only lowercase letters, numbers, and underscores.' 
      }, { status: 400 });
    }

    if (password.length < 6) {
      return NextResponse.json({ error: 'Password must be at least 6 characters.' }, { status: 400 });
    }

    // --- 1. Validate activation code ---
    const codeRef = adminDb.collection('activation_codes').doc(code.toUpperCase());
    const codeSnap = await codeRef.get();

    if (!codeSnap.exists) {
      return NextResponse.json({ error: 'Invalid activation code.' }, { status: 404 });
    }

    const codeData = codeSnap.data();
    if (codeData?.status === 'used') {
      return NextResponse.json({ error: 'This activation code has already been used.' }, { status: 409 });
    }

    // --- 2. Check username availability ---
    const profileRef = adminDb.collection('profiles').doc(cleanUsername);
    const profileSnap = await profileRef.get();

    if (profileSnap.exists) {
      return NextResponse.json({ error: 'This username is already taken.' }, { status: 409 });
    }

    // --- 3. Create Firebase Auth user ---
    const syntheticEmail = `${cleanUsername}@tap2know.id`;
    
    try {
      await adminAuth.createUser({
        uid: cleanUsername,
        email: syntheticEmail,
        password: password,
        displayName: cleanUsername,
      });
    } catch (authError: any) {
      console.error('Firebase Auth createUser error:', authError);
      
      if (authError.code === 'auth/uid-already-exists' || authError.code === 'auth/email-already-exists') {
        return NextResponse.json({ error: 'This username is already registered.' }, { status: 409 });
      }
      
      if (authError.code === 'auth/configuration-not-found') {
        return NextResponse.json({ 
          error: 'Firebase Email/Password provider is not enabled. Go to Firebase Console → Authentication → Sign-in method → Enable Email/Password.' 
        }, { status: 500 });
      }

      return NextResponse.json({ 
        error: `Failed to create account: ${authError.message || authError.code || 'Unknown auth error'}` 
      }, { status: 500 });
    }

    // --- 4. Create profile document with default template ---
    await profileRef.set({
      ...DEFAULT_PROFILE,
      username: cleanUsername,
      activationCode: code.toUpperCase(),
      createdAt: Date.now(),
      updatedAt: Date.now(),
    });

    // --- 5. Mark activation code as used ---
    await codeRef.update({
      status: 'used',
      claimedBy: cleanUsername,
      claimedAt: Date.now(),
    });

    return NextResponse.json({ 
      success: true, 
      username: cleanUsername,
      message: 'Account created successfully!' 
    });

  } catch (error: any) {
    console.error('Activation error:', error);
    return NextResponse.json({ 
      error: error.message || 'Internal Server Error' 
    }, { status: 500 });
  }
}
