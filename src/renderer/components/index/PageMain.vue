<template>
 <div>
 	<div>{{messages}}</div>
 	<router-link to="info">Home</router-link>
 	<HELLO></HELLO>
 </div>
</template>
<script>
import  HELLO from "@/components/PageMain";
 export default{
 	name:'home',
 	data(){
 		return {
 			messages: 'hi'
 		}
 	},
 	components:{
 		
 		HELLO:HELLO
 	}
 }
</script>