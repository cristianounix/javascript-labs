export default class Store {
    constructor() {
        this.dataCoords = [];
    }

    static append(data) {
        console.log('DATA SENDED', data);
        this.dataCoords.push(data);
    }

    clean() {
        this.dataCoords = [];
    }
}
