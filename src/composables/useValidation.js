import { computed } from 'vue'
import { CW, CH } from '../constants/canvas'

export function useValidation(els) {
  const warnings = computed(() => {
    const w = []

    if (els.value.length > 100)
      w.push({ type: 'warn', msg: `${els.value.length} elements — watch SA-MP limits` })

    els.value.forEach(el => {
      if (el.x < 0 || el.y < 0 || el.x + el.w > CW || el.y + el.h > CH)
        w.push({ type: 'warn', msg: `${el.name}: out of bounds` })

      if ((el.type === 'label' || el.type === 'button') && !el.text)
        w.push({ type: 'warn', msg: `${el.name}: empty text` })

      if (el.type === 'sprite' && !el.text.includes(':'))
        w.push({ type: 'err', msg: `${el.name}: sprite must use lib:tex format` })
    })

    return w
  })

  return { warnings }
}
