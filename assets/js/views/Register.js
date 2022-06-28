import Ajax from '../lib/Ajax.js';

export default {
    // テンプレート //================//
    template: `<div class="Register">
        
        <span class="back-to-top"><router-link :to="'/'">Top</router-link></span>
        <div class="transition"></div>
        <p class="sign" align="center">Sign up</p>
        <form class="form1">
            <input class="un " type="text" align="center" v-model="userId" placeholder="UserID">
            <input class="un " type="text" align="center" v-model="userName" placeholder="Username">
            <input class="pass" type="password" align="center" v-model="password" placeholder="Setting password">
        <button type="button" class="submit" @click='register'>Register</button>
        </form>
    </div>`,
    data() {
        return {
            'userId': '',
            'password': '',
            'userName': ''
        }
    },
    methods: {
        register(){
            let opt = {
                'user_id': this.userId,
                'password': this.password,
                'user_name': this.userName
            }
            Ajax(`http://23.21.91.213/api/accregi`, 'POST', opt)
            .then((res) => {
                this.$router.push(`/Home`);
            })
            .catch((err) => {
                console.log(err);
            });
        },
    }
};
