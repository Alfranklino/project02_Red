import { SVG_NS } from '../settings';
import { KEYS } from '../settings';

export default class Paddle {
    constructor(boardHeight, width, height, x, y, up, down) {
        this.boardHeight = boardHeight;
        this.width = width;
        this.height = height;
        this.x = x;
        this.y = y;
        this.speed = 10;
        this.score = 0;

        document.addEventListener("keydown", event => {
            switch (event.key) {
                case up:
                //   console.log("up");
                  this.y = (this.y - this.speed);
                  break;
                case down:
                //   console.log("down");
                  this.y = (this.y + this.speed);
                  break;
              }
        })
    }
    //Create a function to Render the paddle
    render(svg) {
        //<rect x="10" y="100" width="8" height="56" stroke-width="3" fill="white" stroke="white"></rect>
        //<rect x="494" y="100" width="8" height="56" stroke-width="3" fill="white" stroke="white"></rect>
        
        
        //CreateElement Rect
        let rect = document.createElementNS(SVG_NS, 'rect');
        rect.setAttributeNS(null, 'x', this.x);
        rect.setAttributeNS(null, 'y', this.y);
        rect.setAttributeNS(null, 'width', this.width);
        rect.setAttributeNS(null, 'height', this.height);
        rect.setAttributeNS(null, 'stroke-width', '3');
        rect.setAttributeNS(null, 'fill', 'white');
        rect.setAttributeNS(null, 'stroke', 'white');


        //Append it to the svg
        svg.appendChild(rect);
    }
}