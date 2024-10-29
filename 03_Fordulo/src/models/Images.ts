export default abstract class Images{
    public static stoneImage = new Image();
    public static grassImage = new Image();
    public static grassImage2 = new Image();
    public static oceanImage = new Image();
    public static cityImage = new Image();
    public static factoryBlueImage = new Image();
    public static factoryRedImage = new Image();
    public static factoryGreenImage = new Image();
    public static batteryBlueImage = new Image();
    public static batteryRedImage = new Image();
    public static batteryGreenImage = new Image();
    public static msgBubbleImage = new Image();

    static initialize(){
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

    public static imagesLoaded(): boolean{
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

    public static getFactoryImage(type: string): HTMLImageElement{
        return type === 'blue' ? this.factoryBlueImage : type === 'red' ? this.factoryRedImage : this.factoryGreenImage;
    }

    public static getBatteryImage(type: string): HTMLImageElement{
        return type === 'blue' ? this.batteryBlueImage : type === 'red' ? this.batteryRedImage : this.batteryGreenImage;
    }
}