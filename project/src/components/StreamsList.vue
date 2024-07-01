<template>
    <div class="searhApp">

      <!-- ゲームカテゴリ検索 -->
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

      <!-- 配信検索 -->
      <div class="searchChannels">
        <div class="searchTitle">
          <!-- 選択中のゲームタイトル -->
          <div class="selectedTitle">
            <label v-text="selectCategory"></label>
            <img :src=selectCategoryImgSrc>
          </div>
          <!-- 配信タイトル検索 -->
          <div class="inputregion">
            <input v-model="inputChannelText" type="text" class="input"  placeholder="配信タイトル">
            <button class="button" v-on:click="SearchChannels()">検索</button>
          </div>
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
    flex-direction: row;
}

.searchCategories{
    width: 30%;
    height: 100vh;
    border: 1px solid #000000;
}

.searchChannels{
    width: 70%;
    height: 100vh;
    border: 1px solid #000000;
}

.inputregion{
  height: 26px;
}

.searchTitle{
  display: flex;
  flex-direction: row;
}

.selectedTitle{
  margin: 10px 30px;
}

.row {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    height: 70vh;
    overflow-y: scroll;
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