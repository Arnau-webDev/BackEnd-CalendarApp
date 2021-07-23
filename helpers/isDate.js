const moment = require("moment");

const isDate = (value, { req, location, path }) => {
    console.log(value);
    console.log(req);
    console.log(location);
    console.log(path);

    if (!value) {
        return false;
    }

    const date = moment(value);

    if (date.isValid()) {
        return true;
    } else {
        return false;
    }
}


module.exports = isDate;