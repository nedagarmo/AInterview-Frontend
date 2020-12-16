export class Message {
    private content: string;
    private time: Date;
    private type: string;
    private room: string;

    constructor(content: string, type: string, room: string) {
        this.content = content;
        this.time = new Date();
        this.type = type;
        this.room = room;
    }

    public getContent() {
        return this.content;
    }

    public getTime() {
        return this.time;
    }

    public getType() {
        return this.type;
    }

    public setType(value: string) {
        this.type = value;
    }

    public getRoom() {
        return this.room;
    }
}
