import Factory from "./Factory.js";
import Game from "./Game.js";
import HexMath from "./HexMath.js";

export default abstract class UI {
    private static _canvas: HTMLCanvasElement;
    private static _ctx: CanvasRenderingContext2D;
    private static _UIWidth: number = 150;
    private static _hexSize: number = 50;
    private static _hexWidth: number = 2 * this._hexSize;
    private static _hexHeight: number = Math.sqrt(3) * this._hexSize;
    private static _factoryTypesCount: { [key: string]: number } = Game.factoryTypesCount;
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
            this._ctx.fillStyle = '#333';
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
            const factoryTypeCounts = this._factoryTypesCount;
            const factoryKeys = Object.keys(factoryTypeCounts);
            for (let i = 0; i < factoryKeys.length; i++) {
                const factory= new Factory(factoryKeys[i]);
                factory.x = this._canvas.width - this._UIWidth / 2;
                factory.y = y + i * 100;
                this._UIFactories.push(factory);
                this.drawFactory(this._ctx, factory);
                this.drawFactoryCount(factory, factoryTypeCounts[factoryKeys[i]]);
            }
        }
    }

    static drawFactory(ctx: CanvasRenderingContext2D, factory: Factory): void {
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

    // static setupEventListeners(): void {
    //     this._canvas.addEventListener('mousedown', (event) => {
    //         console.log('mousedown');
            
    //         const rect = this._canvas.getBoundingClientRect();
    //         const x = event.clientX - rect.left;
    //         const y = event.clientY - rect.top;
    //         console.log(x, y);
    //         console.log(this._UIFactories);
    //         for(let i = 0; i < this._UIFactories.length; i++){
    //             if(HexMath.isPointInHex(this._ctx, x, y, {x: this._UIFactories[i].x, y: this._UIFactories[i].y}, this._UIFactories[i].size)){
    //                 Game.factoryTypesCount[this._UIFactories[i].factoryType]--;
    //                 Game.draggingFactory = this._UIFactories[i];
    //                 Game.draggingFactory.offset = {x: x - this._UIFactories[i].x, y: y - this._UIFactories[i].y};
    //                 return;
    //             }
    //         }
    //     });
    //     this._canvas.addEventListener('mousemove', (event) => {
    //         const rect = this._canvas.getBoundingClientRect();
    //         const x = event.clientX - rect.left;
    //         const y = event.clientY - rect.top;
    //         if(Game.draggingFactory){
    //             Game.draggingFactory.x = x - Game.draggingFactory.offset.x;
    //             Game.draggingFactory.y = y - Game.draggingFactory.offset.y;
    //             UI.draw();
    //             this.drawFactory(Game.draggingFactory);
    //         } else {
    //             for(let i = 0; i < this._UIFactories.length; i++){
    //                 if(HexMath.isPointInHex(this._ctx, x, y, {x: this._UIFactories[i].x, y: this._UIFactories[i].y}, this._UIFactories[i].size)){
    //                     this._canvas.style.cursor = 'pointer';
    //                     return;
    //                 }
    //             }
    //             this._canvas.style.cursor = 'default';
    //         }
    //     });
    //     this._canvas.addEventListener('mouseup', (event) => {
    //         if (Game.draggingFactory) {
    //             Game.factoryTypesCount[Game.draggingFactory.factoryType]++;
    //             Game.draggingFactory = null;
    //             console.log(this._UIFactories);
    //         }
    //         UI.draw();
    //     });
    // }
}