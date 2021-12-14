// function helper(n, m, arr = []) {
//   arr = Array(n + 1)
//     .fill(0)
//     .map(() => Array(m + 1).fill(0));

//   if (n < 1 || m < 1) {
//     return 0;
//   }
//   if (n == 1 && m == 1) {
//     return 1;
//   }
// //   console.log(arr, n, m);

//   arr[n][m] = helper(n - 1, m, arr) + helper(n, m - 1, arr);
//   return arr[n][m];
// }

// function paths(n, m) {
//   return helper(n, m);
// }

// const arr = Array(4)
//   .fill(0)
//   .map(() => Array(4).fill(0));
// console.log(arr);

// arr.fill(0);
// console.log(arr);
// arr[2][3] = 23;
// console.log(arr);

// console.log(paths(2, 3));
// console.log(paths(3, 4));
// console.log(paths(4, 5));
// console.log(paths(5, 6));

// //////////////////////// find paths ////////////////////

function findCelebrity(persons = []) {
  let l = 0;
  let r = persons.length - 1;

  while (l !== r) {
    if (persons[l].knows(persons[r])) {
      l++;
    } else {
      r--;
    }
  }

  for (let i = 0; i < persons.length; i++) {
    if ((i != l && !persons[i].knows(persons[l])) || persons[l].knows(persons[i])) {
      return null;
    }
  }

  return persons[l];
}
// //////////////////////// find celebry ////////////////////
