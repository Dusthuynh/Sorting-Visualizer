// ** Variables **
let array = [];
let bar_color = "#add8e6";
let scanBar_color = "#85A1F2";
let selectBar_color = "#E6A595";
let selectBar1_color = "#e3b375";
let doneBar_color = "#99746B";
let delay = 560; // delay default for sleep func (260ms)
let max_height_bar = () => {
  let max = Number.NEGATIVE_INFINITY;
  for (let i = 0; i < array.length; i++) {
    if (array[i] > max) max = array[i];
  }

  return max;
};

// **

// ** Buttons **
var random_btn = document.getElementsByClassName("random_btn")[0];
let fileElem = document.getElementById("fileElem"),
  import_btn = document.getElementsByClassName("import_btn")[0],
  file_noti = document.getElementById("file_noti");
let create_array_btn = document.getElementById("create_array_btn");
let remove_array_btn = document.getElementById("remove_array_btn");
let run_btn = document.getElementsByClassName("run_btn")[0];
// **

// DOM detail code
let description_box = document.getElementsByClassName("description_box")[0];
let similar_code_box = document.getElementsByClassName("similar_code_box")[0];

// DOM algorithm
let algorithm_select = document.getElementById("algorithm_select");
let direction_select = document.getElementById("direction_select");

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
random_btn.addEventListener("click", function () {
  input_array.value =
    "13,39,26,22,34,32,47,26,45,30,25,50,79,42,77,84,19,62,47,53";
});

//Event import Array
import_btn.addEventListener("click", function (e) {
  if (fileElem) {
    fileElem.click();
  }
  e.preventDefault();
});

function importFile() {
  const [file] = document.querySelector("#fileElem").files;
  const reader = new FileReader();

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
create_array_btn.addEventListener("click", function () {
  var isValid =
    /^[0-9,]*$/.test(input_array.value) && !isNaN(input_array.value.slice(-1));

  if (isValid) {
    array = JSON.parse("[" + input_array.value + "]");
    if (array.length > 0) {
      run_btn.removeAttribute("disabled");
      renderBars(array);
    }
  } else alert("Vui lòng nhập đúng định dạng: dãy chỉ gồm số và dấu phẩy, không thừa dấu phẩy");
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
let speed_input = document.getElementById("speed_input");
speed_input.addEventListener("input", function runVolume(e) {
  delay = 420 - parseInt(speed_input.value);
});

// Event Run Sort
run_btn.addEventListener("click", async function () {
  toggleCreateArrayBtns("unselect");
  document.getElementById("description_text").innerHTML = "";
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
    console.log("thoa");
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

// Information control
let info_btn = document.getElementsByClassName("info_btn")[0];
let info = document.getElementsByClassName("infor-container")[0];
let close_btn = document.getElementsByClassName("close")[0];

info_btn.addEventListener("click", () => {
  console.log("open");
  info.classList.remove("none");
});

close_btn.addEventListener("click", () => {
  console.log("close");
  info.classList.add("none");
});
