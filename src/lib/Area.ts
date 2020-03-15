import Point from "./Point";

export default class Area {
	private MAX_POINT_COUNT: number = 20;
	public center: Point;
	public width: number;
	public height: number;
	public points: Point[] = [];
	public subareas: Area[] = [];
	public isDivided: boolean = false;
	public boundary:  { left: number, right: number, top: number, bottom: number };
	/**
	 *
	 */
	constructor(center: Point, width: number, height: number) {
		this.center = center;
		this.width = width;
		this.height = height;
		this.boundary = this.getBoundary();
	}
	public toString(): string {
		const { center: {x, y}, width, height } = this;
		return `Area (${x} | ${y}) {${width} | ${height}}`;
	}
	public getBoundary(): { left: number, right: number, top: number, bottom: number } {
		const dw: number 		= this.width >> 1;
		const dh: number 		= this.height >> 1;
		const left: number 		= this.center.x - dw;
		const right: number 	= this.center.x + dw;
		const top: number 		= this.center.y - dh;
		const bottom: number 	= this.center.y + dh;

		return { left, right, top, bottom };
	}
	public containsPoint(point: Point): boolean {
		const boundary = this.boundary;

		if (point.x > boundary.right || point.x <= boundary.left)
			return false
		if (point.y < boundary.top || point.y >= boundary.bottom)
			return false;

		return true;
	}
	public intersects(area: Area): boolean {
		const target = area.boundary;
		const self = this.boundary;

		if (self.left > target.right || self.right < target.left)
			return false;
		if (self.top > target.bottom || self.bottom < target.top)
			return false;

		return true;
	}
	public query(area: Area): Point[] {
		let result: Point[] = [];
		if (this.isDivided && this.intersects(area)) {
			this.subareas.forEach(subarea => {
				result = [...result, ...subarea.query(area)];
			})
			return result;
		}
		if (!this.isDivided && this.intersects(area)) {
			return this.points.filter((point: Point) => area.containsPoint(point));
		}
		return result;
	}
	public divide(): void {
		const { x, y } = this.center;
		// new width
		let nw = this.width / 2;
		// new height
		let nh = this.height / 2;

		//top left
		let tl = new Area(new Point(x - nw/2, y - nh/2), nw, nh);
		// top right
		let tr = new Area(new Point(x + nw/2, y - nh/2), nw, nh);
		// bottom left
		let bl = new Area(new Point(x - nw/2, y + nh/2), nw, nh);
		// bottom right
		let br = new Area(new Point(x + nw/2, y + nh/2), nw, nh);

		this.subareas = [tl, tr, bl, br];
		this.isDivided = true;
	}
	public insertPoint(point: Point): void {
		if (!this.containsPoint(point))
			return;

		if (this.MAX_POINT_COUNT > this.points.length && !this.isDivided) {
			// insert
			this.points.push(point);
			return;
		}
		if (!this.isDivided) {
			this.divide();

			this.points.forEach(point => {
				this.subareas.forEach(area => { area.insertPoint(point) });
			})

			this.points = [];
		}
		if (this.isDivided)
			this.subareas.forEach(area => { area.insertPoint(point) });
	}
	public forEachArea(callback: Function, depth: number = 0): void {
		callback(this, depth);
		this.subareas.forEach(area => { area.forEachArea(callback, depth+1) });
	}
	public forEachLeaf(callback: Function): void {
		if (!this.isDivided)
			callback(this);
		this.subareas.forEach(area => { area.forEachLeaf(callback) });
	}
}