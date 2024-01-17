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

/*************************** The Hashtag Generator ********************************/

// The marketing team is spending way too much time typing in hashtags.
// Let's help them with our own Hashtag Generator!

// Here's the deal:

// It must start with a hashtag (#).
// All words must have their first letter capitalized.
// If the final result is longer than 140 chars it must return false.
// If the input or the result is an empty string it must return false.
// Examples
// " Hello there thanks for trying my Kata"  =>  "#HelloThereThanksForTryingMyKata"
// "    Hello     World   "                  =>  "#HelloWorld"
// ""                                        => false

function generateHashtag(str) {
  const words = str.split(" ");
  for (let i = 0; i < words.length; i++) {
    if (words[i].length > 0)
      words[i] = words[i][0].toUpperCase() + words[i].slice(1);
  }
  const join = words.join("");
  return join.length < 1 || 140 <= join.length ? false : "#" + join;
}

// assert.strictEqual(
//   generateHashtag(""),
//   false,
//   "Expected an empty string to return false"
// );
// assert.strictEqual(
//   generateHashtag(" ".repeat(200)),
//   false,
//   "Still an empty string"
// );
// assert.strictEqual(
//   generateHashtag("Do We have A Hashtag"),
//   "#DoWeHaveAHashtag",
//   "Expected a Hashtag (#) at the beginning."
// );
// assert.strictEqual(
//   generateHashtag("Codewars"),
//   "#Codewars",
//   "Should handle a single word."
// );
// assert.strictEqual(
//   generateHashtag("Codewars Is Nice"),
//   "#CodewarsIsNice",
//   "Should remove spaces."
// );
// assert.strictEqual(
//   generateHashtag("Codewars is nice"),
//   "#CodewarsIsNice",
//   "Should capitalize first letters of words."
// );
// assert.strictEqual(
//   generateHashtag("code" + " ".repeat(140) + "wars"),
//   "#CodeWars"
// );
// assert.strictEqual(
//   generateHashtag(
//     "Looooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooong Cat"
//   ),
//   false,
//   "Should return false if the final word is longer than 140 chars."
// );
// assert.strictEqual(
//   generateHashtag("a".repeat(139)),
//   "#A" + "a".repeat(138),
//   "Should work"
// );
// assert.strictEqual(generateHashtag("a".repeat(140)), false, "Too long");

/******************** Pete, the baker ****************************/

// Pete likes to bake some cakes. He has some recipes and ingredients. Unfortunately he is not good in maths. Can you help him to find out, how many cakes he could bake considering his recipes?
// Write a function cakes(), which takes the recipe (object) and the available ingredients (also an object) and returns the maximum number of cakes Pete can bake (integer). For simplicity there are no units for the amounts (e.g. 1 lb of flour or 200 g of sugar are simply 1 or 200). Ingredients that are not present in the objects, can be considered as 0.
// Examples:
// // must return 2
// cakes({flour: 500, sugar: 200, eggs: 1}, {flour: 1200, sugar: 1200, eggs: 5, milk: 200});
// // must return 0
// cakes({apples: 3, flour: 300, sugar: 150, milk: 100, oil: 100}, {sugar: 500, flour: 2000, milk: 2000});

function cakes(recipe, available) {
  const ingrid = [];
  const avail = [];
  for (ingr in recipe) {
    let i = recipe[ingr];
    if (i <= 0) continue;
    ingrid.push(i);
    let a = available[ingr];
    avail.push(typeof a == "number" ? a : 0);
  }
  let min = Number.MAX_VALUE;
  for (let i = 0; i < ingrid.length; i++) {
    let max = avail[i] / ingrid[i];
    if (max < min) min = max;
  }

  return Math.floor(min);
}

// let recipe = { flour: 500, sugar: 200, eggs: 1 };
// let available = { flour: 1200, sugar: 1200, eggs: 5, milk: 200 };
// assert.strictEqual(cakes(recipe, available), 2);

// recipe = { apples: 3, flour: 300, sugar: 150, milk: 100, oil: 100 };
// available = { sugar: 500, flour: 2000, milk: 2000 };
// assert.strictEqual(cakes(recipe, available), 0);

