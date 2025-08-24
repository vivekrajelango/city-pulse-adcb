import { NextRequest, NextResponse } from 'next/server';

const TICKETMASTER_API_KEY = process.env.TICKETMASTER_API_KEY || 'YOUR_API_KEY_HERE';
const TICKETMASTER_BASE_URL = process.env.TICKETMASTER_BASE_URL || 'https://app.ticketmaster.com/discovery/v2';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const url = new URL(`${TICKETMASTER_BASE_URL}/events/${id}.json`);
    url.searchParams.append('apikey', TICKETMASTER_API_KEY);

    const response = await fetch(url.toString());
    
    if (!response.ok) {
      throw new Error(`Ticketmaster API error: ${response.status}`);
    }

    const data = await response.json();
    
    return NextResponse.json(data);
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch event details' },
      { status: 500 }
    );
  }
}