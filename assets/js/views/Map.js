import Ajax from '../lib/Ajax.js';

export default {
    // テンプレート //================//
    template: `<div class="Map">

    <form method="post" action="#" class="search_container">
        <input type="text" size="25" v-model="search" placeholder="キーワード検索" id="keyword">
        
        <button type="button" class="clear-decoration" id="search"><img src="./assets/img/search.png" alt="送信" height="25" width="25"/></button> 
        
    </form>
        <div class="map-searching" id="target"></div>
        <div class="map-searching-shopicon-border">
            <img v-bind:src="result.icon_img" v-for="result in results" class="map-searching-shopicon" width=65px height=65px>
        </div>
        <div class="searchingresult-border" v-for="result in results"><router-link :to="'/Profile'">
            <img v-bind:src="result.icon_img"  class="home-profile-icon" width=55 height=55>
            <span class="searchingresult-shopname">{{ result.user_name }}</span>
            <span class="searchingresult-shopid">{{ result.account_id }}</span>
            <span class="searchingresult-shopaddress">{{ result.location }}</span>
            <img v-bind:src="result.profile_img" width="363" height="105" class="searchingresult-profile-image">
            </router-link>
        </div>
    </div>`,
    // <form method="get" id="keyword" action="#" class="search_container" >
    // <router-link :to="'/Found'">
    // </router-link>
    // </form>
    data() {
        return {
            'search': '',
            results: []
        }
    },
    mounted() {
        // const opt = {
        //     'keyword': this.word
        // }
        // console.log(opt);
        Ajax(`http://23.21.91.213/api/map`)
            .then((res) => {
                this.results = res;
                console.log(this.results);
            })
            .catch((err) => {
                console.log(err);
            });
            
        let map;
        let marker = [];
        let markerLatLng;
        let infoWindow = [];
        let markerData = [ 
            // マーカーを立てる場所名・緯度・経度
            //約150件を同時に軽く表示できた
            {
                  name: '東京',
                  lat: 35.6809591,
                  lng: 139.7673068,
            }, {
                  name: '小川町駅',
                  lat: 35.6951212,
                  lng: 139.76610649999998
            }, {
                  name: '淡路町駅',
                  lat: 35.69496,
                  lng: 139.76746000000003
            }, {
                  name: '御茶ノ水駅',
                  lat: 35.6993529,
                  lng: 139.76526949999993
            }, {
                  name: '神保町駅',
                  lat: 35.695932,
                  lng: 139.75762699999996
            }, {
                  name: '新御茶ノ水駅',
                  lat: 35.696932,
                  lng: 139.76543200000003
            }
        ];
        //日本電子(35.69849, 139.6983568)

        //マップ初期表示の位置設定
        let target = document.getElementById('target');
        let MyLatLng = new google.maps.LatLng(35.6809591, 139.7673068);

        //マップ表示
        map = new google.maps.Map(target, {
            zoom: 13,      //地図の縮尺値
            center: MyLatLng,    //地図の中心座標
            mapTypeId: 'roadmap',   //地図の種類
            mapTypeControl: false, //マップタイプ コントロール
            fullscreenControl: false, //全画面表示コントロール
            streetViewControl: false, //ストリートビュー コントロール
            zoomControl: false, //ズーム コントロール
            // gestureHandling: 'cooperative' //指2本のスクロールで地図移動
        });

        // マーカー毎の処理
        for (let i = 0; i < markerData.length; i++) {
            markerLatLng = new google.maps.LatLng({lat: markerData[i]['lat'], lng: markerData[i]['lng']}); // 緯度経度のデータ作成
            marker[i] = new google.maps.Marker({ // マーカーの追加
                position: markerLatLng, // マーカーを立てる位置を指定
                map: map // マーカーを立てる地図を指定
            });

            infoWindow[i] = new google.maps.InfoWindow({ // 吹き出しの追加
              content: '<div class="sample">' + markerData[i]['name'] + '</div>' // 吹き出しに表示する内容
            });
        
            marker[i].addListener('click', function() { // マーカーをクリックしたとき
                infoWindow[i].open(map, marker[i]); // 吹き出しの表示
            });
        }

        // 検索実行ボタンが押下されたとき
        document.getElementById('search').addEventListener('click', function() {
        //     const opt = {
        //         'keyword': this.search
        //     }
        //     console.log(opt);
        //     Ajax(`http://23.21.91.213/api/search`, 'POST', opt)
        //         .then((res) => {
        //             this.results = res;
        //             console.log(this.results);
        //         })
        //         .catch((err) => {
        //         console.log(err);
        //     });

            let marker;
            let place = document.getElementById('keyword').value;
            let geocoder = new google.maps.Geocoder();      // geocoderのコンストラクタ

            geocoder.geocode({
                address: place
            }, function(results, status) {
                if (status == google.maps.GeocoderStatus.OK) {

                    // let bounds = new google.maps.LatLngBounds();
                    if (results[0].geometry) {
                        // 緯度経度を取得
                        let latlng = results[0].geometry.location;
                        // 住所を取得
                        let address = results[0].formatted_address;
                        //マップ表示
                        let map = new google.maps.Map(target, {
                            zoom: 15,      //地図の縮尺値
                            center: latlng,    //地図の中心座標
                            mapTypeId: 'roadmap',   //地図の種類
                            mapTypeControl: false, //マップタイプ コントロール
                            fullscreenControl: false, //全画面表示コントロール
                            streetViewControl: false, //ストリートビュー コントロール
                            zoomControl: false, //ズーム コントロール
                            // gestureHandling: 'cooperative' //指2本のスクロールで地図移動
                        });
                        // マーカーのセット
                        // 既にあるマーカーを削除
                        if(marker != null) {
                            marker.setMap(null);
                        }
                        marker = null;
                
                        // let iconUrl = 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png';
                        marker = new google.maps.Marker({
                            position: latlng,
                            map: map,
                            // icon: iconUrl
                        });
                        // マーカーへの吹き出しの追加
                        // setInfoW(place, latlng, address);
                        let infoWindow = new google.maps.InfoWindow({
                            content: "<a href='http://www.google.com/search?q=" + place + "' target='_blank'>" + place + "</a><br>" + latlng + "<br>" + address + "<br><a href='http://www.google.com/search?q=" + place + "&tbm=isch' target='_blank'>画像検索 by google</a>"
                        });
                        // マーカーにクリックイベントを追加
                        marker.addListener('click', function() {
                            infoWindow.open(map, marker);
                        });
                    }
                } else if (status == google.maps.GeocoderStatus.ZERO_RESULTS) {
                    alert("見つかりません");
                } else {
                    console.log(status);
                    alert("エラー発生");
                }
            });
        });
    }  
}
