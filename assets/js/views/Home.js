import Ajax from '../lib/Ajax.js';

export default {
    // テンプレート //================//
    template: `<div class="Home">
    <head>
        <link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/npm/slick-carousel@1.8.1/slick/slick.css">
    </head>
        <div class="timeline" v-for="home in homes"><router-link :to="'/ShopInfo'"></router-link>
            <div>
                <router-link :to="'/ShopInfo/'+home.user_id">
                    <img v-bind:src="home.from_icon_img"  class="home-actprofile-icon" width=55 height=55>
                </router-link>
            </div>
            <template v-if="home.msg_type_id == 1">
            <div>
                <img src="./assets/img/update.png"  class="home-list-icon" width=30 height=30>
            </div>
                <div class="home-update">
                    <span class="timeline-update-header">Update!</span><br>
                    <span class="timeline-update-data">店舗情報が更新されました！
                    最新情報を見に行きましょう</span>
                </div>
                <hr>
            </template>
            <template v-if="home.msg_type_id == 2">
                <div class="home-reviwe">
                    <img src="./assets/img/reviwe.png"  class="home-list-icon" width=30 height=30>
                    <router-link :to="'/ShopInfo/'+home.to_user_id">
                        <img v-bind:src="home.to_icon_img"  class="home-profile-icon" width=55 height=55>
                    </router-link>
                    <span class="timeline-reviwe-header">レビューしました！!</span><br>
                    <span class="new-like keyframe6">NEW LIKE!!</span>
                    <span class="timeline-reviwe-data">{{ home.review_content }}</span>
                    <img v-if="home.review_img != null" v-bind:src="home.review_img" class="home-reviwe-image">
                </div>
            <hr class="home-reviwe-space">
            </template>
            <template v-if="home.msg_type_id == 3">
                <div class="home-follow">
                
                <img src="./assets/img/follow.png"  class="home-list-icon" width=30 height=25>
            
                <router-link :to="'/ShopInfo/'+home.to_user_id">
                    <img v-bind:src="home.to_icon_img"  class="home-profile-icon" width=55 height=55>
                </router-link>
                <span class="timeline-follow-header">New follow!</span><br>
                <span class="new-like keyframe6">NEW LIKE!!</span>
                <span class="timeline-follow-data">{{ home.user_name }}さんがフォローしました！　　プロフィールを見てみましょう</span>
            </div>
            <hr>
            </template>
        </div>
    </div>`,
    data() {
        return {
            homes: [],

        };
    },
    mounted() {
        
        // this.$emit('parentMethod');

        const userId = sessionStorage.getItem('userId')
        Ajax(`http://23.21.91.213/api/home/${userId}`)
            .then((res) => {
                this.homes = res;
                console.log(res);
            })
            .catch((err) => {
                console.log(err);
            });
    },
    reload() {
        this.$router.go({path: this.$router.currentRoute.path, force: true});
    },
    something() {
        // reloadを呼び出すことで画面リロード
        this.reload();
    }
};

/* <div class="loading" v-if="loading">
        <p>Now Loading...</p>
    </div> */