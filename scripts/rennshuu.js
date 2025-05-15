

//第2章理解度チェック
/*
1.
  1) 大文字と小文字
  2) 半角文字
  3) ;
  4) // 

2. 263

*/


console.log(1 * true);
console.log();
console.log(false +  true);
console.log(Boolean(-1));

const TAX_RATE = 1.1;
let productPrice = 1000;

console.log("商品の金額は" + productPrice + "円ですので、税込み金額は" + productPrice * TAX_RATE + "円です");
console.log(`商品の金額は${productPrice}円ですので、税込み金額は ${productPrice * TAX_RATE}円です`);
console.log("testtext" - 1);

let num = ((12 ** 2) / 5 ) % 1;
console.log(num);

let bigNum = ((12n ** 2n) / 5n ) % 1n;
console.log(bigNum);

const counter = { num: 1 };
//window.alert(counter.num);
//window["alert"](counter.num);

console.log(typeof null);
console.log(1 + Number("hello"));
console.log(1 + Boolean("hello"));

console.log("-------");
console.log(2 * 3 ** 2); // 18
console.log(10/2 + (3 - 2)); // 6
console.log(10 / (2 + 3) - 2); // 0

let a = 1;
console.log(a++); // 1

let c = 10, b = 1;
console.log(--c * ++b); // 18

let person = { name: "Bob", age: "32", male: true };
delete person.name;
console.log(person); // Object { age: "32", male: true }
console.log(typeof person); // object
console.log(+person.age); // 32
console.log(!person.male); // false

let x;
console.log(x);

console.log((0 || undefined) && "こんにちは"); // returns undefined since both are falsy values when compared to the && statement
console.log(!(0 || undefined) && "こんにちは"); // returns konichiwa since the falsy values are inversed

console.log(null ? "apple" : "banana"); // returns banana since null is falsy so returns the right side statement
console.log(null ?? "applebanana"); // returns applebanana
console.log( { apple: "appuru" }?.fruit ?? "BANANA" ); // returns BANANA
// ?. to safely access the property only if the  object is not null or undefined
// fruit is not a property so undefined is returned
// ?? states that if the left-hand statement is null or undefined, reutnr the right side, hence BANANA
let val3 = "";
if (val3 == false) {
  val3 = "Hello";
}
console.log(val3);

let val2 = null;
if (val2 === undefined || val2 === null ) {
  val2 = "Hello";
}
console.log(val2);

let animal = "zou";

switch (animal) {
  case "rabbit":
    console.log("RABBIT");
    break;
  case "uma":
    console.log("UMAGON");
    console.log("RABBIT");
    break;
  case "zou":
    console.log("ZOU");
    console.log("UMAGON");
    console.log("RABBIT");
    break;
  default:
    console.log("NO ANIMAL");
    break;
}


try {
  let h = 10 + i;
  console.log(h);
} catch(error) {
  console.error(error);
  //console.log("i is not defined");
}	finally {
  console.log("後続の処理");
}

try {
  let greeting = 1;

  if (typeof greeting =="string" ){
    console.log({greeting}, "nice weather");
  } else {
    throw new Error("不正なデータ型です。");
  }

} catch(error) {
  console.log(error);
}

let i = 0;
console.log(i);

while (i < 6) {
  i += 2;
  console.log(i);
}

for(let i = 0; i <= 9; i += 3) {
  console.log(i);
}

const arr = [10, 20, 23, 47];
let sum = 0;
for( let i = 0; i < arr.length; i++){
  sum = arr[i];
}
console.log(sum);

const obj = {
  prop1: 10,
  prop2: 20,
  skip: 10,
  prop3: 30,
  prop4: 48,
};

let sum2 = 0;
for ( const i in obj ){
  if (i !== 'skip') {
    sum2 += obj[i];
  }
}
console.log(sum2);

const array = [];
const property = Reflect.getOwnPropertyDescriptor(array, "length");
console.log(property.enumerable);


const map = new Map;
map.set("apple", "アップル");
map.set("banana", "バナナ");

for (const row of map){
  console.log( row[0], row[1] );
}

const mixedArray = [10, "Moji", 20, true, 23, 47];
let sum3 = 0;
for (const value of mixedArray) {
  if(typeof value === "number"){
    sum3 += value;
  }
}

console.log(sum3);

const fruits = {apple: "ringo", banana: "banananan"};
const props = Object.keys(fruits);
console.log(props);

for (const prop of props) {
  console.log(prop, fruits[prop]);
}

const breakTestArr = ["抜けない", "not break", "break", "この前で抜ける"];

for (const item of breakTestArr){
  console.log(item);
  if (item === "break") {
    break;
  }
}

const obj2 = {
  prop1: 10,
  prop2: "文字",
  skip: 10,
  prop3: 30,
  prop4: true,
  prop5: 23,
  prop6: 37,
};

let sum234 = 0;
for (const [key, value] of Object.entries(obj2)) {
  if (key === 'skip') continue;        
  if (typeof value !== 'number') continue;  

  sum234 += value;
}
console.log(sum234);

for (let i = 0; i < 4; i++) {
  if( i  === 2 ) {
    continue;
  }
  console.log( `${i+1}回目のループ`);
}

for (let i = 1; i <= 100; i++ ) {
  if (i % 3 == 0 && i % 5 == 0) {
    console.log(i);
    console.log("FIZZBUZZ");
  }
  else if (i % 3 == 0) {
    console.log(i);
  console.log("FIZZ")
  }
  else if (i % 5 == 0) {
    console.log(i);
  console.log("BUZZ")
  }
}

const capitals = {
  日本: "東京",
  America: "Washington",
  England: "London"
};

for (const [key, value] of Object.entries(capitals)) {
  console.log(`${key}の首都は${value}です。`);
}

