export class LateCheckInValidationErrro extends Error {
    constructor() {
        super('The check-in can only be vaidated until 20 minutes of its creation.')
    }
}