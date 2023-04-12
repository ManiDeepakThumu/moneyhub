# moneyhub
Your route
localhost:8083/export/{userId}
```In the above URL we have to pass the user id to generate the CSV report for specific user.```

How to run any additional scripts or tests you may have added
```No additional scripts are required, Just need to load the above URL in browser to download the specific user CSV report.```
  
How might you make this service more secure?
 ```To control access to API resources, you must carefully and comprehensively identify all related users and devices. This typically requires client-side applications to include a token in the API call so that the service can validate the client.```
 
How would you make this solution scale to millions of records?
 Vertical partition. Adding more power (CPU, RAM, etc.) to the database server. It has a hard limit. Horizontal partition by adding more database servers. Adding a caching layer to offload read requests.
 Now we can modularize the functions into different services. The architecture becomes service-oriented / microservice

What else would you have liked to improve given more time?
 ```writing test cases using jest, creating api documentation using swagger.```