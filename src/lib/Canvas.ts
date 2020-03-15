import Point from './Point';
import Area from './Area';

export default class Canvas {
	public canvas: 	HTMLCanvasElement;
	public context: CanvasRenderingContext2D;
	private width: 	number;
	private height: number;
	private defaultStyle = {
		strokeStyle: '#222222',
		fillStyle: 'transparent'
	}
	/**
	 *
	 */
	constructor(canvas: HTMLCanvasElement, width: number, height: number) {
		this.canvas = canvas;
		this.width = width;
		this.height = height;
		this.context = canvas.getContext('2d');

		canvas.width = width;
		canvas.height = height;
	}
	private Style(setting, callback: Function): void {
		Object.keys(setting).forEach(stg => {
			this.context[stg] = setting[stg];
		});
		callback();
		Object.keys(this.defaultStyle).forEach(stg => {
			this.context[stg] = this.defaultStyle[stg];
		});
	}
	public clear(): void {
		this.context.clearRect(0, 0, this.width, this.height);
	}
	public Point(point: Point, setting?): void {
		this.Circle(point, 1, setting);
		this.context.fill();
	}
	public Circle(center: Point, radius: number, setting?): void {
		const ctx: CanvasRenderingContext2D = this.context;

		this.Style(setting ?? {}, () => {
			ctx.beginPath();
			ctx.arc(center.x, center.y, radius, 0, 2*Math.PI);
			ctx.stroke();
			ctx.fill();
			ctx.closePath();
		})
	}
	public Rectangle(): void {

	}
	public Area(area: Area, setting?): void {
		const ctx: CanvasRenderingContext2D = this.context;
		const boundary = area.boundary;

		this.Style(setting ?? {}, () => {
			ctx.beginPath();
			ctx.rect(boundary.left, boundary.top, area.width, area.height);
			ctx.stroke();
			ctx.closePath();
		})
	}
	public ConnectPoints(pointA: Point, pointB: Point): void {
		const ctx = this.context;

		ctx.beginPath();
		ctx.moveTo(pointA.x, pointA.y);
		ctx.lineTo(pointB.x, pointB.y);
		ctx.stroke();
		ctx.closePath();
	}
}