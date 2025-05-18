// LoadingSpinner.js
import React from 'react';

export default function LoadingSpinner() {
  /* ---------- 1. the visual styles ---------- */
  const loaderStyle = {
    width: 240,
    height: 240,
    border: '4px solid rgb(0, 197, 99)',
    borderBottomColor: 'transparent',
    borderRadius: '50%',
    display: 'block',
    boxSizing: 'border-box',
    animation: 'rotation 1s linear infinite',
    marginTop: -2,
    marginLeft: 'auto',
    marginRight: 'auto',
    marginBottom: 'auto',
    marginTop: '200px',
  };

  /* ---------- 2. the keyframes (in a <style> tag) ---------- */
  return (
    <>
      <style>{`
        @keyframes rotation {
          from { transform: rotate(0deg);   }
          to   { transform: rotate(360deg); }
        }
      `}</style>

      {/* the actual spinner */}
      <span style={loaderStyle} />
    </>
  );
}