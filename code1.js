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
                str.slice(wordBegIx + 1, i) + str.charAt(wordBegIx) + "ay" + (i === str.length ? "" : str.charAt(i));
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
        if (words[i].length > 0) words[i] = words[i][0].toUpperCase() + words[i].slice(1);
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

/***************** Find the unknown digit ******************************/
function zeroAllowed(...numStrs) {
    for (let numStr of numStrs) {
        if ((numStr.startsWith("?") && numStr.length > 1) || (numStr.startsWith("-?") && numStr.length > 2)) {
            return false;
        }
    }
    return true;
}

function candidateDigits(...numStrs) {
    let digits = [];
    let all = numStrs.join("");
    for (let d = zeroAllowed(...numStrs) ? 0 : 1; d < 10; d++) {
        let dstr = d.toString();
        if (all.includes(dstr)) continue;
        digits.push(dstr);
    }
    return digits;
}

function getParts(exp) {
    let operation, result;
    [operation, result] = exp.split("=");

    let ops = ["+", "*", "-"];
    let opfunc = [(a, b) => a + b, (a, b) => a * b, (a, b) => a - b];
    let op, op1, op2, opIx;
    for (let i = 0; i < ops.length; i++) {
        if ((opIx = operation.indexOf(ops[i], 1)) > 0) {
            op = opfunc[i];
            op1 = operation.slice(0, opIx);
            op2 = operation.slice(opIx + 1); //operation.split(opx);
            break;
        }
    }
    return [op1, op, op2, result];
}

function replQmToInt(dStr, ...numStrs) {
    const result = [];
    for (let numStr of numStrs) {
        result.push(parseInt(numStr.replaceAll("?", dStr)));
    }
    return result;
}

function findDigit(exp) {
    [op1, op, op2, result] = getParts(exp);

    if (!op1 || !op || !op2 || !result) return -1;

    const candidates = candidateDigits(op1, op2, result);

    for (let digit of candidates) {
        let ints = replQmToInt(digit, op1, op2, result);
        if (op(ints[0], ints[1]) === ints[2]) {
            return parseInt(digit);
        }
    }

    return -1;
}

//console.log(findDigit("123*45?=5?088"));
// console.log(findDigit("-5?*-1=5?")); //, 0],
// // console.log(findDigit("19--45=5?")); //, -1],
// console.log(findDigit("-?56373--9216=-?47157"));
// console.log(findDigit("??*??=302?")); //, 5],
// console.log(findDigit("?*11=??")); //, 2],
// console.log(findDigit("??*1=??")); //, 2],
// console.log(findDigit("??+??=??")); //, -1];

/*********************** Take a Ten Minutes Walk *****************************/

function isValidWalk(walk) {
    if (walk.length !== 10) return false;
    let ns = 0;
    let ew = 0;
    let err = 0;
    walk.forEach(dir => {
        switch (dir[0]) {
            case "n":
                ns++;
                break;
            case "s":
                ns--;
                break;
            case "e":
                ew++;
                break;
            case "w":
                ew--;
                break;
            default:
                err++;
        }
    });
    return ns === 0 && ew === 0 && err === 0;
}

/********************* Mexican Wave *****************************/

function wave(str) {
    const mxw = [];
    const ws = wave.split("");
    for (let i = 0; i < ws; i++) {
        let c = ws[i];
        if (c === " ") continue;
        ws[i] = c.toUpperCase();
        mxw.push(ws.join(""));
        ws[i] = c;
    }
    return mxw;
}

/************************* Strip Comments **********************************/
// const rxCh = "+*$ \\";
// for (let m = 0; m < markers.length; m++) {if ()}

function stripComments(text, markers) {
    const lines = text.split("\n");
    const marksRe = new RegExp("[" + markers.map(m => "\\" + m).join("") + "]");
    const stripedLines = lines.map(l => {
        let match = l.match(marksRe);
        let stLi = l;
        if (match) {
            stLi = l.slice(0, match["index"]);
        }
        return stLi.trimEnd();
    });
    return stripedLines.join("\n");
}

// //var result = solution("apples, pears # and bananas\ngrapes\nbananas !apples", ["#", "!"])
// console.log(stripComments("apples, pears # and bananas\ngrapes\nbananas !apples", ["#", "!"]))
// console.log(stripComments('aa + bb\ncc - dd\nee * ff', ['+', '-', '*']));
// let re = new RegExp("[#!]");
// let m = "apples, pears and bananas\ngrapes\nbananas apples".match(re);
// console.log("apples, pears and bananas\ngrapes\nbananas apples".split("\n"));
// console.log(m);
// console.log(m?m["index"]:null);

/************************* Snail **********************************/

