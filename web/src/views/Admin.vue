<template>
  <div id="main">
    <Top title="电影院"/>
    <Login/>
    <TabBar/>
  </div>
</template>

<script>
import Top from '@/components/Top';
import TabBar from '@/components/TabBar';
import Login from '@/components/Login';
export default {
  name: 'admin',
  components:{
      Top,
      TabBar,
      Login
  },
  data() { 
    return {

    }
  }
 }
</script>