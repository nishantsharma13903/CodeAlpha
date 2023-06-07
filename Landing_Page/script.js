var b = true;
var text = "Time Is An Illusion";
var i = 0,
  j = text.length;
var app_str = "";

setInterval(function () {
  if (b) {
    document.getElementById("typing-id").innerHTML += text.charAt(i);
    i++;
    if (i == text.length) {
      b = false;
      i = 0;
    }
  } else {
    for (let k = 0; k < j; k++) {
      app_str += text.charAt(k);
    }
    document.getElementById("typing-id").innerHTML = app_str;
    app_str = "";
    j--;
    if (j == -1) {
      b = true;
      j = text.length;
    }
  }
}, 200);
