import Ajax from '../lib/Ajax.js';

export default {
    // テンプレート //================//
    template: `<div class="Login">
        <ul class=”timeline”>
        <div>
            <h4>お名前</h4>
            <input type="text" v-model="customer.name">
            <p v-if="customer.name === ''">お名前を入力してください</p>
        </div>

        <div>
            <h4>電話番号</h4>
            <input type="text" v-model="customer.tel">
            <p v-if="customer.tel === ''">電話番号を入力してください</p>
        </div>

        <div>
            <h4>住所</h4>
            <input type="text" v-model="customer.address">
            <p v-if="customer.address === ''">住所を入力してください</p>
        </div>

        <button type="button" class="btn" @click="clickGoRegi" v-if="error === false">ログインする</button>

        <div>
            <router-link :to="'/Post'">
                <input type="submit" class="btnpost" value="投稿">
            </router-link>
        </div>
</div>`,
    mounted() {
        Ajax('/gorin2020_mod3_api/auth/')
            .then((res) => {
                this.shops = res;
            })
            .catch((err) => {
                console.log(err);
        });
    }
};