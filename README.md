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
{'location': [{'is_moving': True, 'uuid': '0f381da6-9918-426f-9317-a5544a7893f3', 'timestamp': '2020-06-18T00:59:03.999Z', 'odometer': 1572, 'coords': {'latitude': 21.0312872, 'longitude': 105.7744168, 'accuracy': 5.6, 'speed': 10.94, 'heading': 148.9, 'altitude': -8}, 'activity': {'type': 'in_vehicle', 'confidence': 100}, 'battery': {'is_charging': False, 'level': 0.99}, 'extras': {'username': 'hatv'}}, {'is_moving': True, 'uuid': '48b54136-0640-4d64-b163-29a3f47c3d4b', 'timestamp': '2020-06-18T00:59:52.999Z', 'odometer': 1782.2, 'coords': {'latitude': 21.0304542, 'longitude': 105.7762338, 'accuracy': 8, 'speed': 6.66, 'heading': 47.69, 'altitude': -17.9}, 'activity': {'type': 'in_vehicle', 'confidence': 100}, 'battery': {'is_charging': False, 'level': 0.99}, 'extras': {'username': 'hatv'}}, {'is_moving': True, 'uuid': '889aee67-42c8-4b9d-a52b-46083b5f809c', 'timestamp': '2020-06-18T01:00:17.999Z', 'odometer': 1922.5, 'coords': {'latitude': 21.0310395, 'longitude': 105.7774304, 'accuracy': 7.4, 'speed': 2.78, 'heading': 120.48, 'altitude': -9.8}, 'activity': {'type': 'in_vehicle', 'confidence': 100}, 'battery': {'is_charging': False, 'level': 0.99}, 'extras': {'username': 'hatv'}}, {'is_moving': True, 'uuid': '85ffb1da-eefc-42a8-96f1-6f49250d3018', 'timestamp': '2020-06-18T01:00:49.999Z', 'odometer': 2064.6, 'coords': {'latitude': 21.0304208, 'longitude': 105.7786284, 'accuracy': 11.2, 'speed': 5.7, 'heading': 96.42, 'altitude': -5.8}, 'activity': {'type': 'in_vehicle', 'confidence': 100}, 'battery': {'is_charging': False, 'level': 0.99}, 'extras': {'username': 'hatv'}}, {'is_moving': True, 'uuid': '28d86ea6-012e-4bba-85de-69128922f743', 'timestamp': '2020-06-18T01:01:35.999Z', 'odometer': 2206.8, 'coords': {'latitude': 21.0292433, 'longitude': 105.7791749, 'accuracy': 6, 'speed': 3.15, 'heading': 170.24, 'altitude': 2.6}, 'activity': {'type': 'in_vehicle', 'confidence': 100}, 'battery': {'is_charging': False, 'level': 0.98}, 'extras': {'username': 'hatv'}}], 'username': 'hatv'}
```
- Tắt/Mở GPS 
```bash
{'location': [{'is_moving': True, 'uuid': '69193073-f566-4047-872b-37eaad2faf37', 'timestamp': '2020-06-18T02:00:51.732Z', 'odometer': 2808.2, 'coords': {'latitude': 21.0324033, 'longitude': 105.7827517, 'accuracy': 15.6, 'speed': 0, 'heading': 202.62, 'altitude': 20.7}, 'activity': {'type': 'still', 'confidence': 100}, 'battery': {'is_charging': False, 'level': 0.91}, 'extras': {'username': 'hatv'}}, {'event': 'providerchange', 'provider': {'network': False, 'gps': False, 'enabled': False, 'status': 3}, 'is_moving': True, 'uuid': '870e1b23-5ea7-47eb-9b61-191c1cb2072f', 'timestamp': '2020-06-18T02:00:51.732Z', 'odometer': 2808.2, 'coords': {'latitude': 21.0324033, 'longitude': 105.7827517, 'accuracy': 15.6, 'speed': 0, 'heading': 202.62, 'altitude': 20.7}, 'activity': {'type': 'still', 'confidence': 100}, 'battery': {'is_charging': False, 'level': 0.91}, 'extras': {'username': 'hatv'}}, {'event': 'motionchange', 'is_moving': True, 'uuid': '7f1031c0-e22b-417a-a9a5-1fbb627449a7', 'timestamp': '2020-06-18T02:01:45.468Z', 'odometer': 2808.2, 'coords': {'latitude': 21.0324166, 'longitude': 105.7827612, 'accuracy': 15.5, 'speed': -1, 'heading': -1, 'altitude': 20.6}, 'activity': {'type': 'still', 'confidence': 100}, 'battery': {'is_charging': False, 'level': 0.9}, 'extras': {'username': 'hatv'}}, {'event': 'providerchange', 'provider': {'network': True, 'gps': True, 'enabled': True, 'status': 3}, 'is_moving': True, 'uuid': '3eb9bf4b-35ea-4b07-8b3a-c9b57c857ce6', 'timestamp': '2020-06-18T02:01:45.468Z', 'odometer': 2808.2, 'coords': {'latitude': 21.0324166, 'longitude': 105.7827612, 'accuracy': 15.5, 'speed': -1, 'heading': -1, 'altitude': 20.6}, 'activity': {'type': 'still', 'confidence': 100}, 'battery': {'is_charging': False, 'level': 0.9}, 'extras': {'username': 'hatv'}}], 'username': 'hatv'}
```



