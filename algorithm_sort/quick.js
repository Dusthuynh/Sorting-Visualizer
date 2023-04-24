async function partition(arr, low, high) {
  await highLightLineCode(0, "partC");
  await addDescription("**");
  await addDescription(`partition(A,${low},${high})`);

  let pivot = arr[high];
  await highLightLineCode(1, "partC");
  await addDescription(`pivot = ${arr[high]}`);
  bars[high].style.background = "red";
  await sleep(delay);

  let i = low - 1;
  await highLightLineCode(2, "partC");
  await addDescription(`i = ${i}`);

  for (let j = low; j <= high - 1; j++) {
    await highLightLineCode(3, "partC");
    await addDescription(`j = ${j}`);

    bars[j].style.background = scanBar_color;
    await sleep(delay);

    await highLightLineCode(4, "partC");
    if (await compare(pivot, arr[j])) {
      i++;
      await highLightLineCode(5, "partC");
      await addDescription(`i = ${i}`);

      bars[i].style.background = selectBar_color;
      if (i !== j) bars[j].style.background = selectBar_color;
      await sleep(delay);
      await swap(i, j);
      await highLightLineCode(6, "partC");
      await addDescription(`swap(${arr[i]},${arr[j]})`);
      await sleep(delay);
      bars[i].style.background = scanBar_color;
      if (i !== j) bars[j].style.background = scanBar_color;
      await sleep(delay);
    }
  }
  await highLightLineCode(7, "partC");
  await addDescription("Kết thúc vòng for j");

  i++;
  await highLightLineCode(8, "partC");
  await addDescription(`i = ${i}`);

  bars[i].style.background = selectBar_color;
  bars[high].style.background = selectBar_color;
  await sleep(delay);
  await swap(i, high);
  await highLightLineCode(9, "partC");
  await addDescription(`swap(${arr[i]},${arr[high]})`);
  bars[i].style.background = doneBar_color;
  bars[i].setAttribute("doneBar", "");
  await sleep(delay);

  for (let k = 0; k < arr.length; k++) {
    if (!bars[k].hasAttribute("doneBar")) bars[k].style.background = bar_color;
  }

  await highLightLineCode(10, "partC");
  await addDescription(`return i = ${i}`);
  return i;
}

async function quickSort(arr, low, high) {
  await highLightLineCode(0);
  await addDescription("--");
  await addDescription(`Quicksort(A,${low},${high})`);

  await highLightLineCode(1);
  await addDescription(`(Kiểm tra ${low} < ${high} ?`);
  if (low < high) {
    await addDescription("thỏa)");
    await highLightLineCode(2);
    let pivot_idx = await partition(arr, low, high);
    await addDescription(`pivot_idx = ${pivot_idx}`);

    await highLightLineCode(3);
    await quickSort(arr, low, pivot_idx - 1);
    await highLightLineCode(4);
    await quickSort(arr, pivot_idx + 1, high);
  } else {
    await addDescription("không thỏa)");
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
  highLightLineCode(0);
  await quickSort(array, l, r);
  await addDescription("DONE SORT!!!");
  await addDescription("---");
  rmHighLightLineCode("code");
  rmHighLightLineCode("partC");
  toggleCreateArrayBtns("select");
  showcompareAlgorithmsBtn("Quick Sort");
}

function addSimilarCodeQuickSort() {
  description_box.style.width = "39%";
  similar_code_box.style.width = "60%";

  let similar_code = document.getElementById("similar_code");
  similar_code.innerHTML = "";

  let code = document.createRange().createContextualFragment(`<pre>
  <code>
  <div id="code"><span><strong>quickSort(A[], low, high)</strong></span>
    <span>if (low < high)</span> 
      <span>pivot_idx = partition(A, low, high)</span>
      <span>quickSort(A, low, pi – 1)</span>
      <span>quickSort(A, pi + 1, high)</span>
  </div>
  <div id="partC"><span><strong>partition (A[], low, high)</strong></span>
    <span>pivot = A[high]</span>
    <span>i = (low – 1)</span>
    <span>for (j = low; j <= high- 1; j++)</span>
        <span>if (A[j] < pivot)</span>
            <span>i++</span>
            <span>swap A[i] and A[j]</span>
    <span>end for j</span>
    <span>i++</span>
    <span>swap A[i + 1] and A[high]</span>
    <span>return (i + 1)</span>
  </div>
  </code>
</pre>`);

  similar_code.appendChild(code);
}

// Test performance
function partitionTest(arr, low, high, quick_performance) {
  let pivot = arr[high];
  let i = low - 1;
  for (let j = low; j <= high - 1; j++) {
    quick_performance.compare++;
    if (compareTest(pivot, arr[j])) {
      i++;
      quick_performance.swap++;
      swapTest(arr, i, j);
    }
  }
  i++;
  quick_performance.swap++;
  swapTest(arr, i, high);
  return i;
}

function quickSortTest(arr, low, high, quick_performance) {
  if (low < high) {
    let pivot_idx = partitionTest(arr, low, high, quick_performance);
    quickSortTest(arr, low, pivot_idx - 1, quick_performance);
    quickSortTest(arr, pivot_idx + 1, high, quick_performance);
  }
}

function quickSortPerformance() {
  let l = 0,
    r = array.length - 1,
    arr = [...arrayO],
    quick_performance = {
      compare: 0,
      swap: 0,
    };
  quickSortTest(arr, l, r, quick_performance);

  algorithm_performance.set("quick_swap", quick_performance.swap);
  algorithm_performance.set("quick_compare", quick_performance.compare);
}
