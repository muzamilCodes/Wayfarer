import { ImageResponse } from 'next/og';

export const size = {
  width: 32,
  height: 32,
};
export const contentType = 'image/png';

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 16,
          background: 'linear-gradient(135deg, #091e3a 0%, #3b71fe 100%)',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          borderRadius: 8,
          fontWeight: 800,
          letterSpacing: '-1px',
        }}
      >
        PJ
      </div>
    ),
    {
      ...size,
    }
  );
}
