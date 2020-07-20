let video = document.querySelector("video");
let videoScreen = document.getElementById("start-gif");
let stopButton = document.getElementById("btn-stop-recording");
let startButton = document.getElementById("btn-start-recording");
let createGif = document.getElementById("create-gif");
let uploadButton = document.getElementById("upload-gif");
let uploadButtons = document.getElementById("gifUpload");
let repeatButton = document.getElementById("repeatCapture");
let repeat = document.getElementById("repeat");
let start = document.getElementById("start-button");
let cGif = document.getElementById("finishedGif");
let buttonCopyLink = document.getElementById("copyLink");
let downloadButton = document.getElementById("download");
let mygifos = document.getElementById("trending");
let capturar = document.getElementById("capturar");
let lsito = document.getElementById("listo");
let imgfinished = document.getElementById("uploadedGif");
let blob, record, preview, recorder, camera, stream, idToSave, blob_url;

repeatButton.onclick = repeatGif;
start.onclick = requestVideo;
uploadButton.onclick = uploadVideo;
buttonCopyLink.onclick = copy;
downloadButton.onclick = download;

videoScreen.style.display = "none";
stopButton.style.display = "none";
uploadButtons.style.display = "none";
cGif.style.display = "none";
capturar.style.display = "none";
lsito.style.display = "none";

function requestVideo() {
    capturar.style.display = "block";
    mygifos.style.display = "none";
    createGif.style.display = "none";
    videoScreen.style.display = "block";
    video.style.display = "block";
    navigator.mediaDevices
        .getUserMedia({
            video: {
                width: { ideal: 1000 },
                height: { min: 432 },
            },
            audio: false,
        })
        .then((stream) => {
            video.srcObject = stream;
            video.play();
            startButton.onclick = function() {
                lsito.style.display = "block";
                recorder = RecordRTC(stream, {
                    type: "gif",
                    frameRate: 1,
                    quality: 10,
                    width: 360,
                    hidden: 240,
                });
                recorder.startRecording();
                recorder.stream = stream;
                stopButton.disabled = false;
                stopButton.style.display = "block";
                startButton.style.display = "none";
            };
        })
        .catch((e) => console.error(e));
}

document.getElementById("btn-stop-recording").onclick = async function() {
    recorder.stopRecording(function(record) {
        console.log("fin de grabacion");
        preview = record;
    });
    stopButton.style.display = "none";
    uploadButtons.style.display = "block";
    recorder.stream.stop();
    video.style.stream = "none";
    blob = await recorder.getBlob();
    video.style.display = "none";
    repeat.style.display = "block";
    repeatButton.style.display = "block";
    uploadButton.style.display = "block";
    blob_url = URL.createObjectURL(blob);
    repeat.src = blob_url;
    console.log(blob);
};

function uploadVideo() {
    let form = new FormData();
    form.append("file", blob, "myGifo.git");
    console.log(form.get("file"));
    fetchURL(
        "https://upload.giphy.com/v1/gifs?api_key=89o92Eb4EKKYqo9z1wEcVQ8wsfb5gL1Z", {
            method: "POST",
            body: form,
            headers: {
                Accept: "application/json",
            },
            json: true,
        }
    );
    repeat.style.display = "none";
    uploadButtons.style.display = "none";
    alert("UPLOAD!!!");
    cGif.style.display = "block";
    repeat.style.display = "block";
    videoScreen.style.display = "none";
    imgfinished.src = repeat.src;
    mygifos.style.display = "block";
}

async function fetchURL(url, params) {
    try {
        const response = await fetch(url, params);
        idToSave = await response.json();
        console.log(await idToSave.data.id);
        let vector_id = localStorage.getItem("vector_id");
        console.log("desde getitem");
        console.log(vector_id);
        if (vector_id === undefined) {
            vector_id = "";
            console.log("vacio");
        }
        vector_id = vector_id + ", " + idToSave.data.id;
        console.log(vector_id);
        localStorage.setItem("vector_id", vector_id);
        return response;
    } catch (error) {
        if (error.name !== "AbortError") {
            console.log("Error al obtener resultados");
        }
        return error;
    }
}

function repeatGif() {
    recorder.destroy();
    recorder = null;
    video.src = recorder;
    repeatButton.style.display = "none";
    repeat.style.display = "none";
    uploadButtons.style.display = "none";
    createGif.style.display = "none";
    videoScreen.style.display = "block";
    capturar.style.display = "block";
    startButton.style.display = "block";
    lsito.style.display = "none";
    requestVideo();
}

async function copy() {
    cGif.style.display = "block";
    console.log("copy");
    await navigator.clipboard.writeText(
        "https://giphy.com/gifs/" + idToSave.data.id
    );
    alert("enlace copiado");
}

function download() {
    recorder.save();
}