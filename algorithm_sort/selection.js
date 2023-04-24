async function selectionSort() {
  let n = array.length;
  await highLightLineCode(0);
  await addDescription(`n = ${n}`);

  for (let i = 0; i < n; i++) {
    await highLightLineCode(1);
    await highLightLineCode(2);
    var min_index = i;
    await addDescription(`i = ${i}`);
    await addDescription(`min_index = ${i}`);
    bars[i].style.background = selectBar_color;
    await sleep(delay);

    for (let j = i + 1; j < n; j++) {
      await highLightLineCode(3);
      await addDescription(`j = ${j}`);
      bars[j].style.background = scanBar_color;

      await highLightLineCode(4);
      if (await compare(array[min_index], array[j])) {
        await highLightLineCode(5);
        bars[j].style.background = selectBar_color;
        bars[min_index].style.background = bar_color;
        min_index = j;
        await addDescription(`=> min_index = ${j}`);
        await sleep(delay);
      } else {
        await sleep(delay);
        bars[j].style.background = bar_color;
      }
    }
    await addDescription(`Kết thúc vòng for j`);

    await highLightLineCode(6);
    bars[i].style.background = selectBar_color;
    await highLightLineCode(7);
    await addDescription(`swap(${array[min_index]}, ${array[i]})`);
    await swap(min_index, i);
    await sleep(delay);
    bars[min_index].style.background = bar_color;
    bars[i].style.background = doneBar_color;
    await sleep(delay);
    await addDescription("---");
  }

  await addDescription("Kết thúc vòng for i");
  await highLightLineCode(8);
  await addDescription("DONE SORT!!!");

  toggleCreateArrayBtns("select");
  showcompareAlgorithmsBtn("Selection Sort");
}

function addSimilarCodeSelectionSort() {
  description_box.style.width = "39%";
  similar_code_box.style.width = "60%";

  let similar_code = document.getElementById("similar_code");
  similar_code.innerHTML = "";

  let code = document.createRange()
    .createContextualFragment(`<pre><code><div id="code">
  <span>n = length(A)</span>
  <span>for i = 0 to (n - 1) do</span>
    <span>min_index = i</span>
    <span>for j = i + 1 to (n - 1) do</span>
      <span>if compare(A[min_index], A[j])</span>
        <span>min_index = j</span>
    <span>end for j</span>
    <span>swap (min_index, i)</span>
  <span>end for i</span>
  </div></code></pre>`);

  similar_code.appendChild(code);
}

function selectionSortPerformance() {
  let arr = [...arrayO],
    n = arr.length,
    numOfSwap = 0,
    numOfCompare = 0;

  for (let i = 0; i < n; i++) {
    var min_index = i;
    for (let j = i + 1; j < n; j++) {
      numOfCompare++;
      if (compareTest(arr[min_index], arr[j])) {
        min_index = j;
      }
    }
    swapTest(arr, min_index, i);
    numOfSwap++;
  }

  algorithm_performance.set("selection_swap", numOfSwap);
  algorithm_performance.set("selection_compare", numOfCompare);
}
