function getUint16(view: DataView, offset: number) {
  return view.getUint16(offset, true);
}

function getUint32(view: DataView, offset: number) {
  return view.getUint32(offset, true);
}

function decodeXmlText(xml: string) {
  return xml
    .replace(/<w:tab\/>/g, " ")
    .replace(/<\/w:p>/g, "\n")
    .replace(/<[^>]+>/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/\s+/g, " ")
    .trim();
}

async function inflateRaw(bytes: Uint8Array) {
  if (!("DecompressionStream" in globalThis)) {
    throw new Error(
      "This browser cannot extract DOCX files. Paste the resume text instead."
    );
  }

  // Create a copy so Blob receives a valid Uint8Array.
  const copy = Uint8Array.from(bytes);

  const stream = new Blob([copy])
    .stream()
    .pipeThrough(new DecompressionStream("deflate-raw"));

  const buffer = await new Response(stream).arrayBuffer();

  return new Uint8Array(buffer);
}

async function extractDocxText(file: File) {
  const buffer = await file.arrayBuffer();
  const view = new DataView(buffer);
  const bytes = new Uint8Array(buffer);

  let endDirectoryOffset = -1;

  for (let offset = bytes.length - 22; offset >= 0; offset--) {
    if (getUint32(view, offset) === 0x06054b50) {
      endDirectoryOffset = offset;
      break;
    }
  }

  if (endDirectoryOffset === -1) {
    throw new Error(
      "Could not read this DOCX file. Paste the resume text instead."
    );
  }

  const centralDirectoryOffset = getUint32(view, endDirectoryOffset + 16);
  const totalEntries = getUint16(view, endDirectoryOffset + 10);

  const decoder = new TextDecoder();
  let cursor = centralDirectoryOffset;

  for (let index = 0; index < totalEntries; index++) {
    if (getUint32(view, cursor) !== 0x02014b50) {
      break;
    }

    const compressionMethod = getUint16(view, cursor + 10);
    const compressedSize = getUint32(view, cursor + 20);

    const nameLength = getUint16(view, cursor + 28);
    const extraLength = getUint16(view, cursor + 30);
    const commentLength = getUint16(view, cursor + 32);

    const localHeaderOffset = getUint32(view, cursor + 42);

    const fileName = decoder.decode(
      bytes.slice(cursor + 46, cursor + 46 + nameLength)
    );

    if (fileName === "word/document.xml") {
      const localNameLength = getUint16(view, localHeaderOffset + 26);
      const localExtraLength = getUint16(view, localHeaderOffset + 28);

      const dataStart =
        localHeaderOffset + 30 + localNameLength + localExtraLength;

      const compressedBytes = bytes.slice(
        dataStart,
        dataStart + compressedSize
      );

      const documentBytes =
        compressionMethod === 0
          ? compressedBytes
          : await inflateRaw(compressedBytes);

      return decodeXmlText(decoder.decode(documentBytes));
    }

    cursor += 46 + nameLength + extraLength + commentLength;
  }

  throw new Error(
    "Could not find resume text in this DOCX file. Paste the resume text instead."
  );
}

async function extractPdfText(file: File) {
  const text = await file.text();

  const decoded = text
    .replace(/\\\(/g, "__LEFT_PAREN__")
    .replace(/\\\)/g, "__RIGHT_PAREN__");

  const textChunks = Array.from(
    decoded.matchAll(/\(([^()]{2,})\)/g)
  )
    .map((match) => match[1])
    .join(" ")
    .replace(/__LEFT_PAREN__/g, "(")
    .replace(/__RIGHT_PAREN__/g, ")")
    .replace(/\\n|\\r/g, " ")
    .replace(/\s+/g, " ")
    .trim();

  if (textChunks.length < 40) {
    throw new Error(
      "This PDF text could not be extracted reliably. Paste the resume text for the best ATS score."
    );
  }

  return textChunks;
}

export async function extractResumeText(file: File) {
  const extension = file.name.split(".").pop()?.toLowerCase();

  switch (extension) {
    case "docx":
      return extractDocxText(file);

    case "pdf":
      return extractPdfText(file);

    default:
      return file.text();
  }
}