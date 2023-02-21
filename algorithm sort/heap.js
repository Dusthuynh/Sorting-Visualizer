async function push_down(arr, f, l) {
  let r = f;
  while (r <= (l - 1) / 2)
    if (l == 2 * r + 1) {
      if (arr[r] > arr[l]) {
        swap(r, l);
      }
    } else if (arr[r] > arr[2 * r + 1] && arr[2 * r + 1] <= arr[2 * r + 2]) {
      swap(r, 2 * r + 1);
      r = 2 * r + 1;
    } else if (arr[r] > arr[2 * r + 1] && arr[2 * r + 2] < arr[2 * r + 1]) {
      swap(r, 2 * r + 2);
    } else r = 1;
}

async function heapSort(arr, n) {
  const bars = document.getElementsByClassName("bar");

  for (let i = (n - 2) / 2; i >= 0; i--) {
    await push_down(arr, i, n - 1);
  }
  for (i = n - 1; i >= 2; i--) {
    swap(0, i - 1);
    await push_down(arr, 0, i - 1);
  }
  swap(0, 1);
}

async function preHeapSort() {
  console.log(array);
  await heapSort(array, array.length);
  toggleCreateArrayBtns("select");
  console.log(array);
}
