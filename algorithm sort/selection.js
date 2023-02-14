async function selectionSort() {
  const bars = document.getElementsByClassName("bar");

  for (let i = 0; i < array.length; i++) {
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
