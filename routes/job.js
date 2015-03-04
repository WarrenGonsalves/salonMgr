var BASE_URL = '/jobs';
var JobController = require('../controller/job');

module.exports = function() {
    return [
        /**
         * @api {get} /jobs?specialist_id={spc_id}&cust_id={cust_id}&complete={flag}&status={New,Estimated,Started} Job: get jobs
         * @apiName jobGet
         * @apiGroup job
         *
         * @apiExample Example usage:
         * /jobs
         * /jobs?specialist_id=547b3aeec3b83874ce377168
         * /jobs?specialist_id=547b3aeec3b83874ce377168&status=New
         * /jobs?cust_id=547af234107f433f5d9f202e&complete=true
         */
        {
            method: 'GET',
            path: BASE_URL,
            config: JobController.getConfigHandler
        },
        /**
         * @api {post} /jobs/img/{job_id} Job: upload images
         * @apiName jobImage
         * @apiGroup jobs
         *
         * @apiParam {String} job_id        Job id [Url parameter]
         * @apiParam {Object} img           Job image file to be uploaded [Post parameter]
         *
         * @apiExample Example usage:
         * /jobs/img/547af234107f433f5d9f202e
         */
        {
            method: 'POST',
            path: BASE_URL + '/img/{id}',
            config: JobController.postImageController
        },
        /**
         * @api {put} /jobs/{job_id} Job: update status
         * @apiName jobStatus
         * @apiGroup job
         *
         * @apiParam {String} job_id        Job id [Url parameter]
         * @apiParam {String} status        Set status = 'Accepted', 'Estimated', 'Started', 'Finished', Cancelled' [PUT parameter]
         * @apiParam {String} estimate      estimate data when setting Status = Estimated. [Put Parameter]
         *
         * @apiExample Example usage:
         * /jobs/547af234107f433f5d9f202e
         */
        {
            method: 'PUT',
            path: BASE_URL + '/{id}',
            config: JobController.putHandler
        }, {
            method: 'POST',
            path: BASE_URL + '/{id}',
            config: JobController.putHandler
        },
        /**
         * @api {post} /jobs/done/{job_id} Job: Complete / Cancel
         * @apiName jobDone
         * @apiGroup job
         *
         * @apiParam {String} cancelled        pass 'true' to cancel job [optional] [Post parameter]
         *
         * @apiExample Example usage:
         * /jobs/done/54a39430708acc00003b3d2e
         */
        {
            method: 'POST',
            path: BASE_URL + '/done/{id}',
            config: JobController.jobDoneConfigHandler
        }
    ];
}();