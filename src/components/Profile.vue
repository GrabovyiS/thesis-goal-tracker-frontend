<template>
  <div
    ref="container"
    class="profile"
    :class="menuOpen ? 'active' : ''"
    @click.stop="openMenu"
  >
    <img v-if="user" :src="user?.picture" />
    <Transition name="fade">
      <div class="menu" v-if="menuOpen">
        <button class="menu-item" @click="logout">
          <LogOut size="16" />
          <p>Выйти</p>
        </button>
      </div>
    </Transition>
  </div>
</template>

<script setup>
import { computed, ref } from "vue";
import { useStore } from "vuex";
import { LogOut } from "lucide-vue-next";
import { useRouter } from "vue-router";

const emit = defineEmits(["logout"]);
const store = useStore();

const container = ref(null);

const user = computed(() => store.getters["user/user"]);

const menuOpen = ref(false);

const openMenu = async () => {
  if (menuOpen.value === true) {
    return;
  }

  menuOpen.value = true;
  document.addEventListener("click", handleClickOutside, { once: true });
};

const handleClickOutside = (e) => {
  if (!container.value.contains(e.target)) {
    menuOpen.value = false;
  }
};

const logout = () => {
  store.dispatch("user/logOut");
};
</script>

<style scoped>
.profile {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 4px;
  border-radius: 100px;
  transition: background-color 0.25s;
  cursor: pointer;
  position: relative;

  &:hover,
  &.active {
    background-color: #d9d9d930;
  }

  img {
    border-radius: 100px;
    width: 32px;
  }
}

.menu {
  padding: 4px;
  display: flex;
  flex-direction: column;
  background-color: var(--color-surface);
  border-radius: 6px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.25);
  position: absolute;
  top: 32px;
  right: 0;
}

.menu-item {
  display: flex;
  align-items: center;
  color: var(--color-muted);
  gap: 6px;
  padding: 6px 8px;
  border-radius: 4px;
  background: transparent;
  cursor: pointer;
  transition: background 0.2s;
}

.menu-item:hover {
  background: rgba(0, 0, 0, 0.1);
}

/* Fade transition */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.25s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
