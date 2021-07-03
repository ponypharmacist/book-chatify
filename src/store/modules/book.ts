import { BookNode } from '@/models/models'

export interface State {
  txt: string
  bookNodes: BookNode[]
  offsetActions: number
  currentNodeIndex: number
}

export function detectRole(text: string): string {
  const isSpeech = new RegExp('^[-—]')
  const isThought = new RegExp('^[«"]')

  if (isSpeech.test(text)) return 'speech'
  else if (isThought.test(text)) return 'thought'
  else return 'text'
}

export default {
  namespaced: true,

  state: {
    txt: `Однажды жили на свете муж и жена; им давно уже хотелось иметь ребенка, но его все не было; и вот, наконец, явилась у жены надежда, что милостивый господь исполнит ее желание.

    А было у них в горенке маленькое окошко, оттуда был виден великолепный сад, где росло много прекраснейших цветов и всякой зелени. Но сад был обнесен высокой оградой, и никто не осмеливался в него входить, так как сад этот принадлежал одной колдунье; она обладала большим могуществом, и все на свете ее боялись.
    
    Стояла раз жена у окошка, заглянула в сад и увидела грядку, а рос на ней прекраснейший рапунцель; был он на вид такой свежий и такой зеленый, что ей страсть как захотелось отведать этого рапунцеля. Это желание у нее все с каждым днем возрастало, но так как она знала, что его достать ей никак невозможно, то она вся исхудала, побледнела и выглядела несчастной. Испугался муж и спрашивает:
    
    — Чего тебе, моя женушка, недостает?
    
    — Ах, — говорит она, — если не добыть мне из того сада, что за нашим домом, зеленого рапунцеля и его не отведать, то остается мне одно — помереть.
    
    Муж очень ее любил и подумал: «Уж если жене моей от этого помирать приходится, то я достану для нее рапунцеля, чего бы это мне ни стоило».`,
    bookNodes: [],
    offsetActions: -100,
    currentNodeIndex: 0
  },

  getters: {
    bookNodes(state: State): BookNode[] {
      return state.bookNodes
    },

    offsetActions(state: State): number {
      return state.offsetActions
    },

    currentNodeIndex(state: State): number {
      return state.currentNodeIndex
    }
  },

  mutations: {
    parseTxtToArray(state: State): void {
      state.bookNodes = state.txt
        .split('\n')
        .filter((paragraph: string) => !!paragraph.trim())
        .map((paragraph: string, id: number): BookNode => {
          const html = paragraph.trim()
          const role = detectRole(html)

          return { id, html, role }
        })
    },

    moveActionsPanel(
      state: State,
      { offset, index }: { offset: number; index: number }
    ): void {
      state.offsetActions = offset
      state.currentNodeIndex = index
    },

    addNode(
      state: State,
      { index, node }: { index: number; node: BookNode }
    ): void {
      state.bookNodes.splice(index + 1, 0, node)
    },

    removeNode(state: State, index: number): void {
      state.bookNodes.splice(index, 1)
    },

    changeRole(
      state: State,
      { index, role }: { index: number; role: string }
    ): void {
      state.bookNodes[index].role = role
    },

    updateBookHtml(
      state: State,
      { index, html }: { index: number; html: string }
    ): void {
      state.bookNodes[index].html = html
    }
  }
}
