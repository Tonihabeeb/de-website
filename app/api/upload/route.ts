import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import {
  IncomingForm,
  Fields,
  Files,
  File as FormidableFile,
} from 'formidable';

function getAvailableFileName(dir: string, originalName: string): string {
  const ext = path.extname(originalName);
  const base = path.basename(originalName, ext);
  let candidate = originalName;
  let i = 1;
  while (fs.existsSync(path.join(dir, candidate))) {
    candidate = `${base}(${i})${ext}`;
    i++;
  }
  return candidate;
}

const METADATA_PATH = path.join(
  process.cwd(),
  'public',
  'uploads',
  'metadata.json'
);

function readMetadata(): Array<{ name: string; tag: string }> {
  try {
    if (!fs.existsSync(METADATA_PATH)) return [];
    const data = fs.readFileSync(METADATA_PATH, 'utf-8');
    return JSON.parse(data);
  } catch {
    return [];
  }
}

function writeMetadata(metadata: Array<{ name: string; tag: string }>) {
  fs.writeFileSync(METADATA_PATH, JSON.stringify(metadata, null, 2), 'utf-8');
}

export async function POST(request: NextRequest) {
  try {
    const uploadsDir = path.join(process.cwd(), 'public', 'uploads');
    if (!fs.existsSync(uploadsDir)) {
      fs.mkdirSync(uploadsDir, { recursive: true });
    }

    // Parse the form data
    const formData = await request.formData();
    const tag = (formData.get('tag') as string) || 'Untagged';
    const files = formData.getAll('files') as File[];

    if (!files || files.length === 0) {
      return NextResponse.json(
        { success: false, error: 'No files provided' },
        { status: 400 }
      );
    }

    const resultFiles: string[] = [];
    let metadata = readMetadata();

    for (const file of files) {
      if (!file) continue;

      const originalName = file.name;
      const finalName = getAvailableFileName(uploadsDir, originalName);
      const finalPath = path.join(uploadsDir, finalName);

      // Convert File to Buffer and write to disk
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);
      fs.writeFileSync(finalPath, buffer);

      resultFiles.push(finalName);
      metadata.push({ name: finalName, tag });
    }

    writeMetadata(metadata);

    return NextResponse.json({ success: true, files: resultFiles });
  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json(
      { success: false, error: 'Upload failed' },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json(
    { success: false, error: 'Method not allowed' },
    { status: 405 }
  );
}
