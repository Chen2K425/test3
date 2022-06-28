import Ajax from '../lib/Ajax.js';

export default {
    // テンプレート //================//
    template: `<div class="ShopinfoEdit">
    <section class="wallpaper">
        <div id="block1">
            <img src="https://placehold.jp/150x150.png" alt="profile-header" class="profile-header" width=100% height=200px>
        </div>
        <div id="block2">
            <img src="https://placehold.jp/150x150.png" alt="profile-icon" class="profile-icon" width=80 height=80>
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
        <input type="submit" value="フォロー"  @click="Follow" class="profile-follow-button">
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
            <li class="profile-taglist"><a href="#" class="hash">#おしゃれ</a></li>
            <li class="profile-taglist"><a href="#" class="hash">#ロック</a></li>
            <li class="profile-taglist"><a href="#" class="hash">#カレー</a></li>
        </div>
    </section>
            
        
    <div >
    <span class="shopinfo-address"><router-link :to="'/Map'">***市*****-*-*</router-link></span>
    <div>
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
                    <span>******************************
                    </span>
                </div>
                <div>
                    <span class="shopinfo-users-link">link:</span><span></span>
                </div><br><br><br>
                <span></span>
            </section>
    </div>

    </div>`,
};