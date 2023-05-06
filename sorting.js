// ** Variables **
let array = [],
  arrayO = [], // array origin
  bar_color = "#add8e6",
  scanBar_color = "#85A1F2",
  selectBar_color = "#E6A595",
  selectBar1_color = "#e3b375",
  doneBar_color = "#99746B",
  delay = 400,
  max_height_bar = () => {
    let max = Number.NEGATIVE_INFINITY;
    for (let i = 0; i < array.length; i++) {
      if (array[i] > max) max = array[i];
    }

    return max;
  };

// **

// ** Buttons **
let random_btn = document.getElementsByClassName("random_btn")[0],
  fileElem = document.getElementById("fileElem"),
  import_btn = document.getElementsByClassName("import_btn")[0],
  file_noti = document.getElementById("file_noti"),
  create_array_btn = document.getElementById("create_array_btn"),
  remove_array_btn = document.getElementById("remove_array_btn"),
  speed_input = document.getElementById("speed_input"),
  run_btn = document.getElementsByClassName("run_btn")[0],
  compareAlgorithms_btn = document.getElementById("compareAlgorithms_btn");
// **

// DOM detail code
let description_box = document.getElementsByClassName("description_box")[0],
  similar_code_box = document.getElementsByClassName("similar_code_box")[0];

// DOM algorithm
let algorithm_select = document.getElementById("algorithm_select"),
  direction_select = document.getElementById("direction_select");

// DOM bars
let bars = document.getElementsByClassName("bar");

// Toggle create array btns
function toggleCreateArrayBtns(stt) {
  if (stt === "unselect") {
    create_array_btn.setAttribute("disabled", "");
    remove_array_btn.setAttribute("disabled", "");
    random_btn.setAttribute("disabled", "");
    import_btn.setAttribute("disabled", "");
    run_btn.setAttribute("disabled", "");
    algorithm_select.setAttribute("disabled", "");
    direction_select.setAttribute("disabled", "");
  } else if (stt === "select") {
    create_array_btn.removeAttribute("disabled");
    remove_array_btn.removeAttribute("disabled");
    random_btn.removeAttribute("disabled");
    import_btn.removeAttribute("disabled");
    run_btn.removeAttribute("disabled");
    algorithm_select.removeAttribute("disabled");
    direction_select.removeAttribute("disabled");
  }
}

// Selecting Array Number Input from DOM
let input_array = document.getElementById("input_array");

