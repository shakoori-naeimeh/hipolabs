# How to run the code:
- Download hipolabs and go to project's folder
- Run: docker run -p 3000:80 hipolabs

# What is Hipolabs
Hipolabs gets a list of universites for a specific country and shows them in the Home page. 
Clicking on the star next to each university name puts that school in favourites. 
To see a list of the favourites click on the Favourites link in the navbad at the top of 
the page. Clicking on the star removes the school from favourites and the table in this page.

# State management design
This app utalizes React's Context and Reducer for state management for several reasons:
- Centralized State Management: The app needs to manage a variety of states like the list of schools, loading status, errors, favorites, selected country, and API performance metrics. Using Context allows for centralizing this state management, making it easier to pass data through the component tree without having to prop-drill from parent to child components.

- Performance Optimization: Having the chosen country in the global state eliminates the need to make a new api call when navigating between pages. 

- Scalability: As the application grows, the complexity of state management can increase. This pattern is scalable and makes it easier to add new features or modify existing ones.

- Maintainability and Readability: Reducer encapsulates all the state logic and separates the state management logic from the UI components which makes the codebase cleaner and easier to understand.

- Simplified Debugging and Testing: Having a single place that handles all state changes simplifies debugging and testing. 

Flexibility in State Updates: The reducer function allows for complex state logic that can handle multiple state changes in response to a single action, which is more cumbersome to achieve with useState alone.
This is the state that the reducer maintains:

{
  data: array of schools from the api call,
  isLoading: boolean to know when loading the api data is done,
  error: error in the case that the api call fails,
  favourites: list of favourtie schools,
  country: the current chosen country,
  apiPerformance: duration of the api call in milliseconds,
}

Using a reducer instead of 