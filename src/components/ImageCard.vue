<template>
  <v-card flat>
    <v-img style="border-radius: 20px" :src="meta.url" @click="image(meta)" />
    <v-layout align-center class="px-3 pt-3 pb-2">
      <v-avatar size="36" color="white">
        <v-img :src="meta.profileImageUrl" />
      </v-avatar>
      <v-flex class="ml-3">
        <div class="subtitle-2">{{ meta.name }}</div>
        <div class="body-2 grey--text text--darken-1">
          {{ meta.occupation }}
        </div>
      </v-flex>

      <v-dialog flat max-width="600">
        <template v-slot:activator="{ on, attrs }">
          <v-btn v-bind="attrs" v-on="on" icon
            ><v-icon>mdi-magnify-plus</v-icon></v-btn
          >
        </template>
        <template>
          <v-card>
            <v-card-text>
              <br>
              <v-img max-width="600" :src="meta.url" />
            </v-card-text>
          </v-card>
        </template>
      </v-dialog>

      <v-btn icon small color="grey" @click="deletePost(meta)">
        <v-icon>mdi-delete</v-icon>
      </v-btn>
    </v-layout>
  </v-card>
</template>

<script>
import db from "@/firebase";

export default {
  props: {
    url: {
      type: String,
      default: function () {
        return "";
      },
    },

    meta: {
      type: String,
      default: function () {
        return {};
      },
    },
  },
  methods: {
    deletePost(meta) {
      db.collection("posts").doc(meta.id).delete();
    },
    image(meta) {
      console.log(meta);
    },
  },
};
</script>

<style>
</style>