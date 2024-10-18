export default class Hex {
    static _hexSize = 40;
    static _hexHeight = Math.sqrt(3) * this._hexSize;
    static _hexWidth = 2 * this._hexSize;
    static _hexVerticalSpacing = this._hexHeight * 0.75; // spacing between hexagons
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
}
