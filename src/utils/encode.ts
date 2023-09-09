export function base64ToBytes(base64: string) {
  if (typeof base64 === 'string') {
    const binString: string = atob(base64);
    // TYPE FOR THIS NOT ANY
    return Uint8Array.from(binString, (m: any) => m.codePointAt(0));
  }
}

export function decodeFromUint8Array(str: string) {
  const decodedContent = new TextDecoder().decode(base64ToBytes(str));
  return decodedContent;
}
