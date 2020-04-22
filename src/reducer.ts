import { Stats } from './core/game'

type ActionType = {
  type: 'count_down' | 'start_game' | 'update_stats' | 'game_over'
  payload?: any
}

interface State {
  viewState: 'not_started' | 'counting_down' | 'started' | 'finished'
  gameStats: Stats
}

export const initialState: State = {
  viewState: 'not_started',
  gameStats: undefined,
}

export const reducer = (state = initialState, action: ActionType): State => {
  switch (action.type) {
    case 'count_down': {
      return {
        ...state,
        viewState: 'counting_down',
        gameStats: undefined,
      }
    }

    case 'start_game': {
      return {
        ...state,
        viewState: 'started',
      }
    }

    case 'update_stats': {
      return {
        ...state,
        gameStats: action.payload,
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
