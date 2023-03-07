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
  await highLightLineCode(0, "merge1");
  await addDescription(`merge(arr,${l},${m},${r})`);
  await sleep(delay);
  focusBars(l, r);
  const bars = document.getElementsByClassName("bar");
  var n1 = m - l + 1;
  var n2 = r - m;
  var L = new Array(n1);
  var R = new Array(n2);

  await highLightLineCode(1, "merge1");
  await addDescription(`n1 = ${n1}`);
  await highLightLineCode(2, "merge1");
  await addDescription(`n2 = ${n2}`);
  await highLightLineCode(3, "merge1");
  await addDescription(`L = Array(${n1})`);
  await highLightLineCode(4, "merge1");
  await addDescription(`R = Array(${n2})`);

  await sleep(delay);

  for (var i = 0; i < n1; i++) {
    await highLightLineCode(5, "merge1");
    await addDescription(`i = ${i}`);

    L[i] = arr[l + i];
    await highLightLineCode(6, "merge1");
    await addDescription(`L[${i}] = ${arr[l + i]}`);
    await addDescription("-");
    bars[l + i].style.background = selectBar_color;
  }

  await addDescription("--");

  await sleep(delay);
  for (var j = 0; j < n2; j++) {
    await highLightLineCode(7, "merge1");
    await addDescription(`j = ${j}`);

    R[j] = arr[m + 1 + j];
    await highLightLineCode(8, "merge1");
    await addDescription(`R[${j}] = ${arr[m + 1 + j]}`);
    await addDescription("-");
    bars[m + 1 + j].style.background = selectBar1_color;
  }
  await sleep(delay);

  var i = 0,
    j = 0,
    k = l;
  await highLightLineCode(9, "merge1");
  await addDescription(`i = 0, j = 0, k = ${l}`);

  await sleep(delay);

  await highLightLineCode(0, "merge2");
  await addDescription(`While((${i} < ${n1}) and (${j} < ${n2}))`);
  while (i < n1 && j < n2) {
    await addDescription("run while:");

    await sleep(delay);
    await highLightLineCode(1, "merge2");
    addDescription(`compare(R[${j}], L[${i}])`);
    if (await compare(R[j], L[i])) {
      if (n1 + n2 === arr.length) {
        bars[k].style.background = doneBar_color;
      } else {
        bars[k].style.background = "#ae9c98";
      }
      arr[k] = L[i];
      await highLightLineCode(2, "merge2");
      await addDescription(`arr[${k}] = L[${i}] = ${L[i]}`);

      console.log(`bar[${k}] = ${L[i]}`, max_height_bar());
      bars[k].style.height = `${(L[i] / max_height_bar()) * 100}%`;
      bars[k].innerText = L[i];
      i++;

      await addDescription(`i = ${i}`);
    } else {
      await highLightLineCode(3, "merge2");
      if (n1 + n2 === arr.length) {
        bars[k].style.background = doneBar_color;
      } else {
        bars[k].style.background = "#ae9c98";
      }
      arr[k] = R[j];
      await highLightLineCode(4, "merge2");
      await addDescription(`arr[${k}] = R[${j}] = ${R[j]}`);

      console.log(`bar[${k}] = ${R[j]}`, max_height_bar());
      bars[k].style.height = `${(R[j] / max_height_bar()) * 100}%`;
      bars[k].innerText = R[j];
      j++;

      await addDescription(`j = ${j}`);
    }
    k++;
    await highLightLineCode(5, "merge2");
    await addDescription(`k = ${k}`);

    await sleep(delay);

    await highLightLineCode(0, "merge2");
    await addDescription(`While((${i} < ${n1}) and (${j} < ${n2}))`);
  }

  await highLightLineCode(6, "merge2");
  await addDescription(`While(${i} < ${n1})`);
  while (i < n1) {
    await addDescription("*run while:");
    await sleep(delay);

    if (n1 + n2 === arr.length) {
      bars[k].style.background = doneBar_color;
    } else {
      bars[k].style.background = "#ae9c98";
    }
    arr[k] = L[i];
    await highLightLineCode(7, "merge2");
    await addDescription(`arr[${k}] = L[${i}] = ${L[i]}`);
    console.log(`bar[${k}] = ${L[i]}`, max_height_bar());
    bars[k].style.height = `${(L[i] / max_height_bar()) * 100}%`;
    bars[k].innerText = L[i];
    i++;
    k++;
    await highLightLineCode(8, "merge2");
    await addDescription(`i = ${i}, k = ${k}`);

    await sleep(delay);

    await highLightLineCode(6, "merge2");
    await addDescription(`While(${i} < ${n1})`);
  }

  await highLightLineCode(9, "merge2");
  await addDescription(`While(${j} < ${n2})`);
  while (j < n2) {
    await sleep(delay);

    if (n1 + n2 === arr.length) {
      bars[k].style.background = doneBar_color;
    } else {
      bars[k].style.background = "#ae9c98";
    }
    arr[k] = R[j];
    await highLightLineCode(10, "merge2");
    await addDescription(`arr[${k}] = R[${j}] = ${R[j]}`);
    console.log(`bar[${k}] = ${R[j]}`, max_height_bar());
    bars[k].style.height = `${(R[j] / max_height_bar()) * 100}%`;
    bars[k].innerText = R[j];
    j++;
    k++;
    await highLightLineCode(11, "merge2");
    await addDescription(`j = ${j}, k = ${k}`);

    await highLightLineCode(9, "merge2");
    await addDescription(`While(${j} < ${n2})`);
  }

  await sleep(delay);
  removeFocusbars(l, r);
}

