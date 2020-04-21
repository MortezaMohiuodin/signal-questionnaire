import Vue from 'vue';
import { ValidationProvider,ValidationObserver,setInteractionMode,extend } from 'vee-validate';
import { required,numeric,email,alpha} from 'vee-validate/dist/rules';
setInteractionMode('eager');

// Rules
extend('required', {
    ...required,
    message: 'این فیلد الزامی است'
});

extend('numeric', {
    ...numeric,
    message: 'لطفا عدد وارد کنید'
});

extend('email', {
    ...email,
    message: 'لطفا ایمیل معتبر وارد کنید'
});

extend('alpha', {
    ...alpha,
    message: 'لطفا تنها حروف وارد کنید'
});

extend('digits', {
    validate(value, { length }) {
      return value.length == length;
    },
    params: ['length'],
    message: 'باید {length} عددی باشد'
});

// Register it globally
Vue.component('ValidationProvider', ValidationProvider);
Vue.component('ValidationObserver', ValidationObserver);