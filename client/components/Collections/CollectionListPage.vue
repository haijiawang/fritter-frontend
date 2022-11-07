<!-- Reusable component representing a collections' details -->

<template>
  <div class="homepage">
    <div class="button">
      <button @click="deleteCollection()">❌ Delete Collection</button>
    </div>
    <div class="freets">
      <section v-if="collectionsArray.length" id="CollectionList">
        <FreetComponent
          v-for="freet in collectionsArray"
          :key="freet.id"
          :freet="freet"
        />
      </section>
      <article v-else>
        <h3>No freets found.</h3>
      </article>
    </div>
  </div>
</template>

<script>
import FreetComponent from "@/components/Freet/FreetComponent.vue";

export default {
  name: "CollectionList",
  components: { FreetComponent },
  data() {
    return {
      collectionsArray: [],
    };
  },
  async mounted() {
    const options = {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    };
    const collectionId = this.$router.app._route.params.collectionId;
    const url = `/api/collections/${collectionId}`;
    try {
      const r = await fetch(url, options);
      const res = await r.json();
      this.collectionsArray = res.freets;

      if (!r.ok) {
        throw new Error(res.error);
      }
    } catch (e) {}
  },
  methods: {
    async deleteCollection() {
      const collectionId = this.$router.app._route.params.collectionId;
      const url = `/api/collections/${collectionId}`;
      const options = {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      };
      try {
        const r = await fetch(url, options);
        const res = await r.json();
        console.log(res);
      } catch (e) {}
    },
  },
};
</script>

<style scoped>
.button {
  margin-top: 50px;
  margin-right: 10px;
  margin-left: 20px;
  margin-bottom: 50px;
}

.freets {
  margin-left: 20px;
}
</style>