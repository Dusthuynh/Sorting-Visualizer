// let selection_linesCode = document.getElementById("selection_code").children;

// function highLightSelection(idx) {
//   console.log(selection_linesCode[idx]);
//   selection_linesCode[idx].classList.add("hl-code");
//   console.log(selection_linesCode[idx]);

// }

async function selectionSort() {
  for (let i = 0; i < array.length; i++) {
    // highLightSelection(0);
    var min_index = i;
    bars[i].style.background = selectBar_color;
    await sleep(delay);

    for (let j = i + 1; j < array.length; j++) {
      bars[j].style.background = scanBar_color;
      await sleep(delay);

      if (compare(array[min_index], array[j])) {
        bars[j].style.background = selectBar_color;
        bars[min_index].style.background = bar_color;
        min_index = j;
      } else {
        bars[j].style.background = bar_color;
      }
    }

    bars[i].style.background = selectBar_color;
    await sleep(delay);
    swap(min_index, i);
    await sleep(delay);
    bars[min_index].style.background = bar_color;
    bars[i].style.background = doneBar_color;
    await sleep(delay);
  }

  toggleCreateArrayBtns("select");
}

function addSimilarCodeSelectionSort() {
  description_box.style.width = "39%";
  similar_code_box.style.width = "60%";

  let similar_code = document.getElementById("similar_code");
  similar_code.innerHTML = "";

  let code = document.createRange()
    .createContextualFragment(`<pre><code><div id="selection_code">
  <span>for i = 0 to length(A) - 1 do</span>
    <span>min_index = i</span>
    <span>for j = i + 1 to array.length do</span>
      <span>if compare(A[min_index], A[j])</span>
        <span>min_index = j</span>
    <span>end for j</span>
    <span>swap (min_index, i)</span>
  <span>end for i</span>
  </div></code></pre>`);

  similar_code.appendChild(code);
}
