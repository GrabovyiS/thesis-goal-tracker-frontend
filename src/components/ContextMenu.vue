<template>
  <button class="container" :class="menuOpen ? 'active' : ''" ref="container">
    <div class="dots" @click="toggleMenu">
      <EllipsisVertical size="16" />
    </div>
    <Teleport to="body">
      <transition name="fade">
        <div class="menu" v-if="menuOpen" :style="menuStyle" ref="menu">
          <button
            class="menu-item"
            v-if="items.includes('download')"
            @click="emitAction('download')"
          >
            <Download size="16" />
            <p>Скачать</p>
          </button>

          <button
            class="menu-item"
            v-if="items.includes('update')"
            @click="emitAction('update')"
          >
            <SquarePen size="16" />
            <p>Редактировать</p>
          </button>

          <button
            class="menu-item"
            v-if="items.includes('delete')"
            @click="emitAction('delete')"
            :style="{ color: '#DC2E3A' }"
          >
            <Trash2 size="16" />
            <p>Удалить</p>
          </button>
        </div>
      </transition>
    </Teleport>
  </button>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, nextTick } from "vue";
import { EllipsisVertical, Trash2, Download, SquarePen } from "lucide-vue-next";

const props = defineProps({
  items: Array,
  left: {
    type: Boolean,
    default() {
      return false;
    },
  },
});
const emit = defineEmits(["delete", "download", "update"]);

const menuOpen = ref(false);
const container = ref(null);
const menu = ref(null);
const menuStyle = ref({});

const toggleMenu = async (e) => {
  e.stopPropagation();
  menuOpen.value = !menuOpen.value;

  if (menuOpen.value) {
    await nextTick(); // wait for DOM update
    const buttonRect = container.value.getBoundingClientRect();

    const menuRect = menu.value.getBoundingClientRect();

    const leftValue = props.left ? buttonRect.left - 132 : buttonRect.right - 6;

    menuStyle.value = {
      position: "absolute",
      top: `${buttonRect.bottom - menuRect.height - buttonRect.height + 8}px`,
      left: `${leftValue}px`,
      zIndex: 9999,
    };
  }
};

const handleClickOutside = (event) => {
  if (container.value && !container.value.contains(event.target)) {
    menuOpen.value = false;
  }
};

const emitAction = (action) => {
  emit(action);
  menuOpen.value = false;
};

onMounted(() => {
  document.addEventListener("click", handleClickOutside);
});

onBeforeUnmount(() => {
  document.removeEventListener("click", handleClickOutside);
});
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
  margin-top: -4px;
  margin-right: -4px;
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
  padding: 4px;
  display: flex;
  flex-direction: column;
  background-color: var(--color-surface);
  border-radius: 6px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.25);
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
