export class Model {
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
     * Convert model to JSON for representation.
     *
     * @returns {object}
     */
    public toJSON(): object {
        let object: { [key: string]: any } = {};

        Object.keys(this).forEach(key => {
            if (!this.hidden.includes(key)) {
                object[key] = (this as any)[key];
            }
        });

        return object;
    }
}
