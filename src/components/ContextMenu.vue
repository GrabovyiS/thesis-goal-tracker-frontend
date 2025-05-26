<template>
  <button class="container" :class="menuOpen ? 'active' : ''" ref="container">
    <div class="dots" @click="toggleMenu">
      <EllipsisVertical size="16" />
    </div>
    <transition name="fade">
      <div class="menu" v-if="menuOpen">
        <button
          class="menu-item"
          v-if="items.includes('delete')"
          @click="emit('download')"
        >
          <Download size="16" />
          <p>Скачать</p>
        </button>

        <button
          class="menu-item"
          v-if="items.includes('update')"
          @click="emit('update')"
        >
          <SquarePen size="16" />
          <p>Редактировать</p>
        </button>

        <button
          class="menu-item"
          v-if="items.includes('delete')"
          @click="emit('delete')"
          :style="{ color: '#DC2E3A' }"
        >
          <Trash2 size="16" />
          <p>Удалить</p>
        </button>
      </div>
    </transition>
  </button>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";
import { EllipsisVertical, Trash2, Download, SquarePen } from "lucide-vue-next";

const props = defineProps(["items"]);
const emit = defineEmits(["delete", "download", "update"]);

const menuOpen = ref(false);
const container = ref(null);

const handleClickOutside = (event) => {
  if (container.value && !container.value.contains(event.target)) {
    menuOpen.value = false;
  }
};

onMounted(() => {
  document.addEventListener("click", handleClickOutside);
});

onBeforeUnmount(() => {
  document.removeEventListener("click", handleClickOutside);
});

const toggleMenu = (e) => {
  e.stopPropagation();
  menuOpen.value = !menuOpen.value;
};
</script>

<style scoped>
.container {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: transparent;
  transition: background 0.25s;
  border-radius: 4px;
}

.container:hover,
.container.active {
  background-color: #d9d9d930;
}

.dots {
  padding: 4px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: var(--color-muted);
  cursor: pointer;
}

.menu {
  position: absolute;
  bottom: calc(100% - 4px);
  left: calc(100% - 4px);
  padding: 4px;
  display: flex;
  flex-direction: column;
  background-color: var(--color-surface);
  border-radius: 6px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  z-index: 10;
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
  background: rgba(0, 0, 0, 0.05);
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
