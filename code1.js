const assert = {
  strictEqual: function (a, b, msg = "") {
    const message = a === b ? "-" : " ERROR " + msg;
    console.log(message);
  },
};

// Count the number of Duplicates
// Write a function that will return the count of distinct case-insensitive alphabetic characters and numeric digits that occur more than once in the input string. The input string can be assumed to contain only alphabets (both uppercase and lowercase) and numeric digits.

// Example
// "abcde" -> 0 # no characters repeats more than once
// "aabbcde" -> 2 # 'a' and 'b'
// "aabBcde" -> 2 # 'a' occurs twice and 'b' twice (`b` and `B`)
// "indivisibility" -> 1 # 'i' occurs six times
// "Indivisibilities" -> 2 # 'i' occurs seven times and 's' occurs twice
// "aA11" -> 2 # 'a' and '1'
// "ABBA" -> 2 # 'A' and 'B' each occur twice

function duplicateCount(text) {
  text = text.toUpperCase();
  const multiples = [];
  while (text.length > 1) {
    let c0 = text[0];
    text = text.slice(1);
    if (multiples.includes(c0)) continue;
    if (text.includes(c0)) {
      multiples.push(c0);
    }
  }
  return multiples.length;
}

// assert.strictEqual(duplicateCount(""), 0);
// assert.strictEqual(duplicateCount("abcde"), 0);
// assert.strictEqual(duplicateCount("aabbcde"), 2);
// assert.strictEqual(duplicateCount("aabBcde"), 2, "should ignore case");
// assert.strictEqual(duplicateCount("Indivisibility"), 1);
// assert.strictEqual(
//   duplicateCount("Indivisibilities"),
//   2,
//   "characters may not be adjacent"
// );

/**************************************************************/

// Well met with Fibonacci bigger brother, AKA Tribonacci.
// As the name may already reveal, it works basically like a Fibonacci, but summing the last 3 (instead of 2) numbers of the sequence to generate the next. And, worse part of it, regrettably I won't get to hear non-native Italian speakers trying to pronounce it :(
// So, if we are to start our Tribonacci sequence with [1, 1, 1] as a starting input (AKA signature), we have this sequence:
// [1, 1 ,1, 3, 5, 9, 17, 31, ...]
// But what if we started with [0, 0, 1] as a signature? As starting with [0, 1] instead of [1, 1] basically shifts the common Fibonacci sequence by once place, you may be tempted to think that we would get the same sequence shifted by 2 places, but that is not the case and we would get:
// [0, 0, 1, 1, 2, 4, 7, 13, 24, ...]
// Well, you may have guessed it by now, but to be clear: you need to create a fibonacci function that given a signature array/list, returns the first n elements - signature included of the so seeded sequence.
// Signature will always contain 3 numbers; n will always be a non-negative number; if n == 0, then return an empty array (except in C return NULL) and be ready for anything else which is not clearly specified ;)

function tribonacci(signature, n) {
  const result = [...signature];
  result.length = n;
  for (let i = signature.length; i < result.length; i++) {
    result[i] = result[i - 3] + result[i - 2] + result[i - 1];
  }
  return result;
}

// console.log(tribonacci([1, 1, 1], 10));
// console.log(tribonacci([0, 0, 1], 10));
// console.log(tribonacci([0, 1, 1], 10));
// console.log(tribonacci([1, 0, 0], 10));
// console.log(tribonacci([0, 0, 0], 10));
// console.log(tribonacci([1, 2, 3], 10));
// console.log(tribonacci([3, 2, 1], 10));
// console.log(tribonacci([1, 1, 1], 1));
// console.log(tribonacci([300, 200, 100], 0));

/************** RGB to Hex conversion ************/

// The rgb function is incomplete. Complete it so that passing in RGB decimal values will result in a hexadecimal representation being returned. Valid decimal values for RGB are 0 - 255. Any values that fall out of that range must be rounded to the closest valid value.
// Note: Your answer should always be 6 characters long, the shorthand with 3 will not work here.

function assureLimit(nr) {
  if (nr < 0) return 0;
  if (nr > 255) return 255;
  return Math.round(nr);
}
function toHex(int) {
  return (int < 16 ? "0" : "") + int.toString(16).toUpperCase();
}
function rgb(r, g, b) {
  return toHex(assureLimit(r)) + toHex(assureLimit(g)) + toHex(assureLimit(b));
}

/******************** Break camelCase **************************/

// Complete the solution so that the function will break up camel casing, using a space between words.
// Example
// "camelCasing"  =>  "camel Casing"
// "identifier"   =>  "identifier"
// ""             =>  ""
function isSpace(c) {
  return c === " " || c === "\t" || c === "\n" || c === "\r";
}
function solution(string) {
  let preSpace = string.length > 0 && isSpace(string[0]);
  for (let i = 1; i < string.length; i++) {
    let c = string.charAt(i);
    if (isSpace(c)) {
      preSpace = true;
      continue;
    }
    if (!preSpace && c === c.toUpperCase()) {
      string = string.slice(0, i) + " " + string.slice(i);
      i++;
    }
    preSpace = false;
  }
  return string;
}
// assert.strictEqual(solution(""), "");
// assert.strictEqual(solution("camelCasing"), "camel Casing");
// assert.strictEqual(solution("cam TelCasingTest"), "cam Tel Casing Test");

/************************* Simple Pig Latin *********************************/
// Move the first letter of each word to the end of it, then add "ay" to the end of the word. Leave punctuation marks untouched.
// Examples
// pigIt('Pig latin is cool'); // igPay atinlay siay oolcay
// pigIt('Hello world !');     // elloHay orldway !

//period, question mark, exclamation point, comma, colon, semicolon, dash, hyphen, brackets, braces, parentheses, apostrophe, quotation mark, and ellipsis
function isWordSep(c) {
  return " \t\n\r.?!:;-[]{}()'^`´\"".includes(c);
}

function pigIt(str) {
  const words = [];
  let wordBegIx = 0;
  for (let i = 0; i <= str.length; i++) {
    if (i === str.length || isWordSep(str.charAt(i))) {
      if (wordBegIx === i) {
        if (i < str.length) words.push(str.charAt(i));
        wordBegIx = i + 1;
        continue;
      }

      let word =
        str.slice(wordBegIx + 1, i) +
        str.charAt(wordBegIx) +
        "ay" +
        (i === str.length ? "" : str.charAt(i));
      words.push(word);
      wordBegIx = i + 1;
    }
  }
  return words.join("");

  //str.split(/(\.|\s)+/g);
}
// console.log(pigIt("ab...c def  ghi.jkl    DEF..."));
// console.log(pigIt("Pig latin is cool"));
// console.log(pigIt("This is my string"));
