import Ajax from '../lib/Ajax.js';

export default {
    // テンプレート //================//
    template: `<div class="Serch">
    <form method="post" action="#" class="search_container" id="form">
        <input type="text" size="25" v-model="search" placeholder="キーワード検索">
        
        <button type="button" class="clear-decoration"@click='Found'><img src="./assets/img/search.png" alt="送信" height="25" width="25"/></button> 
        
    </form>
    <span class="search-reco-infulencer">おすすめインフルエンサー</span><br>
    <div class="search-profile-border">
                    <div  v-for="result in resultsInfl">
                    <router-link :to="'/ShopInfo/'+result.id"><img v-bind:src="result.icon_img" class="search-profile-icon" width=65px height=65px></router-link>
                    </div>
        </div>
    <span class="search-reco-shops">おすすめ店舗</span>
    <div class="search-shop-profile-border">
                    <div  v-for="result in resultsStore">
                    <router-link :to="'/ShopInfo/'+result.id"><img v-bind:src="result.icon_img" class="search-profile-icon" width=65px height=65px></router-link>
                    </div>
                </li>
            </ul>
        </div>
    <span class="search-reco-tag"> 注目タグ</span><br>
        <div class="search-tag-border">
            <div class="search-tag-border-opacity">
                <img src="http://23.21.91.213/contents/osyare.jpg" alt="tag-image" class="search-tag-image" width=110 height=110>
            </div>
            <span class="search-tag-name"><a href="#" class="search-taghash">#おしゃれ</a></span>
        </div>
        <div class="search-tag-border">
            <img src="http://23.21.91.213/contents/wasyoku.jpg" alt="tag-image" class="search-tag-image" width=110 height=110>
            <span class="search-tag-name"><a href="#" class="search-taghash">#和食</a></span>
        </div>
        <div class="search-tag-border">
            <img src="http://23.21.91.213/contents/yousyoku.jpg" alt="tag-image" class="search-tag-image" width=110 height=110>
            <span class="search-tag-name"><a href="#" class="search-taghash">#洋食</a></span>
        </div>
        <div class="search-tag-border">
            <img src="http://23.21.91.213/contents/bike.jpg" alt="tag-image" class="search-tag-image" width=110 height=110>
            <span class="search-tag-name"><a href="#" class="search-taghash">#かっこいい</a></span>
        </div>
        <div class="search-tag-border">
            <img src="http://23.21.91.213/contents/kakurega.jpg" alt="tag-image" class="search-tag-image" width=110 height=110>
            <span class="search-tag-name"><a href="#" class="search-taghash">#隠れ家</a></span>
        </div>
        <div class="search-tag-border">
            <img src="http://23.21.91.213/contents/kuorite.jpg" alt="tag-image" class="search-tag-image" width=110 height=110>
            <span class="search-tag-name"><a href="#" class="search-taghash">#クオリティ</a></span>
        </div>
        <div class="search-tag-border">
            <img src="http://23.21.91.213/contents/sa-busu.jpg" alt="tag-image" class="search-tag-image" width=110 height=110>
            <span class="search-tag-name"><a href="#" class="search-taghash">#サービス</a></span>
        </div>
        <div class="search-tag-border">
            <img src="http://23.21.91.213/contents/eikoku.jpg" alt="tag-image" class="search-tag-image" width=110 height=110>
            <span class="search-tag-name"><a href="#" class="search-taghash">#英国風</a></span>
        </div>
        <div class="search-tag-border">
            <img src="http://23.21.91.213/contents/gita-.jpg" alt="tag-image" class="search-tag-image" width=110 height=110>
            <span class="search-tag-name"><a href="#" class="search-taghash">#ギター</a></span>
        </div>

    </div>`,
    // <input type="image" @click='search' src="./assets/img/search.png" height="25" width="25"/>
    // <router-link :to="'/Found'">
    // </router-link>
    data() {
        return {
            'search': '',
            resultsInfl: [],
            resultsStore: [],
        }
    },
    mounted() {
        // const opt = {
        //     'keyword': this.word
        // }
        // console.log(opt);
        Ajax(`http://23.21.91.213/api/recommendInfl`)
            .then((res) => {
                this.resultsInfl = res;
                console.log(this.resultsInfl);
                Ajax(`http://23.21.91.213/api/recommendStore`)
                    .then((res) => {
                    this.resultsStore = res;
                    console.log(this.resultsStore);
                })
            })
            .catch((err) => {
                console.log(err);
            });

        document.getElementById("form").onkeypress = (e) => {
            // formに入力されたキーを取得
            const key = e.keyCode || e.charCode || 0;
            // 13はEnterキーのキーコード
            if (key == 13) {
                // アクションを行わない
                e.preventDefault();
            }
        }
    },
    methods: {
        Found(){
            const opt = {
                'keyword': this.search
            }
         this.$router.push({name:'Found', params: {word: this.search}});
        }
    }


};