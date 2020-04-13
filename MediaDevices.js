'use strict';

import {NativeModules} from 'react-native';
import EventTarget from 'event-target-shim';

import getUserMedia from './getUserMedia';

const {WebRTCModule} = NativeModules;

const MEDIA_DEVICES_EVENTS = [
    'devicechange'
];

class MediaDevices extends EventTarget(MEDIA_DEVICES_EVENTS) {
    // TODO: implement.
    ondevicechange: ?Function;

    iosLandscapeLock;

    // Locks landscape on IOS => 0 - no lock 1 - landscape 2 - landscape left 3 - landscape right
    setIOSLandscapeLock(lock) {
	this.iosLandscapeLock = lock;
    }

    /**
     * W3C "Media Capture and Streams" compatible {@code enumerateDevices}
     * implementation.
     */
    enumerateDevices() {
        return new Promise(resolve => WebRTCModule.enumerateDevices(resolve));
    }

    /**
     * W3C "Media Capture and Streams" compatible {@code getUserMedia}
     * implementation.
     * See: https://www.w3.org/TR/mediacapture-streams/#dom-mediadevices-enumeratedevices
     *
     * @param {*} constraints 
     * @returns {Promise}
     */
    getUserMedia(constraints) {
        return getUserMedia(constraints,this.iosLandscapeLock);
    }
}

export default new MediaDevices();
