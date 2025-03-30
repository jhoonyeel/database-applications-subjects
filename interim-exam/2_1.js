function isPrime(n) {
  if (n == 2) return true;
  if (n % 2 == 0) return false;
  for (let x = 3; x ** 2 <= n; x += 2) if (n % x == 0) return false;
  return true;
}

function findPrimeNumbers(n) {
  let arr = [];

  for (let i = 1; i < n + 1; i++) {
    if (i == 2 || i == 3 || i == 5 || i == 7) {
      arr.push(i);
    } else if (i % 2 == 0) {
      continue;
    } else {
      if (i < 9) continue;

      let isPrime = true;
      for (let x = 3; x ** 2 <= i; x += 2) {
        if (i % x == 0) {
          isPrime = false;
          break;
        }
      }
      if (isPrime) arr.push(i);
    }
  }

  console.log(arr.length);
}

console.time("실행 시간");
findPrimeNumbers(80000000);
console.timeEnd("실행 시간");
