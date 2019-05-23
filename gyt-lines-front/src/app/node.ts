import { Pawn } from './pawn';
import { GameService } from '../game.service';

export class Node {
	MINMAX_DEPTH	: number = 5;

	state      		: Pawn[];
	nextStates  	: Node[];
	val         	: number;
	lastPawnMoved  	: Pawn;
	game 			: GameService;

	constructor(gameService: GameService, state, player_color, my_color, depth, moved){
		this.game           = gameService;
		this.state 			= state;
		this.nextStates 	= [];
		this.val 			= 0;
		this.lastPawnMoved 	= moved;


		if(depth>this.MINMAX_DEPTH){
			this.val = this.game.reward(this.game.pawns,my_color);
		} else {
			for (var i = this.game.pawns.length - 1; i >= 0; i--) {
				if(this.game.pawns[i].isWhite == player_color){
					const nextPlaces = this.game.pawns[i].possibleMoves();
					const moved = this.game.pawns.splice(i,1);
					for (var j = nextPlaces.length - 1; j >= 0; j--) {
						const nextBoard = Array.from(this.game.pawns);
						nextBoard.push(nextPlaces[j]);
						this.nextStates.push(new Node(this.gameService, nextBoard, !player_color, my_color, depth+1, moved[0]));
					}
					this.game.pawns = Array.from(this.state);
				}
			}
			if (this.nextStates == []) {
				this.val = this.game.reward(this.game.pawns,my_color);
			}
		}
	}

	calcValue(isMax) : number {
		if (this.nextStates.length == 0) {
			return -1;
		}
		for (var i = nextStates.length - 1; i >= 0; i--) {
			nextStates[i].calcValue(!isMax);
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