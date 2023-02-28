function focusBars(l, r) {
  for (let i = l; i <= r; i++) {
    bars[i].classList.add("underlined");
  }
}

function removeFocusbars(l, r) {
  for (let i = l; i <= r; i++) {
    bars[i].classList.remove("underlined");
  }
}

function splitBars(m) {
  bars[m].style.borderRight = "4px solid #FF5B00";
}

function removeSplitBars(m) {
  bars[m].style.borderRight = "none";
}

async function merge(arr, l, m, r) {
  await sleep(delay);
  focusBars(l, r);
  const bars = document.getElementsByClassName("bar");
  // console.log(`l=${l}, m=${m}, r=${r}`);
  var n1 = m - l + 1;
  var n2 = r - m;
  // console.log(`n1=${n1}, n2=${n2}`);
  var L = new Array(n1);
  var R = new Array(n2);

  await sleep(delay);
  for (var i = 0; i < n1; i++) {
    L[i] = arr[l + i];
    bars[l + i].style.background = selectBar_color;
  }

  await sleep(delay);
  for (var j = 0; j < n2; j++) {
    bars[m + 1 + j].style.background = selectBar1_color;
    R[j] = arr[m + 1 + j];
  }
  await sleep(delay);
  // console.log(`L=${L}, R=${R}`);

  var i = 0,
    j = 0,
    k = l;
  // console.log(`k=${k}`);

  while (i < n1 && j < n2) {
    await sleep(delay);
    // console.log("thoa i<n1 va j<n2", i, n1, j, n2);
    if (compare(R[j], L[i])) {
      // console.log("thoa L[i]<=R[j]", L[i], R[j]);
      if (n1 + n2 === arr.length) {
        // console.log("1");
        bars[k].style.background = doneBar_color;
      } else {
        bars[k].style.background = "#ae9c98";
      }
      arr[k] = L[i];

      bars[k].style.height = `${(L[i] / max_height_bar()) * 100}%`;
      bars[k].innerText = L[i];
      i++;
      // console.log(arr, i);
    } else {
      if (n1 + n2 === arr.length) {
        // console.log("2");
        bars[k].style.background = doneBar_color;
      } else {
        bars[k].style.background = "#ae9c98";
      }
      // console.log("ko thoa L[i]<=R[j]", L[i], R[j]);
      arr[k] = R[j];

      bars[k].style.height = `${(R[j] / max_height_bar()) * 100}%`;
      bars[k].innerText = R[j];
      j++;
      // console.log(arr, j);
    }
    k++;
    // console.log(`k=${k}`);
  }

  while (i < n1) {
    await sleep(delay);
    // console.log("thoa i<n1", i, n1, arr, L, k);
    if (n1 + n2 === arr.length) {
      // console.log("3");
      bars[k].style.background = doneBar_color;
    } else {
      bars[k].style.background = "#ae9c98";
    }
    arr[k] = L[i];
    bars[k].style.height = `${(L[i] / max_height_bar()) * 100}%`;
    bars[k].innerText = L[i];
    i++;
    k++;
    // console.log(arr, i, k);
  }

  while (j < n2) {
    // console.log("thoa j<n2", j, n2, arr, R, k);
    await sleep(delay);

    if (n1 + n2 === arr.length) {
      bars[k].style.background = doneBar_color;
    } else {
      bars[k].style.background = "#ae9c98";
    }
    arr[k] = R[j];
    bars[k].style.height = `${(R[j] / max_height_bar()) * 100}%`;
    bars[k].innerText = R[j];
    j++;
    k++;
    // console.log(arr, i, k);
  }

  await sleep(delay);
  removeFocusbars(l, r);
}

async function mergeSort(arr, l, r) {
  if (l >= r) {
    return;
  }
  var m = l + parseInt((r - l) / 2);

  splitBars(m);
  await sleep(delay);
  // console.log("mergeSort", l, m);
  await mergeSort(arr, l, m);
  // console.log("mergeSort", m + 1, r);
  await mergeSort(arr, m + 1, r);
  // console.log("merge", l, m, r);
  removeSplitBars(m);
  await merge(arr, l, m, r);
}

async function preMergeSort() {
  // console.log(array);
  let r = array.length - 1;
  await mergeSort(array, 0, r);
  // console.log(array);

  toggleCreateArrayBtns("select");
}

function addSimilarCodeMergeSort() {
  let description_box = document.getElementsByClassName("description_box")[0];
  let similar_code_box = document.getElementsByClassName("similar_code_box")[0];
  description_box.style.width = "24%";
  similar_code_box.style.width = "75%";

  let similar_code = document.getElementById("similar_code");
  similar_code.innerHTML = "";

  let code = document.createRange().createContextualFragment(`<pre><code><div>
  <strong>mergeSort(arr,l,r)</strong>
    if l >= r 
      return 
    m = l + (r - l)/2
    mergeSort(arr,l,m)
    mergeSort(arr,m+1,r)
    merge(arr,l,m,r)
  </div>  
  <div style="border-left: 2px solid #777777af">
  <strong>merge(arr,l,m,r)</strong>
    n1 = m - l + 1
    n2 = r - m
    L = Array(n1)
    R = Array(n2)
    for i = 0 to (n1-1) do
      L[i] = arr[l+i]
    for j = 0 to (n2-1) do
      R[j] = arr[m+1+j]
    i=0, j =0, k=l
  </div>
  <div>
  while i < n1 and j < n2
    if (compare(R[j], L[i]))
      arr[k] = L[i], i++
    else 
      arr[k] = R[j], j++
  while i < n1 
    arr[k] = L[i]
    i++, k++
  while j < n2
    arr[k] = R[j]
    j++, k++
  </div></code></pre>`);

  similar_code.appendChild(code);
}

// merge(arr,l,m,r)
//   n1 = m - l + 1
//   n2 = r - m
//   L = new Array with length = n1
//   R = new Array with length = n2
//   for i = 0 to (n1-1) do
//     L[i] = arr[l+i]
//   for j = 0 to (n2-1) do
//     R[j] = arr[m+1+j]
//   i=0, j =0, k=l
//   while i < n1 and j < n2
//     if (compare(R[j], L[i]))
//       arr[k] = L[i]
//       i++
//     else
//       arr[k] = R[j]
//       j++
//   while i < n1
//     arr[k] = L[i]
//     i++
//     k++
//   while j < n2
//     arr[k] = R[j]
//     j++
//     k++

// mergeSort(arr,l,r)
//   if l >= r
//     return
//   m = l + (r - l)/2
//   mergeSort(arr,l,m)
//   mergeSort(arr,m+1,r)
//   merge(arr,l,m,r)
