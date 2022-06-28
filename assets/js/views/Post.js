import Ajax from '../lib/Ajax.js';

export default {
    // テンプレート //================//
    template: `<div class="Post">
    <form action="" method="post">
        <div class="post-cancel">
            <a @click="$router.back()">キャンセル</a>
        </div>
        <span class="post-copy">保存</span>
        <input type="button" @click="post" value="投稿" class="post-up">
        
        <section>
            <img v-bind:src="shopinfo.icon_img" alt="" class="post-shop-icon" width="80" height="80">
            <span class="post-name">{{shopinfo.user_name}}</span>
            <span class="post-id">@{{shopinfo.account_id}}</span>
            <span class="post-address">{{shopinfo.location}}</span>
        </section>
        <br>
        <textarea name="" id="" v-model="opt.review_content" cols="30" rows="10"  class="post-substance"></textarea>
        <input type="file" name="review_img" @change="selectedFile"> 
    </form>
</div>`,
    data() {
        return {
            profile: {},
            imgicon: '',
            fileInfo: '',
            shopinfo: '',
            opt : {
                'review_content': '',
                'user_id': '',
                'image': ''
            }
        };
    },
    mounted() {
        this.paramid = this.$route.params.id;
        Ajax(`http://23.21.91.213/api/shopinfo/shop/${this.$route.params.id}`)
        .then((res) => {
            this.shopinfo = res;
            console.log(res);
        })
        .catch((err) => {
            console.log(err);
        });
    },
    methods: {
        post(){
            this.opt.user_id = sessionStorage.getItem('id');
            console.log(JSON.stringify(this.opt));
            Ajax(`http://23.21.91.213/api/reviewed/${this.$route.params.id}`, 'POST', this.opt)
            .then((res) => {
                this.$router.push(`/ShopInfo/${this.$route.params.id}`);
                // this.$router.back();
            })
            .catch((err) => {
                this.$router.push(`/ShopInfo/${this.$route.params.id}`);
                console.log(err);
            });
        },

        selectedFile(e) {
            const reader = new FileReader();
            const file = e.target.files[0];
    
            if (file) {
              reader.readAsDataURL(file);
              reader.onload = () => {
                this.opt.image = reader.result;
              }
            } else {
              this.opt.image = '';
            }
        },
    }
}