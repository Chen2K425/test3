import Ajax from '../lib/Ajax.js';

export default {
    // テンプレート //================//
    template: `<div class="Mylist">
    <form method="get" action="#" class="search_container search-buttom">
        <input type="text" size="25" placeholder="マップ検索">
        <router-link :to="'/Found'">
            <input type="submit" value="検索">
	</router-link>
    </form>
        <div class="map-searching" id="map" width=300px height=300px></div>
        <div class="map-searching-shopicon-border">
            <img src="https://placehold.jp/150x150.png" alt="tenpoinfo-header" class="map-searching-shopicon" width=65px height=65px>
            <img src="https://placehold.jp/150x150.png" alt="tenpoinfo-header" class="map-searching-shopicon" width=65px height=65px>
            <img src="https://placehold.jp/150x150.png" alt="tenpoinfo-header" class="map-searching-shopicon" width=65px height=65px>
            <img src="https://placehold.jp/150x150.png" alt="tenpoinfo-header" class="map-searching-shopicon" width=65px height=65px>
        </div>
        <div class="mapsearchresult-border" >
	    <router-link :to="'/ShopInfo'">
                <span class="searchingresult-shopname">店舗名</span>
                <span class="searchingresult-shopid">店舗ID</span>
                <span class="searchingresult-shopcategory">ジャンル</span><br>
                <span class="searchingresult-shopaddress">***市*****_*_*</span>
                <img src="https://placehold.jp/150x150.png" alt="profile-icon" class="searchingresult-profile-image" width=363 height=105>
            </router-link> 
	</div>
    </div>`,
    mounted() {
        const MyLatLng = new google.maps.LatLng(35.6811673, 139.7670516);
        const Options = {
            zoom: 15,      //地図の縮尺値
            center: MyLatLng,    //地図の中心座標
            mapTypeId: 'roadmap'   //地図の種類
        };
        const map = new google.maps.Map(document.getElementById('map'), Options);
    }
}
