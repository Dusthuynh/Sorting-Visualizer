async function heapify(arr, n, i) {
  await highLightLineCode(0, "heapifyC");
  await addDescription(`*heapify(arr, n= ${n}, i= ${i})`);

  var largest_idx = i;

  await highLightLineCode(1, "heapifyC");
  await addDescription(`largest_idx = ${largest_idx}`);
  var l = 2 * i + 1;
  await highLightLineCode(2, "heapifyC");
  await addDescription(`l = ${l}`);
  var r = 2 * i + 2;
  await highLightLineCode(3, "heapifyC");
  await addDescription(`r = ${r}`);

  await sleep(delay);
  bars[i].style.background = selectBar1_color;
  await sleep(delay);

  if (l < n) bars[l].style.background = scanBar_color;
  if (r < n) bars[r].style.background = scanBar_color;
  await sleep(delay);

  await highLightLineCode(4, "heapifyC");
  await addDescription(
    `(Kiểm tra (${l} < ${n}) và (${arr[l]} > ${arr[largest_idx]})`
  );
  if (l < n && arr[l] > arr[largest_idx]) {
    await addDescription("thỏa)");

    largest_idx = l;
    await highLightLineCode(5, "heapifyC");
    await addDescription(`largest_idx = l = ${largest_idx}`);
  } else {
    await addDescription("không thỏa)");
  }

  await highLightLineCode(6, "heapifyC");
  await addDescription(
    `(Kiểm tra (${r} < ${n}) và (${arr[r]} < ${arr[largest_idx]})`
  );
  if (r < n && arr[r] > arr[largest_idx]) {
    await addDescription("thỏa)");

    largest_idx = r;
    await addDescription(`largest_idx = r = ${largest_idx}`);
    await highLightLineCode(7, "heapifyC");
  } else {
    await addDescription("không thỏa)");
  }

  await highLightLineCode(8, "heapifyC");
  await addDescription(`(kiểm tra largest_idx != (i=${i})`);
  if (largest_idx != i) {
    await addDescription("thỏa)");

    bars[largest_idx].style.background = selectBar_color;
    bars[i].style.background = selectBar_color;
    await sleep(delay);

    await highLightLineCode(9, "heapifyC");
    await addDescription(`swap(${arr[i]},${arr[largest_idx]})`);
    swap(i, largest_idx);

    await sleep(delay);
    let j = 0;
    while (j < n) {
      bars[j].style.background = bar_color;
      j++;
    }

    await highLightLineCode(10, "heapifyC");
    await heapify(arr, n, largest_idx);
  } else {
    await addDescription("không thỏa)");

    await sleep(delay);
    let j = 0;
    while (j < n) {
      bars[j].style.background = bar_color;
      j++;
    }
  }
}

//left node = 2n+1
//right node = 2n+2
//parent node: Math.floor((n-1)/2)
//last parent node: Math.floor(size/2-1)
async function heapSort() {
  var n = array.length;
  await highLightLineCode(1);
  await addDescription(`n = ${n}`);

  for (var i = Math.floor(n / 2 - 1); i >= 0; i--) {
    await highLightLineCode(2);
    await addDescription(`i = ${i}`);
    await highLightLineCode(3);
    await heapify(array, n, i);
  }

  for (var i = n - 1; i > 0; i--) {
    await highLightLineCode(4);
    await addDescription(`i = ${i}`);

    await highLightLineCode(5);
    await addDescription(`swap(${array[0]},${array[i]})`);
    await swap(0, i);
    await sleep(delay);
    bars[i].style.background = doneBar_color;
    await sleep(delay);
    await highLightLineCode(6);
    await heapify(array, i, 0);
  }

  bars[0].style.background = doneBar_color;
  rmHighLightLineCode("code");
  rmHighLightLineCode("heapifyC");
  await addDescription("DONE SORT!!!");
  await addDescription("---");
  toggleCreateArrayBtns("select");
  showcompareAlgorithmsBtn("Heap Sort");
}

function addSimilarCodeHeapSort() {
  description_box.style.width = "39%";
  similar_code_box.style.width = "60%";

  let similar_code = document.getElementById("similar_code");
  similar_code.innerHTML = "";

  let code = document.createRange()
    .createContextualFragment(`<pre><code><div id="code">
  <span><strong>heapSort</strong></span>
    <span>n = length(A)</span>
    <span>for i = (n/2 - 1) to 0</span>
      <span>heapify(A, n, i)</span>
    <span>for i = (n - 1) to 1</span>
      <span>swap(A[0],A[i])</span>
      <span>heapify(A, i, 0)</span>
  </div>
  <div id="heapifyC">
  <span><strong>heapify(A, n, i)</strong></span>
    <span>largest_idx = i</span>
    <span>l = 2 * i + 1</span>
    <span>r = 2 * i + 2</span>
    <span>if (l < n and A[l] > A[largest_idx])</span>
      <span>largest_idx = l</span>
    <span>if (r < n and A[r] > A[largest_idx])</span>
      <span>largest_idx = r</span>
    <span>if (largest_idx != i)</span>
      <span>swap(i,largest_idx)</span>
      <span>heapify(A, n, largest_idx)</span>
  </div></code></pre>`);

  similar_code.appendChild(code);
}

//Test Performance
function heapifyTest(arr, n, i, heap_performance) {
  var largest_idx = i;
  var l = 2 * i + 1;
  var r = 2 * i + 2;

  if (l < n) {
    heap_performance.compare++;
    if (arr[l] > arr[largest_idx]) largest_idx = l;
  }
  if (r < n) {
    heap_performance.compare++;
    if (arr[r] > arr[largest_idx]) largest_idx = r;
  }

  if (largest_idx != i) {
    heap_performance.swap++;
    swapTest(arr, i, largest_idx);
  }
}

function heapSortPerformance() {
  let arr = [...arrayO],
    n = arr.length,
    heap_performance = {
      compare: 0,
      swap: 0,
    };

  for (var i = Math.floor(n / 2 - 1); i >= 0; i--)
    heapifyTest(arr, n, i, heap_performance);

  for (var i = n - 1; i > 0; i--) {
    heap_performance.swap++;
    swapTest(arr, 0, i);
    heapifyTest(arr, i, 0, heap_performance);
  }

  algorithm_performance.set("heap_swap", heap_performance.swap);
  algorithm_performance.set("heap_compare", heap_performance.compare);
}
