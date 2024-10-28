import Factory from "./Factory.js";
import Game from "./Game.js";
import HexMath from "./HexMath.js";
export default class UI {
    static _canvas;
    static _ctx;
    static _UIWidth = 150;
    static _hexSize = 50;
    static _hexWidth = 2 * this._hexSize;
    static _hexHeight = Math.sqrt(3) * this._hexSize;
    static _factoryTypesCount = Game.factoryTypesCount;
    static _UIFactories = [];
    static initialize(canvas, ctx) {
        this._canvas = canvas;
        this._ctx = ctx;
    }
    static get factories() {
        return this._UIFactories;
    }
    static set factories(value) {
        this._UIFactories = value;
    }
    static draw() {
        this.drawSidebar();
        this.drawUIFactories(this._canvas.width / 2, 100);
    }
    static drawSidebar() {
        if (this._ctx) {
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
    static drawUIFactories(x, y) {
        this._UIFactories = [];
        if (this._ctx) {
            const factoryTypeCounts = this._factoryTypesCount;
            const factoryKeys = Object.keys(factoryTypeCounts);
            for (let i = 0; i < factoryKeys.length; i++) {
                const factory = new Factory(factoryKeys[i], 2);
                factory.x = this._canvas.width - this._UIWidth / 2;
                factory.y = y + i * 100;
                this._UIFactories.push(factory);
                this.drawFactory(this._ctx, factory);
                this.drawFactoryCount(factory, factoryTypeCounts[factoryKeys[i]]);
            }
        }
    }
    static drawFactory(ctx, factory) {
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
    static drawFactoryCount(factory, count) {
        if (this._ctx) {
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
