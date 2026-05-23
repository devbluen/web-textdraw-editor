import { ref } from 'vue'

function getVisualX(el) {
  if (el.align === 1) return el.x - el.w / 2
  if (el.align === 2) return el.x - el.w
  return el.x
}

export function useMarquee(els, selected) {
  const selecting = ref(false)
  const marquee = ref(null)
  const startPos = ref({ x: 0, y: 0 })

  function start(pos) {
    selecting.value = true
    startPos.value = { ...pos }
    marquee.value = null
  }

  function move(pos) {
    if (!selecting.value) return
    const s = startPos.value
    marquee.value = {
      x: Math.min(s.x, pos.x),
      y: Math.min(s.y, pos.y),
      w: Math.abs(pos.x - s.x),
      h: Math.abs(pos.y - s.y),
    }
  }

  function stop(pos) {
    if (!selecting.value) return
    selecting.value = false

    const s = startPos.value
    const x = Math.min(s.x, pos.x)
    const y = Math.min(s.y, pos.y)
    const w = Math.abs(pos.x - s.x)
    const h = Math.abs(pos.y - s.y)

    if (w > 4 || h > 4) {
      const hits = els.value
        .filter(el => {
          const vx = getVisualX(el)
          return vx < x + w && vx + el.w > x && el.y < y + h && el.y + el.h > y
        })
        .map(el => el.id)
      selected.value = new Set(hits)
    }

    marquee.value = null
  }

  return { selecting, marquee, start, move, stop }
}