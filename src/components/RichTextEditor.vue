<template>
  <div class="richtext-editor">
    <div class="menu">
      <button
        @click="editor.chain().focus().toggleBold().run()"
        :disabled="!editor.can().chain().focus().toggleBold().run()"
        :class="{ 'is-active': editor.isActive('bold') }"
      >
        <Bold size="16" />
      </button>
      <button
        @click="editor.chain().focus().toggleItalic().run()"
        :disabled="!editor.can().chain().focus().toggleItalic().run()"
        :class="{ 'is-active': editor.isActive('italic') }"
      >
        <Italic size="16" />
      </button>
      <button
        @click="editor.chain().focus().toggleBulletList().run()"
        :class="{ 'is-active': editor.isActive('bulletList') }"
      >
        <List size="16" />
      </button>
      <button
        @click="editor.chain().focus().toggleOrderedList().run()"
        :class="{ 'is-active': editor.isActive('orderedList') }"
      >
        <ListOrdered size="16" />
      </button>
      <button
        @click="editor.chain().focus().toggleCodeBlock().run()"
        :class="{ 'is-active': editor.isActive('codeBlock') }"
      >
        <Code size="16" />
      </button>
      <button
        @click="editor.chain().focus().toggleBlockquote().run()"
        :class="{ 'is-active': editor.isActive('blockquote') }"
      >
        <TextQuote size="16" />
      </button>
    </div>
    <EditorContent :editor="editor" />
  </div>
</template>

<script setup>
import { ref, onBeforeUnmount, watch } from "vue";
import { Editor, EditorContent } from "@tiptap/vue-3";
import StarterKit from "@tiptap/starter-kit";
import {
  Bold,
  Italic,
  List,
  ListOrdered,
  Code,
  TextQuote,
} from "lucide-vue-next";

const props = defineProps({
  modelValue: String,
});
const emit = defineEmits(["update:modelValue"]);

const editor = ref(
  new Editor({
    extensions: [StarterKit],
    content: props.modelValue || "",
    onUpdate({ editor }) {
      emit("update:modelValue", editor.getHTML());
    },
  })
);

watch(
  () => props.modelValue,
  (newValue) => {
    if (editor.value && newValue !== editor.value.getHTML()) {
      editor.value.commands.setContent(newValue || "", false);
    }
  }
);

onBeforeUnmount(() => {
  editor.value?.destroy();
});
</script>

<style>
.richtext-editor {
  background-color: var(--color-surface);
  color: var(--color-text);
  border: 1px solid var(--color-border);
  padding: 8px;
  border-radius: 4px;
  min-height: 120px;
  font-size: 12px;
  line-height: 1.5;
  transition: border-color 0.2s;
  display: flex;
  flex-direction: column;
  gap: 4px;

  .menu {
    border-top-left-radius: 4px;
    border-top-right-radius: 4px;
    display: flex;
    gap: 8px;
    margin-top: -8px;
    margin-left: -8px;
    margin-right: -8px;
    margin-bottom: 8px;
    padding: 8px;
    background-color: rgba(0, 0, 0, 0.35);

    button {
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 4px;
      border-radius: 4px;
      color: var(--color-muted);
      background-color: transparent;
      border: 1px solid var(--color-border);
      transition: all 0.25s;

      &:hover {
        background-color: #d9d9d930;
      }

      &.is-active {
        background-color: #0d90d6;
        color: white;
        border: 1px solid #0d90d6;
      }
    }
  }

  .richtext-editor:focus-within {
    border-color: var(--color-border-focus);
  }

  .richtext-editor :deep(p) {
    margin-bottom: 0.5em;
  }

  .richtext-editor :deep(strong) {
    font-weight: 700;
  }

  blockquote {
    border-left: 3px solid var(--color-muted);
    margin: 12px 0;
    padding-left: 8px;
    font-size: 14px;
    p {
      color: white;
    }
  }

  hr {
    border: none;
    border-top: 1px solid var(--gray-2);
    margin: 2rem 0;
  }

  ul,
  ol {
    margin: 12px 0;
    padding: 0 16px;

    li p {
      margin-top: 2px;
      margin-bottom: 2px;
    }
  }

  code {
    background-color: rgba(0, 0, 0, 0.15);
    border-radius: 0.4rem;
    color: var(--black);
    font-size: 10px;
    padding: 0.25em 0.3em;
  }

  p {
    margin: 12px 0;
    color: var(--color-muted);
  }

  pre {
    background: var(--black);
    border-radius: 0.5rem;
    color: var(--white);
    font-family: "JetBrainsMono", monospace;
    margin: 1.5rem 0;
    padding: 0.75rem 1rem;

    code {
      background: none;
      color: inherit;
      font-size: 0.8rem;
      padding: 0;
    }
  }
}
</style>
