import { SVG_NS } from '../settings'

//Export here means that class below is supposed to be used in other files...
export default class Board {
    constructor(width, height) {
        this.width = width;
        this.height = height;
    }
    render(svg) {
        //...Complete the board creation
        let rect = document.createElementNS(SVG_NS, 'rect');
        rect.setAttributeNS(null, 'fill', '#353535');
        rect.setAttributeNS(null, 'width', this.width);
        rect.setAttributeNS(null, 'height', this.height);

        let line = document.createElementNS(SVG_NS, 'line');
        line.setAttributeNS(null, 'x1', (this.width / 2));
        line.setAttributeNS(null, 'y1', 0);
        line.setAttributeNS(null, 'x2', (this.width / 2));
        line.setAttributeNS(null, 'y2', this.height);
        line.setAttributeNS(null, 'stroke', 'white');
        line.setAttributeNS(null, 'stroke-dasharray', '4');
        line.setAttributeNS(null, 'stroke-width', '3');

        svg.appendChild(rect);
        svg.appendChild(line);

    }
}