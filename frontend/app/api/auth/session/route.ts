import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { user, token } = body;

    const res = NextResponse.json({ success: true, user });

    // Set secure cookie for Next.js middleware verification
    const sessionValue = JSON.stringify({
      id: user.id || user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token,
    });

    res.cookies.set('wf_session', sessionValue, {
      httpOnly: false, // Middleware and client can read role safely; refresh token stays httpOnly on backend
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 7 * 24 * 60 * 60, // 7 days
    });

    return res;
  } catch (err) {
    return NextResponse.json({ success: false, error: (err as Error).message }, { status: 400 });
  }
}

export async function DELETE() {
  const res = NextResponse.json({ success: true });
  res.cookies.delete('wf_session');
  return res;
}
