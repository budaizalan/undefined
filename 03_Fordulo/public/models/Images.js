export default class Images {
    stoneImage = new Image();
    grassImage = new Image();
    grassImage2 = new Image();
    oceanImage = new Image();
    cityImage = new Image();
    constructor() {
        this.grassImage.src = './assets/grass.png';
        this.grassImage2.src = './assets/grass2.png';
        this.stoneImage.src = './assets/stone.png';
        this.oceanImage.src = './assets/ocean.png';
        this.cityImage.src = './assets/city.png';
    }
}
