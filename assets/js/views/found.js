import Ajax from '../lib/Ajax.js';

export default {
    // テンプレート //================//
    template: `<div class="Found">
    <form method="post" action="#" class="search_container" id="form">
        <input type="text" size="25" v-model="search" placeholder="キーワード検索">
        <button type="button" class="clear-decoration" @click='Found2'><img src="./assets/img/search.png" alt="送信" height="25" width="25"/></button> 
        
    </form>
    <div class="found-search">
        <div class="searchingresult-border" v-for="result in results"><router-link :to="'/ShopInfo/'+result.id">
            <img v-bind:src="result.icon_img" alt="profile-icon" class="searchingresult-profile-icon" width=65 height=65>
            <span class="searchingresult-shopname">{{ result.user_name }}</span><br>
            <span class="searchingresult-shopid">@{{ result.account_id }}</span>
            <span class="searchingresult-shopaddress">{{ result.location }}</span>
            <img v-bind:src="result.profile_img" alt="profile-icon" class="searchingresult-profile-image" width=363 height=105>
            </router-link>
        </div>
    </div>
    <div style="visibility: hidden">{{ word }}</div>
    </div>`,

    props: ['word'],
    data() {
      return {
        keyword: 'word',
        results: [],
        'search': ''
      }
    },
    
    mounted() {
        const opt = {
            'keyword': this.word
        }
        console.log(opt);
        Ajax(`http://23.21.91.213/api/search`, 'POST', opt)
            .then((res) => {
                this.results = res;
                console.log(this.results);
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
            Found2(){
                const opt = {
                    'keyword': this.search
                }
                console.log(opt);
                Ajax(`http://23.21.91.213/api/search`, 'POST', opt)
                    .then((res) => {
                        this.results = res;
                        console.log(this.results);
                    })
                    .catch((err) => {
                    console.log(err);
                });
            }
        }

    // data() {
    //     return {
    //         'search': '',
    //         'result': ''
    //     }
    // },

    // methods: {
    //     Found(){
    //         const opt = {
    //             'keyword': this.search
    //         }
    //         console.log(opt);
    //         Ajax(`http://23.21.91.213/api/search`, 'POST', opt)
    //             .then((res) => {
    //                 this.result = res;
    //                 console.log(this.result);
    //                 this.$router.push({name:'Found', params: this.result});
    //             })
    //             .catch((err) => {
    //                 console.log(err);
    //             });
    //     }
    // }
    // props: [this.result],
    // data() {
    //   return {
    
    //   }
    // },
    // mounted() {
    //     console.log(res);
    // }

    /* <div><router-link :to="'/ShopInfo'">ドルチェ</div>
    </div> */
}
