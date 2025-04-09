import { NextResponse } from 'next/server';

export async function GET() {
  // Simulated market indices data
  const indices = [
    {
      name: 'S&P 500',
      value: 4780.25,
      change: 0.45,
    },
    {
      name: 'Dow Jones',
      value: 37640.80,
      change: -0.31,
    },
    {
      name: 'NASDAQ',
      value: 15055.65,
      change: 0.75,
    },
  ];

  return NextResponse.json(indices);
}