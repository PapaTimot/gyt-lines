const pawns 		= [];

const VERTICAL 		= 0;//	|
const BARRE 		= 1;//	/
const HORIZONTAL 	= 2;//	-
const BANDE 		= 3;//	\


function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

const Pawn = function (x, y, isWhite){
	

	this.x 				= x;
	this.y 				= y;
	this.isWhite 		= isWhite;

	this.lineContent	= [[],[],[],[]];

	this.move = function(newPlace)
    {
        pawns.forEach(function(p){
            if(p.isSamePlace(newPlace))
            {
            	const i = pawns.indexOf(p);
            	pawns.splice(i, 1);
            }
        });
        pawns.push(newPlace);
        const i = pawns.indexOf(this);
        pawns.splice(i, 1);
    }


	this.possibleMoves = function()
    {
        var out = [];
        
        const moveSize = this.getMoveSize();
        this.validateMoves(new Pawn(this.x                     ,this.y+moveSize[VERTICAL],this.isWhite), this.lineContent[VERTICAL]  , out);
        this.validateMoves(new Pawn(this.x                     ,this.y-moveSize[VERTICAL],this.isWhite), this.lineContent[VERTICAL]  , out);
        this.validateMoves(new Pawn(this.x+moveSize[BARRE]     ,this.y+moveSize[BARRE]   ,this.isWhite), this.lineContent[BARRE]     , out);
        this.validateMoves(new Pawn(this.x-moveSize[BARRE]     ,this.y-moveSize[BARRE]   ,this.isWhite), this.lineContent[BARRE]     , out);
        this.validateMoves(new Pawn(this.x+moveSize[HORIZONTAL],this.y                   ,this.isWhite), this.lineContent[HORIZONTAL], out);
        this.validateMoves(new Pawn(this.x-moveSize[HORIZONTAL],this.y                   ,this.isWhite), this.lineContent[HORIZONTAL], out);
        this.validateMoves(new Pawn(this.x+moveSize[BANDE]     ,this.y-moveSize[BANDE]   ,this.isWhite), this.lineContent[BANDE]     , out);
        this.validateMoves(new Pawn(this.x-moveSize[BANDE]     ,this.y+moveSize[BANDE]   ,this.isWhite), this.lineContent[BANDE]     , out);
        
        return out;
    }

	this.getMoveSize = function()
    {
        const out = [1,1,1,1];
        pawns.forEach(function(p){
            if(this == p) return;
 
            if(this.y == p.y)
            {
                out[VERTICAL]++;
                lineContent[VERTICAL].push(p);      // sauvegarde des Pawns à la volé pour éviter une ré-itération
            }
            else if(this.x-this.y == p.x-p.y)
            {
                out[BARRE]++;
                lineContent[BARRE].push(p);
            }        
            else if(this.x == p.x)
            {
                out[HORIZONTAL]++
                lineContent[HORIZONTAL].push(p);
            }   
            else if(this.x+this.y == p.x+p.y)
            {
                out[BANDE]++;
                lineContent[BANDE].push(p);  
            } 
        });

        return out;
    }

    this.validateMoves = function(move, line, possibilities)
    {
        // if out of the board --> trash
        if(move.x > 7 || move.y > 7 || move.x < 0 || move.y < 0) return
        
        line.forEach(function(p){
            // if there is an ennemy pawn on the path --> trash
            if(p.isWhite != isWhite && isBeetwen(this, move)) return
            
            // if there is an other of our pawns at this place --> trash
            if(p.isWhite == isWhite && p.isSamePlace(this)) return
        });
        // else add it to possibilities
        possibilities.push(move);
    }


	/* ATTENTION
    *  position != move
    *  this != position
    *  this peux être égal à move
    *
    *  Normalement l'appel de cette fonction ce fait sur les contenuLigne qui garanti les assertions précédentes
    */
    this.isBeetwen = function(position, move)
    {
        const horizontalBetween = (position.x < this.x && this.x < move.x) || (position.x > this.x && this.x > move.x);
        const verticalBetween = (position.y < this.y && this.y < move.y) || (position.y > this.y && this.y > move.y);
        return verticalBetween || horizontalBetween;
    }

	this.isSamePlace = function(otherPawn)
	{
		return this.x == otherPawn.x && this.y == otherPawn.y;
	}
}


for (var i = 1; i < 7; i++) {
	pawns.push(new Pawn(i,0,this.isWhite));
	pawns.push(new Pawn(i,7,this.isWhite));
	pawns.push(new Pawn(0,i,this.isWhite));
	pawns.push(new Pawn(7,i,this.isWhite));
}

for (var i = 0; i < 10; i++) {
	const isBlack = i%2 == 0;
	var int = getRandomInt(pawns.length)
	while(pawns[int].isWhite == isBlack) int = getRandomInt(pawns.length);
	const moveChoice = pawns[int].possibleMoves();
	pawns[int].move(moveChoice[getRandomInt(moveChoice.length)]);
}