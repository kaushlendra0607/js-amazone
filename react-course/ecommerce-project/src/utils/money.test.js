import { it, expect, describe } from 'vitest';//it creates a test
import { formatMoney } from './money';
//in terminal we have to be in the right directory first
//then run "npx vitest" this command will check for all files that end with .test.js
//withing it we describe test name and its role with test's body
//a group of tests is called a test suit and describe creates a test suit
describe('formatmoney', () => {
    it('Checks if 1999 cents is equal to 19.19 $ after formatting', () => {
        expect(formatMoney(1999)).toBe("19.99");
    });
    it('Checks if two decimal places are displayed after formatting', () => {
        expect(formatMoney(1090)).toBe("10.90");
        expect(formatMoney(100)).toBe("1.00");
    });
});