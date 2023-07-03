async function uploadImageJP(file) {
  const url =
    "https://all-in-one-image-converter.p.rapidapi.com/api/jpg-to-png";

  // Create a new FormData object
  const data = new FormData();

  // Add the file to the FormData object
  data.append("file", file);

  const options = {
    method: "POST",
    headers: {
      "X-RapidAPI-Key": "63a43b7586msh2589f7cc920dc1fp18074cjsnd20f72238354",
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

function convertJpgToPng() {
  const fileInput = document.getElementById("jp-file");
  const selectedFile = fileInput.files[0];
  if (fileInput.value == "") {
    alert("Please Choose an Image ");
  } else {
    document.getElementById('card-img-jp').style.display = 'none';
    document.getElementById('card-gif-jp').style.display = 'block';
    uploadImageJP(selectedFile)
      .then((result) => {
        
        // Handle the result
        let obj = JSON.parse(result);
        let link = obj.downloadUrl;
        // Create an XMLHTTPRequest to fetch the image data (Now we have only url);
        const xhr = new XMLHttpRequest();
        xhr.open('GET',link,true);
        xhr.responseType = 'blob';
        xhr.onload = function() {
          if(xhr.status === 200){
            //Create a blob from the fetch image data
            const blob = new Blob([xhr.response]);
            let downlink = document.getElementById('downloadlink');
            downlink.href = URL.createObjectURL(blob);
            downlink.download = "image.png";
            downlink.click();
          }
        }

        xhr.onprogress = function(event){
          if(event.lengthComputable){
            let progress = Math.round((event.loaded / event.total) * 100);
            document.getElementById('btn-text-jp').style.display = 'none';
            document.getElementById('prog-per-jp').style.display = 'block';
            document.getElementById("prog-per-jp").innerText = progress + ' %' ;
            if(progress > 99){
              document.getElementById('btn-text-jp').style.display = 'block';
              document.getElementById('prog-per-jp').style.display = 'none';
              fileInput.value = '';
              document.getElementById('card-img-jp').style.display = 'block';
              document.getElementById('card-gif-jp').style.display = 'none';
            }
          }
        }

        xhr.onerror = function(){
          console.log("Error occured...")
        }

        xhr.send();

      })
      .catch((error) => {
        // Handle any errors
        console.error(error);
      });
  }
}
