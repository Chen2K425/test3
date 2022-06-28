import Ajax from '../lib/Ajax.js';
import Customer from '../lib/Customer.js';
import Cart from '../lib/Cart.js';

export default {
    // テンプレート //================//
    template: `<div class="cart">
    <h2>{{ shop.name }}のカート</h2>

    <section>
        <h3>カートの内容</h3>

        <ul class="list">
            <li v-for="item in cart_items" :key="item.id">
                <h4>{{ item.name }}</h4>
                <p>価格 : {{ item.price }}円</p>
                <p>数量 : {{ item.count }}
                    <button type="button" @click="clickMinus(item.id, item.count)" :disabled="item.count <= 1">-</button>
                    <button type="button" @click="clickPlus(item.id, item.count)">+</button>
                </p>
                <p>小計 : {{ item.price * item.count }}円</p>
                <button type="button" @click="clickDel(item.id)">削除</button>
            </li>
        </ul>

        <p>合計 : {{ sum }}円</p>

        <button type="button" class="btn" @click="clickClear">カートを空にする</button>
    </section>

    <section>
        <h3>お客様情報</h3>

        <div>
            <h4>お名前</h4>
            <input type="text" v-model="customer.name">
            <p v-if="customer.name === ''">お名前を入力してください</p>
        </div>

        <div>
            <h4>電話番号</h4>
            <input type="text" v-model="customer.number">
            <p v-if="customer.number === ''">電話番号を入力してください</p>
        </div>

        <div>
            <h4>住所</h4>

            <div class="zip">
                郵便番号 : <input type="text" maxlength="3" class="s" v-model="customer.zip1"> - <input type="text" maxlength="4" class="s" v-model="customer.zip2">
            </div>

            <div class="address">
                <input type="text" v-model="customer.address">
            </div>

            <p v-if="customer.zip1 === '' || customer.zip2 === ''">郵便番号を入力してください</p>
            <p v-if="customer.address === ''">住所を入力してください</p>
        </div>
    </section>


    <div class="bottom">
        <router-link :to="'/'+shop.id" class="btn">戻る</router-link>
        <button type="button" class="btn center" @click="clickGoRegi" v-if="error === false">注文内容の確認</button>
    </div>

    <div class="loading" v-if="loading">
        <p>Now Loading...</p>
    </div>

</div>`,
    // 変数 //================//
    // data() {
    //     return {
    //         shop_id: 0,
    //         shop: {},
    //         cart_items: [],
    //         customer: {
    //             name: '',
    //             number: '',
    //             zip1: '',
    //             zip2: '',
    //             address: ''
    //         },
    //         loading: false
    //     };
    // },
    // // 準備ok //================//
    // mounted() {
    //     this.init(this.$route.params.shop_id);
    // },
    // // urlが変わった //================//
    // beforeRouteUpdate(to, from, next) {
    //     this.init(to.params.shop_id);
    //     next();
    // },
    // // 関数いろいろ //================//
    // methods: {
    //     init(shop_id) {
    //         this.shop_id = shop_id;
    //         // ajax : 店舗情報
    //         this.loading = true;
    //         Ajax(`/gorin2020_mod3_api/shops/${this.shop_id}`)
    //             .then((res) => {
    //                 this.loading = false;
    //                 // 404
    //                 if (res.message === 'Not Found') {
    //                     this.$router.push('/error404');
    //                 }
    //                 // 代入
    //                 this.shop = res;
    //                 // お客様情報の準備
    //                 Customer.load();
    //                 this.customer = Customer.obj;
    //                 // カートの準備
    //                 Cart.setName(this.shop_id);
    //                 this.cart_items = Cart.items;
    //             })
    //             .catch((err) => {
    //                 console.log(err);
    //             });

    //     },
    //     // 数量+
    //     clickPlus(id, count) {
    //         Cart.changeItemCount(id, count+1);
    //     },
    //     // 数量-
    //     clickMinus(id, count) {
    //         Cart.changeItemCount(id, count-1);
    //     },
    //     // 削除
    //     clickDel(id) {
    //         Cart.delItem(id);
    //     },
    //     // カートを空に
    //     clickClear() {
    //         Cart.clearItems();
    //         this.$router.push(`/${this.shop_id}`);
    //     },
    //     // レジに進む
    //     clickGoRegi() {
    //         Customer.save();
    //         this.$router.push(`/${this.shop_id}/register`);
    //     }

    // },
    // // 算出プロパティ //================//
    // computed: {
    //     sum() {
    //         let s = 0;
    //         this.cart_items.forEach(v => {
    //             s += v.price * v.count;
    //         });
    //         return s;
    //     },
    //     error() {
    //         return this.customer.name === '' ||
    //             this.customer.number === '' ||
    //             this.customer.zip1 === '' ||
    //             this.customer.zip2 === '' ||
    //             this.customer.address === '' ||
    //             this.cart_items.length <= 0;
    //     }
    // }



};
