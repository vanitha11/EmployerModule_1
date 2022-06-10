import useConfiguration from "./useConfiguration";

function useValidation() {
    const config = useConfiguration();

    function validate(formName, values) {

        const validationResult = {
            valid: true,
            errors: {}
        };
        const isEmptyObject = (value) => {
            return typeof value === 'object' && Object.keys(value).length === 0;
        }
        const isEmpty = (value) => {
            return value === undefined || value === null || (value.trim && value.trim()) === '' || isEmptyObject(value);
        };
        if (!config.validations) {
            return validationResult;
        }
        const validationConfig = config.validations[formName];
        values.map(value => {
            const validationObj = validationConfig[value.name] || {};
            validationResult.errors[value.name] = [];
            if (validationObj.required && (isEmpty(value.data) || value.data.length === 0)) {
                validationResult.errors[value.name].push("This field is required");
                validationResult.valid = false;
            }
            if (validationObj.min && value.data && value.data.length < validationObj.min) {
                validationResult.errors[value.name].push(`At least ${validationObj.min} characters long`);
                validationResult.valid = false;
            }
            if (validationObj.max && value.data && value.data.length > validationObj.max) {
                validationResult.errors[value.name].push(`At most ${validationObj.max} characters long`);
                validationResult.valid = false;
            }
            if (validationObj.pattern && value.data) {
                const regex = new RegExp(validationObj.pattern);
                if (!regex.test(value.data)) {
                    validationResult.errors[value.name].push(validationObj.message || `This field has invalid pattern`);
                    validationResult.valid = false;
                }
            }
        });
        return validationResult;
    }

    return validate;
}

export default useValidation;
