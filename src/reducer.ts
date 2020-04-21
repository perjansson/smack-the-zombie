import { Stats } from './core/game'

type ActionType = {
  type: 'start_game' | 'game_over'
  payload?: any
}

interface State {
  viewState: 'not_started' | 'started' | 'finished'
  gameStats: Stats
}

export const initialState: State = {
  viewState: 'not_started',
  gameStats: undefined,
}

export const reducer = (state = initialState, action: ActionType): State => {
  switch (action.type) {
    case 'start_game': {
      return {
        ...state,
        viewState: 'started',
        gameStats: undefined,
      }
    }

    case 'game_over': {
      return {
        ...state,
        viewState: 'finished',
        gameStats: action.payload.stats,
      }
    }

    default:
      return state
  }
}
