import Ajax from '../lib/Ajax.js';

export default {
    // テンプレート //================//
    template: `<div class="MyLike">
        <div>
            <span class="new-list">新しいMyLIKEを作成する</span>
            <img src="https://placehold.jp/150x150.png" alt="profile-MyLIKE" class="MyLike-newlist" width=90 height=90>
        </div>
        <hr>

        <span class="List-name">MyLIKE 名</span>
        <span class="List-account-name">account name</span>
        <img src="https://placehold.jp/150x150.png" alt="profile-icon" class="MyLike-profile-icon" width=65 height=65>
        <div class="list-block-border">
            <img src="https://placehold.jp/150x150.png" alt="list-MyLIKE" class="list-MyLIKE-icon1" width=70 height=70>
            <img src="https://placehold.jp/150x150.png" alt="list-MyLIKE" class="list-MyLIKE-icon2" width=70 height=70>
            <img src="https://placehold.jp/150x150.png" alt="list-MyLIKE" class="list-MyLIKE-icon3" width=70 height=70>
            <img src="https://placehold.jp/150x150.png" alt="list-MyLIKE" class="list-MyLIKE-icon4" width=70 height=70><hr>
        </div>
    </div>`,
}