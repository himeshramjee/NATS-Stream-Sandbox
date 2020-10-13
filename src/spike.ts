'use strict'

// const STANx = require('../../node_modules/node-nats-streaming/lib/stan.js')
import nats, { Stan } from "node-nats-streaming";

const argv = require('minimist')(process.argv.slice(2))
const clusterID = argv.c || 'teekeet-streaming-cluster'
const clientID = argv.i || 'natsss-demo-stream'
const server = argv.s || 'http://localhost:4222'
const queueGroup = argv.q || ''
const subject = argv._[0] || "nats-health:deep-ping"

if (!subject) {
  usage()
}

function usage () {
  console.log('stan-sub [-c clusterId] [-i clientId] [-s server] [-q queueGroup] <subject>')
  process.exit()
}

const stan = nats.connect(clusterID, clientID, server)
stan.on('connect', function () {
  console.log('STAN connected!')
  const opts = stan.subscriptionOptions()
  opts.setStartWithLastReceived()

  const subscription = stan.subscribe(subject, queueGroup, opts)
  subscription.on('error', (err: any) => {
    console.log(`subscription for ${subject} raised an error: ${err}`)
  })
  subscription.on('unsubscribed', () => {
    console.log(`unsubscribed to ${subject}`)
  })
  subscription.on('ready', (sub: any) => {
    console.log(`subscribed to ${sub}`)
  })
  subscription.on('message', (msg: any) => {
    console.log(msg.getSubject(), `[${msg.getSequence()}]`, msg.getData())
  })
})

stan.on('error', function (reason: any) {
  console.log(reason)
})
