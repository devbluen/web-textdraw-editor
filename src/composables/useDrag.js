import { ref } from 'vue'

export function useDrag(els, selected, snapV, CW, CH, snapMode, snapElement, clearSnapLines) {
  const dragging = ref(false)
  const dragStart = ref({ x: 0, y: 0 })
  const dragOrigins = ref({})
  const draggingIds = ref([])

  function start(pos, selArr) {
    dragging.value = true
    dragStart.value = { ...pos }
    dragOrigins.value = {}
    draggingIds.value = selArr

    const hasUnlocked = selArr.some(id => {
      const el = els.value.find(e => e.id === id)
      return el && !el.locked
    })

    if (!hasUnlocked) return

    selArr.forEach(id => {
      const el = els.value.find(e => e.id === id)
      if (el && !el.locked) dragOrigins.value[id] = { x: el.x, y: el.y }
    })
  }

  function move(pos) {
    if (!dragging.value) return
    const dx = pos.x - dragStart.value.x
    const dy = pos.y - dragStart.value.y
    const ids = Object.keys(dragOrigins.value)
    if (!ids.length) return

    if (snapMode?.value === 'element' && snapElement) {
      const anchorId = ids[0]
      const anchorOrigin = dragOrigins.value[anchorId]
      const anchorEl = els.value.find(e => e.id === anchorId)
      if (!anchorEl) return

      const rawAnchor = {
        x: anchorOrigin.x + dx,
        y: anchorOrigin.y + dy,
        w: anchorEl.w,
        h: anchorEl.h,
        type: anchorEl.type,
      }
      const snapped = snapElement(rawAnchor, els.value, ids)
      console.log('raw:', rawAnchor.x, rawAnchor.y, 'snapped:', snapped.x, snapped.y)
      const snapDX = snapped.x - rawAnchor.x
      const snapDY = snapped.y - rawAnchor.y

      els.value = els.value.map(el => {
        const origin = dragOrigins.value[el.id]
        if (!origin) return el
        return { ...el, x: Math.round(origin.x + dx + snapDX), y: Math.round(origin.y + dy + snapDY) }
      })
    } else {
      els.value = els.value.map(el => {
        const origin = dragOrigins.value[el.id]
        if (!origin) return el
        return {
          ...el,
          x: snapV(origin.x + dx),
          y: snapV(origin.y + dy),
        }
      })
    }
  }

  function stop(commit) {
    if (!dragging.value) return
    dragging.value = false
    if (clearSnapLines) clearSnapLines()
    commit(els.value)
  }

  return { dragging, start, move, stop }
}