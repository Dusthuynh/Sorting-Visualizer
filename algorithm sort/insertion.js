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

function addSimilarCodeInsertionSort() {
  description_box.style.width = "39%";
  similar_code_box.style.width = "60%";

  let similar_code = document.getElementById("similar_code");
  similar_code.innerHTML = "";

  let code = document.createRange().createContextualFragment(`<pre><code><div>
  <span>for i = 1 to length(A) - 1 do</span>
      <span>j = i</span>
      <span>while j > 0 and compare(A[j - 1], A[j]) do</span>
        <span>swap(A[j], A[j-1])</span>
        <span>j = j - 1</span>
      <span>end while</span>
    <span>end for</span>
    </div></code></pre>`);

  similar_code.appendChild(code);
}
