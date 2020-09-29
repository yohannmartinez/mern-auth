export const getTimeElapsed = (datetime) => {
    var milisec_diff = Math.abs(new Date() - new Date(datetime)),
        diff = new Date(milisec_diff),
        days = milisec_diff / 3600e3 / 24 | 0,
        hours = diff.getUTCHours(),
        respvalue = '';
    if (days > 0)
        respvalue += days + " jours ";
    else if (days === 0 && hours > 0)
        respvalue += hours + " heures";
    else if (days === 0 && hours === 0)
        respvalue += diff.getUTCMinutes() + " minutes";
    return respvalue;
}