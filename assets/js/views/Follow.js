import Ajax from '../lib/Ajax.js';

export default {
    // テンプレート //================//
    template: `<div class="Follow">
    <div class="follow-follower">
        <span><router-link :to="'/Follower/' + paramid" >{{followers.length}} フォロワー</router-link></span>&emsp;&emsp;<span class="follower">{{follows.length}} フォロー</span>
    </div>
        <hr>
        <div v-for="follow in follows" class="follower-outline">
            <router-link :to="'/ShopInfo/'+follow.id">
                <img v-bind:src="follow.icon_img" alt="profile-icon" class="follows-profile-icon" width=55 height=55>
                <span class="follow-name">{{ follow.user_name }}</span><br>
            </router-link>
            <div v-if="follow.id != myid">
                <input type="checkbox" :name="follow.id" @click="unfollow(follow.id)"  class="follow-buttom"></input><label v-if="isFollowed(follow.id)">フォロー解除</label><label v-if="!isFollowed(follow.id)">フォロー</label>
            </div>
                <div class="follower-id-outline">
                <span class="follow-id">@{{ follow.account_id }}</span>
            </div> 
        </div>
    </div>`,
        data() {
            return {
                followers: {},
                follows: {},
                myFollows: {},
                paramid: {
                    id: ''
                },
                myid: {
                    id: ''
                }
                
            };
        },
        mounted() {
            this.myid = sessionStorage.getItem('id');
            this.paramid = this.$route.params.id;
            Ajax(`http://23.21.91.213/api/look/follower/${this.$route.params.id}`)
                .then((res) => {
                    console.log(res);
                    this.followers = res;
                    Ajax(`http://23.21.91.213/api/look/follow/${this.$route.params.id}`)
                    .then((res) => {
                        console.log(res);
                        this.follows = res;
                    });
                })
                .catch((err) => {
                    console.log(err);
                });
            Ajax(`http://23.21.91.213/api/look/follow/${this.myid}`)
            .then((res) => {
                console.log(res);
                this.myFollows = res;
            })
            .catch((err) => {
                console.log(err);
            });
        },

        methods: {
            unfollow(id){
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
                for(var follow in this.myFollows) {
                    if(this.myFollows[follow].id == id){
                        return true;
                    }
                }
                return false;
            }
        }
};