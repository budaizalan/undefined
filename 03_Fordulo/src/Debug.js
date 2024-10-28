"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Debug {
    static initialize(canvas, ctx, drawMap) {
        this._canvas = canvas;
        this._ctx = ctx;
        this._drawMap = drawMap;
        this.setupEventListeners();
    }
    static setupEventListeners() {
        var _a;
        document.addEventListener('keydown', (event) => {
            var _a;
            if (event.key === 'd' || (event.key === 'Escape' && ((_a = this._debugMenu) === null || _a === void 0 ? void 0 : _a.classList.contains('show')))) {
                this.toggleDebugMenu();
            }
        });
        let showCoordsButton = document.getElementById('show-coords');
        let showGapsButton = document.getElementById('show-gaps');
        showCoordsButton.checked = this._coordsEnabled;
        showGapsButton.checked = this._gapsEnabled;
        if (showCoordsButton) {
            showCoordsButton.addEventListener('click', () => {
                var _a;
                this.toggleCoords();
                (_a = this._drawMap) === null || _a === void 0 ? void 0 : _a.call(this);
            });
        }
        if (showGapsButton) {
            showGapsButton.addEventListener('click', () => {
                var _a;
                this.toggleGaps();
                (_a = this._drawMap) === null || _a === void 0 ? void 0 : _a.call(this, true);
            });
        }
        (_a = document.getElementById('debug-close')) === null || _a === void 0 ? void 0 : _a.addEventListener('click', () => {
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
Debug._debugMenu = document.getElementById('debug-menu');
Debug._enabled = true;
Debug._coordsEnabled = true;
Debug._gapsEnabled = true;
Debug._ctx = null;
Debug._canvas = null;
Debug._drawMap = null;
exports.default = Debug;
