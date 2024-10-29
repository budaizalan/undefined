export default class Images {
    static stoneImage = new Image();
    static grassImage = new Image();
    static grassImage2 = new Image();
    static oceanImage = new Image();
    static cityImage = new Image();
    static factoryBlueImage = new Image();
    static factoryRedImage = new Image();
    static factoryGreenImage = new Image();
    static batteryBlueImage = new Image();
    static batteryRedImage = new Image();
    static batteryGreenImage = new Image();
    static msgBubbleImage = new Image();
    static initialize() {
        this.grassImage.src = './assets/grass2.png';
        this.grassImage2.src = './assets/grass2.png';
        this.stoneImage.src = './assets/stone.png';
        this.oceanImage.src = './assets/ocean.png';
        this.cityImage.src = './assets/city.png';
        this.factoryBlueImage.src = './assets/factoryblue.png';
        this.factoryRedImage.src = './assets/factoryred.png';
        this.factoryGreenImage.src = './assets/factorygreen.png';
        this.batteryBlueImage.src = './assets/batteryblue.png';
        this.batteryRedImage.src = './assets/batteryred.png';
        this.batteryGreenImage.src = './assets/batterygreen.png';
        this.msgBubbleImage.src = './assets/msgbubble.png';
    }
    static imagesLoaded() {
        return this.stoneImage.complete
            && this.grassImage.complete
            && this.grassImage2.complete
            && this.oceanImage.complete
            && this.cityImage.complete
            && this.factoryBlueImage.complete
            && this.factoryRedImage.complete
            && this.factoryGreenImage.complete
            && this.batteryBlueImage.complete
            && this.batteryRedImage.complete
            && this.batteryGreenImage.complete
            && this.msgBubbleImage.complete;
    }
    static getFactoryImage(type) {
        return type === 'blue' ? this.factoryBlueImage : type === 'red' ? this.factoryRedImage : this.factoryGreenImage;
    }
    static getBatteryImage(type) {
        return type === 'blue' ? this.batteryBlueImage : type === 'red' ? this.batteryRedImage : this.batteryGreenImage;
    }
}
