import { NextRequest, NextResponse } from 'next/server';

const TICKETMASTER_API_KEY = process.env.TICKETMASTER_API_KEY || 'YOUR_API_KEY_HERE';
const TICKETMASTER_BASE_URL = process.env.TICKETMASTER_BASE_URL || 'https://app.ticketmaster.com/discovery/v2';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const keyword = searchParams.get('keyword') || '';
    const city = searchParams.get('city') || '';
    const page = searchParams.get('page') || '0';
    const size = searchParams.get('size') || '20';
    const sort = searchParams.get('sort') || 'date,asc';

    const url = new URL(`${TICKETMASTER_BASE_URL}/events.json`);
    url.searchParams.append('apikey', TICKETMASTER_API_KEY);
    url.searchParams.append('keyword', keyword);
    url.searchParams.append('city', city);
    url.searchParams.append('page', page);
    url.searchParams.append('size', size);
    url.searchParams.append('sort', sort);

    const response = await fetch(url.toString());
    
    if (!response.ok) {
      throw new Error(`Ticketmaster API error: ${response.status}`);
    }

    const data = await response.json();
    
    return NextResponse.json(data);
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch events' },
      { status: 500 }
    );
  }
}