import { withoutVowels } from './arabic';

describe('withoutVowels', () => {
  it('removes fatha, damma, kasra, sukun and tanween', () => {
    expect(withoutVowels('حِفْظ')).toBe('حفظ');
    expect(withoutVowels('قَاعِدَة')).toBe('قاعدة');
    expect(withoutVowels('دُعَاء')).toBe('دعاء');
    expect(withoutVowels('كِتَابٌ')).toBe('كتاب');
  });

  it('keeps the shadda, which changes the word', () => {
    expect(withoutVowels('مُعَلِّمُ الْفُرْقَان')).toBe('معلّم الفرقان');
    expect(withoutVowels('تَعَلَّمَ')).toBe('تعلّم');
  });

  it('leaves unvowelled text and other scripts unchanged', () => {
    expect(withoutVowels('قارئ ومعلّم القرآن')).toBe('قارئ ومعلّم القرآن');
    expect(withoutVowels('Hifz')).toBe('Hifz');
  });
});
