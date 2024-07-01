<template>
    <div class="searhApp">

      <!-- ゲームカテゴリ検索 -->
      <div class="section">
        <div class="searchCategories">
          <!-- ゲームタイトル入力 -->
          <div class="inputregion">
            <input v-model="inputCategoryText" type="text" class="input" placeholder="ゲームタイトル">
            <button class="button" v-on:click="SearchCategories()">検索</button>
          </div>
          <!-- 検索結果一覧表示 -->
          <div class="row">
            <div class="columns large-3 medium-6" v-for="stream in streamLists" :key="stream">
              <div class="card"> 
                <div class="image-container">
                  <img :src=stream.box_art_url v-on:click="SelectCategories(stream.id, stream.box_art_url)">
                </div>
                <div class="image-title">
                  <div class="stream-text">{{ stream.name }}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 配信検索 -->
      <div class="section">
        <div class="searchChannels">
          <!-- 選択中のゲームタイトル -->
          <label v-text="selectCategory"></label>
          <img :src=selectCategoryImgSrc>
          <!-- 配信タイトル検索 -->
          <div class="inputregion">
            <input v-model="inputChannelText" type="text" class="input"  placeholder="配信タイトル">
            <button class="button" v-on:click="SearchChannels()">検索</button>
          </div>
          <!-- 検索結果一覧表示 -->
          <div class="row">
            <div class="columns large-3 medium-6" v-for="channel in channelLists" :key="channel">
              <div class="card" v-on:click="StreamJump(channel)"> 
                <img :src=ImageReplace(channel.thumbnail_url) />
                <div class="channel-text">{{ channel.title }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
</template>
    
<script>
import AxiosInstance from './axios/axiosInstance'

export default {
    data(){
    return{
        inputCategoryText:"",
        inputChannelText:"",
        selectCategory:"",
        selectCategoryImgSrc:"",
        streamLists: [],
        channelLists: [],
        colums:[
        {
            filed: 'id',
            label: 'ID',
        },
        {
            filed: 'name',
            label: 'タイトル',
        },
        {
            filed: 'box_art_url',
            label: '画像',
        },
        ]
    }
    },
    methods: {
    // ゲームカテゴリ検索
    SearchCategories() {
        var searchkey = this.inputCategoryText;
        AxiosInstance.get('https://api.twitch.tv/helix/search/categories?query='+searchkey)
        .then((response) => {
        console.log(response.data.data)
        this.streamLists = response.data.data;
        }).catch((error) => { console.log(error); });
    },

    // 選択してるゲームカテゴリ保持
    SelectCategories(categoryId, box_art_ur) {
        this.selectCategory = categoryId;
        this.selectCategoryImgSrc =  box_art_ur;
    },

    // 配信の検索
    SearchChannels() {
        var serchkey = this.inputChannelText;
        AxiosInstance.get('https://api.twitch.tv/helix/streams?game_id=' + this.selectCategory + '&type=live&first=100&language=ja')
        .then((response) => {
        console.log(response.data.data)
        var streams = response.data.data;
        if(serchkey != ""){
            this.channelLists = streams.filter(s => (s.title.indexOf(serchkey) != -1));
        }else{
            this.channelLists = streams;
        }        
        }).catch((error) => { console.log(error); });
    },

    // 配信画像のサイズ変換
    ImageReplace(src){
        return src.replace("{width}" ,96).replace("{height}", 48);
    },

    // 配信を開く
    StreamJump(channel){
        var jumpUrl = "https://www.twitch.tv/" + channel.user_login;
        window.open(jumpUrl)
    },

    },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
*{
    box-sizing: border-box;
}

.searhApp{
    display: flex;
    flex-direction: column;
}

.item-list .searchCategories{
    width: 30vh;
    height: 100vh;
}

.item-list .searchChannels{
    width: 70vh;
    height: 100vh;
}

.row {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    height: 35vh;
    overflow-y: auto;
}

.card {
    display: block;
    width: 250px;
    align-items: center;
    justify-content: center;
    padding: 1em;
}

.stream-text {
    height: 20px;
}

.stats {
    display: flex;
    flex-direction: row;
}

.inputregion{
    display: flex;
    flex-direction: row;
}

.image-container {
    display: flex;
    justify-content: center;
}

.image-title {
    text-align: center;
    margin-top: 10px;
}

</style>