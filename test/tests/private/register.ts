/* globals describe, it */
import TestCase from '../../testcase';
import { RegisterTypes } from '../../../src/assets/ts/register';


const INITIAL_CHARS = 'Hello World!';
const INITIAL_CHARS_ARRAY: string[] = getCharArray(INITIAL_CHARS);


describe('register tests', function () {
    describe('chars types', () => {
        it('default', async function () {
            let t = new TestCase([INITIAL_CHARS]);
            t.setRegister({ type: RegisterTypes.CHARS, saved: ['unchanged'] });
            t.sendKeys('v$y');
            t.expectRegister({ type: RegisterTypes.CHARS, saved: INITIAL_CHARS_ARRAY });
            await t.done();
        });
    });
});


function getCharArray(str: string) {
    const result: string[] = [];
    [].forEach.call(str, (char: string) => result.push(char));
    return result;
};
