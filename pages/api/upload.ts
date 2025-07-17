import type { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import path from 'path';
import { IncomingForm, Fields, Files, File as FormidableFile } from 'formidable';

export const config = {
  api: {
    bodyParser: false,
  },
};

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

const METADATA_PATH = path.join(process.cwd(), 'public', 'uploads', 'metadata.json');

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

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    res.status(405).json({ success: false, error: 'Method not allowed' });
    return;
  }
  const uploadsDir = path.join(process.cwd(), 'public', 'uploads');
  if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
  }
  const form = new IncomingForm({
    uploadDir: uploadsDir,
    keepExtensions: true,
    multiples: true,
    maxFileSize: 20 * 1024 * 1024,
  });
  form.parse(req, async (err: any, fields: Fields, files: Files) => {
    if (err) {
      res.status(500).json({ success: false, error: err.message });
      return;
    }
    const tag = typeof fields.tag === 'string' ? fields.tag : (Array.isArray(fields.tag) ? fields.tag[0] : 'Untagged');
    const uploadedFiles = Array.isArray(files.files) ? files.files : [files.files];
    const resultFiles: string[] = [];
    let metadata = readMetadata();
    for (const file of uploadedFiles) {
      if (!file) continue;
      const f = file as FormidableFile;
      const originalName = f.originalFilename || f.newFilename;
      const finalName = getAvailableFileName(uploadsDir, originalName);
      const finalPath = path.join(uploadsDir, finalName);
      await fs.promises.rename(f.filepath, finalPath);
      resultFiles.push(finalName);
      metadata.push({ name: finalName, tag });
    }
    writeMetadata(metadata);
    res.status(200).json({ success: true, files: resultFiles });
  });
} 