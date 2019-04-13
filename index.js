//
// The following class fetches data directly from the mkr.tools unoffical
// API. No API key is necessary as the data is public.
//
const fetch = require('node-fetch')

class Maker {
  constructor (opts = {}) {
    this.version = opts.version || 1

    this.BASE_URL = `https://mkr.tools/api/v${this.version}/`

    //
    // Let's emulate a request from a browser...
    //
    this.REQUEST_OPTIONS = {
      'credentials': 'include',
      'headers': {
        'accept': '*/*',
        'accept-language': 'en-US,en;q=0.9'
      },
      'method': 'GET',
      'mode': 'cors',
      'referrer': 'https://mkr.tools/system',
      'referrerPolicy': 'no-referrer-when-downgrade'
    }

    this.ROUTES = {
      actions: 'cdps/actions',
      blocks: 'blocks',
      stats: 'stats'
    }
  }

  async responseHandler (response) {
    if (!response.ok) return { err: response.statusText }
    const data = await response.json()
    return { data }
  }

  async actions () {
    const URL = this.BASE_URL + this.ROUTES.actions
    const response = await fetch(URL, this.REQUEST_OPTIONS)
    return this.responseHandler(response)
  }

  async blocks () {
    const URL = this.BASE_URL + this.ROUTES.blocks
    const response = await fetch(URL, this.REQUEST_OPTIONS)
    return this.responseHandler(response)
  }

  async stats () {
    const URL = this.BASE_URL + this.ROUTES.stats
    const response = await fetch(URL, this.REQUEST_OPTIONS)
    return this.responseHandler(response)
  }

  async lockedEther () {
    const {
      err: blocksError,
      data: blocks
    } = await this.blocks()

    if (blocksError) return { err: blocksError }

    const {
      weth
    } = blocks.pop()

    const data = Number(weth.toFixed(0)).toLocaleString()

    return { data }
  }

  async wrappedEtherAsUSD () {
    const {
      err: blocksError,
      data: blocks
    } = await this.blocks()

    if (blocksError) return { err: blocksError }

    const {
      pip,
      weth
    } = blocks.pop()

    const data = Number((weth * pip).toFixed(0)).toLocaleString()

    return { data }
  }

  async lockedEtherAsPercentageOfSupply (args = {}) {
    const {
      historical = false,
      decimal = 4
    } = args

    const {
      err: blocksError,
      data: blocks
    } = await this.blocks()

    if (blocksError) return { err: blocksError }

    const {
      err: statsError,
      data: stats
    } = await this.stats()

    if (statsError) return { err: statsError }

    if (!historical) {
      const latestBlock = blocks.pop()

      const { weth } = latestBlock

      const { ethSupply } = stats

      const data = (weth / ethSupply * 100).toFixed(decimal)

      return { data }
    } else {
      //
      // Loop thru all blocks and build an array of
      // objects including timestamp and percentage value
      //
      const historicals = []
      const today = new Date()
      const now = today.getTime()
      const ethSupply = stats.ethSupply || 0
      const genesisBlockTimestamp = now - 15134688e5
      const supply = ethSupply - 96404828

      blocks.forEach((block) => {
        const {
          timestamp,
          weth
        } = block

        const aggregateSupplyLocalTime = (timestamp - 15134688e5) * supply /
        genesisBlockTimestamp + 96404828

        const percentage = weth / aggregateSupplyLocalTime * 100

        historicals.push({ timestamp, percentage })
      })

      return { data: historicals }
    }
  }
}

module.exports = Maker
