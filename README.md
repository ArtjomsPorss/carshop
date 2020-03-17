# Car Shop
Car Shop is a CRUD web application, it displays a list of preexisting cars with prices, allows to update them or create new ones.
Each car can have a number of different options which can be added or removed.
## Running The app
### Start the App
[Download](https://github.com/ArtjomsPorss/carshop/releases/tag/1.0.0) and unpack the archive.
#### Using batch file
Run the StartApp.bat it will start the application and open the browser.
#### Manually
Otherwise start the app using command line command java -jar [archive name].jar. 
Then open browser on http://localhost:8080/
### Using The App
The Application is pretty straightforward.
* All Cars page displays all cars that are currently in the database and tehir prices.
   
   By clicking on any of the cars you can Veiw its details. 
   
   By clicking on New Car link at the top, you can add new cars.

* View car page allows to edit its details or delete it altogether.
* Add a Car page allows to add new cars to the list.
* Both edit card details page and add a car page gives an option to modify a list of options linked to that car.
## Technologies Used
Angular frontend, Spring Boot with REST API, Hibernate using Spring QuickRepository and H2 database running in Embedded mode. Maven is used for Java dependencies. 
Angular is compiled in prod mode and is served as static HTML+JS website.
## Application Explained
### Startup
1. When application starts, it creates an embedded H2 database as defined in application.properties.
2. schema.sql is used to drop re-create tables: CAR, OPTIONS, OPTION_SELECTED.
3. data.sql populates the tables.
4. Application is ready to be used.
## Change it
* Edit java code, run as java application within your IDE to make live changes.
* Build a self-containing .jar using maven command *mvn clean isntall*.
* Change angular code which is in car-shop-client folder.

   Running code locally using ng serve will not use the database, but the calls will be intercepted by [FakeBackendInterceptor](https://github.com/ArtjomsPorss/carshop/blob/master/car-shop-client/src/app/dev-infrastructure/http-interceptor.ts)
   
   Build angular code using ng build --prod
   
## Development Process
### Done
[x] create new car
[x] delete a car
[x] add an options schema
[x] options controller, repository
[x] options service in angular
[x] display options
[x] select options for a new car
[x] added http interceptor
[x] http interceptor is off in prod mode
[x] clear options for a new car
[x] save options for a new car
[x] map option labels to option IDs when viewing a car
[x] when cancel editing, just reload the car
[x] map option labels to option IDs
[x] fix option id when not defined
[x] fixed display of last option dropdown
[x] fix error in console when car is loaded after edit car window opens
[x] edit options for existing car
[x] update car edits
[x] fix issue with Spring viewing car before it is updated
[x] remove the directive and use selector on car component
[x] delete options with a car

### TODO
[ ] compatibility with old IE, edge is supported
[ ] swap price to be first and text to be last

