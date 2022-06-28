import Ajax from '../lib/Ajax.js';

export default {
    // テンプレート //================//
    template: `<div class="AccReg">
    <span class="back-to-top"><router-link :to="'/'">Top</router-link></span>
        <div class="transition"></div>
        <p class="sign" align="center">Sign in</p>
        <form class="form1">
        <input class="un " type="text" align="center" v-model="userId" placeholder="Username">
        <input class="pass" type="password" align="center" v-model="password" placeholder="Password">
        <button type="button" class="submit" @click='login'>Sign in</button>
        <p class="forgot" align="center">Forgot Password?</p>
        </form>
                
        </div>`,

    data() {
        return {
            'userId': '',
            'password': '',
            componentKey: 0
        }
    },

    methods: {
        login(){
            const opt = {
                'password': this.password
            }
            Ajax(`http://23.21.91.213/api/users/login/${this.userId}`, 'POST', opt)
            .then((res) => {
                if(res.status == "success") {
                    Ajax(`http://23.21.91.213/api/account/id/${this.userId}`)
                    .then((ress) => {
                        if (ress != null) {
                            console.log(ress);
                            sessionStorage.setItem('id', ress.id);
                            sessionStorage.setItem('userId', this.userId);
                            sessionStorage.setItem('token', res.token);
                            this.$emit('parent-method', this.userId);
                            this.$router.push(`/Home`);
                            
                        }
                        else {
                            this.$router.push(`/AccReg`);
                        }
                    });
                }
            })
            .catch((err) => {
                console.log(err);
            });
        },  
    }
};
/*{ <h1 class="register-top">ログイン</h1>
            
            <input type="text" v-model="userId" placeholder="Username" name="id">

            <input type="password" v-model="password" placeholder="Password" name="password">

            <button type="button" @click='login'>ログイン</button> }*/