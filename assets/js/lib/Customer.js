export default {
    obj: {
        name: '',
        number: '',
        zip1: '',
        zip2: '',
        address: ''
    },
    load() {
        const obj = sessionStorage.getItem('customer');
        if (obj) {
            this.obj = JSON.parse(obj);
        }
    },
    save() {
        const val = JSON.stringify(this.obj);
        sessionStorage.setItem('customer', val);
    }
};
