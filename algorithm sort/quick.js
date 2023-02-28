async function partition(arr, low, high) {
  const bars = document.getElementsByClassName("bar");

  let pivot = arr[high];
  bars[high].style.background = "red";
  await sleep(delay);
  let i = low - 1;

  for (let j = low; j <= high - 1; j++) {
    bars[j].style.background = scanBar_color;
    await sleep(delay);

    if (compare(pivot, arr[j])) {
      i++;
      bars[i].style.background = selectBar_color;
      if (i !== j) bars[j].style.background = selectBar_color;
      await sleep(delay);
      swap(i, j);
      await sleep(delay);
      bars[i].style.background = scanBar_color;
      if (i !== j) bars[j].style.background = scanBar_color;
      await sleep(delay);
    }
  }
  i++;

  bars[i].style.background = selectBar_color;
  bars[high].style.background = selectBar_color;
  await sleep(delay);
  swap(i, high);
  await sleep(delay);
  bars[i].style.background = doneBar_color;
  bars[i].setAttribute("doneBar", "");
  await sleep(delay);

  for (let k = 0; k < arr.length; k++) {
    if (!bars[k].hasAttribute("doneBar")) bars[k].style.background = bar_color;
  }
  return i;
}

async function quickSort(arr, low, high) {
  const bars = document.getElementsByClassName("bar");

  if (low < high) {
    let pivot_idx = await partition(arr, low, high);
    console.log(arr);

    await quickSort(arr, low, pivot_idx - 1);
    await quickSort(arr, pivot_idx + 1, high);
  } else {
    if (low >= 0 && high >= 0 && low < arr.length && high < arr.length) {
      bars[high].style.background = doneBar_color;
      bars[high].setAttribute("doneBar", "");
      bars[low].style.background = doneBar_color;
      bars[low].setAttribute("doneBar", "");
    }
  }
}

async function preQuickSort() {
  let l = 0;
  let r = array.length - 1;
  // console.log(array);
  await quickSort(array, l, r);
  // console.log(array);
  toggleCreateArrayBtns("select");
}

function addSimilarCodeQuickSort() {
  description_box.style.width = "39%";
  similar_code_box.style.width = "60%";

  let similar_code = document.getElementById("similar_code");
  similar_code.innerHTML = "";

  let code = document.createRange().createContextualFragment(`<pre>
  <code>
  <div><span>quickSort(A[], low, high)</span>
    <span>if (low < high)</span> 
      <span>pi = partition(A, low, high)</span>
      <span>quickSort(A, low, pi – 1)</span>
      <span>quickSort(A, pi + 1, high)</span>
  </div>

  <div><span>partition (A[], low, high)</span>
    <span>pivot = A[high]</span>
    <span>i = (low – 1)</span>
    <span>for (j = low; j <= high- 1; j++)</span>
        <span>if (A[j] < pivot)</span>
            <span>i++</span>
            <span>swap A[i] and A[j]</span>
    <span>end for i</span>
    <span>swap A[i + 1] and A[high]</span>
    <span>return (i + 1)</span>
  </div>
  </code>
</pre>`);

  similar_code.appendChild(code);
}
