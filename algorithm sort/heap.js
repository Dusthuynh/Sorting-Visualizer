async function heapify(arr, n, i) {
  var largest_idx = i;
  var l = 2 * i + 1;
  var r = 2 * i + 2;

  await sleep(delay);
  bars[i].style.background = selectBar1_color;
  await sleep(delay);

  if (l < n) bars[l].style.background = scanBar_color;
  if (r < n) bars[r].style.background = scanBar_color;
  await sleep(delay);

  if (l < n && arr[l] > arr[largest_idx]) largest_idx = l;
  if (r < n && arr[r] > arr[largest_idx]) largest_idx = r;

  if (largest_idx != i) {
    bars[largest_idx].style.background = selectBar_color;
    bars[i].style.background = selectBar_color;
    await sleep(delay);

    swap(i, largest_idx);

    await sleep(delay);
    let j = 0;
    while (j < n) {
      bars[j].style.background = bar_color;
      j++;
    }

    await heapify(arr, n, largest_idx);
  } else {
    await sleep(delay);
    let j = 0;
    while (j < n) {
      bars[j].style.background = bar_color;
      j++;
    }
  }
}

//left node= 2n+1
//right node = 2n+2
//parent node: Math.floor((n-1)/2)
//last parent node: Math.floor(size/2-1)

async function heapSort() {
  // console.log(array);
  var n = array.length;

  for (var i = Math.floor(n / 2 - 1); i >= 0; i--) {
    await heapify(array, n, i);
  }

  for (var i = n - 1; i > 0; i--) {
    swap(0, i);
    await sleep(delay);
    bars[i].style.background = doneBar_color;
    await sleep(delay);

    await heapify(array, i, 0);
  }

  bars[0].style.background = doneBar_color;

  // console.log(array);
}

function addSimilarCodeHeapSort() {
  description_box.style.width = "39%";
  similar_code_box.style.width = "60%";

  let similar_code = document.getElementById("similar_code");
  similar_code.innerHTML = "";

  let code = document.createRange().createContextualFragment(`<pre><code><div>
  <strong>heapSort</strong>
    <span>n = length(A)</span>
    <span>for i = (n/2 - 1) to 0</span>
      <span>heapify(A, n, i)</span>
    <span>for i = (n - 1) to 1</span>
      <span>swap(A[0],A[i])</span>
      <span>heapify(A, i, 0)</span>
  </div>
  <div>
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



