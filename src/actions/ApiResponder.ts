export default class ApiResponder {
    public constructor(
        private readonly success: boolean,
        private readonly message: string,
        private readonly data: any
    ) {}

    public toJson(): {success: boolean, message: string, data: any} {
        return {
            success: this.success,
            message: this.message,
            data: this.data,
        }
    }
}
