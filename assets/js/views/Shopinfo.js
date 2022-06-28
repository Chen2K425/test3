import Ajax from '../lib/Ajax.js';

export default {
    // テンプレート //================//
    template: `<div class="shopinfo">

    <section class="wallpaper">
    <div id="block1">
        <img v-bind:src="shopinfo.profile_img" alt="profile-header" class="profile-header" width=100% height=200px>
    </div>
    <div id="block2">
        <img v-bind:src="shopinfo.icon_img" alt="profile-icon" class="profile-icon" width=80 height=80>
    </div>
    </section>

    <section>
        <div class="profile-follower-align">
        <span class="profile-follower">フォロワー</span>
        <span class="profile-follower-value"><router-link :to="'/Follower/' + shopinfo.id">{{ shopinfo.followed }}</router-link></span>
    </div>
    <div class="profile-follow-align">
        <span class="profile-follow">フォロー</span>
        <span class="profile-follow-value"><router-link :to="'/Follow/' + shopinfo.id">{{ shopinfo.follower }}</router-link></span>
    </div>
        <br>
        <img src="" alt="">
        <div class="profile-name">
            <span>{{ shopinfo.user_name }}</span>
        </div>
        <div v-if="shopinfo.id != myid">
            <input type="checkbox" :name="shopinfo.id" @click="follow(shopinfo.id)"  class="follow-buttom"></input><label v-if="isFollowed(shopinfo.id)">フォロー解除</label><label v-if="!isFollowed(shopinfo.id)">フォロー</label>
        </div>
            <br>
        <div class="profile-id">
            <span>@{{ shopinfo.account_id }}</span>
        </div>
    </section>
    <section>
        <div>
            <span class="profile-introduction">
            {{ shopinfo.profile_content }}
            </span>
        </div>
        
        <div>
        <img src="./assets/img/hot.png" alt="home" class="profile-soul" width="20px" height="20px"><span class="profile-link">mind:  </span><span></span>
        </div>
        <div class="profile-tagline">
            <div v-for="tags in shopinfo.tags">
                <li class="profile-taglist"><a href="#" class="hash">#{{ tags.tag_name }}</a></li>
            </div>
        </div>
    </section>
                
            
    <div v-if="shopinfo.store_auth == 1">
        <span class="shopinfo-address"><router-link :to="'/Map'">***市*****-*-*</router-link></span>
        <div v-if="profile.store_auth == 1">
            <router-link :to="'/Post/'+shopinfo.id">
            <button type="button" class="btnpost"><img src="./assets/img/hanepen.png" alt="menu" height="30" width="30"/>
            </button> 
            </router-link>
        </div>
        
            <h2 class="shopinfo-reviwers">評価されたお店</h2><br>
            <section class="shopinfo-reviwers-list">
                <div class="shopinfo-reviwer" v-for="review in reviews">
                    <img v-bind:src="review.icon_img" alt="tenpoinfo-icon" class="shopinfo-reviwers-icon">
                    <span class="shopinfo-reviwers-name">{{review.user_name }}</span><br>
                    <div class="shopinfo-reviwe-tag"><li class="profile-taglist"><a href="#" class="hash">#</a></li></div>
                    <span class="shopinfo-reviwers-id">@{{review.account_id}}</span>
                    <br>
                    <span class="shopinfo-reviwe-content">{{review.review_content}}</span>
                    <img v-bind:src="review.review_img" class="shopinfo-reviwe-image">
                </div>
            </section>
            <h2 class="shopinfo-reviws">評価したお店</h2>
            <section class="shopinfo-reviws-list">
                <div class="shopinfo-reviw" v-for="reviewer in reviewers">
                    <img v-bind:src="reviewer.icon_img" alt="tenpoinfo-icon" class="shopinfo-reviws-icon">
                    <span class="shopinfo-reviws-name">{{ reviewer.user_name }}</span>
                    <span class="shopinfo-reviwers-id">@{{reviewer.account_id}}</span>
                    <br>
                    <div  v-for="tags in reviewers.tags">
                        <li class="shopinfo-reviws-taglist"><a href="#" class="hash">#おしゃれ</a></li>
                        <li class="shopinfo-reviws-taglist"><a href="#" class="hash">#ロック</a></li>
                        <li class="shopinfo-reviws-taglist"><a href="#" class="hash">#カレー</a></li>
                    </div>
                </div>
            </section>
            <span class="shopinfo-owner">オーナー情報</span>
            <section>
            <div>
                <img v-bind:src="shopinfo.profile_img" alt="tenpoinfo-header" class="shopinfo-tenpoinfo-header" width=100% height=200px>
            </div>
            <div>
                <img v-bind:src="shopinfo.icon_img" alt="profile-icon" class="shopinfo-profile-icon" width=80 height=80>
            </div>
                <span class="shopinfo-users-name">{{shopinfo.owner_name}}</span>
                <div class="owner-introduction">
                    <span>{{shopinfo.owner_profile_content}}</span>
                </div>
                <div>
                    <span class="shopinfo-users-link">link:{{shopinfo.owner_link}}</span><span></span>
                </div><br><br><br>
                <span></span>
            </section>
    </div>
    <div v-if="profile.store_auth == 1 && shopinfo.store_auth != 1">
        <input type=button value="店舗化する" @click="store_auth(shopinfo.id)">
    </div>

    
            
</div>`,
    data() {
        return {
            profile: {},
            follows: {},
            shopinfo: {},
            reviews: {},
            reviewers: {},
            paramid: {
                id: ''
            },
            myid: {
                id: ''
            }
        };
    },
    mounted() {
        this.paramid = this.$route.params.id;
        this.myid = sessionStorage.getItem('id');
        this.myaccid = sessionStorage.getItem('userId');
        console.log(this.myid);
         Ajax(`http://23.21.91.213/api/shopinfo/shop/${this.$route.params.id}`)
        .then((res) => {
            this.shopinfo = res;
            console.log(res);
            Ajax(`http://23.21.91.213/api/shopinfo/showReview/${this.$route.params.id}`)
            .then((res) => {
                this.reviews = res;
                console.log(res);
                Ajax(`http://23.21.91.213/api/shopinfo/showReviewer/${this.$route.params.id}`)
                .then((res) => {
                    this.reviewers = res;
                    console.log(res);
                })
            })
        })
        .catch((err) => {
            console.log(err);
        });
        Ajax(`http://23.21.91.213/api/look/follow/${this.myid}`)
        .then((res) => {
            console.log(res);
            this.follows = res;
        })
        .catch((err) => {
            console.log(err);
        });
        Ajax(`http://23.21.91.213/api/account/${this.myaccid}`)
        .then((res) => {
            console.log(res);
            this.profile = res;
        })
        .catch((err) => {
            console.log(err);
        });
    },

    methods: {
        Follow(){
            const id = sessionStorage.getItem('id')
            Ajax(`http://23.21.91.213/api/follow/${ id }/${ this.$route.params.id }`, 'POST')
                .then((res) => {
                    
                })
                .catch((err) => {
                    console.log(err);
                });
        },

        follow(id){
            const myid = sessionStorage.getItem('id')
            for(var follow in this.follows) {
                if(this.follows[follow].id == id){
                    Ajax(`http://23.21.91.213/api/unfollow/${myid}/${id}`, 'DELETE')
                    .then((res) => {
                        this.$router.go({path: this.$router.currentRoute.path, force: true})
                        return;
                    })
                    .catch((err) => {
                        console.log(err);
                        this.$router.go({path: this.$router.currentRoute.path, force: true})
                        return;
                    });     
                }                   
            }             
            Ajax(`http://23.21.91.213/api/follow/${myid}/${id}`, 'POST')
                    .then((res) => {
                        this.$router.go({path: this.$router.currentRoute.path, force: true})
                    })
                    .catch((err) => {
                        console.log(err);
                        this.$router.go({path: this.$router.currentRoute.path, force: true})
                    }); 
        },

        isFollowed(id){
            for(var follow in this.follows) {
                if(this.follows[follow].id == id){
                    return true;
                }
            }
            return false;
        },

        store_auth(id){
            Ajax(`http://23.21.91.213/api/account/store_auth/${id}`, 'PUT')
            .then((res) => {
                this.$router.go({path: this.$router.currentRoute.path, force: true})
            })
            .catch((err) => {
                console.log(err);
                this.$router.go({path: this.$router.currentRoute.path, force: true})
            }); 
        }
    }
};




/* <section>
                <h2 class="shopinfo-posts">最近の投稿</h2><br>
                <div class="shopinfo-posts-list">
                    <span>**************************</span>
                    <span>**************************</span>
                </div>
            </section> */
            // v-if="store_auth == 1"