<!-- Form for creating collections (block style) -->

<script>
import BlockForm from '@/components/common/BlockForm.vue';

export default {
  name: 'CreateCollectionForm',
  mixins: [BlockForm],
  data() {
    return {
      url: '/api/collections',
      method: 'POST',
      hasBody: true,
      fields: [
        {id: 'name', label: 'Content', value: ''}
      ],
      title: 'Create a collection',
      callback: () => {
        const message = 'Successfully created a saved collection!';
        this.$set(this.alerts, message, 'success');
        setTimeout(() => this.$delete(this.alerts, message), 3000);
      }
    };
  }
};
</script>
