# Create Order Stories
Use case to develop a Create Order page for admin users to create an order in OMS.

## Create UI Design, 5 Points, Abhishek and Brian
	-Design look and feel
	-From Elements

## Design Database / JSON Structure, 5 Points, Alice
	-Item Fields
		-Item ID, Description, Cost, ...
	-Order Fields
		-Order ID, Items, Channel, Payment, ....

## Backend Services, 8 Points
	-Process Order 
		-Backend Validation of JSON data
		-If valid, post order to Database
	-Item Lookup
		-For UI to add items to an order

## Implement UI Logic, 8 Points
	-Validate fields (front and backend validation)
	-Submit order as JSON
	
## Testing, 3 Points
	-Testing of each component as they are finished