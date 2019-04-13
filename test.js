const test = require('tape')
const Maker = require('.')
const maker = new Maker()

test('sanity', t => {
  t.ok(true)
  t.end()
})

test('maker CDP actions', async t => {
  const { err, data } = await maker.actions()
  if (err) {
    console.error(err)
    return t.end()
  }
  console.log(data)
  t.ok(data)
  t.end()
})

test('maker blocks', async t => {
  const { err, data } = await maker.blocks()
  if (err) {
    console.error(err)
    return t.end()
  }
  console.log(data)
  t.ok(data)
  t.end()
})

test('maker stats', async t => {
  const { err, data } = await maker.stats()
  if (err) {
    console.error(err)
    return t.end()
  }
  console.log(data)
  t.ok(data)
  t.end()
})

test('locked ether as percentage of supply - historical', async t => {
  const { err, data } = await maker.lockedEtherAsPercentageOfSupply({
    historical: true
  })

  if (err) {
    console.error(err)
    return t.end()
  }

  console.log(data)
  t.ok(data)
  t.end()
})

test('locked ether as percentage of supply', async t => {
  const { err, data } = await maker.lockedEtherAsPercentageOfSupply()
  if (err) {
    console.error(err)
    return t.end()
  }
  console.log(data)
  t.ok(data)
  t.end()
})

test('total amount of locked ether', async t => {
  const { err, data } = await maker.lockedEther()
  if (err) {
    console.error(err)
    return t.end()
  }
  console.log(data)
  t.ok(data)
  t.end()
})

test('total amount of wrapped ether in USD', async t => {
  const { err, data } = await maker.wrappedEtherAsUSD()
  if (err) {
    console.error(err)
    return t.end()
  }
  console.log(data)
  t.ok(data)
  t.end()
})
