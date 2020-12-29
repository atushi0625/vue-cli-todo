<template>
  <div class="main">
    <LikeHeader/>
    <LikeNumber/>
    <label v-for="(label,i) in options" :key="i">
      <input type="radio"
      v-model="current"
      :value="label.value">{{ label.label }}
    </label>
    <h1>{{ computedTodo.length }}件を表示中</h1><br>
    <input type="text" v-model="addTitle" />
    <button @click="add" :disabled="addButtonDisabled">タスクの追加</button>
    <!-- 状態の変更ボタン -->
    <!-- <button @click="doChangeState(list)">{{ labels[list.state] }}</button> -->

    <div style="cursor: pointer;"
    v-for="list in computedTodo"  :key="list.id">
    {{list.id}}

    <label :class="{checked: list.check}">
      <input type="checkbox" v-model="list.check"
       />
       <!-- {{ list.title + '（' + list.dueDate.toLocaleDateString() + '）' }} -->
      <!-- <select v-model="list.check">
      <option value="kanryou">完了</option>
      <option value="mityak">未着手</option>
      <option value="totyu">途中</option>
      </select> -->
      {{list.title}}
    <button @click="remove(index)">×</button>
    <button @click="editToDo">
      <b-icon icon="arrow-counterclockwise" 
      animation="spin-reverse" font-scale="2"
      >
      </b-icon>
    </button>
    </label>
    </div>
     <br>

    <date-picker v-model="addDate" type="date" placeholder="期限">
    </date-picker>    
    
    
  </div>
</template>

<script>
import LikeHeader from './components/LikeHeader.vue';
import LikeNumber from './components/LikeNumber.vue';
import DatePicker from 'vuejs-datepicker';

export default {
  components: {
    LikeHeader,
    LikeNumber,
    DatePicker,

  },
    name: 'app',
  data() {
    LikeHeader
    LikeNumber
      return {
        addTitle: "",
        addDate: "",
        addId: "4",
        // ラジオボタン-1にしてるとすべてにマークが入った状態（初期状態）
        current: -1,
      lists: [
        { id: 1,  title: '会議資料の作成',
         "state": 0,  check: false },
        { id: 2,  title: '現場工程の段取り',
         "state": 0,  check: false },
        { id: 3,  title: '部品の手配',
         "state": 0,  check: false },
      ],
      // ラベルの各状態
      options: [
        { value: -1, label: 'すべて'},
        { value: 0, label: '作業中'},
        { value: 1, label: '完了'},
      ],
        };
          },

  methods: {
    add(){
      if(this.addTitle){
        this.lists.unshift({    //unshiftは配列の最初
          title: this.addTitle, //空
          check: false, //最初はチェックが外れてる
          id: this.addId ++,
          state: 0,
        });
      }
      this.addTitle = "";
    },
    editToDo(){
       let newTitle = window.prompt('以下内容で更新します。');
       if(newTitle === ''){
         alert('入力欄が空欄です。');
       }
       this.edit(newTitle);
     },
     edit(title){
       this.lists[0].title = title;
     },
    //  タスクの更新をします
    remove (index){
      if (confirm('本当に削除しますか?')){
        this.lists.splice(index,1);
        // １つだけ削除
      }
    },
    // 状態変更の処理 list.stateの値を反転
    doChangeState (list){
      list.state = !list.state ? 0 : 1
    },
  },
  // 追加ボタンは必須入力項目を入力しないと有効化されない
 computed:{
    addButtonDisabled(){
      return this.addTitle.length === 0 ;
    },
    // リストの絞り込み
    computedTodo(){
      // データcurrentが-1ならすべて
      // それ以外なら current と state が一致するものだけに絞り込む
      return this.lists.filter(function(el){
       return this.current < 0 ? true : this.current === el.state
      },this)
    },
    // 作業中・完了のラベルの表示
    labels(){
      return this.options.reduce(function(a,b){
        return Object.assign(a, { [b.value]: b.label})
      },{})
    }
  }
}

</script>

<style scoped>
.checked{
  text-decoration: line-through;
}

.circle {
  width: 200px;
  height: 200px;
  margin: auto;
  border-radius: 100px;
  background-color: deeppink;
}

.fade-move{
transition: transform 1s;
}

.fade-enter {
  /* 現れる時の最初の状態 */
  opacity: 0;
}
.fade-enter-active {
  /* 現れる時のトランジションの状態 */
  transition: opacity 0.5s;
}
.fade-enter-to {
  /* 現れる時の最後の状態 */
  opacity: 1;
}
.fade-leave {
  /* 消える時の最初の状態 */
  opacity: 1;
}
.fade-leave-active {
  /* 消える時のトランジションの状態 */
  transition: opacity 1s;
  position: absolute;
  width: 200px;
}
.fade-leave-to {
  /* 消える時の最後の状態 */
  opacity: 0;
}

.slide-enter,
.slide-leave-to {
  opacity: 0;
}

.slide-enter-active {
  animation: slide-in 0.5;
  transition: opacity 5;
}
/* .slide-enter-to {

} */
/* .slide-leave {

} */
.slide-leave-active {
  animation: slide-in 0.5s reverse;
  transition: opacity 1s;
}
/* .slide-leave-to {

} */

@keyframes slide-in {
  from {
    transform: translateX(100px);
  }
  to {
    transform: translateX(0);
  }
}

.main {
  width: 500px;
  margin: auto;
  text-align: center;
  padding-top: 8rem;
}

</style>
