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
### 2: Mẫu dữ liệu Mobile đẩy lên
- Cập nhật tạo độ
{
  "is_moving": true,
  "uuid": "62336d76-7c4c-4712-b05b-0d20d635bbbd",
  "timestamp": "2020-06-17T21:38:29.918Z",
  "odometer": 0,
  "coords": {
    "latitude": 21.0298745,
    "longitude": 105.7723229,
    "accuracy": 11.6,
    "speed": -1,
    "heading": -1,
    "altitude": -12.5
  },
  "activity": {
    "type": "still",
    "confidence": 100
  },
  "battery": {
    "is_charging": true,
    "level": 0.45
  },
  "extras": {
     "username":"hatv",
     "name":"trần văn Hà"
  }
}

- Tắt GPS 

{
  "event": "providerchange",
  "provider": {
    "network": false,
    "gps": false,
    "enabled": false,
    "status": 3
  },
  "is_moving": true,
  "uuid": "28a999fb-3236-4349-9bcd-496bc54c0738",
  "timestamp": "2020-06-17T21:38:33.749Z",
  "odometer": 0,
  "coords": {
    "latitude": 21.0298736,
    "longitude": 105.7723275,
    "accuracy": 11.6,
    "speed": 0,
    "heading": 101.84,
    "altitude": -12.5
  },
  "activity": {
    "type": "still",
    "confidence": 100
  },
  "battery": {
    "is_charging": true,
    "level": 0.46
  },
   "extras": {
     "username":"hatv",
     "name":"trần văn Hà"
  }
}




