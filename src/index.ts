import { debounce, throttle } from 'throttle-debounce';
import Canvas from './lib/Canvas';
import Point from './lib/Point';
import Quadtree from './lib/Quadtree';
import Area from './lib/Area';

class Particle extends Point {
	public radius: number;
	/**
	 *
	 */
	constructor(x: number, y: number, radius: number) {
		super(x, y);
		this.radius = radius;
	}
}

window.onload = () => {
	const WIDTH 	= window.innerWidth;
	const HEIGHT 	= window.innerHeight;

	const canvasElement: HTMLCanvasElement = document.querySelector('#particleCanvas');
	const canvas: Canvas = new Canvas(canvasElement, WIDTH, HEIGHT);

	let points: Point[] = Array(1000).fill(0).map(_ => new Particle(Math.random() * WIDTH, Math.random() * HEIGHT, 3));

	const queryArea: Area = new Area(new Point(500, 500), 400, 400);
	canvas.Area(queryArea, { strokeStyle: 'green' });

	const Repaint = () => {
		canvas.clear();
		let qt: Quadtree = new Quadtree(canvasElement);

		points.forEach(point => {
			qt.insertPoint(point);
		})
		//Draw grid
		qt.forEachLeaf((leaf: Area) => {
			canvas.Area(leaf);
		})

		// Particle wiggle
		points.forEach((point: Particle) => {
			point.x = point.x + Math.random() * 6 - 3;
			point.y = point.y + Math.random() * 6 - 3;

			canvas.Circle(point, point.radius, { strokeStyle: 'black', fillStyle: 'black' });
		})

		// Draw connection
		points.forEach((point: Point) => {
			let neighbourhood: Area = new Area(point, 100, 100);
			let neighbours: Point[] = qt.query(neighbourhood);
			neighbours.forEach((neighbour: Particle) => {
				canvas.ConnectPoints(point, neighbour);
			})
		})
	}
	// Repaint();
	setInterval(() => {
		Repaint();
	}, 1000/30)

	console.log({ WIDTH, HEIGHT });
}