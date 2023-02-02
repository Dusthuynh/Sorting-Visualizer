let input_array = document.getElementById("input_array");
var random_btn = document.getElementsByClassName("random_btn")[0];
let create_array_btn = document.getElementById("create_array_btn");
let remove_array_btn = document.getElementById("remove_array_btn");
var speedVolume = document.getElementById("speedVolume");
let bars_container = document.getElementById("bars_container");

let algorithm_select = document.getElementById("algorithm_select");
let direction_select = document.getElementById("direction_select");

let run_btn = document.getElementsByClassName("run_btn")[0];

var array = JSON.parse("[" + input_array.value + "]");
let selectBar_color = "#7c1eff";
let bar_color = "#add8e6";
let heightBar = 4;
let speedFactor = 100;
let max_num = () => {
  let max = Number.NEGATIVE_INFINITY;
  for (let i = 0; i < array.length; i++) {
    if (array[i] > max) max = array[i];
  }
  return max;
};

random_btn.addEventListener("click", addRandomArray);
create_array_btn.addEventListener("click", createArray);
remove_array_btn.addEventListener("click", removeArray);
run_btn.addEventListener("click", runSort);

speedVolume.addEventListener("input", runVolume);

function addRandomArray() {
  input_array.value =
    "13,39,26,22,34,32,47,26,45,30,25,50,79,42,77,84,19,62,47,53";
}

function removeArray() {
  input_array.value = "";
  createArray();
}

function createArray() {
  var isValid =
    /^[0-9,]*$/.test(input_array.value) && !isNaN(input_array.value.slice(-1));

  if (isValid) {
    array = JSON.parse("[" + input_array.value + "]");
    run_btn.removeAttribute("disabled");
    renderBars(array);
  } else
    alert(
      "Vui long nhap dung dinh dang: dãy chỉ gồm số và dấu phẩy, không thừa dấu phẩy"
    );
}

function runVolume(e) {
  let titleSpeed = document.getElementsByClassName("title_speed")[0];
  titleSpeed.innerHTML =
    parseFloat((110 - e.target.value) / 100).toFixed(1) + "x";
  speedFactor = parseInt(10 * e.target.value);
  console.log(speedFactor);
  console.log(titleSpeed.textContent);
}

function renderBars(arr) {
  bars_container.innerHTML = "";

  for (let i = 0; i < arr.length; i++) {
    let bar = document.createElement("div");
    bar.classList.add("bar");
    // console.log((arr[i] / max_num) * 100);
    bar.style.height = `${(arr[i] / max_num()) * 100}%`;
    bar.innerHTML = `<span>${arr[i]}</span>`;
    bars_container.appendChild(bar);
  }
}

function toggleCreateArrayBtns(stt) {
  if (stt === "unselect") {
    create_array_btn.setAttribute("disabled", "");
    remove_array_btn.setAttribute("disabled", "");
    random_btn.setAttribute("disabled", "");
    run_btn.setAttribute("disabled", "");
  } else if (stt === "select") {
    create_array_btn.removeAttribute("disabled");
    remove_array_btn.removeAttribute("disabled");
    random_btn.removeAttribute("disabled");
    run_btn.removeAttribute("disabled");
  }
}

function runSort() {
  toggleCreateArrayBtns("unselect");
  if (algorithm_select.value === "bubble") bubbleSort(array);
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function greCompar(s1, s2) {
  var res = false;
  let direction = direction_select.value;
  if (direction === "increase") {
    if (s1 > s2) res = true;
  } else if (direction === "decrease") {
    if (s1 < s2) res = true;
  }
  return res;
}

async function bubbleSort(array) {
  let bars = document.getElementsByClassName("bar");

  for (let i = 0; i < array.length; i++) {
    for (let j = 0; j < array.length - i - 1; j++) {
      if (greCompar(array[j], array[j + 1])) {
        for (let k = 0; k < bars.length; k++) {
          if (k !== j && k !== j + 1) {
            bars[k].style.backgroundColor = bar_color;
          }
        }
        let temp = array[j];
        array[j] = array[j + 1];
        array[j + 1] = temp;
        bars[j].style.height = `${(array[j] / max_num()) * 100}%`;
        bars[j].style.backgroundColor = selectBar_color;
        bars[j].innerText = array[j];
        bars[j + 1].style.height = `${(array[j + 1] / max_num()) * 100}%`;
        bars[j + 1].style.backgroundColor = selectBar_color;
        bars[j + 1].innerText = array[j + 1];
        await sleep(speedFactor);
      }
    }
    await sleep(speedFactor);
  }
  toggleCreateArrayBtns("select");
  return array;
}
