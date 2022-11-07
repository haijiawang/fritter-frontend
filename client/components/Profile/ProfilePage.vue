<!-- Default page that also displays freets -->

<template>
  <main>
    <section v-if="this.$router.app._route.params.username">
      <header>
        <h2>@{{ this.$router.app._route.params.username }}'s Profile</h2>
        <div v-if="userId !== this.$store.state.userId">
          <button v-if="!isFollowing" @click="followUser(userId)">
            Follow
          </button>
          <button v-else @click="unfollowUser(userId)">Unfollow</button>
        </div>
      </header>
    </section>
    <section>
      <section>
        <FreetComponent
          v-for="freet in freets"
          :key="freet.id"
          :freet="freet"
        />
      </section>
    </section>
  </main>
</template>

<script>
import FreetComponent from "@/components/Freet/FreetComponent.vue";
import CreateFreetForm from "@/components/Freet/CreateFreetForm.vue";
import CreateCollectionForm from "@/components/Freet/CreateCollectionForm.vue";
import GetFreetsForm from "@/components/Freet/GetFreetsForm.vue";
import FollowingComponent from "@/components/Following/FollowingComponent.vue";

export default {
  name: "ProfilePage",
  components: {
    FreetComponent,
    GetFreetsForm,
    CreateFreetForm,
    CreateCollectionForm,
    FollowingComponent,
  },
  mounted() {
    this.isFollowingUser(this.$router.app._route.params.username);
    this.getFreets();
  },
  updated() {
    this.isFollowingUser(this.$router.app._route.params.username);
  },
  data() {
    return {
      isFollowing: false,
      userId: "",
      freets: [],
    };
  },
  methods: {
    async getFreets() {
      const username = this.$router.app._route.params.username;
      const options = {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      };

      const url = `/api/freets?author=${username}`;
      try {
        const r = await fetch(url, options);
        const res = await r.json();
        this.freets = res;
        console.log(this.freets);
      } catch (e) {}
    },
    async isFollowingUser(username) {
      const options = {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      };

      const userUrl = `/api/users/id/${username}`;

      try {
        const uR = await fetch(userUrl, options);
        const uRes = await uR.json();
        const userId = uRes.id;
        this.userId = userId;
        if (!uR.ok) {
          throw new Error(res.error);
        }
        const followingUrl = `/api/feed/isFollowing/${userId}`;

        const r = await fetch(followingUrl, options);
        const res = await r.json();
        this.isFollowing = res.isFollowing;
      } catch (e) {}
    },
    async followUser(userId) {
      const options = {
        method: "PUT",
        header: { "Content-Type": "application/json" },
      };

      const url = `/api/feed/follow/${userId}`;
      try {
        const r = await fetch(url, options);
        const res = await r.json();
        if (!r.ok) {
          throw new Error(res.error);
        }
        this.isFollowingUser(this.$router.app._route.params.username);
      } catch (e) {}
    },
    async unfollowUser(userId) {
      const options = {
        method: "PUT",
        header: { "Content-Type": "application/json" },
      };

      const url = `/api/feed/unfollow/${userId}`;
      try {
        const r = await fetch(url, options);
        const res = await r.json();
        if (!r.ok) {
          throw new Error(res.error);
        }
        this.isFollowingUser(this.$router.app._route.params.username);
      } catch (e) {}
    },
  },
};
</script>

<style scoped>
section {
  display: flex;
  flex-direction: column;
}

header,
header > * {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

button {
  margin-right: 10px;
}

section .scrollbox {
  flex: 1 0 50vh;
  padding: 3%;
  overflow-y: scroll;
}

h2 {
  font-weight: 500;
}
</style>