async function mergeSort(arr, l, r) {
  await highLightLineCode(0);
  await addDescription(`mergeSort(arr,${l},${r})`);

  await highLightLineCode(1);
  await addDescription(`(Kiểm tra (${l} >= ${r}) ?`);
  if (l >= r) {
    await highLightLineCode(2);
    await addDescription("thỏa)");
    return;
  } else {
    await addDescription("không thỏa)");
  }

  var m = l + parseInt((r - l) / 2);
  await highLightLineCode(3);
  await addDescription(`m = ${m}`);

  splitBars(m);
  await sleep(delay);
  await highLightLineCode(4);
  await mergeSort(arr, l, m);
  await highLightLineCode(5);
  await mergeSort(arr, m + 1, r);
  removeSplitBars(m);
  await highLightLineCode(6);
  await merge(arr, l, m, r);
}

async function preMergeSort() {
  let arr = [...array];
  let r = arr.length - 1;
  await mergeSort(arr, 0, r);

  toggleCreateArrayBtns("select");
}

function addSimilarCodeMergeSort() {
  let description_box = document.getElementsByClassName("description_box")[0];
  let similar_code_box = document.getElementsByClassName("similar_code_box")[0];
  description_box.style.width = "24%";
  similar_code_box.style.width = "75%";

  let similar_code = document.getElementById("similar_code");
  similar_code.innerHTML = "";

  let code = document.createRange()
    .createContextualFragment(`<pre><code><div id="code">
  <strong><span>mergeSort(arr,l,r)</span></strong>
    <span>if l >= r</span>
      <span>return</span>
    <span>m = l + (r - l)/2</span>
    <span>mergeSort(arr,l,m)</span>
    <span>mergeSort(arr,m+1,r)</span>
    <span>merge(arr,l,m,r)</span>
  </div>  
  <div id="merge1" style="border-left: 2px solid #777777af">
  <strong><span>merge(arr,l,m,r)</span></strong>
    <span>n1 = m - l + 1</span>
    <span>n2 = r - m</span>
    <span>L = Array(n1)</span>
    <span>R = Array(n2)</span>
    <span>for i = 0 to (n1-1) do</span>
      <span>L[i] = arr[l+i]</span>
    <span>for j = 0 to (n2-1) do</span>
      <span>R[j] = arr[m+1+j]</span>
    <span>i = 0, j = 0, k = l</span>
  </div>
  <div id="merge2">
  <span>while i < n1 and j < n2</span>
    <span>if (compare(R[j], L[i]))</span>
      <span>arr[k] = L[i], i++</span>
    <span>else</span>
      <span>arr[k] = R[j], j++</span>
    <span>k++</span>
  <span>while i < n1 </span>
    <span>arr[k] = L[i]</span>
    <span>i++, k++</span>
  <span>while j < n2</span>
    <span>arr[k] = R[j]</span>
    <span>j++, k++</span>
  </div></code></pre>`);

  similar_code.appendChild(code);
}

// async function merge(arr, l, m, r) {
//   var n1 = m - l + 1;
//   var n2 = r - m;
//   var L = new Array(n1);
//   var R = new Array(n2);

//   for (var i = 0; i < n1; i++) {
//     L[i] = arr[l + i];
//   }

//   for (var j = 0; j < n2; j++) {
//     R[j] = arr[m + 1 + j];
//   }

//   var i = 0,
//     j = 0,
//     k = l;

//   while (i < n1 && j < n2) {
//     if (compare(R[j], L[i])) {
//       arr[k] = L[i];
//       i++;
//     } else {
//       arr[k] = R[j];
//       j++;
//     }
//     k++;
//   }

//   while (i < n1) {
//     arr[k] = L[i];
//     i++;
//     k++;
//   }

//   while (j < n2) {
//     arr[k] = R[j];
//     j++;
//     k++;
//   }
// }

// async function mergeSort(arr, l, r) {
//   if (l >= r) {
//     return;
//   }
//   var m = l + parseInt((r - l) / 2);

//   await mergeSort(arr, l, m);
//   await mergeSort(arr, m + 1, r);
//   await merge(arr, l, m, r);
// }

// async function preMergeSort() {
//   let r = array.length - 1;
//   await mergeSort(array, 0, r);
// }
