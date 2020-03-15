import Node from './Node';
import Area from './Area';
import Point from './Point';

export default class Quadtree {
	public area: Area;
	/**
	 *
	 */
	constructor(canvas: HTMLCanvasElement) {
		const { width, height } = canvas;
		const x = width / 2;
		const y = height / 2;
		const cp = new Point(x, y);

		this.area = new Area(cp, width, height);
	}
	public query(area: Area): Point[] {
		return this.area.query(area);
	}
	public insertPoint(point: Point): void {
		this.area.insertPoint(point);
	}
	public forEachArea(callback: Function): void {
		this.area.forEachArea(callback);
	}
	public forEachLeaf(callback: Function): void {
		this.area.forEachLeaf(callback);
	}
}