import Vue from 'vue';
import { ValidationProvider,ValidationObserver,setInteractionMode,extend } from 'vee-validate';
import { required,numeric,email,alpha} from 'vee-validate/dist/rules';
setInteractionMode('eager');

// Rules
extend('required', {
    ...required,
    message: '{_field_} الزامی است'
});


extend('numeric', {
    ...numeric,
    message: '{_field_} باید به عدد باشد'
});

extend('email', {
    ...email,
    message: '{_field_} معتبر نیست'
});

extend('alpha', {
    ...alpha,
    message: '{_field_} باید تنها به حروف باشد'
});

extend('digits', {
    validate(value, { length }) {
      return value.length == length;
    },
    params: ['length'],
    message: '{_field_} باید {length} عدد باشد'
});

// Register it globally
Vue.component('ValidationProvider', ValidationProvider);
Vue.component('ValidationObserver', ValidationObserver);