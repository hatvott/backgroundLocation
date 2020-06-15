import { Component,  NgZone  } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';

////
// NOTE:  normally you will simply import from "cordova-background-geolocation-lt" or "cordova-background-geolocation"
// from "../../cordova-background-geolocation" is only fro convenience in the SampleApp for easily switching
// between public / private version of the plugin
//
import BackgroundGeolocation, {
  Location,
  HttpEvent,
  MotionActivityEvent,
  ProviderChangeEvent,
  MotionChangeEvent,
  ConnectivityChangeEvent,
  AuthorizationEvent,
  TransistorAuthorizationToken,
  HeartbeatEvent
} from "../../cordova-background-geolocation";

import ENV from "../../ENV";
import { ToastController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-hello-world',
  templateUrl: 'hello-world.html',
})
export class HelloWorldPage {
  // UI State
  enabled: boolean;
  isMoving: boolean;

  // ion-list datasource
  events: any;
  url: string;
  deviceName :string;



  constructor(private toastController: ToastController,public navCtrl: NavController, public navParams: NavParams, private platform: Platform,  private zone:NgZone) {
    this.isMoving = true;
    this.enabled = true;
    this.events = [];

    // Listen for deviceready to configure BackgroundGeolocation
    this.platform.ready().then(this.onDeviceReady.bind(this));
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HelloWorldPage');
  }

  onDeviceReady() {
    this.configureBackgroundGeolocation();
 
  }

  async configureBackgroundGeolocation() {
    // Compose #url: tracker.transistorsoft.com/locations/{username}
    let deviceInfo = await BackgroundGeolocation.getDeviceInfo();
    let name = 'Long'
    this.deviceName = deviceInfo.model +'-'+name;
    // let toast = this.toastCtrl.create({
    //   message: 'Mã thiết bị: '+deviceName,
    //   duration: 3000,
    //   position: 'middle'
    // });
    this.toastController.create({
      message: 'Mã thiết bị: '+this.deviceName,
      duration: 3000,
      position: 'top'

    }).present();
    let org:string = 'test'
    await BackgroundGeolocation.destroyTransistorAuthorizationToken(ENV.TRACKER_HOST);
    // Register device with tracker.transistorsoft.com to receive a JSON Web Token (JWT).
    let token:TransistorAuthorizationToken = await BackgroundGeolocation.findOrCreateTransistorAuthorizationToken(
      org,
      name,
      ENV.TRACKER_HOST
    );
    this.url = ENV.TRACKER_HOST;
    this.url += '/' + org;

    // Step 1:  Listen to events
    BackgroundGeolocation.onLocation(this.onLocation.bind(this));
    BackgroundGeolocation.onMotionChange(this.onMotionChange.bind(this));
    BackgroundGeolocation.onActivityChange(this.onActivityChange.bind(this));
    BackgroundGeolocation.onHttp(this.onHttpSuccess.bind(this));
    BackgroundGeolocation.onProviderChange(this.onProviderChange.bind(this));
    BackgroundGeolocation.onPowerSaveChange(this.onPowerSaveChange.bind(this));
    BackgroundGeolocation.onConnectivityChange(this.onConnectivityChange.bind(this));
    BackgroundGeolocation.onAuthorization(this.onAuthorization.bind(this));
    BackgroundGeolocation.onHeartbeat(this.onHeartbeat.bind(this))

    // Step 2:  Configure the plugin
    BackgroundGeolocation.ready({
      reset: false,
      debug: false,
      logLevel: BackgroundGeolocation.LOG_LEVEL_VERBOSE,
      distanceFilter: 70,
      desiredAccuracy: BackgroundGeolocation.DESIRED_ACCURACY_HIGH,
      stopTimeout: 1,
      stopOnTerminate: false,
      startOnBoot: true,
      heartbeatInterval: 60,
      url: ENV.TRACKER_HOST + '/api/locations',
      authorization: {  // <-- JWT authorization for tracker.transistorsoft.com
        strategy: 'jwt',
        accessToken: token.accessToken,
        refreshToken: token.refreshToken,
        refreshUrl: ENV.TRACKER_HOST + '/api/refresh_token',
        refreshPayload: {
          refresh_token: '{refreshToken}'
        },
        expires: token.expires
      },
      autoSync: true,
      autoSyncThreshold: 5,
      batchSync: true
    }, (state) => {
      console.log('- Configure success: ', state);
      BackgroundGeolocation.start();
      this.isMoving =true;
      BackgroundGeolocation.changePace(  this.isMoving);

      // Update UI state (toggle switch, changePace button)
      this.zone.run(() => {
        this.isMoving = state.isMoving;
        this.enabled = state.enabled;
      });
    });
  }
  // Return to Home screen (app switcher)
  onClickHome() {
    this.navCtrl.setRoot('HomePage');
  }

