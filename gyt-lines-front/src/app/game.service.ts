import { Injectable } from '@angular/core';
import { Pawn } from './pawn';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  constructor() {}

  pawns : Pawn[] = [];
  
  getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
  }
  
  initGame() {
    for (let i = 1; i < 7; i++) {
      this.pawns.push( new Pawn(i,0,true ,this.pawns) );
      this.pawns.push( new Pawn(i,7,true ,this.pawns) );
      this.pawns.push( new Pawn(0,i,false,this.pawns) );
      this.pawns.push( new Pawn(7,i,false,this.pawns) );
    }
  }
  
  checkVictory() {
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
  }
  
  printBoard(){
    let board = []
    for(let i = 0; i<8; i++){
      board.push([0,0,0,0,0,0,0,0])
    }
    this.pawns.forEach( (pawn) => {
      board[pawn.x][pawn.y] = pawn.isWhite?1:2
    });
    for(let i = 0; i<8; i++) {
      let line = i+". "
      for(let j = 0; j<8; j++){
        if (board[i][j] == 0) {
          line += " "
        }
        if (board[i][j] == 1) {
          line += "O"   
        }
        if (board[i][j] == 2) {
          line += "X"
        }
      }
      console.log(line)
    }
  }
  
  /*
  for (let i = 0; i < 10; i++) {
    const isBlack = i%2 == 0;
    let int = getRandomInt(this.pawns.length)
    while(this.pawns[int].isWhite == isBlack) int = getRandomInt(this.pawns.length);
    const moveChoice = this.pawns[int].possibleMoves();
    this.pawns[int].move(moveChoice[getRandomInt(moveChoice.length)]);
  }*/
}
