export default class Debug {
    static _debugMenu = document.getElementById('debug-menu');
    static _enabled = true;
    static _coordsEnabled = false;
    static _gapsEnabled = true;
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
            if (event.key === 'd' || (event.key === 'Escape' && this._debugMenu?.classList.contains('show'))) {
                this.toggleDebugMenu();
            }
        });
        let showCoordsButton = document.getElementById('show-coords');
        let showGapsButton = document.getElementById('show-gaps');
        showCoordsButton.checked = this._coordsEnabled;
        showGapsButton.checked = this._gapsEnabled;
        if (showCoordsButton) {
            showCoordsButton.addEventListener('click', () => {
                this.toggleCoords();
                this._drawMap?.();
            });
        }
        if (showGapsButton) {
            showGapsButton.addEventListener('click', () => {
                this.toggleGaps();
                this._drawMap?.(true);
            });
        }
        document.getElementById('debug-close')?.addEventListener('click', () => {
            this.toggleDebugMenu();
        });
    }
    static toggleDebugMenu() {
        if (this._debugMenu) {
            this._debugMenu.classList.toggle('show');
        }
    }
    static toggleGaps() {
        this._gapsEnabled = !this._gapsEnabled;
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
