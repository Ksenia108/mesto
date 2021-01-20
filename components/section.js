export class Section {
    constructor({ data, renderer }, containerSelector) {
        this._items = data;
        this.renderer = renderer;
        this._container = document.querySelector(containerSelector);
    }

    render() {
        this._items.forEach(item => this.renderer(item));
    }


    addItem(data) {
        this._container.append(data);
    }

}