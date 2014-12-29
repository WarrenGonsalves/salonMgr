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
    "type": "get",
    "url": "/jobs?specialist={spc_id}&customer={cust_id}&complete={flag}",
    "title": "Job: get jobs",
    "name": "jobGet",
    "group": "job",
    "examples": [
      {
        "title": "Example usage:",
        "content": "/jobs\n/jobs?specialist=547b3aeec3b83874ce377168\n/jobs?customer=547af234107f433f5d9f202e\n/jobs?customer=547af234107f433f5d9f202e&complete=true\n/jobs?specialist=547b3aeec3b83874ce377168&customer=547af234107f433f5d9f202e",
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
    "groupTitle": "job"
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
    "title": "Register: new customer",
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
    "url": "/register/store/{store_phone}",
    "title": "Register: new store",
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
  },
  {
    "type": "post",
    "url": "/specialists/{spc_id}/unbook",
    "title": "Booking: unbook specialist",
    "name": "unbookSpecialist",
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
          }
        ]
      }
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "/specialists/123456/unbook",
        "type": "json"
      }
    ],
    "version": "0.0.0",
    "filename": "routes/specialist.js",
    "groupTitle": "specialist"
  }
] });