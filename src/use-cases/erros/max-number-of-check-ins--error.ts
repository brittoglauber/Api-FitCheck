export class MaxNumberOfCheckIInsError extends Error {
    constructor() {
        super('Max number of check-ins reached.')
    }
}