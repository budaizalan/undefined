export default class HexMath {
    static _hexSize = 40;
    static _hexHeight = Math.sqrt(3) * this._hexSize;
    static _hexWidth = 2 * this._hexSize;
    static _hexVerticalSpacing = this._hexHeight * 0.75; // spacing between hexagons
    static _differenceBetweenTwoCorners = 0;
    static get hexSize() {
        return this._hexSize;
    }
    static get hexHeight() {
        return this._hexHeight;
    }
    static get hexWidth() {
        return this._hexWidth;
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
        console.log(`${this._differenceBetweenTwoCorners} gec`);
        return corners;
    }
    static calculateHexDiagonal() {
        let diagonal = 0;
        for (let i = 0; i < 6; i++) {
            const angle = (Math.PI / 3) * i;
            if (i == 0 || i == 2) {
                diagonal += this._hexSize * Math.cos(angle);
            }
        }
        return (diagonal * 6);
    }
    static calculateHexTiagonal() {
        const angle = (Math.PI / 1.5);
        let tiagonal = this._hexSize * Math.cos(angle);
        var results = [];
        // for each qmin ≤ q ≤ qmax:
        //     for each max(rmin, -q-smax) ≤ r ≤ min(rmax, -q-smin):
        //         results.append(Hex(q, r))
        return tiagonal * 6.92;
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
}