const snail0 = function (array) {
    if (array.length === 1 && !array[0].length) return [];
    const res = Array(array.length * array.length);

    let dir = 0;
    let rc = [0, 0];
    let rcIx = 1;
    const step = [1, 1, -1, -1];
    const lim = [array.length, array.length, -1, 0];

    for (let count = 0; count < res.length; count++) {
        res[count] = array[rc[0]][rc[1]];

        if (rc[rcIx] + step[dir] === lim[dir]) {
            lim[dir] -= step[dir];
            dir = (dir + 1) % 4;
            rcIx = (rcIx + 1) % 2;
        }

        rc[rcIx] += step[dir];
    }

    return res;
};
const snail = function (array) {
    let result = [];

    while (array.length && array[0].length) {
        result.push(...array[0]);
        array.shift();

        if (!array.length) break;

        array.forEach(r => {
            result.push(r.at(-1));
            r.pop();
        });

        result.push(...array.at(-1).reverse());
        array.pop();

        for (i = array.length - 1; i >= 0; i--) {
            result.push(array[i][0]);
            array[i].shift();
        }
    }

    return result;
};

//let array = [[1, 2, 3], [8, 9, 4], [7, 6, 5]];
// let array = [[1, 2, 3, 4],
// [12, 13, 14, 5],
//   [11, 16, 15, 6],
// [10,9,8,7]];
//console.log(snail(array)); //=> [1,2,3,4,5,6,7,8,9]

/********************* Vigenère Cipher Helper *********************/

function VigenèreCipher(key, abc) {
    this.prepKey = function (key, abc) {
        const pk = key.split("");
        for (let i = 0; i < pk.length; i++) {
            pk[i] = abc.indexOf(pk[i]);
            if (pk[i] < 0) pk[i] = 0;
        }
        return pk;
    };

    this.abc = abc;
    this.key = this.prepKey(key, abc);

    this.encode = function (str) {
        const sa = str.split("");
        const kl = key.length;
        for (let i = 0; i < sa.length; i++) {
            let abcIx = this.abc.indexOf(sa[i]);
            if (abcIx >= 0) {
                sa[i] = abc.at((abcIx + this.key[i % kl]) % this.abc.length);
            }
        }
        return sa.join("");
    };
    this.decode = function (str) {
        const sa = str.split("");
        const kl = key.length;
        for (let i = 0; i < sa.length; i++) {
            let abcIx = this.abc.indexOf(sa[i]);
            if (abcIx >= 0) {
                if ((abcIx -= this.key[i % kl]) < 0) abcIx += this.abc.length;
                sa[i] = abc.at(abcIx);
            }
        }
        return sa.join("");
    };
}

// var abc, key;
// abc = "abcdefghijklmnopqrstuvwxyz";
// key = "password";
// let vc = new VigenèreCipher(key, abc);
// let enc = vc.encode("codewars"); //, 'rovwsoiv'
// let dec = vc.decode("rovwsoiv");
// console.log(enc, dec);

/********************* Hamming Numbers ********************************/

const hn = []; // Array(6000);
const hnIn = []; // Array(6000);
const tree = [[[]]];
const weight = [1, Math.log2(3), Math.log2(5)];
hn[0] = [0, 0, 0, 0, 0]; //[2s,3s,5s,ix,weight]
tree[0][0][0] = hn[0];
let nrHn = 1;

function hamming(n) {
    if (n <= nrHn) return getHammingNr(hn[n - 1]);

    const nxC = Array(3).fill(null);

    while (nrHn < n) {
        let last = hn[nrHn - 1];
        for (let di = 0; di < 3; di++) {
            if (nxC[di]) continue;
            nxC[di] = getNextHn235(di, last);
        }
        let minIx = nxC[0][4] < nxC[1][4] ? (nxC[0][4] < nxC[2][4] ? 0 : 2) : nxC[1][4] < nxC[2][4] ? 1 : 2;
        nxC[minIx][3] = nrHn;
        hn[nrHn++] = nxC[minIx];
        if (!tree[nxC[minIx][0]]) {
            tree[nxC[minIx][0]] = Array(nxC[minIx][1] + 1);
        }
        if (!tree[nxC[minIx][0]][nxC[minIx][1]]) {
            tree[nxC[minIx][0]][nxC[minIx][1]] = Array(nxC[minIx][2] + 1);
        }
        tree[nxC[minIx][0]][nxC[minIx][1]][nxC[minIx][2]] = nxC[minIx];

        resetNextD(nxC[minIx][4], nxC);
    }
    return getHammingNr(hn[n - 1]);
}

function getNextHn235(dix, last) {
    let xix;
    if (last[dix] > 0) {
        last[dix]--;
        xix = tree[last[0]][last[1]][last[2]][3] + 1;
        last[dix]++;
    } else {
        xix = findClosestAbove(last[4] - weight[dix]);
    }
    const nxC = hn[xix].slice();
    nxC[dix]++;
    setWeight(nxC);
    return nxC;
}
function aboutSame(a, b) {
    return Math.abs(a - b) < 0.000001;
}
function resetNextD(minWeight, nxC) {
    for (let i = 0; i < 3; i++) {
        if (aboutSame(nxC[i][4], minWeight)) nxC[i] = null;
    }
}
function findClosestAbove(wgt) {
    let min = 0;
    let max = nrHn - 1;
    let ix = min;
    while (min <= max) {
        ix = Math.floor((min + max) / 2);
        if (hn[ix][4] < wgt) {
            min = ix + 1;
        } else if (hn[ix][4] > wgt) {
            max = ix - 1;
        } else {
            return ix;
        }
    }
    return hn[ix][4] > wgt + 0.000001 ? ix : ix + 1;
}

