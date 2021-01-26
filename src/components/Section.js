export class Section {
    constructor({ renderer }, containerSelector) {
        this.renderer = renderer;
        this._container = document.querySelector(containerSelector);
    }

    render(items) {
        //        this._items.reverse();
        items.forEach(item => this.renderer(item));
    }


    addItem(data) {
        this._container.prepend(data);
    }

}