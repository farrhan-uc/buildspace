import { NextResponse } from 'next/server';
import { getSupplierResults } from '@/lib/suppliers';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get('category') ?? 'all';
  const city = searchParams.get('city') ?? 'Kota';

  return NextResponse.json({
    city,
    generatedAt: new Date().toISOString(),
    source: 'mock-safe-fallback',
    suppliers: getSupplierResults(category),
  });
}
