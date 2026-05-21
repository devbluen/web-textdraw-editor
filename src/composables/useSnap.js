import { ref } from 'vue'

export function useSnap() {
  const snapEnabled = ref(true)
  const gridSize = ref(5)

  function snapV(value) {
    if (snapEnabled.value) {
      return Math.round(value / gridSize.value) * gridSize.value
    }
    return Math.round(value)
  }

  return { snapEnabled, gridSize, snapV }
}
