import moment from 'moment';

export function validator(data, config) {
    const errors = {};

    function validate(validateMethod, data, config) {
        let statusValidate;

        switch (validateMethod) {
            case 'isRequired':
                statusValidate = data.trim() === '';
                break;
            case 'isCorrectDate': {
                const dateRegExp =
                    /^(?:(?:31(\/|-|\.)(?:0?[13578]|1[02]))\1|(?:(?:29|30)(\/|-|\.)(?:0?[1,3-9]|1[0-2])\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\/|-|\.)0?2\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\/|-|\.)(?:(?:0?[1-9])|(?:1[0-2]))\4(?:(?:1[6-9]|[2-9]\d)?\d{2})$/g;
                statusValidate = !dateRegExp.test(data);
                break;
            }
            case 'isCorrectYear': {
                const currentDate = moment().format('YYYY');
                statusValidate =
                    Number(data.split('.')[2]) > Number(currentDate);
                break;
            }
            case 'isCorrectUrl': {
                const dateRegExp = /^(https?|chrome):\/\/[^\s$.?#].[^\s]*$/g;
                statusValidate = !dateRegExp.test(data);
                break;
            }

            default:
                break;
        }
        if (statusValidate) return config.message;
    }

    for (const fieldName in data) {
        for (const validateMethod in config[fieldName]) {
            const error = validate(
                validateMethod,
                data[fieldName],
                config[fieldName][validateMethod]
            );
            if (error && !errors[fieldName]) {
                errors[fieldName] = error;
            }
        }
    }
    return errors;
}
