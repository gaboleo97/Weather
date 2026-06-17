import React from 'react'
import type { WeatherIconName } from '../lib/utils/weatherCodes'

type Props = {
  icon: WeatherIconName
  size?: number
}

const paths: Record<WeatherIconName, JSX.Element> = {
  sun: (
    <g>
      <circle cx="12" cy="12" r="5" fill="#FBBF24" />
      <g stroke="#FBBF24" strokeWidth="2" strokeLinecap="round">
        <line x1="12" y1="1" x2="12" y2="3" />
        <line x1="12" y1="21" x2="12" y2="23" />
        <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
        <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
        <line x1="1" y1="12" x2="3" y2="12" />
        <line x1="21" y1="12" x2="23" y2="12" />
        <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
        <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
      </g>
    </g>
  ),
  moon: (
    <g>
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" fill="#93C5FD" />
    </g>
  ),
  'cloud-sun': (
    <g>
      <circle cx="8" cy="8" r="4" fill="#FBBF24" />
      <g stroke="#FBBF24" strokeWidth="1.5" strokeLinecap="round">
        <line x1="8" y1="1" x2="8" y2="2" />
        <line x1="8" y1="14" x2="8" y2="15" />
        <line x1="2.05" y1="2.05" x2="2.76" y2="2.76" />
        <line x1="13.24" y1="13.24" x2="13.95" y2="13.95" />
        <line x1="1" y1="8" x2="2" y2="8" />
        <line x1="14" y1="8" x2="15" y2="8" />
      </g>
      <path d="M6 19a5 5 0 0 1 5-5h2a4 4 0 0 1 4 4v1a2 2 0 0 1-2 2H8a3 3 0 0 1-2-5.24" fill="#94A3B8" />
    </g>
  ),
  'cloud-moon': (
    <g>
      <path d="M17 4.5a5 5 0 0 1-3.5-1.5 6 6 0 0 0 5.5 5.5A5 5 0 0 1 17 4.5z" fill="#93C5FD" />
      <path d="M6 19a5 5 0 0 1 5-5h2a4 4 0 0 1 4 4v1a2 2 0 0 1-2 2H8a3 3 0 0 1-2-5.24" fill="#94A3B8" />
    </g>
  ),
  cloud: (
    <path d="M6 19a5 5 0 0 1 5-5h2a4 4 0 0 1 4 4v1a2 2 0 0 1-2 2H8a3 3 0 0 1-2-5.24" fill="#94A3B8" />
  ),
  fog: (
    <g fill="#94A3B8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 8h16" stroke="#94A3B8" strokeWidth="2" />
      <path d="M4 12h16" stroke="#94A3B8" strokeWidth="2" />
      <path d="M4 16h12" stroke="#94A3B8" strokeWidth="2" />
    </g>
  ),
  drizzle: (
    <g>
      <path d="M6 14a5 5 0 0 1 5-5h2a4 4 0 0 1 4 4v1a2 2 0 0 1-2 2H8a3 3 0 0 1-2-4.24" fill="#94A3B8" />
      <g stroke="#60A5FA" strokeWidth="1.5" strokeLinecap="round">
        <line x1="9" y1="17" x2="8" y2="20" />
        <line x1="12" y1="17" x2="11" y2="20" />
        <line x1="15" y1="17" x2="14" y2="20" />
      </g>
    </g>
  ),
  rain: (
    <g>
      <path d="M6 14a5 5 0 0 1 5-5h2a4 4 0 0 1 4 4v1a2 2 0 0 1-2 2H8a3 3 0 0 1-2-4.24" fill="#64748B" />
      <g stroke="#60A5FA" strokeWidth="1.5" strokeLinecap="round">
        <line x1="9" y1="17" x2="7" y2="22" />
        <line x1="12" y1="17" x2="10" y2="22" />
        <line x1="15" y1="17" x2="13" y2="22" />
      </g>
    </g>
  ),
  snow: (
    <g>
      <path d="M6 14a5 5 0 0 1 5-5h2a4 4 0 0 1 4 4v1a2 2 0 0 1-2 2H8a3 3 0 0 1-2-4.24" fill="#94A3B8" />
      <g fill="#E2E8F0">
        <circle cx="9" cy="19" r="1" />
        <circle cx="12" cy="21" r="1" />
        <circle cx="15" cy="19" r="1" />
        <circle cx="10.5" cy="22.5" r="1" />
        <circle cx="13.5" cy="22.5" r="1" />
      </g>
    </g>
  ),
  thunder: (
    <g>
      <path d="M6 14a5 5 0 0 1 5-5h2a4 4 0 0 1 4 4v1a2 2 0 0 1-2 2H8a3 3 0 0 1-2-4.24" fill="#475569" />
      <polygon points="13,15 10,21 12,21 11,26 17,18 14,18 15,15" fill="#FBBF24" />
    </g>
  ),
  hail: (
    <g>
      <path d="M6 14a5 5 0 0 1 5-5h2a4 4 0 0 1 4 4v1a2 2 0 0 1-2 2H8a3 3 0 0 1-2-4.24" fill="#475569" />
      <polygon points="13,15 10,21 12,21 11,26 17,18 14,18 15,15" fill="#FBBF24" />
      <g fill="#E2E8F0">
        <circle cx="8" cy="20" r="1.2" />
        <circle cx="15" cy="22" r="1.2" />
      </g>
    </g>
  ),
}

const WeatherIcon: React.FC<Props> = ({ icon, size = 24 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    style={{ display: 'block' }}
  >
    {paths[icon]}
  </svg>
)

export default WeatherIcon
