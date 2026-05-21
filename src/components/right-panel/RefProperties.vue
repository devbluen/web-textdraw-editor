<template>
  <div class="ref-props">
    <!-- Header -->
    <div class="ref-header">
      <div class="thumb">
        <img :src="r.src" style="width:100%;height:100%;object-fit:cover" alt="" />
      </div>
      <span class="ref-badge">Reference Image</span>
    </div>

    <PropRow label="Name">
      <input class="xp-input" :value="r.name" @change="u('name', $event.target.value)" />
    </PropRow>

    <XpPanel title="Transform">
      <div class="grid2">
        <PropRow label="X"><NumberInput :value="r.x" @update:modelValue="u('x', $event)" /></PropRow>
        <PropRow label="Y"><NumberInput :value="r.y" @update:modelValue="u('y', $event)" /></PropRow>
        <PropRow label="W"><NumberInput :value="r.w" :min="10" @update:modelValue="u('w', Math.max(10,$event))" /></PropRow>
        <PropRow label="H"><NumberInput :value="r.h" :min="10" @update:modelValue="u('h', Math.max(10,$event))" /></PropRow>
      </div>
    </XpPanel>

    <XpPanel title="Opacity">
      <PropRow label="Alpha">
        <div class="slider-row">
          <input type="range" min="0" max="100" :value="r.opacity"
            @input="u('opacity', +$event.target.value)" class="slider" />
          <span class="slider-val">{{ r.opacity }}%</span>
        </div>
      </PropRow>
    </XpPanel>

    <XpPanel title="Options">
      <div class="checkboxes">
        <label class="cb-row">
          <input type="checkbox" :checked="r.visible" @change="u('visible', $event.target.checked)" />
          Visible
        </label>
        <label class="cb-row" :class="{ locked: r.locked }">
          <input type="checkbox" :checked="r.locked" @change="u('locked', $event.target.checked)" />
          {{ r.locked ? '🔒 Locked' : 'Lock' }}
        </label>
      </div>
      <div v-if="r.locked" class="lock-warning">
        Locked — uncheck to move or resize.
      </div>
    </XpPanel>

    <button class="xp-btn danger" style="width:100%;margin-top:4px" @click="emit('delete')">
      Delete Reference
    </button>
  </div>
</template>

<script setup>
import PropRow from '../shared/PropRow.vue'
import NumberInput from '../shared/NumberInput.vue'
import XpPanel from '../shared/XpPanel.vue'

const props = defineProps({ r: { type: Object, required: true } })
const emit  = defineEmits(['update', 'delete'])

function u(key, val) { emit('update', { [key]: val }) }
</script>

<style scoped>
.ref-props { display: flex; flex-direction: column; gap: 2px; }
.ref-header {
  display: flex; align-items: center; gap: 8px; margin-bottom: 6px;
  padding: 5px; background: #fff3d8; border: 1px solid #c89030;
}
.thumb {
  width: 32px; height: 24px; border: 1px solid #a0a0a0;
  border-radius: 1px; overflow: hidden; flex-shrink: 0;
}
.ref-badge { font-family: 'Tahoma', sans-serif; font-size: 11px; font-weight: 700; color: #804000; }
.xp-input {
  width: 100%; box-sizing: border-box;
  font-family: 'Tahoma', sans-serif; font-size: 11px; padding: 2px 4px;
  background: #fff;
  border-top: 1px solid #7f9db9; border-left: 1px solid #7f9db9;
  border-right: 1px solid #c8d8e8; border-bottom: 1px solid #c8d8e8;
  outline: none;
}
.xp-input:focus { border-color: #0a246a; }
.grid2 { display: grid; grid-template-columns: 1fr 1fr; gap: 2px; }
.slider-row { display: flex; align-items: center; gap: 6px; }
.slider { flex: 1; accent-color: #804000; }
.slider-val { font-family: 'Tahoma', sans-serif; font-size: 11px; min-width: 30px; text-align: right; color: #804000; font-weight: 700; }
.checkboxes { display: flex; gap: 10px; flex-wrap: wrap; }
.cb-row {
  display: flex; align-items: center; gap: 3px;
  font-family: 'Tahoma', sans-serif; font-size: 11px; cursor: pointer;
}
.cb-row.locked { color: #804000; font-weight: 700; }
.lock-warning {
  margin-top: 4px; padding: 4px; font-family: 'Tahoma', sans-serif; font-size: 10px;
  color: #804000; background: #fff3d8; border: 1px solid #c89030;
}
.xp-btn {
  font-family: 'Tahoma', sans-serif; font-size: 11px; padding: 3px 8px; cursor: pointer;
  color: #000; background: linear-gradient(to bottom, #f5f5f5, #dfdfdf);
  border-top: 1px solid #fff; border-left: 1px solid #fff;
  border-right: 1px solid #848484; border-bottom: 1px solid #848484;
  outline: none; user-select: none;
}
.xp-btn.danger { color: #a00; }
</style>
