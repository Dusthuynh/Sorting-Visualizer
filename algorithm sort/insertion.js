async function insertionSort() {
  const bars = document.getElementsByClassName("bar");

  bars[0].style.background = doneBar_color;
  for (let i = 1; i < array.length; i++) {
    j = i;
    bars[j].style.background = selectBar_color;
    await sleep(delay);

    while (j > 0 && compare(array[j - 1], array[j])) {
      bars[j].style.background = selectBar_color;
      bars[j - 1].style.background = scanBar_color;
      await sleep(delay);
      swap(j, j - 1);
      j--;
      await sleep(delay);
      for (let k = i; k >= 0; k--) {
        bars[k].style.background = doneBar_color;
      }
    }

    bars[i].style.background = doneBar_color;
  }
  toggleCreateArrayBtns("select");
}

// procedure insertionSort(A: list of sortable items)
//    n = length(A)
//    for i = 1 to n - 1 do
//        j = i
//        while j > 0 and A[j-1] > A[j] do
//            swap(A[j], A[j-1])
//            j = j - 1
//        end while
//    end for
// end procedure
