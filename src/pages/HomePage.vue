<template>
  <v-container>
    <stack :column-min-width="200" :gutter-width="10" :gutter-height="8">
      <stack-item v-for="(item, i) in items" :key="i">
        <image-card
          :meta="{
            id: item.id,
            url: item.url,
            name: item.name,
            occupation: item.occupation,
            profileImageUrl: item.profileImage,
          }"
        />
      </stack-item>
    </stack>
  </v-container>
</template>

<script>
import { Stack, StackItem } from "vue-stack-grid";
import ImageCard from "../components/ImageCard.vue";
import db from "@/firebase";

export default {
  components: {
    Stack,
    StackItem,
    ImageCard,
  },
  data() {
    return {
      items: [],
    };
  },
  mounted() {
    db.collection("posts").onSnapshot((snapshot) => {
      snapshot.docChanges().forEach((change) => {
        let postChange = change.doc.data();
        postChange.id = change.doc.id;
        if (change.type === "added") {
          console.log();
          this.items.unshift(postChange);
        }

        if (change.type === "modified") {
          let index = this.items.findIndex((item) => item.id === postChange.id);
          Object.assign(this.items[index], postChange);
        }
        if (change.type === "removed") {
          let index = this.items.findIndex((item) => item.id === postChange.id);
          this.items.splice(index, 1);
        }
      });
    });
  },
};
</script>s

<style>
</style>