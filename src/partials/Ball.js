import { SVG_NS } from '../settings';
import { PING_COLLISION } from '../settings';
import { GOAL_SOUND } from '../settings';

export default class Ball {
    constructor(radius, boardWidth, boardHeight) {
        this.radius = radius;
        this.boardWidth = boardWidth;
        this.boardHeight = boardHeight;
        this.direction = 1;
        this.soundPing = new Audio(PING_COLLISION);
        this.soundGoal = new Audio(GOAL_SOUND);
        this.goal
        this.hasBeenResetAfterGoal = false;
        this.reset()
    }

    wallCollision() {
       
        if (this.x - this.radius <= 0 || this.x + this.radius >= this.boardWidth) {
            this.vx = -this.vx;
        }
        else if (this.y - this.radius <= 0 || this.y + this.radius >= this.boardHeight) {
            this.vy = -this.vy;
        }
    }
    //TODO: Rewrite that function in a more simple way see inside TabS4
    paddleCollision(paddle1, paddle2) {

        if (this.vx > 0) {
            //
            let pad2Coords = paddle2.getCoordinates(paddle2.x, paddle2.y, paddle2.width, paddle2.height);
            let [leftX, rightX, topY, bottomY] = pad2Coords;
            //Here we can console ..console.log(leftX, rightX, topY, bottomY)
            if (
                (this.x + this.radius >= leftX)
                && (this.x + this.radius <= rightX)
                && (this.y + this.radius >= topY)
                && (this.y - this.radius <= bottomY)
            ) {
                this.vx = -this.vx;
                //Sound added
                this.soundPing.play();                
                
            }
        }
        else {
            //get paddle1Coords
            let pad1Coords = paddle1.getCoordinates(paddle1.x, paddle1.y, paddle1.width, paddle1.height);
            let [leftX, rightX, topY, bottomY] = pad1Coords;
            //test Ball position relative to the pad1Coords
            if (
                (this.x - this.radius <= rightX)
                && (this.x - this.radius >= leftX)
                && (this.y + this.radius >= topY)
                && (this.y - this.radius <= bottomY)
            ) {
                //reverse the movement of that ball
                this.vx = -this.vx;
                //Sound added
                this.soundPing.play();
                
                
            }

        }
    }

    resetAfterGoal(APaddle) {
        //TODO: Get the paddle position of the loser
        let paddleCoords = APaddle.getCoordinates(APaddle.x, APaddle.y, APaddle.width, APaddle.height);
        let [leftX, rightX, topY, bottomY] = paddleCoords;
        //TODO: Set the ball at that position

        //TODO: if reset, set the hasBeenResetAfter var to true, until that moves the ball with the paddle
    }

    reset() {
        //Ball initial position
        this.x = this.boardWidth / 2;
        this.y = this.boardHeight / 2;

        //Ball initial direction of movement;
        this.vy = 0;
        while (this.vy === 0) {
            this.vy = Math.floor(Math.random() * 10 - 5);
        }
        this.vx = this.direction * (6 - Math.abs(this.vy));
    }

    goal(paddle) {
        paddle.score++; //A property of Paddle Class
        this.reset();
        // let scoreP1 = 0;
        // let scoreP2 = 0;
        //Console that score        
    }

    render(svg, paddle1, paddle2) {
        //Ball initial Movemevent
        this.x += this.vx;
        this.y += this.vy;

        this.wallCollision();
        this.paddleCollision(paddle1, paddle2);
        let circle = document.createElementNS(SVG_NS, 'circle');
        circle.setAttributeNS(null, 'cx', this.x);
        circle.setAttributeNS(null, 'cy', this.y);
        circle.setAttributeNS(null, 'r', this.radius);
        circle.setAttributeNS(null, 'fill', 'white');
        circle.setAttributeNS(null, 'stroke', 'white');

        svg.appendChild(circle);

        const isRightGoal = this.x + this.radius >= this.boardWidth;
        const isLeftGoal = this.x - this.radius <= 0;

        if (isRightGoal) {
            //Sound Goal
            this.soundGoal.play();
            this.goal(paddle1);
            this.direction = 1;
            //TODO: Call the resetAfterGoal Function
            
        }
        else if (isLeftGoal) {
            //Sound Goal
            this.soundGoal.play();
            this.goal(paddle2);
            this.direction = -1;
            //TODO: Call the resetAfterGoal Function
        }



    }
}

