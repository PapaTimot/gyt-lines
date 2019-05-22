import { Injectable } from '@angular/core';
import { Pawn } from './pawn';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  constructor() {}

  pawns : Pawn[] = [];
  
  initGame(gridSize : number) : void {
    gridSize--;
    for (let i = 1; i < gridSize; i++) {
      this.pawns.push( new Pawn(i,0,true ,this.pawns) );
      this.pawns.push( new Pawn(i,gridSize,true ,this.pawns) );
      this.pawns.push( new Pawn(0,i,false,this.pawns) );
      this.pawns.push( new Pawn(gridSize,i,false,this.pawns) );
    }
  }
  
  checkVictory() : number {
    let out = 0;
    
    let whiteClusters = [];
    let blackClusters = [];

    this.pawns.forEach( (p) => {
      if(p.isWhite){
        let lastCluster = [];
        lastCluster.push(p);
        whiteClusters.forEach( (cluster,index) => {
          if(p.isConnected(cluster)){
            lastCluster = lastCluster.concat(cluster);
            whiteClusters.slice(index,1);
          }
        });
        whiteClusters.push(lastCluster);
      } else {
        let lastCluster = [];
        lastCluster.push(p);
        blackClusters.forEach( (cluster,index) => {
          if(p.isConnected(cluster)){
            lastCluster = lastCluster.concat(cluster);
            blackClusters.slice(index,1);
          }
        });
        blackClusters.push(lastCluster);
      }
    });
    
    out += whiteClusters.length == 1?1:0;
    out += blackClusters.length == 1?2:0;
    return out;
  }
  
}