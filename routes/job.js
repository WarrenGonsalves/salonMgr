var BASE_URL = '/jobs';
var JobController = require('../controller/job');

module.exports = function() {
    return [
        /**
         * @api {get} /jobs?specialist_id={spc_id}&cust_id={cust_id}&complete={flag}&status={New,Estimated,Started}&job_id={1005} Job: get jobs
         * @apiName jobGet
         * @apiGroup Jobs
         *
         * @apiExample Example usage:
         * /jobs
         * /jobs?specialist_id=547b3aeec3b83874ce377168
         * /jobs?specialist_id=547b3aeec3b83874ce377168&status=New
         * /jobs?cust_id=547af234107f433f5d9f202e&complete=true
         * /jobs?cust_id=547af234107f433f5d9f202e&is_shopify=true
         * /jobs?job_id=1005
         */
        {
            method: 'GET',
            path: BASE_URL,
            config: JobController.getConfigHandler
        },
        /**
         * @api {post} /jobs/img/{job_id} Job: upload images
         * @apiName jobImage
         * @apiGroup Jobs
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
         * @apiGroup Jobs
         *
         * @apiParam {String} job_id        Job id [Url parameter]
         * @apiParam {String} status        Set status = 'Accepted', 'Estimated', 'Started', 'Finished', Cancelled' [PUT parameter]
         * @apiParam {String} estimate      estimate duration when setting Status = Estimated. [Put Parameter]
         * @apiParam {String} estimate_cost      estimate cost amount when setting Status = Estimated. [Put Parameter]
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
         * @api {put} /jobs/{job_id}/reassign Job: reassign specialist
         * @apiName jobReassign
         * @apiGroup Jobs
         *
         * @apiParam {String} job_id        Job id [Url parameter]
         * @apiParam {String} book_date     date as 2015-04-01T10:00+05:30 [PUT parameter]
         * @apiParam {String} category      category text. eg Plumber / AC repair [Put Parameter]
         * @apiParam {String} spc_id        new specialist id [Put Parameter]
         *
         * @apiExample Example usage:
         * /jobs/547af234107f433f5d9f202e/reassign
         */
        {
            method: 'PUT',
            path: BASE_URL + '/{job_id}/reassign',
            config: JobController.reassignJob
        },
        /**
         * @api {post} /deprecated_use_update_status Job: Complete / Cancel
         * @apiName jobDone
         * @apiGroup Jobs
         *
         * @apiParam {String} cancelled        pass 'true' to cancel job [optional] [Post parameter]
         *
         * @apiExample Example usage:
         * /deprecated_use_update_status
         */
        {
            method: 'POST',
            path: BASE_URL + '/done/{id}',
            config: JobController.jobDoneConfigHandler
        }
    ];
}();