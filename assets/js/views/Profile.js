import Ajax from '../lib/Ajax.js';

export default {
    // テンプレート //================//
    template: `<div class="Profile">
    <section class="wallpaper">
        <div id="block1">
            <img v-bind:src="profile.profile_img" alt="profile-header" class="profile-header" width=100% height=200px>
        </div>
        <div id="block2">
            <img v-bind:src="profile.icon_img" alt="profile-icon" class="profile-icon" width=80 height=80>
        </div>
    </section>

    
    
    <section>
        <div class="profile-follower-align">
            <span class="profile-follower">フォロワー</span>
            <span class="profile-follower-value"><router-link :to="'/Follower/' + profile.id">{{ profile.followed }}</router-link></span>
        </div>
        <div class="profile-follow-align">
            <span class="profile-follow">フォロー</span><router-link :to="'/'+'ProfileEdit'" ><input type="submit" value="編集" class="profile-edit"></router-link></span>
            <span class="profile-follow-value"><router-link :to="'/Follow/' + profile.id">{{ profile.follower }}</router-link></span>
        </div>
        <br>
        <img src="" alt="">
        <span class="profile-name">{{ profile.user_name }}</span>
        <br>
        <span class="profile-id">@{{ profile.account_id }}</span>
    </section>

    <section>
        <div>
            <span class="profile-introduction">
                {{ profile.profile_content }}
            </span>
        </div>
        <div v-if="profile.store_auth == 1">
            <span class="shopinfo-address"><router-link :to="'/Map'">{{ profile.location}}</router-link></span>   
        </div>
        <div>
            <img src="./assets/img/hot.png" alt="home" class="profile-soul" width="20px" height="20px"><span class="profile-link">mind: {{ profile.link }} </span><br>
        </div>
        <div class="profile-tagline">
        <div v-for="tags in profile.tags">
            <li class="profile-taglist"><a href="#" class="hash">#{{ tags.tag_name }}</a></li>
        </div>  
        </div>
    </section>
    <div class="MyLIKEblock-border"><router-link :to="'/MyLike'">
    <span class="profile-MyLIKE">保存したMy LIKE</span>
        <img src="https://placehold.jp/150x150.png" alt="list-MyLIKE" class="profile-MyLIKE-icon1" width=70 height=70>
        <img src="https://placehold.jp/150x150.png" alt="list-MyLIKE" class="profile-MyLIKE-icon2" width=70 height=70>
        <img src="https://placehold.jp/150x150.png" alt="list-MyLIKE" class="profile-MyLIKE-icon3" width=70 height=70>
        <img src="https://placehold.jp/150x150.png" alt="list-MyLIKE" class="profile-MyLIKE-icon4" width=70 height=70>
    </router-link></div>

    <div v-if="profile.store_auth == 1">
        <span class="shopinfo-owner">オーナー情報</span>
        <section>
        <div>
            <img v-bind:src="profile.profile_img" alt="tenpoinfo-header" class="shopinfo-tenpoinfo-header" width=100% height=200px>
        </div>
        <div>
            <img v-bind:src="profile.icon_img" alt="profile-icon" class="shopinfo-profile-icon" width=80 height=80>
        </div>
            <span class="shopinfo-users-name">{{profile.owner_name}}</span>
            <div class="owner-introduction">
                <span>{{profile.owner_profile_content}}</span>
            </div>
            <div>
                <span class="shopinfo-users-link">link:{{profile.owner_link}}</span><span></span>
            </div><br><br><br>
            <span></span>
        </section>
    </div>
    

</div>`,
    data() {
        return {

            profile: {},
            // profiles: {
            //     account_id: '',
            //     name: '',
            //     proimf: '',
            //     content: '',
            //     link: '',
            //     iconimg: '',
            //     storeauth: '',
            //     location: ''
            // }
            
        };
    },
    mounted() {
        const userId = sessionStorage.getItem('userId')
        Ajax(`http://23.21.91.213/api/account/${userId}`)
            .then((res) => {
                console.log(res);
                this.profile = res;
            })
            .catch((err) => {
                console.log(err);
            });
        }
};

