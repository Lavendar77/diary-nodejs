export default class Model {
    protected hidden: string[] = [];

    /**
     * Get a subset of the model's attributes.
     *
     * @param attributes - An array of attribute names or a single attribute name.
     * @returns An object containing the specified attributes and their values.
     */
    public only(attributes: string | string[]): Record<string, any> {
        const results: Record<string, any> = {};
        const attrs = Array.isArray(attributes) ? attributes : Array.from(arguments);

        for (const attribute of attrs) {
            results[attribute] = (this as any)[attribute];
        }

        return results;
    }

    /**
     * Creates an instance of the model from a plain object.
     *
     * @param data - An object containing model properties.
     * @returns {T} An instance of the model.
     */
    public static fromObject<T extends Model>(this: new (...args: any[]) => T, data: Partial<T>): T {
        const instance = new this();

        Object.assign(instance, data);

        return instance;
    }

    /**
     * Convert model to JSON for representation.
     *
     * @returns {object}
     */
    public toJSON(): object {
        let object: { [key: string]: any } = {};
        let hiddenAttrs = this.hidden;
        hiddenAttrs.push('hidden');

        Object.keys(this).forEach(key => {
            if (!hiddenAttrs.includes(key)) {
                object[key] = (this as any)[key];
            }
        });

        return object;
    }
}
