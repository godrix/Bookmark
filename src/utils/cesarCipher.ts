export function cesarCipher(str: string, shift: number) {
  const alphabet = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVXYZ'.split(
    '',
  );
  const shiftedAlphabet = alphabet
    .map(letter => {
      const index = alphabet.indexOf(letter);
      return index >= 0 ? alphabet[(index + shift) % alphabet.length] : letter;
    })
    .join('');
  return str.replace(
    /[a-z]/gi,
    match => shiftedAlphabet[alphabet.indexOf(match)],
  );
}
