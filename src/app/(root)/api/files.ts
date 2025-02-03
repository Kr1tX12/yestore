import { getFiles } from "@/lib/actions/files.actions";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  
  const result = await getFiles({
    types: [searchParams.get('type') || ''],
    searchText: searchParams.get('search') || '',
    sort: searchParams.get('sort') || 'desc',
    limit: Number(searchParams.get('limit')) || 20,
    page: Number(searchParams.get('page')) || 1,
  });

  return NextResponse.json({
    contents: result.documents,
    hasMore: result.hasMore,
  });
}