import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    // Clone the request to read it multiple times
    const clone = request.clone();
    const rawBody = await clone.text();
    console.log('Raw request body:', rawBody);

    const body = await request.json();
    
    if (!body.symbol) {
      return NextResponse.json({ error: 'Symbol is required' }, { status: 400 });
    }

    const { symbol } = body;

    // Simulated stock data
    const stockData = {
      symbol: symbol.toUpperCase(),
      price: 150.25 + Math.random() * 10,
      change: -1.5 + Math.random() * 3,
      volume: Math.floor(1000000 + Math.random() * 5000000),
    };

    return NextResponse.json(stockData);
  } catch (err) {
    console.error('Error processing request:', err);
    return NextResponse.json(
      { error: 'Invalid request data' },
      { status: 400 }
    );
  }
}