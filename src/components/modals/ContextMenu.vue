<!-- ContextMenu.vue -->
<template>
  <div v-if="pos" class="ctx" :style="{ left: pos.x + 'px', top: pos.y + 'px' }">
    <div class="ctx-item" v-for="item in items" :key="item.key" @mousedown="emit('action', item.key); emit('close')">{{ item.label }}</div>
  </div>
</template>

<script setup>
import { onMounted, onUnmounted } from 'vue'

defineProps({ pos: Object })
const emit = defineEmits(['action', 'close'])

const items = [
  { key:'dup',        label:'Duplicate'      },
  { key:'del',        label:'Delete'         },
  { key:'front',      label:'Bring to Front' },
  { key:'back',       label:'Send to Back'   },
  { key:'copyStyle',  label:'Copy Style'     },
  { key:'pasteStyle', label:'Paste Style'    },
]

function onClickOutside(e) {
  if (!e.target.closest('.ctx')) emit('close')
}

onMounted(() => window.addEventListener('mousedown', onClickOutside, true))
onUnmounted(() => window.removeEventListener('mousedown', onClickOutside, true))
</script>

<style scoped>
.ctx { position:fixed;background:var(--bg2);border:1px solid var(--border2);z-index:9999;min-width:140px;box-shadow:2px 4px 12px rgba(0,0,0,0.6);padding:2px 0;border-radius:3px; }
.ctx-item { padding:4px 12px;font-family:'Tahoma',sans-serif;font-size:11px;cursor:pointer;color:var(--text1); }
.ctx-item:hover { background:var(--accent-dim);color:var(--text0);border-left:2px solid var(--accent);padding-left:10px; }
</style>