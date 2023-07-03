async function uploadImageJW(file) {
  const url =
    "https://all-in-one-image-converter.p.rapidapi.com/api/jpg-to-webp";
  const data = new FormData();
  data.append("file", file);

  const options = {
    method: "POST",
    headers: {
      "X-RapidAPI-Key": "0f0569475fmsh7322558b2cc5fb4p13e620jsnb241c3933853",
      "X-RapidAPI-Host": "all-in-one-image-converter.p.rapidapi.com",
    },
    body: data,
  };

  try {
    const response = await fetch(url, options);
    const result = await response.text();
    return result;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

function convertJpgToWebp() {
  const fileInput = document.getElementById("jw-file");
  const selectedFile = fileInput.files[0];
  if (fileInput.value == "") {
    alert("Please Choose an Image ");
  } else {
    document.getElementById("card-img-jw").style.display = "none";
    document.getElementById("card-gif-jw").style.display = "block";
    uploadImageJW(selectedFile)
      .then((result) => {
        // Handle the result
        let obj = JSON.parse(result);
        let link = obj.downloadUrl;
        // Create an XMLHTTPRequest to fetch the image data (Now we have only url);
        const xhr = new XMLHttpRequest();
        xhr.open("GET", link, true);
        xhr.responseType = "blob";
        xhr.onload = function () {
          if (xhr.status === 200) {
            //Create a blob from the fetch image data
            const blob = new Blob([xhr.response]);
            let downlink = document.getElementById("downloadlink");
            downlink.href = URL.createObjectURL(blob);
            downlink.download = "image.webp";
            downlink.click();
          }
        };

        xhr.onprogress = function (event) {
          if (event.lengthComputable) {
            let progress = Math.round((event.loaded / event.total) * 100);
            document.getElementById("btn-text-jw").style.display = "none";
            document.getElementById("prog-per-jw").style.display = "block";
            document.getElementById("prog-per-jw").innerText = progress + " %";
            if (progress > 99) {
              document.getElementById("btn-text-jw").style.display = "block";
              document.getElementById("prog-per-jw").style.display = "none";
              fileInput.value = "";
              document.getElementById("card-img-jw").style.display = "block";
              document.getElementById("card-gif-jw").style.display = "none";
            }
          }
        };

        xhr.onerror = function () {
          console.log("Error occured...");
        };

        xhr.send();
      })
      .catch((error) => {
        // Handle any errors
        console.error(error);
      });
  }
}
