/* globals describe, it */
import TestCase from '../../testcase';


const TEST_TARGET_DOCUMENT = [
  'Don’t be a fool.',
  'Don’t give up something important to hold onto someone who can’t even say they love you.',
  '— Sarah Dessen'
];
const TEST_TARGET_DOCUMENT_LENGTH = [
  16,
  88,
  14
];


describe('cursor tests', function () {
  it('detect first cursor point', async function () {
    await new TestCase(TEST_TARGET_DOCUMENT)
      .expectCursor(1, 0)
      .sendKeys('i')
      .expectCursor(1, 0)
      .sendKey('esc')
      .expectCursor(1, 0)
      .done();
  });

  it('get last cursor point of each line in ascending order (histerisis remained)', async function () {
    const FIRST = 0;
    const SECOND = 1;
    const THIRD = 2;
    await new TestCase(TEST_TARGET_DOCUMENT)
      .sendKey('$')
      .expectCursor(1, TEST_TARGET_DOCUMENT_LENGTH[FIRST] - 1)
      .sendKey('j')
      .expectCursor(2, TEST_TARGET_DOCUMENT_LENGTH[SECOND] - 1)
      .sendKey('j')
      .expectCursor(3, TEST_TARGET_DOCUMENT_LENGTH[THIRD] - 1)
      .done();
  });
});
