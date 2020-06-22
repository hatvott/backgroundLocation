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

--------------------------------------------------------------------------------------------------------------------------

API:
### 1: Database
```bash
CREATE TABLE [dbo].[tblAccountTracking](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[UserName] [nvarchar](50) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	[FullName] [nvarchar](250) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	[Longitude] [float] NULL,
	[Latitude] [float] NULL,
	[TypeId] [int] NULL CONSTRAINT [DF_tblAccountTracking_TypeId]  DEFAULT ((0)),
	[BatteryInfo] [nvarchar](50) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	[Online] [bit] NULL CONSTRAINT [DF_tblAccountTracking_Online]  DEFAULT ((1)),
	[DayCreate] [datetime] NULL CONSTRAINT [DF_tblAccountTracking_DayCreate]  DEFAULT (getdate()),
	[DeviceModel] [nvarchar](150) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	[MobileDate] [datetime] NULL,
	[ActivityType] [nvarchar](50) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	[Event] [nvarchar](100) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	[BatteryIsCharging] [nvarchar](50) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	[Moving] [nvarchar](50) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	[Speed] [float] NULL,
	[Heading] [float] NULL,
	[Accuracy] [float] NULL,
	[GPS] [nvarchar](50) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	[Network] [nvarchar](50) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
 CONSTRAINT [PK_tblAccountTracking] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (IGNORE_DUP_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]

```
### 2: Cách truyền thêm username, fullname, hay token vào trong request để xác định tọa độ của user nào.
bổ sung vào trong param truyền lên khi config BGLocation
```bash
 params: {
    "username": "hatv"
  }
```
### 3: Mẫu dữ liệu Mobile đẩy lên
- Cập nhật tạo độ
```bash
{
  "location": [
    {
      "is_moving": true,
      "uuid": "0f381da6-9918-426f-9317-a5544a7893f3",
      "timestamp": "2020-06-18T00:59:03.999Z",
      "odometer": 1572,
      "coords": {
        "latitude": 21.0312872,
        "longitude": 105.7744168,
        "accuracy": 5.6,
        "speed": 10.94,
        "heading": 148.9,
        "altitude": -8
      },
      "activity": {
        "type": "in_vehicle",
        "confidence": 100
      },
      "battery": {
        "is_charging": false,
        "level": 0.99
      },
      "extras": {
        "username": "hatv"
      }
    }
  ],
  "username": "hatv"
}
```
- Tắt/Mở GPS 
```bash
{
   "location":[

      {
         "event":"providerchange",
         "provider":{
            "network":false,
            "gps":false,
            "enabled":false,
            "status":3
         },
         "is_moving":true,
         "uuid":"870e1b23-5ea7-47eb-9b61-191c1cb2072f",
         "timestamp":"2020-06-18T02:00:51.732Z",
         "odometer":2808.2,
         "coords":{
            "latitude":21.0324033,
            "longitude":105.7827517,
            "accuracy":15.6,
            "speed":0,
            "heading":202.62,
            "altitude":20.7
         },
         "activity":{
            "type":"still",
            "confidence":100
         },
         "battery":{
            "is_charging":false,
            "level":0.91
         },
         "extras":{
            "username":"hatv"
         }
      }
   ],
   "username":"hatv"
}
```
----------------------------------------------------------------------------------------------------------------------------
PHẦN 3: Cấu hình nâng cao

Thực hiện lệnh phía dưới để cập nhật cấu hình cho Bg Location
```bash
BackgroundGeolocation.setConfig({
  params: {
    "username": "hatv"
  }
  
})
```
Cấu hình và đặt lịch giờ chạy
```bash
BackgroundGeolocation.ready({
  .
  .
  .
  schedule: [
    "1 17:30-21:00",    // Sunday: 5:30pm-9:00pm
    "2-6 9:00-17:00",   // Mon-Fri: 9:00am to 5:00pm
    "2,4,6 20:00-00:00",// Mon, Web, Fri: 8pm to midnight (next day)
    "7 10:00-19:00"     // Sat: 10am-7pm
  ]
}).then((state) => {
  // Start the Scheduler
  BackgroundGeolocation.startSchedule();
});

// Lang nghe su kien #onSchedule events:
BackgroundGeolocation.onSchedule((state) => {
  console.log("[onSchedule] - enabled? ", state.enabled);
});


// Sau nếu muốn cập nhật lịch thì gọi hàm  #setConfig 
BackgroundGeolocation.setConfig({
  schedule: [
    "1-7 9:00-10:00",
    "1-7 11:00-12:00",
    "1-7 13:00-14:00",
    "1-7 15:00-16:00",
    "1-7 17:00-18:00",
    "2,4,6 19:00-22:00"
  ]
});
```

Checking theo sự kiện:
Bắt đầu tracking:
```bash
  BackgroundGeolocation.start();
  BackgroundGeolocation.changePace(true);

```
Kết thúc tracking:
```bash
  BackgroundGeolocation.stop();
  BackgroundGeolocation.changePace(false);

```


