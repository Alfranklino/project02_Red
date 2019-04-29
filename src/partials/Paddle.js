import { SVG_NS } from '../settings';
import { KEYS } from '../settings';

export default class Paddle {
    constructor(boardHeight, width, height, x, y, up, down, fire) {
        this.boardHeight = boardHeight;
        this.width = width;
        this.height = height;
        this.x = x;
        this.y = y;
        this.speed = 10;
        this.score = 0;
        //TODO: For that code, we need to find a way instead of 'event =>' to
        // document.addEventListener("keydown", function(event)
        document.addEventListener("keydown", event => {
            switch (event.key) {
                case up:
                    this.y = Math.max(0, this.y - this.speed); //We actually are decreasing the y, and might choose the maximum value if y - speed is too small
                    break;
                case down:
                    this.y = Math.min((this.boardHeight - this.height), (this.y + this.speed)); //We actually are increasing the y, and might choose the minimum value if y + speed is too high
                    break;
                case fire:
                    //TODO: Fire the ball here...

            }
        })
    }


    //Collect the x, y coordinates of the paddle
    getCoordinates(x, y, padWith, padHeight) {
        let leftX = x;
        let rightX = x + padWith;
        let topY = y;
        let bottomY = y + padHeight;
        return [leftX, rightX, topY, bottomY];
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