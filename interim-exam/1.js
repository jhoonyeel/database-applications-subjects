function otp(n) {
  const word = "abcdefghijklmnopqrstuvwxyz0123456789";

  let arr = Array.of(6);
  for (let x = 0; x < 6; x++) {
    arr[x] = word[Math.floor(Math.random() * word.length)];
  }
  console.log(arr.join(""));
}

for (let x = 1; x < 10; x++) otp(x);