// Event listener to random Array
function randomInRange(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

let randomIntArrayInRange = (min, max, n = 1) =>
  Array.from(
    { length: n },
    () => Math.floor(Math.random() * (max - min + 1)) + min
  );

random_btn.addEventListener("click", function () {
  // input_array.value = "13,39,26,22,34";

  let input_random_range = document.getElementsByClassName("input_random_range")[0];
  let range = input_random_range.value;
  input_array.value = randomIntArrayInRange(10, 90, range);

  // input_array.value = randomIntArrayInRange(10, 90, randomInRange(2, 40));
});

//Event import Array
import_btn.addEventListener("click", function (e) {
  if (fileElem) {
    fileElem.click();
  }
  e.preventDefault();
});

function importFile() {
  const [file] = document.querySelector("#fileElem").files,
    reader = new FileReader();

  reader.addEventListener(
    "load",
    () => {
      // console.log(reader.result);
      input_array.value = reader.result;

      fileElem.value = "";
    },
    false
  );

  if (file) {
    reader.readAsText(file);
  }
}

// Event listener to create Array
// ham kiem tra so co nam trong khoang
function checkNumInRange(ele, index, array) {
  return ele > 0 && ele <= 100;
}

create_array_btn.addEventListener("click", function () {
  try {
    let isValid =
      /^[0-9,]*$/.test(input_array.value) &&
      !isNaN(input_array.value.slice(-1));
    if (!isValid)
      throw "Vui lòng nhập đúng định dạng: dãy chỉ gồm số và dấu phẩy, không thừa dấu phẩy";

    array = JSON.parse("[" + input_array.value + "]");
    // console.log(array.length);

    if (array.length < 2 || array.length > 40)
      throw `Dãy số nhập vào có số lượng không không thỏa điều kiện 2 ≤ n ≤ 40 (Hiện tại đang là ${array.length})`;
    if (!array.every(checkNumInRange))
      throw "Dãy số nhập vào tồn tại số không thỏa điều kiện 1 ≤ x ≤ 100";

    speed_input.value = 60;
    arrayO = [...array];
    run_btn.removeAttribute("disabled");
    renderBars(array);
  } catch (err) {
    alert(err);
  }
});

// Event listener to remove array
remove_array_btn.addEventListener("click", removeArray);
function removeArray() {
  input_array.value = "";
  array = [];
  renderBars(array);
}

// Render bars
let bars_container = document.getElementById("bars_container");

function renderBars(arr) {
  bars_container.innerHTML = "";

  for (let i = 0; i < arr.length; i++) {
    let bar = document.createElement("div");
    bar.classList.add("bar");
    // console.log((arr[i] / max_height_bar()) * 100);
    bar.style.height = `${(arr[i] / max_height_bar()) * 100}%`;
    bar.innerHTML = `<span>${arr[i]}</span>`;
    bars_container.appendChild(bar);
  }
}

// Event delay sort
speed_input.addEventListener("input", function runVolume(e) {
  // console.log(speed_input.value);
  delay = 400 - parseInt(speed_input.value);
});

// Event Run Sort
run_btn.addEventListener("click", async function () {
  toggleCreateArrayBtns("unselect");
  document.getElementById("description_text").innerHTML = "";
  compareAlgorithms_btn.classList.add("none");
  switch (algorithm_select.value) {
    case "selection":
      await selectionSort();
      break;
    case "insertion":
      await insertionSort();
      break;
    case "bubble":
      await bubbleSort();
      break;
    case "quick":
      await preQuickSort();
      break;
    case "merge":
      await preMergeSort();
      break;
    case "heap":
      await heapSort();
      break;
    default:
      await selectionSort();
  }
});

// Event direction
algorithm_select.addEventListener("click", function (event) {
  event.preventDefault();

  if (algorithm_select.value === "heap") {
    direction_select.remove(1);
  } else {
    if (direction_select.childElementCount == 1) {
      let option = document.createElement("option");
      option.text = "Giảm dần";
      option.setAttribute("value", "decrease");
      direction_select.add(option);
    }
  }
});

algorithm_select.addEventListener("click", function (event) {
  switch (algorithm_select.value) {
    case "selection":
      addSimilarCodeSelectionSort();
      break;
    case "insertion":
      addSimilarCodeInsertionSort();
      break;
    case "bubble":
      addSimilarCodeBubbleSort();
      break;
    case "quick":
      addSimilarCodeQuickSort();
      break;
    case "merge":
      addSimilarCodeMergeSort();
      break;
    case "heap":
      addSimilarCodeHeapSort();
      break;
    default:
      addSimilarCodeSelectionSort();
  }
});

// hàm to dam cac buoc trong giai thuat
function rmHighLightLineCode(id) {
  let selection_linesCode = document.getElementById(`${id}`).children;
  for (let i = 0; i < selection_linesCode.length; i++) {
    let el = selection_linesCode[i];
    if (el.classList.contains("hl-code")) el.classList.remove("hl-code");
  }
}

async function highLightLineCode(idx, id = "code") {
  return new Promise((resolve) => {
    setTimeout(() => {
      let selection_linesCode = document.getElementById(`${id}`).children;
      if (!selection_linesCode[idx].classList.contains("hl-code")) {
        rmHighLightLineCode(id);
        selection_linesCode[idx].classList.add("hl-code");

        // console.log(selection_linesCode[idx]);
      }
      resolve();
    }, delay);
  });
}

// ham them dong mo ta chi tiet thuat toan
async function addDescription(text) {
  return new Promise((resolve) => {
    let line = document.createElement("p");
    let description_text = document.getElementById("description_text");

    line.innerText = text;
    description_text.appendChild(line);

    var elem = document.getElementsByClassName("description_box")[0];
    elem.scrollTop = elem.scrollHeight;
    resolve();
  });
}

// ham thong tin chi tiet giai thuat
let algorithmUsed = "";
function showcompareAlgorithmsBtn(alg) {
  algorithmUsed = alg;
  compareAlgorithms_btn.classList.remove("none");
  var elem = document.getElementsByClassName("description_box")[0];
  elem.scrollTop = elem.scrollHeight;
}

let algorithm_performance = new Map([
  ["selection_swap", 0],
  ["selection_compare", 0],
  ["insertion_swap", 0],
  ["insertion_compare", 0],
  ["bubble_swap", 0],
  ["bubble_compare", 0],
  ["quick_swap", 0],
  ["quick_compare", 0],
  ["merge_swap", 0],
  ["merge_compare", 0],
  ["heap_swap", 0],
  ["heap_compare", 0],
]);

function algorithmPerformance() {
  selectionSortPerformance();
  insertionSortPerformance();
  bubbleSortPerformance();
  quickSortPerformance();
  mergeSortPerformance();
  heapSortPerformance();
  // console.log(algorithm_performance);
}

compareAlgorithms_btn.addEventListener("click", () => {
  info.classList.remove("none");
  let infor_card = document.getElementsByClassName("infor_card")[0];
  infor_card.innerHTML = "";
  infor_card.style.height = "70%";
  // let algorithm = algorithm_select.options[algorithm_select.selectedIndex].text;

  algorithmPerformance();

  let code = document.createRange().createContextualFragment(`
  <h2>Thông tin giải thuật</h2>
  <p><i>(xét trong mảng hiện tại)</i></p>
    <p><strong>&#x2022 Dùng giải thuật:</strong> ${algorithmUsed}</p>
    <p style='word-wrap:break-word' ><strong>&#x2022 Trước khi sort:</strong> ${arrayO}</p>
    <p style='word-wrap:break-word'><strong>&#x2022 Sau khi sort:</strong> ${array}</p>
  </br>
  <h2>So sánh hiệu suất các giải thuật</h2>
  <p><i>(số lần thực hiện so sánh - hoán vị)</i></p>
    <p><strong>&#x2022 Selection Sort:</strong>
    ${algorithm_performance.get("selection_compare")} - 
    ${algorithm_performance.get("selection_swap")} </p>
    <p><strong>&#x2022 Insertion Sort:</strong>
    ${algorithm_performance.get("insertion_compare")} - 
    ${algorithm_performance.get("insertion_swap")} </p>
    <p><strong>&#x2022 Bubble Sort:</strong> 
    ${algorithm_performance.get("bubble_compare")} - 
    ${algorithm_performance.get("bubble_swap")} </p>
    <p><strong>&#x2022 Quick Sort:</strong>
    ${algorithm_performance.get("quick_compare")} - 
    ${algorithm_performance.get("quick_swap")} </p>
    <p><strong>&#x2022 Merge Sort:</strong>
    ${algorithm_performance.get("merge_compare")} - 
    ${algorithm_performance.get("merge_swap")} </p>
    <p><strong>&#x2022 Heap Sort:</strong>
    ${algorithm_performance.get("heap_compare")} - 
    ${algorithm_performance.get("heap_swap")} </p>
</div>`);

  infor_card.appendChild(code);
});

// ** Cac Function chuc nang**
// Ham so sanh s1 co lon/nho hon s2 khong
// neu chieu la tang dan: lon hon
// neu chieu la nho dan: nho hon
async function compare(s1, s2) {
  var res = false;
  let direction = direction_select.value;
  if (direction === "increase") {
    await addDescription(`(Kiểm tra ${s1} > ${s2} ?`);
    if (s1 > s2) {
      res = true;
      await addDescription("thỏa)");
    } else await addDescription("không thỏa)");
  } else if (direction === "decrease") {
    await addDescription(`(Nếu ${s1} < ${s2} ?`);
    if (s1 < s2) {
      res = true;
      await addDescription("thỏa)");
    } else await addDescription("không thỏa)");
  }
  return res;
}

function compareTest(s1, s2) {
  var res = false;
  let direction = direction_select.value;
  if (direction === "increase") {
    if (s1 > s2) res = true;
  } else if (direction === "decrease") {
    if (s1 < s2) res = true;
  }
  return res;
}

function sleep(milisec) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("");
    }, milisec);
  });
}

