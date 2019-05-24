export class Pawn {

    VERTICAL   : number	= 0; //	|
    BARRE 	   : number	= 1; //	/
    HORIZONTAL : number = 2; //	-
    BANDE 	   : number	= 3; //	\

    x       : number ;
    y       : number ;
    isWhite : boolean;
    pawns   : Pawn[] ;
    gridSize    : number;

    constructor(x, y, isWhite, pawns, gridSize){
        this.x              = x;
        this.y              = y;
        this.isWhite        = isWhite;
        this.pawns          = pawns  ;
        this.gridSize       = gridSize;
    }
  
    move(newPlace) : void {
        for (var i = this.pawns.length - 1; i >= 0; i--) {
            if(this.pawns[i].isSamePlace(newPlace)){
                this.pawns.splice(i, 1);
            }
        }
        this.pawns.push(newPlace);
        i = this.pawns.indexOf(this);
        this.pawns.splice(i, 1);
    }
  
    possibleMoves(pawns) : Pawn[] {
    let out : Pawn[] = [];
        
        const moveSize = this.getMoveSize();
        this.validateMoves(new Pawn(this.x                          ,this.y+moveSize[this.VERTICAL],this.isWhite, pawns, this.gridSize), pawns , out);
        this.validateMoves(new Pawn(this.x                          ,this.y-moveSize[this.VERTICAL],this.isWhite, pawns, this.gridSize), pawns , out);
        this.validateMoves(new Pawn(this.x+moveSize[this.BARRE]     ,this.y+moveSize[this.BARRE]   ,this.isWhite, pawns, this.gridSize), pawns , out);
        this.validateMoves(new Pawn(this.x-moveSize[this.BARRE]     ,this.y-moveSize[this.BARRE]   ,this.isWhite, pawns, this.gridSize), pawns , out);
        this.validateMoves(new Pawn(this.x+moveSize[this.HORIZONTAL],this.y                        ,this.isWhite, pawns, this.gridSize), pawns , out);
        this.validateMoves(new Pawn(this.x-moveSize[this.HORIZONTAL],this.y                        ,this.isWhite, pawns, this.gridSize), pawns , out);
        this.validateMoves(new Pawn(this.x+moveSize[this.BANDE]     ,this.y-moveSize[this.BANDE]   ,this.isWhite, pawns, this.gridSize), pawns , out);
        this.validateMoves(new Pawn(this.x-moveSize[this.BANDE]     ,this.y+moveSize[this.BANDE]   ,this.isWhite, pawns, this.gridSize), pawns , out);
        
        return out;
    }
  
    getMoveSize() : number[] {
        let out = [1,1,1,1];
        this.pawns.forEach( (p) => {
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
  
    validateMoves(move, pawnsToVerify, possibilities) : void {
        // if out of the board --> trash
        if(move.x >= this.gridSize || move.y >= this.gridSize || move.x < 0 || move.y < 0) return

        let valid: boolean = true;
        for (var i = pawnsToVerify.length - 1; i >= 0; i--) {
            // if there is an ennemy pawn on the path --> trash            
            if(pawnsToVerify[i].isWhite !== this.isWhite && pawnsToVerify[i].isBetween(this, move)) valid = false;
            
            // if there is an other of our pawns at this place --> trash
            if(pawnsToVerify[i].isWhite === this.isWhite && pawnsToVerify[i].isSamePlace(move)) valid = false;
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