  // #start / #stop tracking
  onToggleEnabled() {
    // if (this.enabled) {
      // BackgroundGeolocation.start();
    // } else {
    //   BackgroundGeolocation.stop();
    // }
  }

  // Fetch the current position
  onClickGetCurrentPosition() {
    BackgroundGeolocation.getCurrentPosition({persist: true}, (location) => {
      console.log('- getCurrentPosition: ', location);
    }, (error) => {
      console.warn('- Location error: ', error);
    });
  }

  onHeartbeat (event:HeartbeatEvent){
    BackgroundGeolocation.getCurrentPosition({
      samples: 1,
      persist: true
    }, (location) => {
      console.log('- getCurrentPosition: ', location);
    }, (error) => {
      console.warn('- Location error: ', error);
    });
  }
  // Change plugin state between stationary / tracking
  onClickChangePace() {
    this.isMoving = !this.isMoving;
    BackgroundGeolocation.changePace(this.isMoving);
  }

  // Clear the list of events from ion-list
  onClickClear() {
    this.events = [];
  }

  /**
  * @event location
  */
  onLocation(location:Location) {
    console.log('[event] location: ', location);
    let event = location.event || 'location';

    this.zone.run(() => {
      this.addEvent(event, new Date(location.timestamp), location);
    })
  }
  /**
  * @event motionchange
  */
  onMotionChange(event:MotionChangeEvent) {
    console.log('[event] motionchange, isMoving: ', event.isMoving, ', location: ', event.location);
    this.zone.run(() => {
      this.isMoving = event.isMoving;
    });
  }
  /**
  * @event activitychange
  */
  onActivityChange(event:MotionActivityEvent) {
    console.log('[event] activitychange: ', event);
    this.zone.run(() => {
      this.addEvent('activitychange', new Date(), event);
    });
  }
  /**
  * @event http
  */
  onHttpSuccess(response:HttpEvent) {
    console.log('[event] http: ', response);
    this.zone.run(() => {
      this.addEvent('http', new Date(), response);
    });
  }
  onHttpFailure(response:HttpEvent) {
    console.warn('[event] http failure: ', response);
    this.zone.run(() => {
      this.addEvent('http failure', new Date(), response);
    });
  }
  /**
  * @event providerchange
  */
  onProviderChange(provider:ProviderChangeEvent) {
    console.log('[event] providerchange', provider);
    this.zone.run(() => {
      this.addEvent('providerchange', new Date(), provider);
    });
  }
  /**
  * @event powersavechange
  */
  onPowerSaveChange(isPowerSaveEnabled:boolean) {
    console.log('[event] powersavechange', isPowerSaveEnabled);
    this.zone.run(() => {
      this.addEvent('powersavechange', new Date(), {isPowerSaveEnabled: isPowerSaveEnabled});
    });
  }
  /**
  * @event connectivitychange
  */
  onConnectivityChange(event:ConnectivityChangeEvent) {
    console.log('[event] connectivitychange connected? ', event.connected);
  }
  /**
  * @event authorization
  */
  onAuthorization(event:AuthorizationEvent) {
    console.log('[event] authorization: ', event);
  }
  /**
  * Add a record to ion-list
  * @param {String} event name
  * @param {Date} date
  * @param {Object} event object, eg: {location}, {provider}, {activity}
  */
  private addEvent(name, date, event) {
    let timestamp = date.toLocaleDateString() + ' ' + date.toLocaleTimeString();

    this.events.unshift({
      name: name,
      timestamp: timestamp,
      object: event,
      content: JSON.stringify(event, null, 2)
    });
  }
}
