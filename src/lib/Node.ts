export default class Node<T> {
	private key: number;
	private value: T;
	/**
	 *
	 */
	constructor(key: number, value: T) {
		this.value = value;
		this.key = key;
	}
}