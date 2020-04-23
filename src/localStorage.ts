import { AsyncStorage } from 'react-native'
import { Stats } from './core/game'

const STATS_STORAGE_KEY = '@stats'

class LocalStorage {
  async getStats(): Promise<Stats[]> {
    return (
      AsyncStorage.getItem(STATS_STORAGE_KEY).then(json => {
        return JSON.parse(json || '[]') as Stats[]
      }) || []
    )
  }

  async setStat(stats: Stats): Promise<void> {
    const allStats = await this.getStats()
    allStats.push(stats)
    const sortedAllStats = allStats.sort((a, b) => b.numberOfSelections - a.numberOfSelections)
    return AsyncStorage.setItem(STATS_STORAGE_KEY, JSON.stringify(sortedAllStats))
  }
}

const localStorage = new LocalStorage()

export default localStorage
