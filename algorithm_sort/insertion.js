async function insertionSort() {
  bars[0].style.background = doneBar_color;
  let n = array.length;
  await highLightLineCode(0);
  await addDescription(`n = ${n}`);

  for (let i = 1; i < n; i++) {
    await highLightLineCode(1);
    j = i;
    await addDescription(`i = ${i}`);
    await addDescription(`j = ${j}`);
    bars[j].style.background = selectBar_color;
    await highLightLineCode(2);

    await highLightLineCode(3);
    await addDescription(`(Kiểm tra ${j} > 0 ?`);
    if (j > 0) {
      await addDescription("thỏa)");
    } else await addDescription("không thỏa)");
    while (j > 0 && (await compare(array[j - 1], array[j]))) {
      await addDescription("=> Thỏa 2 điều kiện");
      bars[j].style.background = selectBar_color;
      bars[j - 1].style.background = scanBar_color;
      await highLightLineCode(4);
      await addDescription(`swap(${array[j]}, ${array[j - 1]})`);
      await swap(j, j - 1);
      await sleep(delay);
      j--;
      await highLightLineCode(5);
      await addDescription(`j = ${j}`);
      for (let k = i; k >= 0; k--) {
        bars[k].style.background = doneBar_color;
      }

      await addDescription("-");
      await highLightLineCode(3);
      await addDescription(`(Kiểm tra ${j} > 0 ?`);
      if (j > 0) {
        await addDescription("thỏa)");
      } else await addDescription("không thỏa)");
    }
    await highLightLineCode(6);
    await addDescription("Kết thúc vòng while j");
    await addDescription("--");

    bars[i].style.background = doneBar_color;
  }
  await highLightLineCode(7);
  await addDescription("Kết thúc vòng for i");
  await addDescription("DONE SORT!!!");
  await addDescription("---");

  toggleCreateArrayBtns("select");
}

function addSimilarCodeInsertionSort() {
  description_box.style.width = "39%";
  similar_code_box.style.width = "60%";

  let similar_code = document.getElementById("similar_code");
  similar_code.innerHTML = "";

  let code = document.createRange()
    .createContextualFragment(`<pre><code><div id="code">
  <span>n = length(A)</span>
  <span>for i = 1 to (n - 1) do</span>
      <span>j = i</span>
      <span>while j > 0 and compare(A[j - 1], A[j]) do</span>
        <span>swap(A[j], A[j-1])</span>
        <span>j = j - 1</span>
      <span>end while</span>
    <span>end for i</span>
    </div></code></pre>`);

  similar_code.appendChild(code);
}

// async function insertionSort() {
//   let n = array.length;
//   for (let i = 1; i < n; i++) {
//     j = i;
//     while (j > 0 && (await compare(array[j - 1], array[j]))) {
//       await swap(j, j - 1);
//       j--;
//     }
//   }
// }
