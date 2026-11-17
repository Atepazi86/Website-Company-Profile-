import React from 'react';
import { LogoEmblemId, LogoFrameShape } from '../types/company';

interface LogoMarkProps {
  emblem: LogoEmblemId;
  frame: LogoFrameShape;
  companyName: string;
  primaryColor: string;
  accentColor: string;
  customLogoUrl?: string | null;
  size?: 'sm' | 'md' | 'lg';
}

function getInitials(name: string): string {
  const words = name
    .replace(/^(PT|CV|UD|Firma)\s+/i, '')
    .trim()
    .split(/\s+/)
    .filter(Boolean);
  if (words.length === 0) return 'NK';
  if (words.length === 1) return words[0].slice(0, 2).toUpperCase();
  return (words[0][0] + words[1][0]).toUpperCase();
}

export const LogoMark: React.FC<LogoMarkProps> = ({
  emblem,
  frame,
  companyName,
  primaryColor,
  accentColor,
  customLogoUrl,
  size = 'md',
}) => {
  const sizeClass =
    size === 'sm' ? 'w-8 h-8' : size === 'lg' ? 'w-12 h-12' : 'w-10 h-10';

  const radiusClass =
    frame === 'circle'
      ? 'rounded-full'
      : frame === 'squircle'
        ? 'rounded-xl'
        : frame === 'outline'
          ? 'rounded-xl'
          : 'rounded-lg';

  const containerStyle: React.CSSProperties =
    frame === 'outline'
      ? {
          border: `2px solid ${accentColor}`,
          backgroundColor: 'transparent',
          color: primaryColor,
        }
      : frame === 'minimal'
        ? {
            backgroundColor: 'transparent',
            color: accentColor,
          }
        : {
            background: `linear-gradient(135deg, ${primaryColor} 0%, ${accentColor} 100%)`,
            color: '#FFFFFF',
          };

  if (customLogoUrl) {
    return (
      <div
        className={`${sizeClass} ${radiusClass} overflow-hidden flex items-center justify-center shrink-0 border border-slate-200 bg-white`}
      >
        <img
          src={customLogoUrl}
          alt={companyName}
          className="w-full h-full object-contain p-1"
          referrerPolicy="no-referrer"
        />
      </div>
    );
  }

  const iconStroke = frame === 'outline' || frame === 'minimal' ? accentColor : '#FFFFFF';
  const secondaryStroke = frame === 'outline' || frame === 'minimal' ? primaryColor : 'rgba(255,255,255,0.65)';
  const initials = getInitials(companyName);

  return (
    <div
      className={`${sizeClass} ${radiusClass} flex items-center justify-center shrink-0 transition-transform duration-200`}
      style={containerStyle}
      aria-hidden="true"
    >
      {emblem === 'monogram' ? (
        <span className="font-bold tracking-tight text-sm leading-none">{initials}</span>
      ) : (
        <svg viewBox="0 0 32 32" className="w-5 h-5" fill="none">
          {emblem === 'prism' && (
            <>
              <path
                d="M16 4L27 10.5V21.5L16 28L5 21.5V10.5L16 4Z"
                stroke={iconStroke}
                strokeWidth="2.2"
                strokeLinejoin="round"
              />
              <path
                d="M16 4V16M16 16L27 21.5M16 16L5 21.5"
                stroke={secondaryStroke}
                strokeWidth="2"
                strokeLinecap="round"
              />
            </>
          )}
          {emblem === 'pillar' && (
            <>
              <rect x="6" y="13" width="4.5" height="13" rx="1.2" fill={iconStroke} />
              <rect x="13.75" y="7" width="4.5" height="19" rx="1.2" fill={iconStroke} />
              <rect x="21.5" y="10" width="4.5" height="16" rx="1.2" fill={secondaryStroke} />
            </>
          )}
          {emblem === 'orbit' && (
            <>
              <circle cx="16" cy="16" r="5" fill={iconStroke} />
              <ellipse
                cx="16"
                cy="16"
                rx="12"
                ry="5.5"
                transform="rotate(-32 16 16)"
                stroke={secondaryStroke}
                strokeWidth="2.2"
              />
            </>
          )}
          {emblem === 'nexus' && (
            <>
              <rect x="5" y="5" width="9" height="9" rx="2.2" fill={iconStroke} />
              <rect x="18" y="5" width="9" height="9" rx="2.2" fill={secondaryStroke} />
              <rect x="5" y="18" width="9" height="9" rx="2.2" fill={secondaryStroke} />
              <rect x="18" y="18" width="9" height="9" rx="2.2" fill={iconStroke} />
            </>
          )}
          {emblem === 'crest' && (
            <>
              <path
                d="M16 4L26 8.5V15.5C26 21.6 21.7 26.8 16 28.5C10.3 26.8 6 21.6 6 15.5V8.5L16 4Z"
                stroke={iconStroke}
                strokeWidth="2.2"
                strokeLinejoin="round"
              />
              <path
                d="M11.5 16L14.8 19.2L21 13"
                stroke={secondaryStroke}
                strokeWidth="2.4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </>
          )}
        </svg>
      )}
    </div>
  );
};

