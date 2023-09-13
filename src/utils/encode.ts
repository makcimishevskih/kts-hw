export function base64ToBytes(base64: string) {
  if (typeof base64 === 'string') {
    const binString: string = atob(base64);

    return Uint8Array.from(binString, (m) => m.codePointAt(0) as number);
  }
}

export function decodeFromUint8Array(str: string) {
  const decodedContent = new TextDecoder().decode(base64ToBytes(str));
  return decodedContent;
}
