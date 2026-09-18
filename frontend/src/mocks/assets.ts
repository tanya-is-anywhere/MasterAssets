import type { Asset } from '../types';
import reactLogo from '../assets/react.svg';
import viteLogo from '../assets/vite.svg';
import heroImg from '../assets/hero.png';

export const mockAssets: Asset[] = [
  {
    id: 1,
    fileName: 'react.svg',
    filePath: reactLogo,
    mimeType: 'image/svg+xml',
    width: 64,
    height: 64,
    sizeBytes: 2048,
    tags: ['logo', 'framework'],
    createdAt: '2026-09-10T10:00:00Z',
  },
  {
    id: 2,
    fileName: 'vite.svg',
    filePath: viteLogo,
    mimeType: 'image/svg+xml',
    width: 64,
    height: 64,
    sizeBytes: 1536,
    tags: ['logo', 'build'],
    createdAt: '2026-09-11T12:30:00Z',
  },
  {
    id: 3,
    fileName: 'hero.png',
    filePath: heroImg,
    mimeType: 'image/png',
    width: 800,
    height: 600,
    sizeBytes: 154321,
    tags: ['hero', 'banner'],
    createdAt: '2026-09-12T08:15:00Z',
  },
  {
    id: 4,
    fileName: 'react.svg',
    filePath: reactLogo,
    mimeType: 'image/svg+xml',
    width: 64,
    height: 64,
    sizeBytes: 2048,
    tags: ['logo', 'duplicate'],
    createdAt: '2026-09-13T14:00:00Z',
  },
  {
    id: 5,
    fileName: 'vite.svg',
    filePath: viteLogo,
    mimeType: 'image/svg+xml',
    width: 64,
    height: 64,
    sizeBytes: 1536,
    tags: ['logo', 'duplicate'],
    createdAt: '2026-09-14T09:45:00Z',
  },
];
