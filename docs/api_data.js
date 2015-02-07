define({ api: [
  {
    "type": "get",
    "url": "/circles?grouped=true",
    "title": "Circles: get all",
    "name": "getCircles",
    "group": "Circle",
    "examples": [
      {
        "title": "Example usage:",
        "content": "/circles\n/circles?grouped=true",
        "type": "json"
      }
    ],
    "version": "0.0.0",
    "filename": "routes/circle.js",
    "groupTitle": "Circle"
  },
  {
    "type": "post",
    "url": "/circles/{name}/{lat}/{lng}",
    "title": "Circles: create",
    "name": "postCircles",
    "group": "Circle",
    "examples": [
      {
        "title": "Example usage:",
        "content": "/circles/Powai/12.556795/12.7676767",
        "type": "json"
      }
    ],
    "version": "0.0.0",
    "filename": "routes/circle.js",
    "groupTitle": "Circle"
  },
  {
    "type": "get",
    "url": "/feedbacks",
    "title": "feedback: get all",
    "name": "feedbackGet",
    "group": "Feedback",
    "examples": [
      {
        "title": "Example usage:",
        "content": "/feedbacks",
        "type": "json"
      }
    ],
    "version": "0.0.0",
    "filename": "routes/feedback.js",
    "groupTitle": "Feedback"
  },
  {
    "type": "post",
    "url": "/feedbacks",
    "title": "feedback: create",
    "name": "feedbackPost",
    "group": "Feedback",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "customer_id",
            "description": "<p>Customer Id [Post parameter]</p> "
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "text",
            "description": "<p>Feedback text [Post parameter]</p> "
          }
        ]
      }
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "/feedbacks",
        "type": "json"
      }
    ],
    "version": "0.0.0",
    "filename": "routes/feedback.js",
    "groupTitle": "Feedback"
  },
  {
    "type": "get",
    "url": "/invoices",
    "title": "Invoice: get all",
    "name": "getInvoices",
    "group": "Invoice",
    "examples": [
      {
        "title": "Example usage:",
        "content": "/invoices\n/invoices?id=54a53db2c879ab0b8c5ea911",
        "type": "json"
      }
    ],
    "version": "0.0.0",
    "filename": "routes/invoice.js",
    "groupTitle": "Invoice"
  },
  {
    "type": "post",
    "url": "/invoices",
    "title": "Invoice: new invoice",
    "name": "postInvoices",
    "group": "Invoice",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "job_id",
            "description": "<p>Job id for invoice [Post parameter]</p> "
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "total",
            "description": "<p>Total amount for invoice [Post parameter]</p> "
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "line_item",
            "description": "<p>[]   {item:&#39;fixers&#39;, amount: 6000} [Post parameter] - repeate key / value for multiple line items.</p> "
          }
        ]
      }
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "/invoices",
        "type": "json"
      }
    ],
    "version": "0.0.0",
    "filename": "routes/invoice.js",
    "groupTitle": "Invoice"
  },
  {
    "type": "post",
    "url": "/ratings/{specialist_id}",
    "title": "Ratings: specialist rating",
    "name": "postRating",
    "group": "Rating",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "rating_ids",
            "description": "<p>Comma seperated ids for rating count to be incremented [Post parameter]</p> "
          }
        ]
      }
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "/ratings/5468521be05865bc22d26733",
        "type": "json"
      }
    ],
    "version": "0.0.0",
    "filename": "routes/rating.js",
    "groupTitle": "Rating"
  },
  {
    "type": "post",
    "url": "/admin/specialist/addcat/{spc_id}/{cat_id}",
    "title": "Specialist: Add Category to Specialist",
    "name": "AddCat",
    "group": "admin",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "spc_id",
            "description": "<p>Specialist id.</p> "
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "cat_id",
            "description": "<p>cateogory id.</p> "
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/admin.js",
    "groupTitle": "admin"
  },
  {
    "type": "post",
    "url": "/admin/reviews",
    "title": "Reviews: new review metadata",
    "name": "AddReviewMetadata",
    "group": "admin",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "text",
            "description": "<p>Review text [Pay]</p> "
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/admin.js",
    "groupTitle": "admin"
  },
  {
    "type": "post",
    "url": "/admin/specialist/addstore/{spc_id}/{store_id}",
    "title": "Specialist: Add Store to specialist",
    "name": "AddStore",
    "group": "admin",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "spc_id",
            "description": "<p>Specialist id.</p> "
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "store_id",
            "description": "<p>Store id.</p> "
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/admin.js",
    "groupTitle": "admin"
  },
  {
    "type": "put",
    "url": "/admin/category",
    "title": "Category: update",
    "name": "ServerCateogry",
    "group": "admin",
    "version": "0.0.0",
    "filename": "routes/admin.js",
    "groupTitle": "admin"
  },
  {
    "type": "get",
    "url": "/admin/config",
    "title": "Server: Get Server config",
    "name": "Server_Config",
    "group": "admin",
    "version": "0.0.0",
    "filename": "routes/admin.js",
    "groupTitle": "admin"
  },
  {
    "type": "get",
    "url": "/",
    "title": "Test.",
    "name": "TestEndPoint",
    "group": "admin",
    "version": "0.0.0",
    "filename": "routes/admin.js",
    "groupTitle": "admin"
  },
  {
    "type": "post",
    "url": "/admin/categories/{category}/{sub_category}",
    "title": "Category: create new",
    "name": "bookSpecialist",
    "group": "admin",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "category",
            "description": "<p>Category name</p> "
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "sub_category",
            "description": "<p>Sub category name</p> "
          }
        ]
      }
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "/admin/categories/Fixers/Plumber",
        "type": "json"
      }
    ],
    "version": "0.0.0",
    "filename": "routes/category.js",
    "groupTitle": "admin"
  },
  {
    "type": "get",
    "url": "/categories/",
    "title": "Get all categories",
    "name": "getCategories",
    "group": "categories",
    "version": "0.0.0",
    "filename": "routes/category.js",
    "groupTitle": "categories"
  },
  {
    "type": "get",
    "url": "/customers",
    "title": "Customer: get all",
    "name": "customerGet",
    "group": "customer",
    "examples": [
      {
        "title": "Example usage:",
        "content": "/customers",
        "type": "json"
      }
    ],
    "version": "0.0.0",
    "filename": "routes/customer.js",
    "groupTitle": "customer"
  },
  {
    "type": "post",
    "url": "/customers/{customer_id}/registerpush",
    "title": "Customer: register push notification key",
    "name": "customerPost",
    "group": "customer",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "gcm_id",
            "description": "<p>GCM id [Post parameter]</p> "
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "apn_id",
            "description": "<p>APN id [Post parameter]</p> "
          }
        ]
      }
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "/customers/547ae3f83ee077774bbb2f5c/registerpush",
        "type": "json"
      }
    ],
    "version": "0.0.0",
    "filename": "routes/customer.js",
    "groupTitle": "customer"
  },
  {
    "type": "post",
    "url": "/jobs/done/{job_id}",
    "title": "Job: Complete / Cancel",
    "name": "jobDone",
    "group": "job",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "cancelled",
            "description": "<p>pass &#39;true&#39; to cancel job [optional] [Post parameter]</p> "
          }
        ]
      }
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "/jobs/done/54a39430708acc00003b3d2e",
        "type": "json"
      }
    ],
    "version": "0.0.0",
    "filename": "routes/job.js",
    "groupTitle": "job"
  },
  {
    "type": "get",
    "url": "/jobs?specialist_id={spc_id}&cust_id={cust_id}&complete={flag}&status={New,Estimated,Started}",
    "title": "Job: get jobs",
    "name": "jobGet",
    "group": "job",
    "examples": [
      {
        "title": "Example usage:",
        "content": "/jobs\n/jobs?specialist_id=547b3aeec3b83874ce377168\n/jobs?specialist_id=547b3aeec3b83874ce377168&status=New\n/jobs?cust_id=547af234107f433f5d9f202e&complete=true",
        "type": "json"
      }
    ],
    "version": "0.0.0",
    "filename": "routes/job.js",
    "groupTitle": "job"
  },
  {
    "type": "put",
    "url": "/jobs/{job_id}",
    "title": "Job: update status",
    "name": "jobStatus",
    "group": "job",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "job_id",
            "description": "<p>Job id [Url parameter]</p> "
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "status",
            "description": "<p>Set status = &#39;Accepted&#39;, &#39;Estimated&#39;, &#39;Started&#39;, &#39;Finished&#39;, Cancelled&#39; [PUT parameter]</p> "
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "estimate",
            "description": "<p>estimate data when setting Status = Estimated. [Put Parameter]</p> "
          }
        ]
      }
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "/jobs/547af234107f433f5d9f202e",
        "type": "json"
      }
    ],
    "version": "0.0.0",
    "filename": "routes/job.js",
    "groupTitle": "job"
  },
  {
    "type": "post",
    "url": "/jobs/img/{job_id}",
    "title": "Job: upload images",
    "name": "jobImage",
    "group": "jobs",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "job_id",
            "description": "<p>Job id [Url parameter]</p> "
          },
          {
            "group": "Parameter",
            "type": "Object",
            "optional": false,
            "field": "img",
            "description": "<p>Job image file to be uploaded [Post parameter]</p> "
          }
        ]
      }
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "/jobs/img/547af234107f433f5d9f202e",
        "type": "json"
      }
    ],
    "version": "0.0.0",
    "filename": "routes/job.js",
    "groupTitle": "jobs"
  },
  {
    "type": "post",
    "url": "/register/auth/{phone}/{auth_code}",
    "title": "Register: auth phone",
    "name": "auth",
    "group": "register",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "phone",
            "description": "<p>Store / Customer phone number</p> "
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "auth_code",
            "description": "<p>authorization code received via SMS</p> "
          }
        ]
      }
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "/register/auth/9999888999/2424",
        "type": "json"
      }
    ],
    "version": "0.0.0",
    "filename": "routes/register.js",
    "groupTitle": "register"
  },
  {
    "type": "post",
    "url": "/register/customer/{customer_phone}",
    "title": "Register: customer",
    "name": "registerCustomer",
    "group": "register",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "customer_phone",
            "description": "<p>Customer phone number</p> "
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Customer Name [Post Param]</p> "
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>Customer email [Post Param]</p> "
          }
        ]
      }
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "/register/customer/9999888999",
        "type": "json"
      }
    ],
    "version": "0.0.0",
    "filename": "routes/register.js",
    "groupTitle": "register"
  },
  {
    "type": "post",
    "url": "/register/specialist/{specialist_phone}",
    "title": "Register: specialist",
    "name": "registerSpecialist",
    "group": "register",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "specialist_phone",
            "description": "<p>Specialist phone number</p> "
          }
        ]
      }
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "/register/specialist/9999888999",
        "type": "json"
      }
    ],
    "version": "0.0.0",
    "filename": "routes/register.js",
    "groupTitle": "register"
  },
  {
    "type": "post",
    "url": "/register/store/{store_phone}",
    "title": "Register: store",
    "name": "registerStore",
    "group": "register",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "store_phone",
            "description": "<p>Store phone number</p> "
          }
        ]
      }
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "/register/store/9999888999",
        "type": "json"
      }
    ],
    "version": "0.0.0",
    "filename": "routes/register.js",
    "groupTitle": "register"
  },
  {
    "type": "post",
    "url": "/specialists/{spc_id}/book/{cust_id}",
    "title": "Booking: book specialist",
    "name": "bookSpecialist",
    "group": "specialist",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "spc_id",
            "description": "<p>Specialist id [Url parameter]</p> "
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "cust_id",
            "description": "<p>Customer id / Store id [Url parameter]</p> "
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "category",
            "description": "<p>Specialist category title [Post parameter]</p> "
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Customer name [Post parameter]</p> "
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "phone",
            "description": "<p>Customer phone [Post parameter]</p> "
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "addr",
            "description": "<p>Customer address [Post parameter]</p> "
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "addr2",
            "description": "<p>Customer address 2 [Post parameter]</p> "
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "landmark",
            "description": "<p>Customer address landmark [Post parameter]</p> "
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "task",
            "description": "<p>Customer task [Post parameter]</p> "
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "book_date",
            "description": "<p>Book date and time in YYYY-MM-DDThh:mmTZD format [2014-11-12T10:00+05:30][Post parameter]</p> "
          }
        ]
      }
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "/specialists/123456/book/34343434",
        "type": "json"
      }
    ],
    "version": "0.0.0",
    "filename": "routes/specialist.js",
    "groupTitle": "specialist"
  },
  {
    "type": "post",
    "url": "/specialists",
    "title": "Specialist: Customer Referral",
    "name": "custReferral",
    "group": "specialist",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "referral_customer_id",
            "description": "<p>Customer id [Post parameter]</p> "
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Specialist name [Post parameter]</p> "
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "phone",
            "description": "<p>Specialist Phone [Post parameter]</p> "
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "category_id",
            "description": "<p>Specialist Category [Post parameter]</p> "
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/specialist.js",
    "groupTitle": "specialist"
  },
  {
    "type": "get",
    "url": "/specialist?store={storeid}&category={categoryid}&lat={latitude}&lng={longitude}&book_date={YYYY-MM-DDThh:mmTZD}&grouped=true",
    "title": "get specialists",
    "name": "getSpecialists",
    "group": "specialist",
    "examples": [
      {
        "title": "Example usage:",
        "content": "/specialists\n/specialists?store=123456\n/specialists?store=123456&category=667766\n/specialists?store=123456&category=667766&grouped=true\n/specialists?category=667766&lat=19.1999999&lng=72.9444444&book_date=2014-11-12T10:00+05:30",
        "type": "json"
      }
    ],
    "version": "0.0.0",
    "filename": "routes/specialist.js",
    "groupTitle": "specialist"
  }
] });