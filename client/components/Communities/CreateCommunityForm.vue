<!-- Form for creating collections (block style) -->

<script>
import BlockForm from "@/components/common/BlockForm.vue";

export default {
  name: "CreateCommunityForm",
  mixins: [BlockForm],
  data() {
    return {
      url: "/api/communities",
      method: "POST",
      hasBody: true,
      fields: [{ id: "name", label: "Content", value: "" }],
      title: "Create a new community",
      callback: () => {
        const message = "Successfully created a new community!";
        this.$set(this.alerts, message, "success");
        setTimeout(() => this.$delete(this.alerts, message), 3000);
      },
    };
  },
};
</script>