/********************** Rot13 ***************************/
// ROT13 is a simple letter substitution cipher that replaces a letter with the letter 13 letters after it in the alphabet. ROT13 is an example of the Caesar cipher.
// Create a function that takes a string and returns the string ciphered with Rot13. If there are numbers or special characters included in the string, they should be returned as they are. Only letters from the latin/english alphabet should be shifted, like in the original Rot13 "implementation".

function rot13(message) {
  const a = "a".charCodeAt(0);
  const z = "z".charCodeAt(0);
  const A = "A".charCodeAt(0);
  const Z = "Z".charCodeAt(0);
  const nLett = z - a + 1;
  const result = Array(message.length);
  for (let i = 0; i < message.length; i++) {
    let cc = message.charCodeAt(i);
    if (a <= cc && cc <= z) cc = ((cc + 13 - a) % nLett) + a;
    else if (A <= cc && cc <= Z) cc = ((cc + 13 - A) % nLett) + A;
    result[i] = String.fromCharCode(cc);
  }
  return result.join("");
}

/*************************Sum of Digits / Digital Root*************************************/

// Digital root is the recursive sum of all the digits in a number.
// Given n, take the sum of the digits of n. If that value has more than one digit, continue reducing in this way until a single-digit number is produced. The input will be a non-negative integer.
// Examples
//     16  -->  1 + 6 = 7
//    942  -->  9 + 4 + 2 = 15  -->  1 + 5 = 6
// 132189  -->  1 + 3 + 2 + 1 + 8 + 9 = 24  -->  2 + 4 = 6
// 493193  -->  4 + 9 + 3 + 1 + 9 + 3 = 29  -->  2 + 9 = 11  -->  1 + 1 = 2
function digitalRoot(n) {
  while (n >= 10) n = (n % 10) + digitalRoot(Math.floor(n / 10));
  return n;
}
// function digitalRoot(n) {
//   let sod = sumOfDigits(n);
//   if (sod < 10) return sod;
//   return digitalRoot(sod);
// }
// function sumOfDigits(n) {
//   if (n < 10) return n;
//   return (n % 10) + sumOfDigits(Math.floor(n / 10));
// }
// console.log(digitalRoot(16));
// console.log(digitalRoot(942));
// console.log(digitalRoot(132189));
// console.log(digitalRoot(493193));

/**************** Smallest Possible Sum ***************************************/
// Given an array X of positive integers, its elements are to be transformed by running the following operation on them as many times as required:

// if X[i] > X[j] then X[i] = X[i] - X[j]

// When no more transformations are possible, return its sum ("smallest possible sum").

// For instance, the successive transformation of the elements of input X = [6, 9, 21] is detailed below:

// X_1 = [6, 9, 12] # -> X_1[2] = X[2] - X[1] = 21 - 9
// X_2 = [6, 9, 6]  # -> X_2[2] = X_1[2] - X_1[0] = 12 - 6
// X_3 = [6, 3, 6]  # -> X_3[1] = X_2[1] - X_2[0] = 9 - 6
// X_4 = [6, 3, 3]  # -> X_4[2] = X_3[2] - X_3[1] = 6 - 3
// X_5 = [3, 3, 3]  # -> X_5[1] = X_4[0] - X_4[1] = 6 - 3
// The returning output is the sum of the final transformation(here 9).

function smallestSum(numbers) {
  if (numbers.length < 2) return numbers.length === 1 ? numbers[0] : 0;

  let mi = Math.min(...numbers);
  let miIx = numbers.indexOf(mi);
  for (let i = 0; i < numbers.length; i++) {
    if (i === miIx) continue;
    let n = numbers[i];
    let rest;
    while ((rest = n % mi) !== 0) {
      n = mi;
      mi = rest;
    }
    if (mi === 1) return numbers.length;
    numbers[i] = numbers[miIx] = mi;
  }
  return mi * numbers.length;
}

// let sol = smallestSum([6, 9, 21]);
// console.log(typeof sol, sol);
