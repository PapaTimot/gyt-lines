import { Injectable } from '@angular/core';
import { Pawn } from './pawn';

@Injectable({
	providedIn: 'root'
})
export class GameService {

	constructor() {}

	iaPlayer : boolean = false;
	gridSize : number = 6;
	userName : string = "Joueur 1";

  pawns : Pawn[] = [];
  THREAT_WEIGHT         :number = 100;
  CENTRALISATION_WEIGHT :number = 1;
  
  initGame() : void {
		this.pawns = [];
    for (let i = 1; i < this.gridSize-1; i++) {
      this.pawns.push( new Pawn(i,0,true ,this.pawns, this.gridSize) );
      this.pawns.push( new Pawn(i,this.gridSize-1,true ,this.pawns, this.gridSize) );
      this.pawns.push( new Pawn(0,i,false,this.pawns, this.gridSize) );
      this.pawns.push( new Pawn(this.gridSize-1,i,false,this.pawns, this.gridSize) );
    }
  }

	checkVictory() : number {
		let out = 0;

		let whiteClusters = this.getClusters(true);
		let blackClusters = this.getClusters(false);

		out += whiteClusters.length == 1?1:0;
		out += blackClusters.length == 1?2:0;
		return out;
	}

	getClusters(color) : Pawn[][] {
		const clusters = []
		for (let index = this.pawns.length -1; index >= 0; index--) {
			const p = this.pawns[index];
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

	getThreats(isWhite) : Pawn[]{
		let clusters = this.getClusters(isWhite)
		const threat = []
		if(clusters.length != 0) return []
			if (clusters[0].length > 1 && clusters[1].length > 1) return []

			let pawn = clusters[1][0]
			if(clusters[0].length > 1){
				pawn = clusters[1][0]
			} else {
				pawn = clusters[0][0]
			}
			const oldPawns = Array.from(this.pawns);
			const possibleMoves = pawn.possibleMoves();
			for (let i = possibleMoves.length - 1; i >= 0; i--) {
				pawn.move(possibleMoves[i]);
				let isWinPos = this.getClusters(isWhite);
				if(isWinPos.length == 1){
					threat.push(possibleMoves[i]);
				}
				this.pawns = oldPawns;
			}
			return threat;
		}

		getCenterOfMass(isWhite) : Pawn{
			let out = null;
			let xs = 0;
			let ys = 0;
			let nb = 0;
			this.pawns.forEach(function(p,i){
				if(p.isWhite == isWhite){
					nb++;
					xs+=p.x;
					ys+=p.y;
				}
			});
			return new Pawn(Math.round(xs/nb),Math.round(ys/nb),isWhite,this.pawns, this.gridSize)
		}

		reward(pawns,mycolor) : number{
			let reward = 0
			let clusters = this.getClusters(mycolor)
			if(clusters.length == 1){
				reward += 10000000000
			}
			clusters = this.getClusters(!mycolor)
			if(clusters.length == 1){
				reward -= 10000000000
			}

			let threat = this.getThreats(mycolor)
			reward += threat.length * this.THREAT_WEIGHT

			threat = this.getThreats(!mycolor)
			reward -= threat.length * this.THREAT_WEIGHT

			const my_center = this.getCenterOfMass(mycolor);
			const other_center = this.getCenterOfMass(!mycolor);
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
			reward += (my_dist / my_nbPawns) * this.CENTRALISATION_WEIGHT
			reward -= (other_dist / other_nbPawns) * this.CENTRALISATION_WEIGHT

			return reward
		}
	}