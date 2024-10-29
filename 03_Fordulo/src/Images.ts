export default class Images{
    public stoneImage = new Image();
    public grassImage = new Image();
    public grassImage2 = new Image();
    public oceanImage = new Image();
    public cityImage = new Image();

    constructor(){
        this.grassImage.src = './assets/grass.png';
        this.grassImage2.src = './assets/grass2.png';
        this.stoneImage.src = './assets/stone.png';
        this.oceanImage.src = './assets/ocean.png';
        this.cityImage.src = './assets/city.png';
    }
   
}