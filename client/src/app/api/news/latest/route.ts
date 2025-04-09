import { NextResponse } from 'next/server';

export async function GET() {
  // Simulated news data
  const news = [
    {
      id: '1',
      title: 'Market Rally Continues',
      summary: 'Global markets show strong momentum as tech stocks lead gains.',
      publishedAt: '2024-01-20T10:00:00Z',
    },
    {
      id: '2',
      title: 'Fed Signals Rate Decision',
      summary: 'Federal Reserve hints at potential rate cuts in coming months.',
      publishedAt: '2024-01-19T15:30:00Z',
    },
  ];

  return NextResponse.json(news);
}