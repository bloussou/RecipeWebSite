export class Search {
    name: string;
    durationRange: number[];
    difficulty: string[];
    origin: string;
    type: string;

    constructor(name: string, durationRange: number[], difficulty: string[], origin: string, type: string) {
        this.name = name;
        this.durationRange = durationRange;
        this.difficulty = difficulty;
        this.origin = origin;
        this.type = type;
    }
}
