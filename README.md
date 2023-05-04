# Working With a Backend API With React

For this application I have created a backend API using Ruby-Sinatra with Active Record [here](https://github.com/DNelson35/phase-3-sinatra-react-project). On the backend I have two tables Companies and Drinks with a one-to-many relationship, where a Company will have many Drinks.

## React Frontend

This application has Full CRUD (Create, Read, Update, Destroy) functionality on Companies and for Drinks we have a Create and Destroy set up. In this app we make one initial get request to the Backend API to set state for companies. All additional request are used to update the Companies state on the frontend using the response from the Backend API.

## The Relationship Between CRUD and Request

In terms of how CRUD relates to request I Will break down CRUD one more time to its which request method it relates to.
* CREATE - POST Request
* READ - GET Request
* UPDATE - PUT, PATCH Request
* DESTROY - DELETE Request

when you make one of these request from the frontend to the Backend API you are Implementing an aspect of CRUD!!

## How This Works

### request response cycle

When a fetch request in this application is made from the frontend to the server it will make a http request to the url provided to the fetch, the fetch will then return a promise. The backend controller will then receive this request and look at the URI and check its actions to see if there is a match if a match is found the action will be executed this action then gets data from the database and sends back a response to the Frontend the when the response is received the promise is resolved and the data can now be used inside the frontend application. In this case for out get request: 

```javascript
 const [companies, setCompanies] = useState([])
    
    useEffect(() => {
        fetch("http://localhost:9292/companies")
        .then(resp => resp.json())
        .then(companies => setCompanies(companies))
    },[])
```

The response labeled as resp will have `.json()` called on it. This is because the response we are receiving from the server is a JSON object. The `.json()` method will parse the response and return it as a javascript object. the javascript object is then received in the second .then() method as companies, this is then passed into setCompanies to set the companies state to that response.

## Other Request

Some of the other request made from the frontend to the server send a body as well unlike the get request. For other request a body is also sent to the server such as a `POST`, `PUT`, and `PATCH`. When our server receives a body in the request we use Rack::JSONBodyParser to parse the body of the request so that we can use the json data from the request and example would be: 

```ruby
 post '/companies' do
    new_company = Company.create(
      name: params[:name], # => the params[:name], :name comes from the body of the request
      logo_url: params[:logo_url]
    )
    new_company.to_json(include: :drinks)
  end
```

This allows us to pull information from the body of the request using the keys from the json object. In this example a Post request was sent from the frontend to the server the server then matched and executed the action inside the action we use the params we grabbed from the body to create a new instance of company with the information sent from the frontend.

## More on Params

There is more we can do with Params we can send information about companies on the frontend to the backend in the URL itself take a look at this example.

```javascript
const onDeleteDrink = (drink) => {
    fetch(`http://localhost:9292/companies/${drink.company_id}/drinks/${drink.id}`, {
        method: 'DELETE',
    })
    .then(setCompanies(companies.map(company => (
        (company.id === drink.company_id)?
        {...company, drinks: company.drinks.filter(currDrink => drink.id !== currDrink.id)}
        :
        company
    ))))
}
```
as well as the corresponding action on the backend.

```ruby
delete '/companies/:company_id/drinks/:id' do
    company = Company.find(params[:company_id])
    drink = company.drinks.find(params[:id])
    drink.destroy
end
```

Take not that the url and action could be simplified to "/drinks/:id" but for an example we will do it this way instead. So for the front end we can se that inside the url we are passing in both the `drink.company_id` and `drink.id` as params to the url. On the action we see that in the same location of the url we have `:company_id` and `:id` as params. The way this works is that on the front end we pass the company_id and the drink.id of the drink we want to delete to the url so when the server receives the request we can pull that information out of the URI as params to locate the matching drink from the database. The action will then call destroy on that drink deleting it from the database. on the front end after the promise is resolved and the data has been deleted on the back end the .then() will run and delete the data from the frontend as well. Keeping the backend and the frontend in sync without making additional get requests to the server.

## Simplified

The request in this application all follow a similar approach with the only thing changing being the Method sent and the body of the request. Each Fetch sends a request to the server the server processes the request and then sends back the response the response is received in the fetch and the promise is resolved moving on the the following .then() method that processes the response converts it to a javascript object then uses that data to update the companies state. If the response from the server doesn't contain a body such is the case with the delete request. Then information params passed into the URl for the request is used to update the state on the frontend only when or if the promise is resolved successfully.

## Conclusion

This is how a frontend application communicates with the backend through the request and response cycle. In this application we covered How the this cycle can be used to make a full CRUD application that can CREATE, READ, UPDATE, or Destroy data and persist those changes across multiple page reloads.

