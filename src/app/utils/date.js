import moment from 'moment';

export function getFormattedTime(date) {
    return moment(date).format('MMMM Do YYYY, h:mm:ss a');
}
