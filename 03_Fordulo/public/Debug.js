export default class Debug {
    static _coordsEnabled = true;
    static _ctx = null;
    static _canvas = null;
    static _drawMap = null;
    static initialize(canvas, ctx, drawMap) {
        this._canvas = canvas;
        this._ctx = ctx;
        this._drawMap = drawMap;
        this.setupEventListeners();
    }
    static setupEventListeners() {
        document.addEventListener('keydown', (event) => {
            if (event.key === 'd') {
                this.toggleDebugMenu();
            }
        });
        let showCoordsButton = document.getElementById('show-coords');
        showCoordsButton.checked = this._coordsEnabled;
        if (showCoordsButton) {
            showCoordsButton.addEventListener('click', () => {
                this.toggleCoords();
                this._drawMap?.();
            });
        }
        document.getElementById('debug-close')?.addEventListener('click', () => {
            this.toggleDebugMenu();
        });
    }
    static toggleDebugMenu() {
        let debugMenu = document.getElementById('debug-menu');
        if (debugMenu) {
            // debugMenu.style.display = debugMenu.style.display === 'none' || debugMenu.style.display === '' ? 'flex' : 'none';
            debugMenu.classList.toggle('show');
        }
    }
    static toggleCoords() {
        this._coordsEnabled = !this._coordsEnabled;
    }
    static drawCoords(x, y, q, r) {
        if (this._coordsEnabled && this._ctx && this._canvas) {
            this._ctx.fillStyle = '#000';
            this._ctx.font = '15px Arial';
            let textWidth = this._ctx.measureText(`${q}, ${r}`).width;
            this._ctx.fillText(`${q}, ${r}`, x + this._canvas.width / 2 - textWidth / 2, y + this._canvas.height / 2 + 5);
        }
    }
}
