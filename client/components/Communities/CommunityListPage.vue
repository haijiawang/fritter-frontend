<!-- Reusable component representing a collections' details -->

<template>
  <section v-if="$store.state.freets.length" id="CollectionList">
    <FreetComponent
      v-for="freet in collectionsArray"
      :key="freet.id"
      :freet="freet"
    />
  </section>
  <article v-else>
    <h3>No freets found.</h3>
  </article>
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
    // const options = {
    //   method: "GET",
    //   headers: { "Content-Type": "application/json" },
    // };
    // const collectionId = this.$router.app._route.params.collectionId;
    // const url = `/api/collections/${collectionId}`;
    // try {
    //   const r = await fetch(url, options);
    //   const res = await r.json();
    //   console.log(res);
    //   this.collectionsArray = res.freets;
    //   if (!r.ok) {
    //     throw new Error(res.error);
    //   }
    // } catch (e) {}
  },
};
</script>