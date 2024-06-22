# How to run the code:
- Clone the repo: `git clone git@github.com:shakoori-naeimeh/hipolabs.git`
- Go to project's folder
- Run `docker run -p 3000:80 hipolabs`

# What is Hipolabs
Hipolabs gets a list of universites for a specific country and shows them in the Home page. 
Clicking on the star next to each university name puts that school in favourites. 
To see a list of the favourites click on the Favourites link in the navbad at the top of 
the page. Clicking on the star removes the school from favourites and the table in this page.

`Home` component is the search page where you can see the list of universities and filter the list.
`Favourites` is the component that lists the favourite schools
`useHipolabs` custom hook makes the api call to filter universities by country
`HipolabsContext` file contains the context providers and the reducer

# State management design
This app uses React's Context and Reducer for state management for several reasons:

- Centralized State Management: The app needs to manage a variety of states like the list of schools, loading status, errors, favorites, filtered list of schools based on country and name. 
Having a global state reduces the need of local states inside each component, keeps the filters in place in the search page when users navigates between pages and in the future when the
project grows makes it easier to pass data through the component tree without having to prop-drill from parent to child components.

- Performance Optimization: Having the chosen country in the global state eliminates the need to make a new api call when navigating between pages. 

- Scalability: As the application grows, the complexity of state management can increase. This pattern is scalable and makes it easier to add new features or modify existing ones.

- Maintainability and Readability: Reducer encapsulates all the state logic and separates the state management logic from the UI components which makes the codebase cleaner and easier to understand.

- Simplified Debugging and Testing: Having a single place that handles all state changes simplifies debugging and testing. 

Obviously, I would write tests for a real project but I skipped it for the take home exercise. I’m happy to add some tests if it’s part of the evaluation.
