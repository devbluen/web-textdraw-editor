import { ref } from 'vue'

export function useResize(els, snapV) {
  const resizing = ref(false)
  const resizeId = ref(null)
  const resizeOrig = ref({})

  function start(pos, el) {
    resizing.value = true
    resizeId.value = el.id
    resizeOrig.value = { x: pos.x, y: pos.y, w: el.w, h: el.h }
  }

  function move(pos) {
    if (!resizing.value || !resizeId.value) return
    const o = resizeOrig.value

    els.value = els.value.map(el => {
      if (el.id !== resizeId.value) return el

      const newW = Math.max(4, snapV(o.w + (pos.x - o.x)))
      const newH = Math.max(2, snapV(o.h + (pos.y - o.y)))


      return { ...el, w: newW, h: newH }
    })
  }

  function stop(commit) {
    if (!resizing.value) return
    resizing.value = false
    resizeId.value = null
    commit(els.value)
  }

  return { resizing, resizeId, start, move, stop }
}
