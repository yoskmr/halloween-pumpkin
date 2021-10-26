
faceapi.nets.tinyFaceDetector.load("/models/weights/");
faceapi.nets.faceExpressionNet.load("/models/weights/");

setCamera = async () => {

    let camera = document.getElementById("camera");
    console.info(camera.srcObject);
    const constraints = {
      audio: false,
      video: {
        // width: window.innerWidth,
        // height: window.innerHeight,
        facingMode: 'user',
      }
    };

    await navigator.mediaDevices.getUserMedia(constraints)
    .then((stream) => {
      camera.srcObject = stream;
      camera.onloadedmetadata = (e) => {
        camera.play()
        trackingFace()
      };
    });
}

trackingFace = async () => {

    let image = new Image();
    let base_url = location.protocol + "//" + location.host
    image.src = base_url + "/img/pumpkin.png";
    image.width = 500;

    let canvas = document.getElementById("canvas");

    let faceData = await faceapi.detectAllFaces(
      camera, new faceapi.TinyFaceDetectorOptions()
    ).withFaceExpressions();

    if(faceData.length){
       const setDetection = () => {

        let box = faceData[0].detection.box;
        x = box.x+50,
        y = box.y-70,
        w = box.width+350,
        h = box.height+350;

        // console.info(x, y, w, h);
        camera.setAttribute("width", window.innerWidth.toString());
        camera.setAttribute("height", window.innerHeight.toString());

        canvas.setAttribute("width", window.innerWidth.toString());
        canvas.setAttribute("height", window.innerHeight.toString());

        canvas.getContext('2d').clearRect(0, 0, window.innerWidth, window.innerHeight);
        // canvas.getContext('2d').clearRect(0, 0, 800, 600);
        let ctx = canvas.getContext('2d')
        // console.log(x, y, w, h)
        ctx.drawImage(image, x, y, w, h);
      };
      setDetection();
    }
    requestAnimationFrame(trackingFace);
};

setCamera()