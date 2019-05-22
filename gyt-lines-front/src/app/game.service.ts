import { Injectable } from '@angular/core';
import { Pawn } from './pawn';

@Injectable({
	providedIn: 'root'
})
export class GameService {

	constructor() {}

	THREAT_WEIGHT         :number = 100;
	CENTRALISATION_WEIGHT :number = 1;

	pawns : Pawn[] = [];

	initGame() : void {
		for (let i = 1; i < 7; i++) {
			this.pawns.push( new Pawn(i,0,true ,this.pawns) );
			this.pawns.push( new Pawn(i,7,true ,this.pawns) );
			this.pawns.push( new Pawn(0,i,false,this.pawns) );
			this.pawns.push( new Pawn(7,i,false,this.pawns) );
		}
	}

	getClusters(color) : Pawn[][] {
		const clusters = []
		this.pawns.forEach( (p) => {
			if(p.isWhite == color){
				let lastCluster = [];
				lastCluster.push(p);
				clusters.forEach( (cluster,index) => {
					if(p.isConnected(cluster)){
						lastCluster = lastCluster.concat(cluster);
						clusters.slice(index,1);
					}
				});
				clusters.push(lastCluster);
			}
		}
		return clusters;
	}

	checkVictory() : void {
		let out = 0;

		let whiteClusters = getClusters(true);
		let blackClusters = getClusters(false);

		out += whiteClusters.length == 1?1:0;
		out += blackClusters.length == 1?2:0;
	}

	getThreats(isWhite) : Pawn[]{
		let clusters = getClusters(isWhite)
		const threat = []
		if(clusters.length != 0) return []
		if (clusters[0].length > 1 && clusters[1].length > 1) return []

		let pawn = clusters[1][0]
		if(clusters[0].length > 1){
			pawn = clusters[1][0]
		} else {
			pawn = clusters[0][0]
		}
		const oldPawns = pawns
		const possibleMoves = pawn.possibleMoves()
		for (let i = possibleMoves.length - 1; i >= 0; i--) {
			pawn.move(possibleMoves[i])
			let isWinPos = getClusters(isWhite)
			if(isWinPos.length == 1){
				threat.push(possibleMoves[i])
			}
			pawns = oldPawns
		}
		return threat
	}

	getCenterOfMass(isWhite) : Pawn{
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
		return new Pawn(Math.round(xs/nb),Math.round(ys/nb),isWhite)
	}

	reward(pawns,mycolor) : number{
	    let reward = 0
	    let clusters = getClusters(mycolor)
	    if(clusters.lenght == 1){
	        reward += 10000000000
	    }
	    let clusters = getClusters(!mycolor)
	    if(clusters.lenght == 1){
	        reward -= 10000000000
	    }

	    let threat = getThreats(mycolor)
	    reward += threat.lenght * THREAT_WEIGHT

	    threat = getThreats(!mycolor)
	    reward -= threat.lenght * THREAT_WEIGHT
	    
	    const my_center = getCenterOfMass(mycolor);
	    const other_center = getCenterOfMass(!mycolor);
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
	            const dir_dy = other_dist.y - pawns[i].y
	            const dir_dx = other_dist.x - pawns[i].x
	            other_dist += dir_dx*dir_dx+dir_dy*dir_dy
	            other_nbPawns++;
	        }
	    }
	    reward += (my_dist / my_nbPawns) * CENTRALISATION_WEIGHT
	    reward -= (other_dist / other_nbPawns) * CENTRALISATION_WEIGHT
	    
	    return reward
	}
}