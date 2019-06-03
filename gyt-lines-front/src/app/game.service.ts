import { Injectable } from '@angular/core';
import { Pawn } from './pawn';

@Injectable({
	providedIn: 'root'
})

export class GameService {

	constructor() {}

	// possible values are 'none', 'random', 'minMax' and 'minMaxImproved'
	blackPlayer : string = 'none';
	whitePlayer : string = 'random';
	gridSize    : number = 6;
	userName    : string = "Joueur 1";
	victory     : number = 0;
	nbTurn      : number = 0;
	animationDelay : number = 1000;

  	pawns : Pawn[] = [];

  	THREAT_WEIGHT			:number = 10000;
  	CENTRALISATION_WEIGHT 	:number = 1000;
  	CLUSTER_WEIGHT			:number = 50;
  	EAT_WEIGHT				:number = 100;
  
  initGame() : void {
		this.pawns = [];
    for (let i = 1; i < this.gridSize-1; i++) {
      this.pawns.push( new Pawn(this, i, 0, true) );
      this.pawns.push( new Pawn(this, i, this.gridSize-1, true) );
      this.pawns.push( new Pawn(this, 0, i, false) );
      this.pawns.push( new Pawn(this, this.gridSize-1, i, false) );
    }
  }

	checkVictory() : number {
		let out = 0;

		let whiteClusters = this.getClusters(this.pawns, true);
		let blackClusters = this.getClusters(this.pawns, false);

		out += whiteClusters.length == 1?1:0;
		out += blackClusters.length == 1?2:0;
		return out;
	}

	getClusters(pawns, color) : Pawn[][] {
		const clusters = []
		for (let index = pawns.length -1; index >= 0; index--) {
			const p = pawns[index];
			if(p.isWhite == color){
				let lastCluster = [];
				lastCluster.push(p);
				for (let i = clusters.length-1; i >= 0; i--) {
					const cluster = clusters[i];
					if(p.isConnected(cluster)){
						lastCluster = lastCluster.concat(cluster);
						clusters.splice(i,1);
					}
				}
				clusters.push(lastCluster)
			}
		}
		return clusters;
	}

	getThreats(pawns, isWhite) : Pawn[]{
		let clusters = this.getClusters(pawns, isWhite)
		if (clusters.length > 2) { return [];}
		const threat = []

		var gameCopy: Pawn[] = Array.from(pawns);
		for (var i = gameCopy.length - 1; i >= 0; i--) {
			if(gameCopy[i].isWhite == isWhite){
				const nextPlaces = gameCopy[i].possibleMoves();
				const pawnToMove = pawns[i];
				gameCopy.splice(i,1);
				for (var j = nextPlaces.length - 1; j >= 0; j--) {
					const nextBoard = Array.from(gameCopy);
					nextBoard.push(nextPlaces[j]);
					if(this.getClusters(pawns,isWhite).length == 1){
						threat.push(nextPlaces[j])
					}
				}
				gameCopy = Array.from(pawns);
			}
		}
		return threat;
	}

		getCenterOfMass(pawns, isWhite) : Pawn{
			let out = null;
			let xs = 0;
			let ys = 0;
			let nb = 0;
			pawns.forEach(function(p,i){
				if(p.isWhite == isWhite){
					nb++;
					xs+=p.x;
					ys+=p.y;
				}
			});
			return new Pawn(this, Math.round(xs/nb),Math.round(ys/nb),isWhite)
		}

		reward(pawns,mycolor,difficulte) : number{
			let reward = 0
			const my_clusters = this.getClusters(pawns, mycolor)
			if(my_clusters.length == 1){
				reward += 10000000000
			}
			const other_clusters = this.getClusters(pawns, !mycolor)
			if(other_clusters.length == 1){
				reward -= 10000000000
			}

			

			const my_threat 	= this.getThreats(pawns, mycolor);
			const other_threat 	= this.getThreats(pawns, !mycolor);

			reward += my_threat.length 		* this.THREAT_WEIGHT
			reward -= other_threat.length 	* this.THREAT_WEIGHT

			const my_center = this.getCenterOfMass(pawns, mycolor);
			const other_center = this.getCenterOfMass(pawns, !mycolor);
			let my_dist = 0;
			let other_dist = 0;
			let my_nbPawns = 0;
			let other_nbPawns = 0;

			for (var i = pawns.length - 1; i >= 0; i--) {
				if(pawns[i].isWhite == mycolor){
					const dir_dy = my_center.y - pawns[i].y
					const dir_dx = my_center.x - pawns[i].x
					my_dist += dir_dx*dir_dx+dir_dy*dir_dy
					my_nbPawns++;
				} else {
					const dir_dy = other_center.y - pawns[i].y
					const dir_dx = other_center.x - pawns[i].x
					other_dist += dir_dx*dir_dx+dir_dy*dir_dy
					other_nbPawns++;
				}
			}
			reward += (my_nbPawns / my_dist) * this.CENTRALISATION_WEIGHT
			reward -= (other_nbPawns / other_dist) * this.CENTRALISATION_WEIGHT

			if (difficulte > 1) {
				reward += ( 1 / my_clusters.length ) 	* this.CLUSTER_WEIGHT;
				reward -= ( 1 / other_clusters.length ) * this.CLUSTER_WEIGHT;

				reward += ( 1 / my_nbPawns ) 	* this.EAT_WEIGHT;
				reward -= ( 1 / other_nbPawns ) * this.EAT_WEIGHT;
			}

			return reward
		}
	}