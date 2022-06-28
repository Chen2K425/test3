import Ajax from '../lib/Ajax.js';

export default {
    // テンプレート //================//
    template: `<div class="ProfileEdit">
    <section class="wallpaper">
        <div id="block1">
            <img src="https://placehold.jp/150x150.png" alt="profile-header" class="profile-header" width=100% height=200px>
        </div>
        <div id="block2">
            <img src="https://placehold.jp/150x150.png" alt="profile-icon" class="profile-icon" width=80 height=80>
        </div>
    </section>

    <section>
        <img src="" alt="">
        <textarea name=”name” rows="1" cols="2048 "class="profileedit-link">{{ profile.user_name }}</textarea>
        <br>
        <textarea name=”name” rows="1" cols="2048 "class="profileedit-link">{{ profile.account_id }}</textarea>
    </section>

    <section>
        <div>
            <textarea name=”name” rows="5" cols="20"class="profile-introduction"></textarea>
        </div>
        
        <div>
            <img src="./assets/img/hot.png" alt="home" class="profile-soul" width="20px" height="20px"><span class="profile-link"><textarea name=”name” rows="1" cols="2048"class="profileedit-link">あなたのmindを貼り付け</textarea></span><span></span>
        </div>
        <div class="profile-tagline">
            <li class="profile-taglist"><a href="#" class="hash">#おしゃれ</a></li>
            <li class="profile-taglist"><a href="#" class="hash">#ロック</a></li>
            <li class="profile-taglist"><a href="#" class="hash">#カレー</a></li>
        </div>
    </section>
    
    <div v-if="profile.store_auth == 1">
        <span class="shopinfo-address"><router-link :to="'/Map'">***市*****-*-*</router-link></span>
        <span class="shopinfo-owner">オーナー情報</span>
        <section>
            <div>
                <img src="https://placehold.jp/150x150.png" alt="tenpoinfo-header" class="shopinfo-tenpoinfo-header" width=100% height=200px>
            </div>
            <div>
                <img src="https://placehold.jp/150x150.png" alt="profile-icon" class="shopinfo-profile-icon" width=80 height=80>
            </div>
            <span class="shopinfo-users-name">name</span>
            <div class="owner-introduction">
                <span>******************************</span>
            </div>
            <div>
                <span class="shopinfo-users-link">link:</span><span></span>
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