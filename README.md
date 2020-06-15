 Vcem Background Location

### Step 1: Tải code

```bash
$ git clone https://github.com/hatvott/backgroundLocation.git
```

----------------------------------------------------------------------------

### Step 2:  Build và chạy project

```bash
$ npm install

$ npm install -g cordova ionic@3.20.0 # you should have ionic and cordova installed

$ ionic cordova prepare android
$ ionic cordova run android --device

$ ionic cordova prepare ios
$ ionic cordova run ios --emulator

```

### Step 3:  Mô tả và chỉnh sửa code
- Trang  chính của app trong thư mục: src/app/pages/hello-word
- Thực hiện cập nhật nghiệp vụ từ giao diện này: hello-word.ts -> Trong code đã comment cụ thể từng bước thực hiện.
- Change URL API về server của Vcem
	+ Sửa file src/ENV.ts -> TRACKER_HOST

- Input/Output API:



