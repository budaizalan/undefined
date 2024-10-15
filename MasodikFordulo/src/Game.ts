import Cell, {ProtoCell} from "./Cell.js";

export default class Game {
  private _map = new Array<Array<ProtoCell>>();
  private _mapSize: number;
  private _collectedFruits: number;
  private _steps: number;
  private _firstClick: boolean = true;
  private _abilities: string[] = ['teleport', 'dash', 'harvest', 'duplicate'];
  private _collectedAbilities: {[abiltity: string]: number} = {};
  private _showAbilities: boolean = true;
  private _gameOver: boolean;

  get map() {
    return this._map;
  }

  get mapSize() {
    return this._mapSize;
  }

  get collectedFruits() {
    return this._collectedFruits;
  }

  set collectedFruits(value: number) {
    this._collectedFruits = value;
  }

  get steps() {
    return this._steps;
  }

  set steps(value: number) {
    this._steps = value;
  }

  get firstClick() {
    return this._firstClick;
  }

  get abilities() {
    return this._abilities;
  }

  set firstClick(value: boolean) {
    this._firstClick = value;
  }

  get collectedAbilities() {
    return this._collectedAbilities;
  }

  get showAbilities() {
    return this._showAbilities;
  }

  set showAbilities(value: boolean) {
    this._showAbilities = value;
  }

  get gameOver() {
    return this._gameOver;
  }

  get randomValue() {
    let random_value = Math.floor((Math.random() * 11) / 2);        
    let result = random_value == 5 || random_value == 4 ? 0 : random_value;
    return result;
  }

  constructor(mapSize: number, steps: number) {
    this._mapSize = mapSize;
    this._collectedFruits = 0;
    this._steps = steps;
    this._gameOver = false;
    this._map = this.generateMap();
  }

  private generateMap(): Array<Array<ProtoCell>> {    
    let map = new Array<Array<ProtoCell>>();
    map.map(r => r.fill(new Cell(0, 0, 1, "none", false, null)));
    
    for (let i = 0; i < this._mapSize+2; i++) {      
      map[i] = new Array<Cell>();
      for (let j = 0; j < this._mapSize+2; j++) {
        if(i == 0 || j == 0 || i == this._mapSize+1 || j == this.mapSize+1) map[i][j] = new ProtoCell(-1);
        else{
          let random_value = Math.floor((Math.random() * 11) / 2);        
          let result = random_value == 5 || random_value == 4 ? 0 : random_value;
          map[i][j] = new Cell(i, j, result, "none", false, null);
        }
      }
    }   
    map = this.CorrectMapLayout(map);
    map.filter(r => r.filter(c => c.fruits > 0).length > 0).forEach(r => r.filter(c => c.fruits > 0).forEach(c => (c as Cell).ability = this.getRandomAbility()));
    console.log(map);
    return map;
  }

  private getRandomAbility(): string | null {
    const chance = Math.random();
    if (chance < 0.1) {
      const randomIndex = Math.floor(Math.random() * this._abilities.length);
      return this._abilities[randomIndex];
    }
    return null;
  }

  private CorrectMapLayout(_map: ProtoCell[][]): any{
    for (let i = 1; i < this.mapSize+1; i++) {
      for (let j = 1; j < this.mapSize+1; j++) {
        if(_map[i][j].fruits > 0){
          if (_map[i-1][j].fruits <= 0 && _map[i][j-1].fruits <= 0) {
            _map[i][j-1].fruits = this.randomValue;
            _map[i-1][j].fruits = this.randomValue;
          }
          if (_map[i+1][j].fruits <= 0 && _map[i][j+1].fruits <= 0) {
            _map[i][j+1].fruits = this.randomValue;
            _map[i+1][j].fruits = this.randomValue;
          }
        }
      }
    }
    for (let i = 1; i < this.mapSize+1; i++) {
      for (let j = 1; j < this.mapSize+1; j++) {
        if(_map[i][j].fruits > 0){
          if(
            _map[i-1][j-1].fruits > 0 &&
            _map[i-1][j].fruits > 0 &&
            _map[i-1][j+1].fruits > 0 &&
            _map[i][j-1].fruits > 0 &&
            _map[i][j+1].fruits > 0 &&
            _map[i+1][j-1].fruits > 0 &&
            _map[i+1][j].fruits > 0 &&
            _map[i+1][j+1].fruits > 0
          ) _map[i][j].fruits = 0;
        }        
      }
    }
    return _map
  }

  AddCollectedAbilities(value: string) {
    if (!this._collectedAbilities[value]) {
      this._collectedAbilities[value] = 1;
      return;
    } else{
      this._collectedAbilities[value]++;
    }
  }

  resetAbilities() {
    this._collectedAbilities = {};
  }

}
