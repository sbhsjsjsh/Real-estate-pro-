import {NextRequest, NextResponse} from 'next/server';
import fs from 'fs/promises';
import path from 'path';

const DATA_PATH = path.join(process.cwd(), 'data', 'leads.json');

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {name, phone, businessType} = body;

    if (!name || !phone || !businessType) {
      return NextResponse.json({error: 'Missing required fields'}, {status: 400});
    }

    // Ensure data directory exists
    await fs.mkdir(path.dirname(DATA_PATH), {recursive: true});

    // Read existing leads
    let leads = [];
    try {
      const fileContent = await fs.readFile(DATA_PATH, 'utf-8');
      leads = JSON.parse(fileContent);
    } catch (e) {
      // File doesn't exist or is empty
    }

    // Add new lead
    const newLead = {
      id: Date.now().toString(),
      name,
      phone,
      businessType,
      createdAt: new Date().toISOString(),
    };
    leads.push(newLead);

    // Write back to file
    await fs.writeFile(DATA_PATH, JSON.stringify(leads, null, 2));

    return NextResponse.json({success: true});
  } catch (error) {
    console.error('Error saving lead:', error);
    return NextResponse.json({error: 'Internal Server Error'}, {status: 500});
  }
}

export async function GET(req: NextRequest) {
  const {searchParams} = new URL(req.url);
  const password = searchParams.get('password');

  if (password !== '9931') {
    return NextResponse.json({error: 'Unauthorized'}, {status: 401});
  }

  try {
    const fileContent = await fs.readFile(DATA_PATH, 'utf-8');
    const leads = JSON.parse(fileContent);
    return NextResponse.json(leads);
  } catch (e) {
    return NextResponse.json([]);
  }
}
