import { Pawn } from './pawn';
import { GameService } from './game.service';

export class Node {
	MINMAX_DEPTH	: number = 2;

	state      		: Pawn[];
	nextStates  	: Node[];
	val         	: number;
	lastPawnMoved  	: Pawn;
	game 			: GameService;
	difficulty		: number;

	constructor(gameService: GameService, state, player_color, my_color, depth, moved, difficulty){
		this.game           = gameService;
		this.state 			= state;
		this.nextStates 	= [];
		this.val 			= 0;
		this.lastPawnMoved 	= moved;
		this.difficulty		= difficulty;

		if(this.game.getClusters(state, my_color).length == 1){
			this.val = 10000000000
		} else if (this.game.getClusters(state, !my_color).length == 1) {
			this.val = -10000000000
		} else if(depth>this.MINMAX_DEPTH){
			this.val = this.game.reward(this.state,my_color,this.difficulty);
		} else {
			var gameCopy = Array.from(this.state);
			for (var i = gameCopy.length - 1; i >= 0; i--) {
				if(gameCopy[i].isWhite == player_color){
					const nextPlaces = gameCopy[i].possibleMoves(gameCopy);
					const pawnToMove = this.state[i];
					gameCopy.splice(i,1);
					for (var j = nextPlaces.length - 1; j >= 0; j--) {
						const nextBoard = Array.from(gameCopy);
						nextBoard.push(nextPlaces[j]);
						this.nextStates.push(new Node(this.game, nextBoard, !player_color, my_color, depth+1, pawnToMove, difficulty));
					}
					gameCopy = Array.from(this.state);
				}
			}
			if (this.nextStates == []) {
				this.val = this.game.reward(this.state,my_color, this.difficulty);
			}
		}
	}

	calcValue(isMax) : number {
		if (this.nextStates.length == 0) {
			return -1;
		}
		for (var i = this.nextStates.length - 1; i >= 0; i--) {
			this.nextStates[i].calcValue(!isMax);
		}
		let vals = this.nextStates.map(x => x.val);
		let index = 0;
		let v = vals[0];
		for (var i = vals.length - 1; i > 0; i--) {
			if ((isMax && vals[i]>v) || (!isMax && vals[i]<v)) {
				v = vals[i];
				index = i;
			} 
		}
		this.val = v;
		return index;
	}
}