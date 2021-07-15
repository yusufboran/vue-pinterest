<template>
  <v-app>
    <v-app-bar height="100" app color="white">
      <v-layout align-center>
        <v-flex>
          <v-text-field
            color="grey"
            placeholder="Search"
            class="mt-7"
            flat
            solo-inverted
            prepend-icon="mdi-magnify"
          />
        </v-flex>
        <v-dialog v-model="dialog" persistent max-width="600px">
          <template v-slot:activator="{ on, attrs }">
            <v-btn v-bind="attrs" v-on="on" height="48" class="mx-1 ml-1">
              <v-icon> mdi-plus </v-icon>
            </v-btn>
          </template>
          <v-card>
            <v-card-text>
              <v-text-field
                label="URL of the photo you want to upload"
                required
                v-model="newPostUrl"
                v-if="!dialog ? (newPostUrl = '') : true"
              />
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="dialog = false">
                Close
              </v-btn>
              <v-btn color="blue darken-1" text @click="newPost()">
                Save
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-btn height="48" class="mx-1 ml-1"
          ><v-icon> mdi-compare-vertical </v-icon>
        </v-btn>
        <v-btn height="48" class="ml-1">
          <v-icon> mdi-account </v-icon>
        </v-btn>
      </v-layout>
    </v-app-bar>

    <v-navigation-drawer app permanent>
      <v-list-item>
        <v-list-item-avatar>
          <v-img
            width="50"
            lazy-src="https://i.pinimg.com/originals/1b/76/01/1b7601e035a83c13c208b4ec905ee6d9.png"
            src="https://i.pinimg.com/originals/1b/76/01/1b7601e035a83c13c208b4ec905ee6d9.png"
          />
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title class="text-h6">
            <v-layout> Pinterest </v-layout>
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>

      <v-list dense nav>
        <v-list-item v-for="item in items" :key="item.title" link>
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>

      <div class="mx-4 subtitle-2 grey--text">Insights</div>

      <v-list dense nav>
        <v-list-item link>
          <v-list-item-icon>
            <v-icon>mdi-mail</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>Messages</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link>
          <v-list-item-icon>
            <v-icon>mdi-bell</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>Notifications</v-list-item-title>
          </v-list-item-content>

          <v-list-item-avatar
            size="25"
            color="orange"
            class="white--text subtitle-2 align-center"
          >
            <v-flex text-center> 2 </v-flex>
          </v-list-item-avatar>
        </v-list-item>
      </v-list>
      <v-card flat>
        <v-img
          src="https://assets.website-files.com/5bff8886c3964a992e90d465/5bff98f85ea7faf86504605e_scenes.gif"
        />
        <v-layout class="pt-2 px-8">
          <v-flex text-center>
            <div class="subtitle-2 blue--text">Unlock Business Tools</div>
            <div class="caption">
              Hurry Up! Now you can unlock out new business tools at your
              Convenience.
            </div>
          </v-flex>
        </v-layout>
      </v-card>
      <v-layout align-center class="my-8 mx-4">
        <v-card style="border-radius: 20px" class="mx-auto" elevation="5">
          <v-list-item>
            <v-list-item-avatar>
              <v-img :src="user.profileImage" />
            </v-list-item-avatar>

            <v-list-item-content>
              <v-list-item-title> {{ user.name }}</v-list-item-title>
              <v-list-item-subtitle> Creator </v-list-item-subtitle>
            </v-list-item-content>
            <v-list-item-action>
              <v-icon> mdi-chevron-right </v-icon>
            </v-list-item-action>
          </v-list-item>
        </v-card>
      </v-layout>
    </v-navigation-drawer>
    <v-main>
      <home-page :post="post" />
    </v-main>
  </v-app>
</template>

<script>
import HomePage from "@/pages/HomePage.vue";
import db from "@/firebase";
export default {
  components: {
    HomePage,
  },
  data() {
    return {
      dialog: false,
      post: "",
      newPostUrl: "",
      user: {
        name: "Loren Moree",
        title: "Creator",
        profileImage:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT4mZWAZ6H7rMwse_xz7xZCX6a4blTjTD_eSQ&usqp=CAU",
      },
      items: [
        { title: "Home", icon: "mdi-home" },
        { title: "Recent", icon: "mdi-clock-time-three" },
        { title: "Following", icon: "mdi-acount-group" },
      ],
      right: null,
    };
  },
  methods: {
    newPost() {
      this.post = {
        name: this.user.name,
        title: this.user.title,
        profileImage: this.user.profileImage,
        url: this.newPostUrl,
      };
      this.dialog = false;
      db.collection("posts").add(this.post);
    },
  },
};
</script>

<style>
</style>