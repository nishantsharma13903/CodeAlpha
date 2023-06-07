var angle = 0;
var setInt;
var s_ang = 0;
var sx_pos = 0,
  sy_pos = 0;

function showEdit(n) {
  if (n == 1) {
    document.getElementById("edit-btn").style.display = "none";
    document.getElementById("close-btn").style.display = "block";
    document.getElementById("edit-box").style.transform = "scale(1)";
  } else if (n == 2) {
    document.getElementById("edit-btn").style.display = "block";
    document.getElementById("close-btn").style.display = "none";
    document.getElementById("edit-box").style.transform = "scale(0)";
  }
  angle = angle + 360;
  let ang_str = "rotate(" + angle + "deg)";
  document.getElementById("btn-cont-id").style.transform = ang_str;
}

function changeBG() {
  let col1 = document.getElementById("col1").value;
  let col2 = document.getElementById("col2").value;
  let col3 = document.getElementById("col3").value;
  let col_str = "linear-gradient(" + col1 + "," + col2 + "," + col3 + ")";
  document.getElementById("main_id").style.backgroundImage = col_str;
}

function changeAngle() {
  let ang = document.getElementById("angle-id").value;
  ang = -(ang * 3.6);
  let col1 = document.getElementById("col1").value;
  let col2 = document.getElementById("col2").value;
  let col3 = document.getElementById("col3").value;
  let col_str =
    "linear-gradient(" + ang + "deg," + col1 + "," + col2 + "," + col3 + ")";
  document.getElementById("main_id").style.backgroundImage = col_str;
}

function changePos() {
  let pos = document.getElementById("pos-id").value;
  let x_pos = 14.8 * pos;
  let y_pos = 7.5 * pos;
  let pos_str = x_pos + "px " + y_pos + "px";
  document.getElementById("main_id").style.backgroundPosition = pos_str;
  console.log(pos_str);
}

function moveBG() {
  setInt = setInterval(() => {
    s_ang = -(s_ang * 3.6);
    let col1 = document.getElementById("col1").value;
    let col2 = document.getElementById("col2").value;
    let col3 = document.getElementById("col3").value;
    let col_str =
      "linear-gradient(" +
      s_ang +
      "deg," +
      col1 +
      "," +
      col2 +
      "," +
      col3 +
      ")";
    document.getElementById("main_id").style.backgroundImage = col_str;
    s_ang = s_ang + 1.5;
    if (s_ang > 360) {
      s_ang = 0;
    }
  }, 100);
}

function stopBG() {
  clearInterval(setInt);
}
