import Ajax from '../lib/Ajax.js';

export default {
    // テンプレート //================//
    template: `<div class="Follower">
    <div class="follower-fadein">
        <div class="follow-follower">
            <span class="follower">{{followers.length}} フォロワー</span>&emsp;&emsp;<span><router-link :to="'/Follow/' + paramid" >{{follows.length}} フォロー</router-link></span>
        </div>
            <hr>
            <div v-for="follower in followers" class="follower-outline">
                <router-link :to="'/ShopInfo/'+follower.id">
                    <img <img v-bind:src="follower.icon_img" alt="profile-icon" class="follows-profile-icon" width=55 height=55>
                    <span class="follow-name">{{ follower.user_name }}</span><br>
                </router-link>
                <div v-if="follower.id != myid">
                    <input type="checkbox" :name="follower.id" @click="follow(follower.id)"  class="follow-buttom"></input><label v-if="isFollowed(follower.id)">フォロー解除</label><label v-if="!isFollowed(follower.id)">フォロー</label>
                </div>
                <div class="follower-id-outline">
                <span class="follow-id">@{{ follower.account_id }}</span>
            </div>
        </div>
                
            
    </div>
            
        </div>`,
        data() {
            return {
                followers: {},
                follows: {},
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
            console.log(this.myid);
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
        },
        methods: {
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
            }
        }
    };