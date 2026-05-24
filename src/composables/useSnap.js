import { ref } from 'vue'

const SNAP_THRESHOLD = 6
const BOX_OFFSET_X = 4
const BOX_OFFSET_Y = 4
const BOX_OFFSET_W = 2.1
const BOX_OFFSET_H = 12

function visualBounds(el) {
  const isBox = el.type === 'box'
  const x = el.w < 0 ? el.x + el.w : el.x
  const y = el.h < 0 ? el.y + el.h : el.y
  const w = Math.abs(el.w)
  const h = Math.abs(el.h)
  return {
    x: x - (isBox ? BOX_OFFSET_X : 0),
    y: y - (isBox ? BOX_OFFSET_Y : 0),
    w: w + (isBox ? BOX_OFFSET_W : 0),
    h: h + (isBox ? BOX_OFFSET_H : 0),
  }
}

export function useSnap() {
  const snapMode = ref('grid')
  const gridSize = ref(5)
  const snapLines = ref([])

  function snapV(value) {
    if (snapMode.value === 'grid') {
      return Math.round(value / gridSize.value) * gridSize.value
    }
    return Math.round(value)
  }

  function snapElement(el, allEls, draggingIds) {
    if (snapMode.value !== 'element') {
      snapLines.value = []
      return { x: Math.round(el.x), y: Math.round(el.y) }
    }

    const others = allEls.filter(e => !draggingIds.includes(e.id))
    const vel = visualBounds(el)

    let bestX = null, bestDX = SNAP_THRESHOLD + 1
    let bestY = null, bestDY = SNAP_THRESHOLD + 1
    const lines = []

    for (const other of others) {
      const vo = visualBounds(other)

      const xPairs = 
      [
        { my: vel.x, their: vo.x + vo.w },
        { my: vel.x + vel.w, their: vo.x },
        { my: vel.x, their: vo.x },
        { my: vel.x + vel.w,   their: vo.x + vo.w },
        { my: vel.x + vel.w/2, their: vo.x + vo.w/2 },
      ]

      for (const { my, their } of xPairs) {
        const d = Math.abs(my - their)
        if (d < bestDX) {
          bestDX = d
          bestX = { snap: el.x + (their - my), line: their }
        }
      }

      const yPairs = 
      [
        { my: vel.y + vel.h, their: vo.y, snapY: el.y + (vo.y - (vel.y + vel.h)) },
        { my: vel.y, their: vo.y + vo.h, snapY: el.y + ((vo.y + vo.h) - vel.y) },
        { my: vel.y, their: vo.y, snapY: el.y + (vo.y - vel.y) },
        { my: vel.y + vel.h, their: vo.y + vo.h, snapY: el.y + ((vo.y + vo.h) - (vel.y + vel.h)) },
        { my: vel.y + vel.h/2, their: vo.y + vo.h/2, snapY: el.y + ((vo.y + vo.h/2) - (vel.y + vel.h/2)) },
      ]

      yPairs.push({ my: vel.y + vel.h/2, their: vo.y + vo.h/2, snapY: el.y + ((vo.y + vo.h/2) - (vel.y + vel.h/2)) })

      for (const { my, their, snapY } of yPairs) {
        const d = Math.abs(my - their)
        if (d < bestDY) {
          bestDY = d
          bestY = { snap: snapY, line: their }
        }
      }
    }

    const snappedX = bestX ? bestX.snap : el.x
    const snappedY = bestY ? bestY.snap : el.y

    if (bestX) lines.push({ axis: 'x', value: bestX.line })  
    if (bestY) lines.push({ axis: 'y', value: bestY.line - BOX_OFFSET_H / 3 })

    snapLines.value = lines
    return { x: Math.round(snappedX), y: Math.round(snappedY) }
  }

  function clearSnapLines() {
    snapLines.value = []
  }

  return { snapMode, gridSize, snapV, snapElement, snapLines, clearSnapLines }
}