define({ api: [
  {
    "type": "post",
    "url": "/admin/specialist/addcat/{spc_id}/{cat_id}",
    "title": "Specialist: Add Category to Specialist",
    "name": "AddCat",
    "group": "Admin",
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
    "groupTitle": "Admin"
  },
  {
    "type": "post",
    "url": "/admin/reviews",
    "title": "Reviews: new review metadata",
    "name": "AddReviewMetadata",
    "group": "Admin",
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
    "groupTitle": "Admin"
  },
  {
    "type": "post",
    "url": "/admin/specialist/addstore/{spc_id}/{store_id}",
    "title": "Specialist: Add Store to specialist",
    "name": "AddStore",
    "group": "Admin",
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
    "groupTitle": "Admin"
  },
  {
    "type": "put",
    "url": "/admin/category",
    "title": "Category: update",
    "name": "ServerCateogry",
    "group": "Admin",
    "version": "0.0.0",
    "filename": "routes/admin.js",
    "groupTitle": "Admin"
  },
  {
    "type": "get",
    "url": "/admin/config",
    "title": "Server: Get Server config",
    "name": "Server_Config",
    "group": "Admin",
    "version": "0.0.0",
    "filename": "routes/admin.js",
    "groupTitle": "Admin"
  },
  {
    "type": "get",
    "url": "/",
    "title": "Test.",
    "name": "TestEndPoint",
    "group": "Admin",
    "version": "0.0.0",
    "filename": "routes/admin.js",
    "groupTitle": "Admin"
  },
  {
    "type": "post",
    "url": "/admin/categories/{category}/{sub_category}",
    "title": "Category: create new",
    "name": "bookSpecialist",
    "group": "Admin",
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
    "groupTitle": "Admin"
  },
  {
    "type": "get",
    "url": "/appsettings",
    "title": "AppSettings: get",
    "name": "getAppsettings",
    "group": "Appsettings",
    "examples": [
      {
        "title": "Example usage:",
        "content": "/appsettings",
        "type": "json"
      }
    ],
    "version": "0.0.0",
    "filename": "routes/appsetting.js",
    "groupTitle": "Appsettings"
  },
  {
    "type": "post",
    "url": "/catalogs",
    "title": "",
    "name": "addCatalog",
    "group": "Catalog",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "specialist_id",
            "description": "<p>Specialist id [Post parameter]</p> "
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Catalog item name [Post parameter]</p> "
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "detail",
            "description": "<p>Catalog item detail [Post parameter]</p> "
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "price",
            "description": "<p>Catalog item price [Post parameter]</p> "
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "icon_size_image",
            "description": "<p>Catalog item icon image [Post parameter]</p> "
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "medium_image",
            "description": "<p>Catalog item medium image [Post parameter]</p> "
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/catalog.js",
    "groupTitle": "Catalog"
  },
  {
    "type": "put",
    "url": "/catalogs/delete",
    "title": "",
    "name": "deleteCatalog",
    "group": "Catalog",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "_id",
            "description": "<p>Catalog item id [Post parameter]</p> "
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/catalog.js",
    "groupTitle": "Catalog"
  },
  {
    "type": "get",
    "url": "/catalogs?catalogId={catalogId}",
    "title": "Catalog: get catalogs",
    "name": "getCatalogs",
    "group": "Catalog",
    "examples": [
      {
        "title": "Example usage:",
        "content": "/catalogs //will return all catalogs\n/catalogs?catalogId=54fc5a41c4ee2a000025737c //will return a single catalog",
        "type": "json"
      }
    ],
    "version": "0.0.0",
    "filename": "routes/catalog.js",
    "groupTitle": "Catalog"
  },
  {
    "type": "get",
    "url": "/catalogs/{specialist_id}",
    "title": "Catalog: get catalogs",
    "name": "getCatalogs",
    "group": "Catalog",
    "examples": [
      {
        "title": "Example usage:",
        "content": "/catalog/54fc5a41c4ee2a000025737c //gets catalogs based on the vendor id",
        "type": "json"
      }
    ],
    "version": "0.0.0",
    "filename": "routes/catalog.js",
    "groupTitle": "Catalog"
  },
  {
    "type": "put",
    "url": "/catalogs",
    "title": "",
    "name": "updateCatalog",
    "group": "Catalog",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "_id",
            "description": "<p>Catalog item id [Post parameter]</p> "
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Catalog item name [Post parameter]</p> "
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "detail",
            "description": "<p>Catalog item detail [Post parameter]</p> "
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "price",
            "description": "<p>Catalog item price [Post parameter]</p> "
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "icon_size_image",
            "description": "<p>Catalog item icon image [Post parameter]</p> "
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "medium_image",
            "description": "<p>Catalog item medium image [Post parameter]</p> "
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/catalog.js",
    "groupTitle": "Catalog"
  },
  {
    "type": "get",
    "url": "/categories/",
    "title": "Get all categories",
    "name": "getCategories",
    "group": "Categories",
    "version": "0.0.0",
    "filename": "routes/category.js",
    "groupTitle": "Categories"
  },
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
    "filename": "routes/unittest.js",
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
    "url": "/contracts",
    "title": "Contracts: get all",
    "name": "getContracts",
    "group": "Contract",
    "examples": [
      {
        "title": "Example usage:",
        "content": "/contracts?customer_id=54fc5a41c4ee2a000025737c",
        "type": "json"
      }
    ],
    "version": "0.0.0",
    "filename": "routes/contract.js",
    "groupTitle": "Contract"
  },
  {
    "type": "post",
    "url": "/contracts",
    "title": "Contracts: create",
    "name": "postContracts",
    "group": "Contracts",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "customer_id",
            "description": "<p>Customer id [Post parameter]</p> "
          },
          {
            "group": "Parameter",
            "type": "file",
            "optional": false,
            "field": "img",
            "description": "<p>image for contract [Post parameter]</p> "
          }
        ]
      }
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "/contracts",
        "type": "json"
      }
    ],
    "version": "0.0.0",
    "filename": "routes/contract.js",
    "groupTitle": "Contracts"
  },
  {
    "type": "post",
    "url": "/contracts",
    "title": "Contracts: update",
    "name": "putContracts",
    "group": "Contracts",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "customer_id",
            "description": "<p>Customer id [Post parameter]</p> "
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "contract_type",
            "description": "<p>Customer id [Post parameter]</p> "
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "device_type",
            "description": "<p>Customer id [Post parameter]</p> "
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "vendor",
            "description": "<p>Customer id [Post parameter]</p> "
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "phone",
            "description": "<p>Customer id [Post parameter]</p> "
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "start_date",
            "description": "<p>Customer id [Post parameter]</p> "
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "end_date",
            "description": "<p>Customer id [Post parameter]</p> "
          }
        ]
      }
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "/contracts",
        "type": "json"
      }
    ],
    "version": "0.0.0",
    "filename": "routes/contract.js",
    "groupTitle": "Contracts"
  },
  {
    "type": "post",
    "url": "/customers/auth",
    "title": "Customer: Auth",
    "name": "customerAuth",
    "group": "Customer",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "customer_id",
            "description": "<p>customer id [Post parameter]</p> "
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "phone",
            "description": "<p>phone [Post parameter]</p> "
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>email [Post parameter]</p> "
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "secret",
            "description": "<p>secret to verify [Post parameter]</p> "
          }
        ]
      }
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "/customers/auth",
        "type": "json"
      }
    ],
    "description": "<p>provide either the phone / email / customer_id + secret to auth user.</p> ",
    "version": "0.0.0",
    "filename": "routes/customer.js",
    "groupTitle": "Customer"
  },
  {
    "type": "get",
    "url": "/customers",
    "title": "Customer: get all",
    "name": "customerGet",
    "group": "Customer",
    "examples": [
      {
        "title": "Example usage:",
        "content": "/customers\n/customers?laundry_provider=5512c9f585c5f3b0da7d2156",
        "type": "json"
      }
    ],
    "version": "0.0.0",
    "filename": "routes/customer.js",
    "groupTitle": "Customer"
  },
  {
    "type": "post",
    "url": "/customers/{customer_id}/registerpush",
    "title": "Customer: register push notification key",
    "name": "customerPost",
    "group": "Customer",
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
    "groupTitle": "Customer"
  },
  {
    "type": "post",
    "url": "/customers/email",
    "title": "Customer: update phone",
    "name": "customerPut",
    "group": "Customer",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>Customer id [Post parameter]</p> "
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "phone",
            "description": "<p>Customer Phone [Post parameter]</p> "
          }
        ]
      }
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "/customers/phone",
        "type": "json"
      }
    ],
    "version": "0.0.0",
    "filename": "routes/customer.js",
    "groupTitle": "Customer"
  },
  {
    "type": "put",
    "url": "/customers/secret",
    "title": "Customer: update secret",
    "name": "customerUpdate",
    "group": "Customer",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "customer_id",
            "description": "<p>customer id [Post parameter]</p> "
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "old_secret",
            "description": "<p>old secret to verify [Post parameter]</p> "
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "new_secret",
            "description": "<p>new secret to set [Post parameter]</p> "
          }
        ]
      }
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "/customers/secret",
        "type": "json"
      }
    ],
    "version": "0.0.0",
    "filename": "routes/customer.js",
    "groupTitle": "Customer"
  },
  {
    "type": "post",
    "url": "/customers",
    "title": "Customer: customer",
    "name": "postCustomer",
    "group": "Customer",
    "examples": [
      {
        "title": "Example usage:",
        "content": "/customers",
        "type": "json"
      }
    ],
    "version": "0.0.0",
    "filename": "routes/customer.js",
    "groupTitle": "Customer"
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
    "type": "post",
    "url": "/admin/interface/shopify/reload/customer",
    "title": "Interface: reload customer",
    "name": "interfaceCustomer",
    "group": "Interface",
    "examples": [
      {
        "title": "Example usage:",
        "content": "/admin/interface/shopify/reload/customer",
        "type": "json"
      }
    ],
    "version": "0.0.0",
    "filename": "routes/shopify.js",
    "groupTitle": "Interface"
  },
  {
    "type": "post",
    "url": "/admin/interface/shopify/reload/specialist",
    "title": "Interface: reload specialist",
    "name": "interfaceSpecialist",
    "group": "Interface",
    "examples": [
      {
        "title": "Example usage:",
        "content": "/admin/interface/shopify/reload/specialist",
        "type": "json"
      }
    ],
    "version": "0.0.0",
    "filename": "routes/shopify.js",
    "groupTitle": "Interface"
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
    "url": "/deprecated_use_update_status",
    "title": "Job: Complete / Cancel",
    "name": "jobDone",
    "group": "Jobs",
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
        "content": "/deprecated_use_update_status",
        "type": "json"
      }
    ],
    "version": "0.0.0",
    "filename": "routes/job.js",
    "groupTitle": "Jobs"
  },
  {
    "type": "get",
    "url": "/jobs?specialist_id={spc_id}&cust_id={cust_id}&complete={flag}&status={New,Estimated,Started}&job_id={1005}",
    "title": "Job: get jobs",
    "name": "jobGet",
    "group": "Jobs",
    "examples": [
      {
        "title": "Example usage:",
        "content": "/jobs\n/jobs?specialist_id=547b3aeec3b83874ce377168\n/jobs?specialist_id=547b3aeec3b83874ce377168&status=New\n/jobs?cust_id=547af234107f433f5d9f202e&complete=true\n/jobs?cust_id=547af234107f433f5d9f202e&is_shopify=true\n/jobs?job_id=1005",
        "type": "json"
      }
    ],
    "version": "0.0.0",
    "filename": "routes/job.js",
    "groupTitle": "Jobs"
  },
  {
    "type": "post",
    "url": "/jobs/img/{job_id}",
    "title": "Job: upload images",
    "name": "jobImage",
    "group": "Jobs",
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
    "groupTitle": "Jobs"
  },
  {
    "type": "put",
    "url": "/jobs/{job_id}/reassign",
    "title": "Job: reassign specialist",
    "name": "jobReassign",
    "group": "Jobs",
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
            "field": "book_date",
            "description": "<p>date as 2015-04-01T10:00+05:30 [PUT parameter]</p> "
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "category",
            "description": "<p>category text. eg Plumber / AC repair [Put Parameter]</p> "
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "spc_id",
            "description": "<p>new specialist id [Put Parameter]</p> "
          }
        ]
      }
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "/jobs/547af234107f433f5d9f202e/reassign",
        "type": "json"
      }
    ],
    "version": "0.0.0",
    "filename": "routes/job.js",
    "groupTitle": "Jobs"
  },
  {
    "type": "put",
    "url": "/jobs/{job_id}",
    "title": "Job: update status",
    "name": "jobStatus",
    "group": "Jobs",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "job_id",
            "description": "<p>_id or job_id () [Url parameter]</p> "
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
            "description": "<p>estimate duration when setting Status = Estimated. [Put Parameter]</p> "
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "estimate_cost",
            "description": "<p>estimate cost amount when setting Status = Estimated. [Put Parameter]</p> "
          }
        ]
      }
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "/jobs/547af234107f433f5d9f202e\n/jobs/1024",
        "type": "json"
      }
    ],
    "version": "0.0.0",
    "filename": "routes/job.js",
    "groupTitle": "Jobs"
  },
  {
    "type": "get",
    "url": "/orders",
    "title": "Order: get orders",
    "name": "getOrders",
    "group": "Order",
    "examples": [
      {
        "title": "Example usage:",
        "content": "/orders",
        "type": "json"
      }
    ],
    "version": "0.0.0",
    "filename": "routes/order.js",
    "groupTitle": "Order"
  },
  {
    "type": "post",
    "url": "/orders/customer",
    "title": "Order: Order for customer",
    "name": "postOrderForCustomer",
    "group": "Order",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "customer_id",
            "description": "<p>customer id [Json Post parameter]</p> "
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "specialist_id",
            "description": "<p>specialist id [Json Post parameter]</p> "
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "line_items",
            "description": "<p>line item [Json Post parameter]</p> "
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "line_items.product_id",
            "description": "<p>product_id child tag of line_item [Json Post parameter]</p> "
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "line_items.quantity",
            "description": "<p>quantify child tag of line_item [Json Post parameter]</p> "
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/order.js",
    "groupTitle": "Order"
  },
  {
    "type": "post",
    "url": "/orders/job",
    "title": "Order: Order for job",
    "name": "postOrderForJob",
    "group": "Order",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "job_id",
            "description": "<p>job id [Json Post parameter]</p> "
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "line_items",
            "description": "<p>line item [Json Post parameter]</p> "
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "line_items.product_id",
            "description": "<p>product_id child tag of line_item [Json Post parameter]</p> "
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "line_items.quantity",
            "description": "<p>quantify child tag of line_item [Json Post parameter]</p> "
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/order.js",
    "groupTitle": "Order"
  },
  {
    "type": "delete",
    "url": "/products/{id}",
    "title": "",
    "name": "deleteProduct",
    "group": "Product",
    "version": "0.0.0",
    "filename": "routes/product.js",
    "groupTitle": "Product"
  },
  {
    "type": "get",
    "url": "/products?specialist_id=123456",
    "title": "Product: get",
    "name": "getProduct",
    "group": "Product",
    "examples": [
      {
        "title": "Example usage:",
        "content": "/products?specialist_id=123123123",
        "type": "json"
      }
    ],
    "version": "0.0.0",
    "filename": "routes/product.js",
    "groupTitle": "Product"
  },
  {
    "type": "put",
    "url": "/products/img/{id}",
    "title": "",
    "name": "imgProduct",
    "group": "Product",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "img_s",
            "description": "<p>Product item small image [Post parameter]</p> "
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "img_l",
            "description": "<p>Product item large image [Post parameter]</p> "
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/product.js",
    "groupTitle": "Product"
  },
  {
    "type": "post",
    "url": "/products",
    "title": "",
    "name": "postProduct",
    "group": "Product",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "specialist_id",
            "description": "<p>Specialist id [Post parameter]</p> "
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Product item name [Post parameter]</p> "
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "detail",
            "description": "<p>Product item detail [Post parameter]</p> "
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "price",
            "description": "<p>Product item price [Post parameter]</p> "
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/product.js",
    "groupTitle": "Product"
  },
  {
    "type": "put",
    "url": "/products/{product_id}",
    "title": "",
    "name": "putProduct",
    "group": "Product",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "specialist_id",
            "description": "<p>Specialist id [Post parameter]</p> "
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Product item name [Post parameter]</p> "
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "detail",
            "description": "<p>Product item detail [Post parameter]</p> "
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "price",
            "description": "<p>Product item price [Post parameter]</p> "
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "img_s",
            "description": "<p>Product item icon image [Post parameter]</p> "
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "img_l",
            "description": "<p>Product item medium image [Post parameter]</p> "
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/product.js",
    "groupTitle": "Product"
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
    "url": "/register/auth/{phone}/{auth_code}",
    "title": "Register: auth phone",
    "name": "auth",
    "group": "Register",
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
    "groupTitle": "Register"
  },
  {
    "type": "post",
    "url": "/register/customer/{customer_phone}",
    "title": "Register: customer",
    "name": "registerCustomer",
    "group": "Register",
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
    "groupTitle": "Register"
  },
  {
    "type": "post",
    "url": "/register/specialist/{specialist_phone}",
    "title": "Register: specialist",
    "name": "registerSpecialist",
    "group": "Register",
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
    "groupTitle": "Register"
  },
  {
    "type": "post",
    "url": "/register/store/{store_phone}",
    "title": "Register: store",
    "name": "registerStore",
    "group": "Register",
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
    "groupTitle": "Register"
  },
  {
    "type": "get",
    "url": "/shopify/customers",
    "title": "Shopify:",
    "name": "shopifyCustomers",
    "group": "Shopify",
    "examples": [
      {
        "title": "Example usage:",
        "content": "/shopify/customers",
        "type": "json"
      }
    ],
    "version": "0.0.0",
    "filename": "routes/shopify.js",
    "groupTitle": "Shopify"
  },
  {
    "type": "get",
    "url": "/shopify/customers",
    "title": "Shopify: customers",
    "name": "shopifyCustomers",
    "group": "Shopify",
    "examples": [
      {
        "title": "Example usage:",
        "content": "/shopify/customers",
        "type": "json"
      }
    ],
    "version": "0.0.0",
    "filename": "routes/shopify.js",
    "groupTitle": "Shopify"
  },
  {
    "type": "post",
    "url": "/specialists/{spc_id}/book/{cust_id}",
    "title": "Booking: book specialist",
    "name": "bookSpecialist",
    "group": "Specialist",
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
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "location",
            "description": "<p>Circle / location name of the job [Post parameter]</p> "
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
    "groupTitle": "Specialist"
  },
  {
    "type": "post",
    "url": "/specialists",
    "title": "Specialist: Customer Referral",
    "name": "custReferral",
    "group": "Specialist",
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
    "groupTitle": "Specialist"
  },
  {
    "type": "post",
    "url": "/specialists/customerjob",
    "title": "Booking: referr customer + job",
    "name": "customerJob",
    "group": "Specialist",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "spc_id",
            "description": "<p>Specialist id [Post parameter]</p> "
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
            "field": "task",
            "description": "<p>Customer task [Post parameter]</p> "
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "book_date_milli",
            "description": "<p>Book date and time in milli secs [Post parameter]</p> "
          }
        ]
      }
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "/specialists/customerjob",
        "type": "json"
      }
    ],
    "version": "0.0.0",
    "filename": "routes/specialist.js",
    "groupTitle": "Specialist"
  },
  {
    "type": "get",
    "url": "/specialist?store={storeid}&category={categoryid}&lat={latitude}&lng={longitude}&book_date={YYYY-MM-DDThh:mmTZD}&grouped=true",
    "title": "get specialists",
    "name": "getSpecialists",
    "group": "Specialist",
    "examples": [
      {
        "title": "Example usage:",
        "content": "/specialists\n/specialists?store=123456\n/specialists?store=123456&category=667766\n/specialists?store=123456&category=667766&grouped=true\n/specialists?category=667766&lat=19.1999999&lng=72.9444444&book_date=2014-11-12T10:00+05:30",
        "type": "json"
      }
    ],
    "version": "0.0.0",
    "filename": "routes/specialist.js",
    "groupTitle": "Specialist"
  },
  {
    "type": "post",
    "url": "/hawaii",
    "title": "Transaction: callback url",
    "name": "callbackTransaction",
    "group": "Transaction",
    "examples": [
      {
        "title": "Example usage:",
        "content": "/hawaii",
        "type": "json"
      }
    ],
    "version": "0.0.0",
    "filename": "routes/transaction.js",
    "groupTitle": "Transaction"
  },
  {
    "type": "post",
    "url": "/txns",
    "title": "Transaction: new transaction data",
    "name": "newTransaction",
    "group": "Transaction",
    "examples": [
      {
        "title": "Example usage:",
        "content": "/txns",
        "type": "json"
      }
    ],
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "job_id",
            "description": "<p>Job id [POST parameter]</p> "
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "amount",
            "description": "<p>amount to be charged to customer [POST parameter]</p> "
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "channel_id",
            "description": "<p>either WAP or WEB [POST parameter]</p> "
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/transaction.js",
    "groupTitle": "Transaction"
  }
] });