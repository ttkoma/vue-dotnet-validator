module.exports = {
    name: 'vue-dotnet-validator-group',
    props: {
        onValid: {
            type: Function,
            default: null
        }
    },
    data() {
        return {
            validators: [],
            loading: false,
            isValidatorGroup: true,
        }
    },
    methods: {
        validate(event) {
            let valid = true;
            this.validators.forEach(validator => {
                if(!validator.isValid) {
                    valid = false;
                    event.preventDefault();
                    validator.blurField(); // Force showing validation.
                }
            });
            if(valid && this.onValid instanceof Function) {
                event.preventDefault();
                return this.onValid(event);
            }

            this.loading = valid;
            return false;
        },
        addValidator(validator) {
            this.validators.push(validator);
        },
        removeValidator(validator) {
            this.validators.splice(this.validators.indexOf(validator), 1);
        }
    }
};
