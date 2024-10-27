export default class HexMath {
    static _hexSize;
    static _hexHeight;
    static _hexWidth;
    static _hexVerticalSpacing; // spacing between hexagons
    static get hexSize() {
        return this._hexSize;
    }
    static set hexSize(value) {
        this._hexSize = value;
        this._hexHeight = Math.sqrt(3) * this._hexSize;
        this._hexWidth = 2 * this._hexSize;
        this._hexVerticalSpacing = this._hexHeight * 0.75;
    }
    static get hexHeight() {
        return this._hexHeight;
    }
    static get hexWidth() {
        return this._hexWidth;
    }
    static get hexVerticalSpacing() {
        return this._hexVerticalSpacing;
    }
    static hexToPixel(q, r) {
        const x = this._hexSize * (3 / 2 * q);
        const y = this._hexSize * (Math.sqrt(3) * (r + q / 2));
        return { x, y };
    }
    static calculateHexCorners(x, y) {
        const corners = [];
        for (let i = 0; i < 6; i++) {
            const angle = (Math.PI / 3) * i;
            const cornerX = x + this._hexSize * Math.cos(angle);
            const cornerY = y + this._hexSize * Math.sin(angle);
            corners.push({ x: cornerX, y: cornerY });
        }
        return corners;
    }
    static pixelToHex(x, y) {
        const q = (2 / 3 * x) / this._hexSize;
        const r = (-1 / 3 * x + Math.sqrt(3) / 3 * y) / this._hexSize;
        // Round the coordinates to the nearest hex
        return this.hexRound(q, r);
    }
    static hexRound(q, r) {
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
        }
        else if (r_diff > s_diff) {
            rr = -rq - rs;
        }
        return { q: rq, r: rr };
    }
    static calculateRange(hex, range) {
        const qmin = hex.q - range;
        const qmax = hex.q + range;
        const rmin = hex.r - range;
        const rmax = hex.r + range;
        const smax = -hex.q - hex.r + range;
        const smin = -hex.q - hex.r - range;
        const results = [];
        for (let q = qmin; q <= qmax; q++) {
            for (let r = Math.max(rmin, -q - smax); r <= Math.min(rmax, -q - smin); r++) {
                results.push({ q, r });
            }
        }
        return results;
    }
}
