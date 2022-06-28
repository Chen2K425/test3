import Ajax from '../lib/Ajax.js';
import Cart from '../lib/Cart.js';

export default {
    // テンプレート //================//
    template: `<div class="shop">
    <h2>{{ shop.name }}</h2>

    <p>営業時間 : {{ shop.opening_time }}～{{ shop.closing_time }}</p>
    <p>価格帯 : {{ shop.price_range }}円</p>
    <figure><img :src="shop.photo" :alt="shop.name"></figure>

    <h3>商品一覧</h3>
    <ul class="list">
        <li v-for="item in items" :key="item.id">
            <h4>{{ item.name }}</h4>
            <p>{{ item.description }}</p>
            <p>価格帯 : {{ item.price }}円</p>
            <figure><img :src="item.photo" :alt="item.name"></figure>

            <button type="button" class="btn" @click="clickAddCart(item)">カートに入れる</button>
        </li>
    </ul>

    <div class="bottom">
        <router-link to="/" class="btn">戻る</router-link>
        <router-link :to="'/'+shop.id+'/cart'" class="btn center" v-if="cart_items.length > 0">カートを見る</router-link>
    </div>

    <div class="loading" v-if="loading">
        <p>Now Loading...</p>
    </div>
</div>`,
    // 変数 //================//
    data() {
        return {
            shop_id: 0,
            shop: {},
            items: [],
            cart_items: [],
            loading: false
        };
    },
    // 準備ok //================//
    mounted() {
        this.init(this.$route.params.shop_id);
    },
    // urlが変わった //================//
    beforeRouteUpdate(to, from, next) {
        this.init(to.params.shop_id);
        next();
    },
    // 関数いろいろ //================//
    methods: {
        init(shop_id) {
            this.shop_id = shop_id;
            // ajax : 店舗情報
            this.loading = true;
            Ajax(`/gorin2020_mod3_api/shops/${this.shop_id}`)
                .then((res) => {
                    this.loading = false;
                    // 404
                    if (res.message === 'Not Found') {
                        this.$router.push('/error404');
                    }
                    // 代入
                    this.shop = res;
                    // カートの準備
                    Cart.setName(this.shop_id);
                    this.cart_items = Cart.items;

                    // 商品一覧取得
                    this.items = res.items;
                })
                .catch((err) => {
                    console.log(err);
                });

        },

        // カートに入れる
        clickAddCart(item) {
            Cart.addItem({
                id: item.id,
                name: item.name,
                price: item.price,
                count: 1
            });
            this.$router.push(`/${this.shop_id}/cart`);
        }
    }



};
