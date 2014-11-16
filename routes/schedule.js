/*!
 * Routing for schedules
 */

var BASE_URL = '/schedules'

module.exports = function() {
    return [{
            method: 'GET',
            path: BASE_URL,
            config: {
                handler: function(req, reply) {
                    reply("getting schedule")
                }
            }
        }, {
            method: 'GET',
            path: BASE_URL + '/scheduleId/{id}',
            config: {
                handler: function(req, reply) {
                    reply("getting schedule for id " + req.params.id)
                }
            }
        }, {
            method: 'GET',
            path: BASE_URL + '/customerId/{id}',
            config: {
                handler: function(req, reply) {
                    reply("getting schedule for customer " + req.params.id)
                }
            }
        }, {
            method: 'GET',
            path: BASE_URL + '/specialistId/{id}',
            config: {
                handler: function(req, reply) {
                    reply("getting schedule for specialistId " + req.params.id)
                }
            }
        }, {
            method: 'GET',
            path: BASE_URL + '/specialistId/{id}/appointmentdate/{date}',
            config: {
                handler: function(req, reply) {
                    reply("getting schedule for specialistId for date " + req.params.id + req.params.date)
                }
            }
        }

    ];
}();