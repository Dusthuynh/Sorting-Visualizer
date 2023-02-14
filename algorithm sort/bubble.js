async function bubbleSort() {
  console.log("bubble sorting");
  const bars = document.getElementsByClassName("bar");
  for (let i = 0; i < array.length - 1; i++) {
    for (let j = 0; j < array.length - i - 1; j++) {
      console.log("select", j, j + 1);
      bars[j].style.background = scanBar_color;
      bars[j + 1].style.background = scanBar_color;
      await sleep(delay);

      if (compare(array[j], array[j + 1])) {
        console.log("swap", j, j + 1);
        bars[j].style.background = selectBar_color;
        bars[j + 1].style.background = selectBar_color;
        await sleep(delay * 2);
        swap(j, j + 1);
        await sleep(delay);
      }

      bars[j].style.background = bar_color;
      bars[j + 1].style.background = bar_color;
    }
    bars[array.length - i - 1].style.background = doneBar_color;
  }
  bars[0].style.background = doneBar_color;
  toggleCreateArrayBtns("select");
}