export function getLogoSvgString(
  emblem: LogoEmblemId,
  frame: LogoFrameShape,
  companyName: string,
  primaryColor: string,
  accentColor: string,
  customLogoUrl?: string | null
): string {
  if (customLogoUrl) {
    return `<div class="w-10 h-10 rounded-xl overflow-hidden flex items-center justify-center shrink-0 border border-slate-200 bg-white"><img src="${customLogoUrl}" alt="${companyName}" class="w-full h-full object-contain p-1" /></div>`;
  }

  const radiusClass =
    frame === 'circle'
      ? 'rounded-full'
      : frame === 'squircle' || frame === 'outline'
        ? 'rounded-xl'
        : 'rounded-lg';

  const styleAttr =
    frame === 'outline'
      ? `border: 2px solid ${accentColor}; background: transparent; color: ${primaryColor};`
      : frame === 'minimal'
        ? `background: transparent; color: ${accentColor};`
        : `background: linear-gradient(135deg, ${primaryColor} 0%, ${accentColor} 100%); color: #FFFFFF;`;

  const iconStroke = frame === 'outline' || frame === 'minimal' ? accentColor : '#FFFFFF';
  const secondaryStroke = frame === 'outline' || frame === 'minimal' ? primaryColor : 'rgba(255,255,255,0.65)';
  const initials = getInitials(companyName);

  let inner = '';
  if (emblem === 'monogram') {
    inner = `<span class="font-bold tracking-tight text-sm leading-none">${initials}</span>`;
  } else if (emblem === 'prism') {
    inner = `<svg viewBox="0 0 32 32" class="w-5 h-5" fill="none"><path d="M16 4L27 10.5V21.5L16 28L5 21.5V10.5L16 4Z" stroke="${iconStroke}" stroke-width="2.2" stroke-linejoin="round"/><path d="M16 4V16M16 16L27 21.5M16 16L5 21.5" stroke="${secondaryStroke}" stroke-width="2" stroke-linecap="round"/></svg>`;
  } else if (emblem === 'pillar') {
    inner = `<svg viewBox="0 0 32 32" class="w-5 h-5" fill="none"><rect x="6" y="13" width="4.5" height="13" rx="1.2" fill="${iconStroke}"/><rect x="13.75" y="7" width="4.5" height="19" rx="1.2" fill="${iconStroke}"/><rect x="21.5" y="10" width="4.5" height="16" rx="1.2" fill="${secondaryStroke}"/></svg>`;
  } else if (emblem === 'orbit') {
    inner = `<svg viewBox="0 0 32 32" class="w-5 h-5" fill="none"><circle cx="16" cy="16" r="5" fill="${iconStroke}"/><ellipse cx="16" cy="16" rx="12" ry="5.5" transform="rotate(-32 16 16)" stroke="${secondaryStroke}" stroke-width="2.2"/></svg>`;
  } else if (emblem === 'nexus') {
    inner = `<svg viewBox="0 0 32 32" class="w-5 h-5" fill="none"><rect x="5" y="5" width="9" height="9" rx="2.2" fill="${iconStroke}"/><rect x="18" y="5" width="9" height="9" rx="2.2" fill="${secondaryStroke}"/><rect x="5" y="18" width="9" height="9" rx="2.2" fill="${secondaryStroke}"/><rect x="18" y="18" width="9" height="9" rx="2.2" fill="${iconStroke}"/></svg>`;
  } else {
    inner = `<svg viewBox="0 0 32 32" class="w-5 h-5" fill="none"><path d="M16 4L26 8.5V15.5C26 21.6 21.7 26.8 16 28.5C10.3 26.8 6 21.6 6 15.5V8.5L16 4Z" stroke="${iconStroke}" stroke-width="2.2" stroke-linejoin="round"/><path d="M11.5 16L14.8 19.2L21 13" stroke="${secondaryStroke}" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
  }

  return `<div class="w-10 h-10 ${radiusClass} flex items-center justify-center shrink-0" style="${styleAttr}">${inner}</div>`;
}
