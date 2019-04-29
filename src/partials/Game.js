//Classes Files
import Board from './Board';
import Paddle from './Paddle';
import Ball from './Ball';
import Score from './Score';
//Constants
import { SVG_NS } from '../settings';
import { KEYS } from '../settings';

export default class Game {
  constructor(element, width, height) {
    this.element = element;
    this.width = width;
    this.height = height;

    //Other code goes here...
    this.pause = false;
    this.gameElement = document.getElementById(this.element);
    //Create the Board here
    this.board = new Board(this.width, this.height);
    //Create the Paddle
    this.paddle1 = new Paddle(this.board.height, 8, 56, 10, 100, KEYS.a, KEYS.z, KEYS.x);
    //Or we can use this one instead (From Rob)

    //   this.paddleWidth = 8;
    //   this.paddleHeight = 56;
    //   this.boardGap = 10;
    //   this.player1 = new Paddle(
    //   this.height,
    //   this.paddleWidth,
    //   this.paddleHeight,
    //   this.boardGap,
    //   ((this.height - this.paddleHeight) / 2) //= (256 - 56) / 20 = 100!!!!


    this.paddle2 = new Paddle(this.board.height, 8, 56, 494, 100, KEYS.up, KEYS.down, KEYS.left);
    //   For Paddle2 we can use this one instead...
    //   Paddle2_X = this.width - this.boardGap - this.PaddleWidth //= 512 - 10 - 8 = 494!!!!

    this.ball = new Ball(8, this.board.width, this.board.height);

    this.score1 = new Score(this.width / 2 - 50, 30, 30);
    this.score2 = new Score(this.width / 2 + 25, 30, 30);

    document.addEventListener("keydown", event => {

      switch (event.key) {
        case KEYS.spaceBar:
          this.pause = !this.pause;
          break;
        default:

          break;
      }
    }

    )

  }

  render() {
    // More code goes here....

    if (this.pause) {
      this.paddle1.speed = 0;
      this.paddle2.speed = 0;
      return;
    }
    else {
      this.paddle1.speed = 10;
      this.paddle2.speed = 10;
    }

    this.gameElement.innerHTML = '';
    let svg = document.createElementNS(SVG_NS, 'svg');

    svg.setAttributeNS(null, 'width', this.width);
    svg.setAttributeNS(null, 'height', this.height);
    svg.setAttributeNS(null, 'viewBox', `0 0 ${this.width} ${this.height}`); //Pay attention at this level: ` et non '
    this.gameElement.appendChild(svg);

    //Render the board
    this.board.render(svg);


    //Render the paddle 02 times
    this.paddle1.render(svg);
    this.paddle2.render(svg);

    //Render the Ball
    this.ball.render(svg, this.paddle1, this.paddle2);

    this.score1.render(svg, this.paddle1.score);
    this.score2.render(svg, this.paddle2.score);


  }
}
