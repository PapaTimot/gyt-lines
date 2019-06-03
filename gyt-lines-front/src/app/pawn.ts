import { GameService } from './game.service';

export class Pawn {

    VERTICAL   : number	= 0; //	|
    BARRE 	   : number	= 1; //	/
    HORIZONTAL : number = 2; //	-
    BANDE 	   : number	= 3; //	\

    x       : number ;
    y       : number ;
    isWhite : boolean;

    game: GameService;

    constructor(gameService: GameService, x, y, isWhite){
        this.x              = x;
        this.y              = y;
        this.isWhite        = isWhite;
        this.game = gameService;
    }
  
    move(newPlace) : Pawn[] {
        for (var i = this.game.pawns.length - 1; i >= 0; i--) {
            if(this.game.pawns[i].isSamePlace(newPlace)){
                this.game.pawns.splice(i, 1);
            }
        }
        this.game.pawns.push(newPlace);
        i = this.game.pawns.indexOf(this);
        this.game.pawns.splice(i, 1);
        return this.game.pawns;
    }
  
    possibleMoves() : Pawn[] {
    let out : Pawn[] = [];
        
        const moveSize = this.getMoveSize();
        this.validateMoves(new Pawn(this.game, this.x                          ,this.y+moveSize[this.VERTICAL],this.isWhite), out);
        this.validateMoves(new Pawn(this.game, this.x                          ,this.y-moveSize[this.VERTICAL],this.isWhite), out);
        this.validateMoves(new Pawn(this.game, this.x+moveSize[this.BARRE]     ,this.y+moveSize[this.BARRE]   ,this.isWhite), out);
        this.validateMoves(new Pawn(this.game, this.x-moveSize[this.BARRE]     ,this.y-moveSize[this.BARRE]   ,this.isWhite), out);
        this.validateMoves(new Pawn(this.game, this.x+moveSize[this.HORIZONTAL],this.y                        ,this.isWhite), out);
        this.validateMoves(new Pawn(this.game, this.x-moveSize[this.HORIZONTAL],this.y                        ,this.isWhite), out);
        this.validateMoves(new Pawn(this.game, this.x+moveSize[this.BANDE]     ,this.y-moveSize[this.BANDE]   ,this.isWhite), out);
        this.validateMoves(new Pawn(this.game, this.x-moveSize[this.BANDE]     ,this.y+moveSize[this.BANDE]   ,this.isWhite), out);
        
        return out;
    }
  
    getMoveSize() : number[] {
        let out = [1,1,1,1];
        this.game.pawns.forEach( (p) => {
            if(this == p) {
                return;
            }
            if(this.x == p.x)
            {
                out[this.VERTICAL]++;
            }
            else if(this.x-this.y == p.x-p.y)
            {
                out[this.BARRE]++;
            }        
            else if(this.y == p.y)
            {
                out[this.HORIZONTAL]++
            }   
            else if(this.x+this.y == p.x+p.y)
            {
                out[this.BANDE]++; 
            } 
        },this);

        return out;
    }
  
    validateMoves(move, possibilities) : void {
        // if out of the board --> trash
        if(move.x >= this.game.gridSize || move.y >= this.game.gridSize || move.x < 0 || move.y < 0) return

        let valid: boolean = true;
        for (var i = this.game.pawns.length - 1; i >= 0; i--) {
            // if there is an ennemy pawn on the path --> trash            
            if(this.game.pawns[i].isWhite !== this.isWhite && this.game.pawns[i].isBetween(this, move)) valid = false;
            
            // if there is an other of our pawns at this place --> trash
            if(this.game.pawns[i].isWhite === this.isWhite && this.game.pawns[i].isSamePlace(move)) valid = false;
        }       
        
        // else add it to possibilities
        if(valid) possibilities.push(move);
    }
  
    isBetween(position, move) : boolean {
        const between_dx = this.x - position.x;
        const between_dy = this.y - position.y;
        const move_dx = move.x - position.x;
        const move_dy = move.y - position.y;
        const mod_between = Math.sqrt(between_dy*between_dy+between_dx*between_dx)
        const mod_move = Math.sqrt(move_dy*move_dy+move_dx*move_dx)
        if(mod_between>= mod_move) return false;
        // Warning : Math.abs and deltas are used because of the double approximation
        if(Math.abs(between_dx/mod_between - move_dx/mod_move) < 0.001 && Math.abs(between_dy/mod_between - move_dy/mod_move) < 0.001) return true;
        return false
    }
  
    isSamePlace(otherPawn) : boolean {
      return this.x == otherPawn.x && this.y == otherPawn.y;
    }

    isConnected(cluster) : boolean{
        for (var i = cluster.length - 1; i >= 0; i--) {
            if(Math.abs(this.x-cluster[i].x)<=1 && Math.abs(this.y-cluster[i].y)<=1) {
                return true
            }
        }
        return false;
    }
}