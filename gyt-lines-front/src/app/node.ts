export class Node {
	// MINMAX_DEPTH	: number = 5;

	// state      		: Pawn[];
	// nextStates  	: Pawn[][];
	// val         	: number;

	// constructor(state, player_color, my_color, depth){
	// 	this.state 		= state;
	// 	this.nextStates = [];
	// 	this.val 		= 0;


	// 	if(depth>MINMAX_DEPTH){
	// 		this.val = reward(pawns,my_color);
	// 	} else {
	// 		for (var i = pawns.length - 1; i >= 0; i--) {
	// 			if(pawns[i].isWhite == player_color){
	// 				const nextPlaces = pawns[i].possibleMoves();
	// 				pawns.splice(i,1);
	// 				for (var j = nextPlaces.length - 1; j >= 0; j--) {
	// 					nextBoard = Array.from(pawns);
	// 					nextBoard.push(nextPlaces[j]);
	// 					nextStates.push(new Node(nextBoard, !player_color, my_color, depth+1));
	// 				}
	// 				pawns = Array.from(this.state);
	// 			}
	// 		}
	// 	}
	// }

	// calcValue() : number {
	// 	return calcValue(true);
	// }

	// calcValue(isMax) : number {
	// 	for (var i = nextStates.length - 1; i >= 0; i--) {
	// 		nextStates[i].calcValue(!isMax);
	// 	}
	// 	let vals = nextStates.map(x => x.val);
	// 	let index = 0;
	// 	let v = vals[0];
	// 	for (var i = vals.length - 1; i > 0; i--) {
	// 		if ((isMax && vals[i]>v) || (!isMax && vals[i]<v)) {
	// 			v = vals[i];
	// 			index = i;
	// 		} 
	// 	}
	// 	this.val = v;
	// 	return index;
	// }
}