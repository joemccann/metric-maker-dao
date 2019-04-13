# SYNOPSIS

⚒ Retrieve Maker stats and metrics via the mkr.tools unofficial API.

## USAGE

```sh
npm i -S joemccann/metric-maker-dao
```

In your Node app:

```js
const Maker = require('metric-maker-dao')
const maker = new Maker()

;(async function () {
  const { err, data } = await maker.blocks()
  if (err) return console.error(err)
  console.log(data)
})()
```

## API

```js
const maker = new Maker()

maker.actions()
/*

  Returns an array of objects of all historical
  CDP actions in ascending order.

  [
    {
      act: 'lock',
      time: '2017-12-18T00:00:00.000Z',
      count: 29,
      sum: 2423.637,
      timestamp: 1513555200000
    },...
  ]

*/

maker.blocks()
/*

  Returns an array of objects of all historical
  blocks in ascending order.
  
  [
    {
      tick: '2017-12-18T03:00:00.000Z',
      pip: 704.5393522167487,
      pep: 1104.2296798029556,
      per: 1,
      dai: 0,
      mkr: 1000000,
      peth: 0,
      weth: 0,
      fog: 0,
      timestamp: 1513566000000
    },...
  ]

*/

maker.stats()
/*

  Returns an object of useful Maker statistics.

  {
    mkrBurned: 632.6325806927299,
    mkrHolders: 10035,
    daiHolders: 19326,
    ethSupply: 105440822.8741
  }

*/

maker.lockedEtherAsPercentageOfSupply()
/*

  Returns a float value of the amount of ether locked
  in CDP's as a percentage of total ether supply.

  Float: 2.0593

*/

maker.lockedEtherAsPercentageOfSupply({historical: true})
/*

  Returns an array of objects of the historical values
  of the amount of locked ether in CDP's as a percentage
  of total ether supply in ascending order.

  [
    {
      timestamp: 1513566000000,
      percentage: 0
    },...
  ]

*/

maker.lockedEther()
/*

  Returns a human readable string of the amount of
  ether locked in CDP's.

  String: 2,171,343

*/

maker.wrappedEtherAsUSD()
/*

  Returns a human readable string of the USD amount of
  wrapped ether in CDP's.

  String: 305,725,155

*/
```

## TESTS

```sh
npm i -D
npm test
```

## AUTHORS

- [Joe McCann](https://twitter.com/joemccann)

## LICENSE

MIT
