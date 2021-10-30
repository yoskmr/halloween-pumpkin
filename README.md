# HalloWeen
## faceapi.js
顔を認識して、CANVASで画像を描画している
## 起動方法
faceapi.jsはファイルからの参照だとエラー出るのでHTTPサーバー経由で参照する
```
$ python -m http.server 8000
```