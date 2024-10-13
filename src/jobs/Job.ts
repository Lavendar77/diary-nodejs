export default abstract class Job {
    public delay: number = 0;

    abstract handle(): void;

    public onDelay(milliseconds: number): this {
        this.delay = milliseconds;

        return this;
    }

    public async dispatch() {
        setTimeout(() => {
            this.handle();
        }, this.delay);
    }
}
