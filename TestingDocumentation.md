# Testing Methodology for Angular Project
Testing framework set-up using karma test-runner for unit tests and Jasmine framework

## Create an Angular project with jasmine and karma

Dependencies are installed for testing when the angular project is created

	-jasmine-core. Jasmine is the framework we are going to use to create our tests. 
	 It has a bunch of functionalities to allow us the write different kinds of tests.
	 
	 
	-karma. Karma is a task runner for our tests. It uses a configuration file in order to set the startup file, 
	 the reporters, the testing framework, the browser among other things.
	
To run the test you only need to run the command “ng test”. This command is going to execute the tests, 
open the browser, show a console and a browser report and, leave the tests execution in watch mode.

## karma.config file

	-frameworks: this is where jasmine gets set as a testing framework. If you want to use another framework this is the place to do it.
	
	
	-reporters: this is where you set the reporters. You can change them or add new ones.
	
	
	-autoWatch: if this is set to true, the tests run in watch mode. 
	
	
	 If you change any test and save the file the tests are re-build and re-run.
	 
	 
	-browsers: this is where you set the browser where the test should run. By default it is chrome but you can install and use other browser launchers.
	
## Test entry file
	The angular-cli configuration of karma uses the file “test.ts” as the entry point of the tests for the application. 
	
	-An environment to run angular tests is being created using all the imports at the beginning of the file.
	
	
	-TestBed is a powerful unit testing tool provided by angular, and it is initialized in this file.
	
	
	-Finally, karma loads all the tests files of the application matching their names against a regular expression. 
	
	
	-All files inside our app folder that has “spec.ts” on its name are considered a test.
	
## Example test cases

```javascript
it(`updateTotal should give currect value`, async(() => {
    component.itemForm.controls["item"].setValue("Landline");
    expect(component.getItemValue() === "Landline").toBeTruthy();
}));


it(`form should be invalid`, async(() => {
    component.orderForm.controls["firstname"].setValue("");
    component.orderForm.controls["lastname"].setValue("");
    component.orderForm.controls["address"].setValue("");
    component.orderForm.controls["city"].setValue("");
    component.orderForm.controls["state"].setValue("");
    component.orderForm.controls["zip"].setValue("");
    expect(component.orderForm.valid).toBeFalsy();
}));
```