function setWeight(hnx) {
    hnx[4] = hnx[0] + weight[1] * hnx[1] + weight[2] * hnx[2];
}
function getHammingNr(hnx) {
    return Math.pow(2, hnx[0]) * Math.pow(3, hnx[1]) * Math.pow(5, hnx[2]);
}

// console.log(hamming(1));
// console.log(hamming(3));
// console.log(hamming(4));
// console.log(hamming(6));
// console.log(hamming(10));
// console.log(hamming(5500));

// function hamming1(n) {
//     if (n < nrHn) return hn[n - 1];
//     while (nrHn < n && nrHn < hn.length) {
//         let last = hn[nrHn - 1];
//         const nxC = [];
//         for (let di = 0; di < 3; di++) {
//             const d = [2, 3, 5][di];
//             const hnd = last / d;
//             const ixd = findHamming(hnd, nrHn - 1) + 1;
//             nxC.push(hn[ixd]);
//         }
//     }
//     return nrHn < hn.length ? hn[n - 1] : NaN;
// }

// function hamming0(n) {
//     if (n < nrHn) return hn[n - 1];
//     for (; nrHn < n && nrHn < hn.length; nrHn++) {
//         let chn = hn[nrHn - 1];
//         let found = false;
//         while (!found) {
//             chn++;
//             for (let di = 0; di < 3; di++) {
//                 const d = [2, 3, 5][di];
//                 const hnd = chn / d;
//                 if (Number.isInteger(hnd)) {
//                     const hndIx = findHamming(hnd, nrHn - 1);
//                     if (hndIx >= 0) {
//                         hn[nrHn] = chn;
//                         hnIn[nrHn] = hnIn[hndIx].slice();
//                         hnIn[nrHn][di]++;
//                         found = true;
//                         break;
//                     }
//                 }
//             }
//         }
//     }
//     return nrHn < hn.length ? hn[n - 1] : NaN;
// }

// function findHamming(hnx, max) {
//     let min = 0;
//     while (min <= max) {
//         let ix = Math.floor((min + max) / 2);
//         if (hn[ix] < hnx) {
//             min = ix + 1;
//         } else if (hn[ix] > hnx) {
//             max = ix - 1;
//         } else {
//             return ix;
//         }
//     }
//     return hn[ix] > hnx ? ix - 1 : ix;
// }

//hamming(103) should be 1728
//console.log("hamming(103)=", hamming(103));

/********************* Large Factorials ******************************/

// const factorials = [0n, 1n, 2n, 6n, 24n, 120n, 720n];

// function factorial(n) {
//     if (n < factorials.length) return factorials[n];

//     factorials[n] = BigInt(n) * factorial(n - 1);
//     return factorials[n];
// }

// console.log(factorial(100));
// console.log(factorials);

const base = 1000000;
const positionLen = 6;

const factorials = [[1], [1], [2], [6], [24], [120], [720], [5040], [40320], [362880]];

function factorial(n) {
    const result = factorial0(n);
    const extraZeros = "0000000000000000000000000000000000000000000000000";
    let string = "";
    for (let i = result.length - 1; i >= 0; i--) {
        if (string.length === 0 && result[i] === 0) continue;
        let digsI = result[i].toString();
        let lenDif = positionLen - digsI.length;
        if (string.length > 0 && lenDif > 0) digsI = extraZeros.slice(0, lenDif) + digsI;
        string += digsI;
    }
    return string.length > 0 ? string : "0";
}

function multiply(a, b) {
    const result = Array(a.length + b.length).fill(0);
    for (let ia = 0; ia < a.length; ia++) {
        for (let ib = 0; ib < b.length; ib++) {
            result[ia + ib] += a[ia] * b[ib];
        }
    }
    for (let i = 0; i < result.length; i++) {
        let overflow = Math.floor(result[i] / base);
        result[i] %= base;
        if (overflow > 0) {
            result[i + 1] += overflow;
        }
    }

    let i = result.length - 1;
    while (result.length && result[result.length - 1] === 0) result.pop();

    return result;
}

function factorial0(n) {
    //Assuming n < base
    if (n < factorials.length) return factorials[n];

    factorials[n] = multiply(factorial0(n - 1), [n]);
    return factorials[n];
}

//console.log(multiply([79, 3], [64, 8]));
// console.log(factorial(10));
// console.log(factorial(11));
// console.log(factorial(12));
// console.log(factorial(15));
