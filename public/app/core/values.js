/**
 * Contains all the value services that will be used in the app
 */
module.exports = [{
    name: 'GameResultEnum',
    type: 'value',
    service: {
        Win: {
            value: 'W',
            label: 'Win'
        },

        Draw: {
            value:  'D',
            label: 'Draw'
        },

        Loss: {
            value: 'L',
            label: 'Loss'
        }
    }
}];