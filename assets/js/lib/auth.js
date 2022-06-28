export default {
    obj: {
        name: '',
        tel: '',
        address: ''
    },


    load() {
        const obj = sessionStorage.getItem('customer');
        if (obj) {
            this.obj = JSON.parse(obj);
        }
    },

    tokensave(){
        
    },

    save() {
        const val = JSON.stringify(this.obj);
        sessionStorage.setItem('customer', val);
    }
};
