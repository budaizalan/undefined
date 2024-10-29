import Factory from "./models/Factory.js";
import Game from "./models/Game.js";
import Images from "./models/Images.js";
import HexMath from "./utilities/HexMath.js";

export default abstract class UI {
    private static _canvas: HTMLCanvasElement;
    private static _ctx: CanvasRenderingContext2D;
    private static _UIWidth: number = 150;
    private static _hexSize: number = 50;
    private static _hexWidth: number = 2 * this._hexSize;
    private static _hexHeight: number = Math.sqrt(3) * this._hexSize;
    private static _UIFactories: Array<Factory> = [];

    static initialize(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D): void {
        this._canvas = canvas;
        this._ctx = ctx;
    }

    static get factories(): Array<Factory> {
        return this._UIFactories;
    }

    static set factories(value: Array<Factory>) {
        this._UIFactories = value;
    }

    public static draw(): void {
        this.drawSidebar();
        this.drawUIFactories(this._canvas.width / 2, 100);
    }

    static drawSidebar(): void {
        if(this._ctx) {
            this._ctx.clearRect(this._canvas.width - this._UIWidth, 0, this._UIWidth, this._canvas.height);
            this._ctx.fillStyle = 'rgb(20, 18, 28)';
            this._ctx.fillRect(this._canvas.width - this._UIWidth, 0, this._UIWidth, this._canvas.height);
            this._ctx.fillStyle = '#fff';
            this._ctx.font = '20px Arial';
            const text = 'Műhelyek';
            const textWidth = this._ctx.measureText(text).width;
            this._ctx.fillText(text, this._canvas.width - this._UIWidth / 2 - textWidth / 2, 40);
        }
    }

    static drawUIFactories(x: number, y: number): void {
        this._UIFactories = [];
        if(this._ctx) {
            const factoryTypeCounts = Game.factoryTypesCount;
            const factoryKeys = Object.keys(factoryTypeCounts);
            for (let i = 0; i < factoryKeys.length; i++) {
                const factory= new Factory(factoryKeys[i], 2);
                factory.x = this._canvas.width - this._UIWidth / 2;
                factory.y = y + i * 100;
                this._UIFactories.push(factory);
                this.drawFactory(this._ctx, factory);
                this.drawFactoryCount(factory, factoryTypeCounts[factoryKeys[i]]);
            }
        }
    }

    static drawFactory(ctx: CanvasRenderingContext2D, factory: Factory): void {
        if(factory.onMap){
            if (factory.position != undefined) {
                HexMath.calculateRange({q: factory.position.q, r: factory.position.r}, factory.range).forEach((hexPosition) => {
                    const hex = Game.hexMap.getHex(hexPosition.q, hexPosition.r);
                    if (hex) {
                        const hexCorners = HexMath.calculateHexCorners(hex.x + this._canvas.width / 2, hex.y + this._canvas.height / 2);
                        ctx.beginPath();
                        ctx.moveTo(hexCorners[0].x, hexCorners[0].y);
                        for (let i = 1; i < 6; i++) {
                            ctx.lineTo(hexCorners[i].x, hexCorners[i].y);
                        }
                        ctx.closePath();
                        ctx.fillStyle = 'rgba(0, 0, 255, 0.2)';
                        ctx.fill();
                    }
                });
            }
        }
        const corners = HexMath.calculateHexCorners(factory.x, factory.y, factory.size);
        ctx.beginPath();
        ctx.moveTo(corners[0].x, corners[0].y);
        for (let i = 1; i < 6; i++) {
            ctx.lineTo(corners[i].x, corners[i].y);
        }
        ctx.closePath();
        ctx.strokeStyle = '#000';
        ctx.lineWidth = 2;
        ctx.stroke();
        ctx.fillStyle = '#fff';
        ctx.fill();
        ctx.drawImage(Images.getFactoryImage(factory.productionType), factory.x - factory.width / 2, factory.y - factory.height / 2, factory.width , factory.height);
    }

    static drawFactoryCount(factory: Factory, count: number): void {
        if(this._ctx){
            const radius = 15;
            this._ctx.beginPath();
            this._ctx.arc(factory.x + factory.size + 5 - radius, factory.y - factory.height / 2 + radius, radius, 0, 2 * Math.PI);
            this._ctx.fillStyle = '#fff';
            this._ctx.fill();
            this._ctx.strokeStyle = '#000';
            this._ctx.lineWidth = 1;
            this._ctx.stroke();
            this._ctx.fillStyle = '#000';
            this._ctx.font = '20px Arial';
            let textWidth = this._ctx.measureText(count.toString()).width;
            this._ctx.fillText(count.toString(), factory.x + factory.size + 5 - radius - textWidth / 2, factory.y - factory.height / 2 + radius + 6);
        }
    }
}