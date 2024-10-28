import Game from "./Game.js";
import Hex from "./Hex.js";

export default abstract class HexMath {
    private static _hexSize: number;
    private static _hexHeight: number;
    private static _hexWidth: number;
    private static _hexVerticalSpacing: number; // spacing between hexagons

    static get hexSize(): number {
        return this._hexSize;
    }

    static set hexSize(value: number) {
        this._hexSize = value;
        this._hexHeight = Math.sqrt(3) * this._hexSize;
        this._hexWidth = 2 * this._hexSize;
        this._hexVerticalSpacing = this._hexHeight * 0.75;
    }

    static get hexHeight(): number {
        return this._hexHeight;
    }

    static get hexWidth(): number {
        return this._hexWidth;
    }

    static get hexVerticalSpacing(): number {
        return this._hexVerticalSpacing;
    }

    static hexToPixel(q: number, r: number): { x: number; y: number } {
        const x = this._hexSize * (3 / 2 * q);
        const y = this._hexSize * (Math.sqrt(3) * (r + q / 2));
        return { x, y };
    }

    static calculateHexCorners(x: number, y: number, hexSize: number = this._hexSize): { x: number; y: number; }[] {
        hexSize = hexSize || this._hexSize;
        const corners = [];
        for (let i = 0; i < 6; i++) {
            const angle = (Math.PI / 3) * i;
            const cornerX = x + hexSize * Math.cos(angle);
            const cornerY = y + hexSize * Math.sin(angle);
            corners.push({ x: cornerX, y: cornerY });
        }
        return corners;
    }

    static pixelToHex(x: number, y: number): { q: number; r: number } {
        const q = (2 / 3 * x) / this._hexSize;
        const r = (-1 / 3 * x + Math.sqrt(3) / 3 * y) / this._hexSize;
        // Round the coordinates to the nearest hex
        return this.hexRound(q, r);
    }

    private static hexRound(q: number, r: number): { q: number; r: number } {
        // Calculate the third coordinate
        let s = -q - r;
        let rq = Math.round(q);
        let rr = Math.round(r);
        let rs = Math.round(s);

        const q_diff = Math.abs(rq - q);
        const r_diff = Math.abs(rr - r);
        const s_diff = Math.abs(rs - s);

        // Adjust the coordinates to ensure q + r + s = 0
        if (q_diff > r_diff && q_diff > s_diff) {
            rq = -rr - rs;
        } else if (r_diff > s_diff) {
            rr = -rq - rs;
        }

        return { q: rq, r: rr };
    }

    static calculateRange(hex: Hex, range: number): { q: number; r: number }[] {
        const qmin = hex.q - range;
        const qmax = hex.q + range;
        const rmin = hex.r - range;
        const rmax = hex.r + range;
        const smax = -hex.q - hex.r + range;
        const smin = -hex.q - hex.r - range;
        const results = [];
        for (let q = qmin; q <= qmax; q++) {
            for (let r = Math.max(rmin, -q - smax); r <= Math.min(rmax, -q - smin); r++) {
                if(q >= -Game.mapRadius && q <= Game.mapRadius && r >= -Game.mapRadius && r <= Game.mapRadius){
                    results.push({ q, r });
                }
            }
        }
        return results;
    }

    static isPointInHex(ctx: CanvasRenderingContext2D , x: number, y: number, hexPosition: {x: number, y: number}, hexSize: number): boolean {
        const corners = this.calculateHexCorners(hexPosition.x, hexPosition.y, hexSize);
        const path = new Path2D();
        path.moveTo(corners[0].x, corners[0].y);
        for (let j = 1; j < 6; j++) {
            path.lineTo(corners[j].x, corners[j].y);
        }
        path.closePath();
        return ctx.isPointInPath(path, x, y);
    }
}