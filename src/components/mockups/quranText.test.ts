import { AL_FATIHA, BISMILLAH } from './quranText';

describe('AL_FATIHA', () => {
  it('has all seven ayat, numbered in order', () => {
    expect(AL_FATIHA.map((a) => a.number)).toEqual(['١', '٢', '٣', '٤', '٥', '٦', '٧']);
  });

  it('never puts a vowel mark after a shadda (A Thuluth drops the shadda in that order)', () => {
    for (const { text } of AL_FATIHA) expect(text).not.toMatch(/ّ[ً-ِ]/);
  });

  it('uses no Uthmani small alif (A Thuluth draws it as a fatha)', () => {
    for (const { text } of AL_FATIHA) expect(text).not.toMatch(/ٰ/);
  });

  it('exposes the Bismillah as the first ayah', () => {
    expect(BISMILLAH).toBe(AL_FATIHA[0]!.text);
  });
});
