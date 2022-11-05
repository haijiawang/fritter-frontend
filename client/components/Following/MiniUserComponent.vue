<template>
  <article
    class="user"
  >
    <div class='follow-grid'>
        <h3 class='name-text'>
            @{{user.username}}
        </h3>
        <button @click="followUser(user._id)">
        Follow
        </button>
    </div>
  </article>
</template>

<script>
export default {
  name: 'MiniUserComponent',
  props: {
    user: {
        type: Object, 
        required: true
    }
  },
  data() {
    return {
    };
  },
  mounted(){
  },
  methods: {
    async followUser(userId){
        const options = {
            method: 'PUT', header: {'Content-Type': 'application/json'}
        };

        const url = `/api/feed/follow/${userId}`; 
        try{
            const r = await fetch(url, options); 
            const res = await r.json(); 
            if (!r.ok){
                throw new Error(res.error); 
            }
            this.$emit('followed');
        } catch(e){
        }
    }
  }
};
</script>

<style scoped>
.follow-grid {
    display: flex;
    justify-content: space-between;
}

.follow-grid button{
    margin-top: 20px;
    margin-right: 100px;
}

.name-text{
    font-size: 20px;
    font-weight: 400;
}
</style>

