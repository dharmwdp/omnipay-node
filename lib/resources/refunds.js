'use strict'

const { normalizeDate, normalizeNotes } = require('../utils/omnipay-utils')

module.exports = function (api) {
  return {
    all(params = {}, callback) {
      let { from, to, count, skip, payment_id } = params
      let url = '/refunds'

      if (payment_id) {
        url = `/payments/${payment_id}/refunds`
      }

      if (from) {
        from = normalizeDate(from)
      }

      if (to) {
        to = normalizeDate(to)
      }

      count = Number(count) || 10
      skip = Number(skip) || 0

      return api.get({
        url,
        data: {
          from,
          to,
          count,
          skip
        }
      }, callback)
    },
    edit(refundId, params, callback) {
      let { notes } = params
      
      if (!refundId) {
        throw new Error('refund Id is mandatory')
      }

      let data = Object.assign(normalizeNotes(notes))

      return api.patch({
        url: `/refunds/${refundId}`,
        data
      }, callback)
    },
    fetch(refundId, params = {}, callback) {
      let { payment_id } = params
      if (!refundId) {
        throw new Error('`refund_id` is mandatory')
      }

      let url = `/refunds/${refundId}`

      if (payment_id) {
        url = `/payments/${payment_id}${url}`
      }

      return api.get({
        url
      }, callback)
    }
  }
}
