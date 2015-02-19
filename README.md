## RESETTING DATA

# rest specialist ratings
<url>/admin/specialists/resetratings


# reset database collections. 
## just remove the one 

$ mongo
MongoDB shell version: 2.6.7
connecting to: test
> use optimus
switched to db optimus
> db.customers.remove({})
WriteResult({ "nRemoved" : 72 })
> db.jobs.remove({})
WriteResult({ "nRemoved" : 52 })
> db.bookings.remove({})
WriteResult({ "nRemoved" : 52 })
> db.authcodes.remove({})
WriteResult({ "nRemoved" : 211 })
> db.feedbacks.remove({})
WriteResult({ "nRemoved" : 5 })
> db.loggers.remove({})
WriteResult({ "nRemoved" : 21686 })
