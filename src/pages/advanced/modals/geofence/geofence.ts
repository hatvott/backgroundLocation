import { Component } from '@angular/core';
import {
  IonicPage,
  ViewController,
  AlertController,
  NavParams
} from 'ionic-angular';

import {BGService} from '../../lib/BGService';

////
// NOTE:  normally you will simply import from "cordova-background-geolocation-lt" or "cordova-background-geolocation"
// This is done only for convenience in the SampleApp for easily switching between public / private version of the plugin
//
import BackgroundGeolocation from "../../../../cordova-background-geolocation";

/*
  Generated class for the Geofence page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@IonicPage()

@Component({
  selector: 'page-geofence',
  templateUrl: 'geofence.html'
})

export class GeofencePage {
  private bgService: BGService;
  public identifier: string;
  public radius: string;
  private latitude: number;
  private longitude: number;
  public notifyOnEntry: boolean;
  public notifyOnExit: boolean;
  public notifyOnDwell: boolean;
  public loiteringDelay: number;
  public radiusOptions: any;

  constructor(
    private alertCtrl: AlertController,
    private navParams: NavParams,
    private viewCtrl: ViewController) {
    this.bgService = this.navParams.get('bgService');
    this.identifier = '';
    this.radius = '200';
    this.latitude = this.navParams.get('latitude');
    this.longitude = this.navParams.get('longitude');

    this.notifyOnEntry = true;
    this.notifyOnExit = true;
    this.notifyOnDwell = false;

    this.radiusOptions = [100, 150, 200, 500, 1000, 5000, 10000];
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad GeofencePage');
  }

  onClickCancel() {
    this.viewCtrl.dismiss();
  }

  onClickSubmit() {
    let radius = parseInt(this.radius, 10);
    BackgroundGeolocation.addGeofence({
      identifier: this.identifier,
      radius: radius,
      latitude: this.latitude,
      longitude: this.longitude,
      notifyOnEntry: this.notifyOnEntry,
      notifyOnExit: this.notifyOnExit,
      notifyOnDwell: this.notifyOnDwell,
      loiteringDelay: this.loiteringDelay,
      extras: {
        radius: radius,
        center: {latitude: this.latitude, longitude: this.longitude}
      }
    }, (identifier) => {
      this.bgService.playSound('ADD_GEOFENCE');
      this.viewCtrl.dismiss();
    }, (error) => {
      this.alert('Error', error);
    })
  }

  alert(title, message) {
    this.alertCtrl.create({
      title: title,
      subTitle: message,
      buttons: ['Dismiss']
    }).present();
  }
}
