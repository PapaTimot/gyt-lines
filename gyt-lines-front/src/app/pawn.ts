export class Pawn {

    VERTICAL   : number	= 0; //	|
    BARRE 	   : number	= 1; //	/
    HORIZONTAL : number = 2; //	-
    BANDE 	   : number	= 3; //	\

    x       : number ;
    y       : number ;
    isWhite : boolean;
    pawns   : Pawn[] ;
    lineContent : Pawn[][];
    gridSize    : number;

    constructor(x, y, isWhite, pawns, gridSize){
        this.x = x;
        this.y = y;
        this.isWhite = isWhite;
        this.pawns   = pawns  ;
        this.lineContent	= [[],[],[],[]];
        this.gridSize = gridSize;
    }
  
    move(newPlace) : void {
        this.pawns.forEach( (p,i) => {
            if(p.isSamePlace(newPlace)){
                this.pawns.splice(i, 1);
            }
        });
        this.pawns.push(newPlace);
        const i = this.pawns.indexOf(this);
        this.pawns.splice(i, 1);
    }
  
    possibleMoves() : Pawn[] {
    let out : Pawn[] = [];
        
        const moveSize = this.getMoveSize();
        this.validateMoves(new Pawn(this.x                          ,this.y+moveSize[this.VERTICAL],this.isWhite, this.pawns, this.gridSize), this.lineContent[this.VERTICAL]  , out);
        this.validateMoves(new Pawn(this.x                          ,this.y-moveSize[this.VERTICAL],this.isWhite, this.pawns, this.gridSize), this.lineContent[this.VERTICAL]  , out);
        this.validateMoves(new Pawn(this.x+moveSize[this.BARRE]     ,this.y+moveSize[this.BARRE]   ,this.isWhite, this.pawns, this.gridSize), this.lineContent[this.BARRE]     , out);
        this.validateMoves(new Pawn(this.x-moveSize[this.BARRE]     ,this.y-moveSize[this.BARRE]   ,this.isWhite, this.pawns, this.gridSize), this.lineContent[this.BARRE]     , out);
        this.validateMoves(new Pawn(this.x+moveSize[this.HORIZONTAL],this.y                        ,this.isWhite, this.pawns, this.gridSize), this.lineContent[this.HORIZONTAL], out);
        this.validateMoves(new Pawn(this.x-moveSize[this.HORIZONTAL],this.y                        ,this.isWhite, this.pawns, this.gridSize), this.lineContent[this.HORIZONTAL], out);
        this.validateMoves(new Pawn(this.x+moveSize[this.BANDE]     ,this.y-moveSize[this.BANDE]   ,this.isWhite, this.pawns, this.gridSize), this.lineContent[this.BANDE]     , out);
        this.validateMoves(new Pawn(this.x-moveSize[this.BANDE]     ,this.y+moveSize[this.BANDE]   ,this.isWhite, this.pawns, this.gridSize), this.lineContent[this.BANDE]     , out);
        
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
                this.lineContent[this.VERTICAL].push(p);      // sauvegarde des Pawns à la volé pour éviter une ré-itération
            }
            else if(this.x-this.y == p.x-p.y)
            {
                out[this.BARRE]++;
                this.lineContent[this.BARRE].push(p);
            }        
            else if(this.y == p.y)
            {
                out[this.HORIZONTAL]++
                this.lineContent[this.HORIZONTAL].push(p);
            }   
            else if(this.x+this.y == p.x+p.y)
            {
                out[this.BANDE]++;
                this.lineContent[this.BANDE].push(p);  
            } 
        },this);

        return out;
    }
  
    validateMoves(move, line, possibilities) : void {
        // if out of the board --> trash
        if(move.x >= this.gridSize || move.y >= this.gridSize || move.x < 0 || move.y < 0) return

        let valid: boolean = true;
        line.forEach( (p) => {
            // if there is an ennemy pawn on the path --> trash
            if(p.isWhite !== this.isWhite && p.isBetween(this, move)) valid = false;
            
            // if there is an other of our pawns at this place --> trash
            if(p.isWhite === this.isWhite && p.isSamePlace(this)) valid = false;
        });
        // line.forEach(element => {
        //     console.log(`isWhite : ${element.isWhite} - x : ${element.x} - y : ${element.y}`);
        // });
        // console.log("-");
        
        
        // else add it to possibilities
        if(valid) possibilities.push(move);
    }
  
    /* ATTENTION
      *  position != move
      *  this != position
      *  this peux être égal à move
      *
      *  Normalement l'appel de cette fonction ce fait sur les contenuLigne qui garanti les assertions précédentes
      */
    isBetween(position, move) : boolean {
        const horizontalBetween = (position.x < this.x && this.x < move.x) || (position.x > this.x && this.x > move.x);
        const verticalBetween = (position.y < this.y && this.y < move.y) || (position.y > this.y && this.y > move.y);
        return verticalBetween || horizontalBetween;
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