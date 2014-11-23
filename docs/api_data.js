define({ api: [
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
    "type": "post",
    "url": "/register/auth/{phone}/{auth_code}",
    "title": "Register: auth store",
    "name": "authStore",
    "group": "register",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "phone",
            "description": "<p>phone number</p> "
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
    "url": "/specialists/{spc_id}/book",
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
            "field": "task",
            "description": "<p>Customer task [Post parameter]</p> "
          }
        ]
      }
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "/specialists/123456/book",
        "type": "json"
      }
    ],
    "version": "0.0.0",
    "filename": "routes/specialist.js",
    "groupTitle": "specialist"
  },
  {
    "type": "get",
    "url": "/specialist?store={storeid}&category={categoryid}&grouped=true",
    "title": "get specialists",
    "name": "getSpecialists",
    "group": "specialist",
    "examples": [
      {
        "title": "Example usage:",
        "content": "/specialists\n/specialists?store=123456\n/specialists?store=123456&category=667766\n/specialists?store=123456&category=667766&grouped=true",
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
  },
  {
    "type": "get",
    "url": "/stores",
    "title": "get all",
    "name": "getStores",
    "group": "store",
    "version": "0.0.0",
    "filename": "routes/store.js",
    "groupTitle": "store"
  }
] });