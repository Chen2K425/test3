import Ajax from './lib/Ajax.js';
import Vue from './vendor/vue.esm.browser.js';
import VueRouter from './vendor/vue-router.esm.browser.js';
// views
import Home from './views/Home.js';
import Serch from './views/Serch.js';
import Map from './views/Map.js';
import Profile from './views/Profile.js';
import Found from './views/Found.js';
import Shopinfo from './views/Shopinfo.js';
import Post from './views/Post.js';
import AccReg from './views/AccReg.js';
import Follower from './views/Follower.js';
import Follow from './views/Follow.js';
import MyLike from './views/MyLike.js';
import ProfileEdit from './views/ProfileEdit.js';
import Establish from './views/Establish.js';
import Top from './views/Top.js';
import ShopinfoEdit from './views/ShopinfoEdit.js';

import Shop from './views/Shop.js';
import Cart from './views/Cart.js';
import Register from './views/Register.js';
import NotFound from './views/NotFound.js';

/*
------- 作るページ -------
/ Home.js
    タイムライン
/Serch Serch.js
    検索画面
/Mylist Mylist.js
    マイリスト画面
/Profile Profile.js
    プロフィール画面


    
/:shop_id Shop.js
    店舗詳細 - 商品一覧
/:shop_id/cart Cart.js
    カートの中 - 個数 お客様情報
/:shop_id/register Register.js
    注文確認画面 - 注文
/error404 NotFound.js
    エラーページ
*/

(function() {
    "use strict";

    // VueRouter //=====//
    Vue.use(VueRouter);

    const routes = [
        {
            path: "/",
            name: "Top",
            component: Top
        },
        {
            path: "/Register",
            name: "Register",
            component: Register
        },
        {
            path: "/AccReg",
            name: "AccReg",
            component: AccReg
        },
        {
            path: "/Home",
            name: "Home",
            component: Home
        },
        {
            path: "/Serch",
            name: "Serch",
            component: Serch,
            props: true
        },
        {
            path: "/Map",
            name: "Map",
            component: Map
        },
        {
            path: "/Profile",
            name: "Profile",
            component: Profile
        },
        {
            path: "/Shopinfo/:id(\\d+)",
            name: "Shopinfo",
            component: Shopinfo
        },
        {
            path: "/ShopinfoEdit",
            name: "ShopinfoEdit",
            component: ShopinfoEdit
        },
        {
            path: "/Found",
            name: "Found",
            component: Found,
            props: true
        },
        {
            path: "/Post/:id(\\d+)",
            name: "Post",
            component: Post
        },
        {
            path: "/Follower/:id(\\d+)",
            name: "Follower",
            component: Follower
        },
        {
            path: "/Follow/:id(\\d+)",
            name: "Follow",
            component: Follow
        },
        {
            path: "/MyLike",
            name: "MyLike",
            component: MyLike
        },
        {
            path: "/ProfileEdit",
            name: "ProfileEdit",
            component: ProfileEdit
        },
        {
            path: "/Establish",
            name: "Establish",
            component: Establish
        },
        {
            path: "/:shop_id(\\d+)",
            name: "Shop",
            component: Shop
        },
        {
            path: "*",
            component: NotFound
        }
    ];

    const router = new VueRouter({
        routes
    });

    // vueの設定 //=====//
    new Vue({
        el: '#app',
        data: {
            open: false,
            profile: {}
        },
        router,

        
        mounted(){
            // const userId = sessionStorage.getItem('userId')
            // Ajax(`http://23.21.91.213/api/account/${userId}`)
            //     .then((res) => {
            //         this.profile = res;
            //         console.log(res);
            //     }) .catch((err) => {
            //         console.log(err);
            //     });
        },

        
        
        // beforeRouteUpdate(to, from, next) {
        //     const userId = sessionStorage.getItem('userId')
        //     Ajax(`http://23.21.91.213/api/account/${userId}`)
        //         .then((res) => {
        //             this.profile = res;
        //             console.log(res);
        //         }) .catch((err) => {
        //             console.log(err);
        //         });
        //     next();
        // },

        methods: {
            logout(){
                Ajax(`http://23.21.91.213/api/users/logout`, 'POST')
                    .then((res) => {
                        console.log(res);
                        this.$router.push(`/`);
                    })
                    .catch((err) => {
                        console.log(err);
                    });
            },

            updateMenu(userId){
                Ajax(`http://23.21.91.213/api/account/${userId}`)
                .then((res) => {
                    this.profile = res;
                    console.log(res);
                }) .catch((err) => {
                    console.log(err);
                });
            },

            // init(){
            //     const userId = sessionStorage.getItem('userId')
            //     Ajax(`http://23.21.91.213/api/account/${userId}`)
            //     .then((res) => {
            //         this.profile = res;
            //         console.log(res);
            //     }) .catch((err) => {
            //         console.log(err);
            //     });
            // }
        },
        computed: {
            backTo() {
                if (this.$route.name==='Shop') {
                    return '/';
                } else if (this.$route.name==='Cart') {
                    return '/'+this.$route.params.shop_id;
                } else if (this.$route.name==='Register') {
                    return '/'+this.$route.params.shop_id+'/cart';
                }
                return '';
            }
        },
    });
})();
