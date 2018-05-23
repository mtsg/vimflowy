/* globals describe, it */
import TestCase from '../../testcase';
import { RegisterTypes } from '../../../src/assets/ts/register';


const INITIAL_CHARS = 'Hello World!';
const INITIAL_FIRST_WORD = 'Hello ';


describe('register tests', function () {
    describe('none types', () => {
        it('none', async function () {
            await new TestCase([INITIAL_CHARS])
                .setRegister({ type: RegisterTypes.NONE, saved: null })
                .sendKeys('12x')
                .expectRegister({ type: RegisterTypes.CHARS, saved: getCharArray(INITIAL_CHARS) })
                .done();
        });
    });

    describe('chars types', () => {
        describe('cut', () => {
            it('12x', async function () {
                await new TestCase([INITIAL_CHARS])
                    .setRegister({ type: RegisterTypes.CHARS, saved: ['unchanged'] })
                    .sendKeys('12x')
                    .expectRegister({ type: RegisterTypes.CHARS, saved: getCharArray(INITIAL_CHARS) })
                    .done();
            });
        });

        describe('yank', () => {
            it('v$y', async function () {
                await new TestCase([INITIAL_CHARS])
                    .setRegister({ type: RegisterTypes.CHARS, saved: ['unchanged'] })
                    .sendKeys('v$y')
                    .expectRegister({ type: RegisterTypes.CHARS, saved: getCharArray(INITIAL_CHARS) })
                    .done();
            });
            it('y$', async function () {
                await new TestCase([INITIAL_CHARS])
                    .setRegister({ type: RegisterTypes.CHARS, saved: ['unchanged'] })
                    .sendKeys('y$')
                    .expectRegister({ type: RegisterTypes.CHARS, saved: getCharArray(INITIAL_CHARS) })
                    .done();
            });
            it('yw', async function () {
                await new TestCase([INITIAL_CHARS])
                    .setRegister({ type: RegisterTypes.CHARS, saved: ['unchanged'] })
                    .sendKeys('yw')
                    .expectRegister({ type: RegisterTypes.CHARS, saved: getCharArray(INITIAL_FIRST_WORD) })
                    .done();
            });
        });

        describe('delete', () => {
            it('v$d', async function () {
                await new TestCase([INITIAL_CHARS])
                    .setRegister({ type: RegisterTypes.CHARS, saved: ['unchanged'] })
                    .sendKeys('v$d')
                    .expectRegister({ type: RegisterTypes.CHARS, saved: getCharArray(INITIAL_CHARS) })
                    .done();
            });
            it('d$', async function () {
                await new TestCase([INITIAL_CHARS])
                    .setRegister({ type: RegisterTypes.CHARS, saved: ['unchanged'] })
                    .sendKeys('d$')
                    .expectRegister({ type: RegisterTypes.CHARS, saved: getCharArray(INITIAL_CHARS) })
                    .done();
            });
            it('dw', async function () {
                await new TestCase([INITIAL_CHARS])
                    .setRegister({ type: RegisterTypes.CHARS, saved: ['unchanged'] })
                    .sendKeys('dw')
                    .expectRegister({ type: RegisterTypes.CHARS, saved: getCharArray(INITIAL_FIRST_WORD) })
                    .done();
            });
        });
    });

    describe('serialized rows types', () => {
        describe('yank', () => {
            it('yy', async function () {
                await new TestCase([INITIAL_CHARS])
                    .setRegister({ type: RegisterTypes.CHARS, saved: ['unchanged'] })
                    .sendKeys('yy')
                    .expectRegister({ type: RegisterTypes.SERIALIZED_ROWS, saved: [getSerializedText(INITIAL_CHARS)] })
                    .done();
            });
        });
    });

    describe('cloned rows types', () => {
        describe('delete', () => {
            it('dd', async function () {
                await new TestCase([INITIAL_CHARS])
                    .setRegister({ type: RegisterTypes.CHARS, saved: ['unchanged'] })
                    .sendKeys('dd')
                    .expectRegisterType(RegisterTypes.CLONED_ROWS)
                    .expectRegister({ type: RegisterTypes.CLONED_ROWS, saved: [1] })
                    .done();
            });
        });
    });
});


function getCharArray(str: string) {
    const result: string[] = [];
    [].forEach.call(str, (char: string) => result.push(char));
    return result;
};

function getSerializedText(text: string) {
    return { text: text };
};