async function swap(i1, i2) {
  return new Promise((resolve) => {
    setTimeout(() => {
      let temp = array[i1];
      array[i1] = array[i2];
      array[i2] = temp;

      bars[i1].style.height = `${(array[i1] / max_height_bar()) * 100}%`;
      bars[i1].innerText = array[i1];
      bars[i2].style.height = `${(array[i2] / max_height_bar()) * 100}%`;
      bars[i2].innerText = array[i2];
      resolve("");
    }, delay);
  });
}

function swapTest(arr, i1, i2) {
  let temp = arr[i1];
  arr[i1] = arr[i2];
  arr[i2] = temp;
}

// Information control
let info_btn = document.getElementsByClassName("info_btn")[0];
let info = document.getElementsByClassName("infor-container")[0];
let close_btn = document.getElementsByClassName("close")[0];

info_btn.addEventListener("click", () => {
  info.classList.remove("none");
  let infor_card = document.getElementsByClassName("infor_card")[0];
  infor_card.innerHTML = "";
  infor_card.style.height = "30%";

  let code = document.createRange().createContextualFragment(`
  <h2>NIÊN LUẬN CƠ SỞ NGÀNH KTPM:</br> MÔ PHỎNG GIẢI THUẬT SẮP
    XẾP</h2>
    </br>
  <p><strong>SINH VIÊN THỰC HIỆN:</strong> HUỲNH MINH NGHĨA - B2012232</p>
  <p>
    <strong>GIẢNG VIÊN HƯỚNG DẪN:</strong> THS. TRƯƠNG THỊ THANH TUYỀN
    <br />BỘ MÔN CÔNG NGHỆ PHẦN MỀM
  </p>
</div>`);

  infor_card.appendChild(code);
});

close_btn.addEventListener("click", () => {
  info.classList.add("none");
});
