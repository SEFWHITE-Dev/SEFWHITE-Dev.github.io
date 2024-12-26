// a new hhtp message/ request to be sent
const xhr = new XMLHttpRequest();

// 'waits' for an event, in this case
// we must set up the event listener, and then trigger the request
// param1: the event name; load means the response has loaded
// param2: the function we want to run
xhr.addEventListener('load', () => {
  console.log(xhr.response);
});

// types of requests:
// GET, POST, PUT, DELETE

// param1: request type
// param2: where to send this http message
// URL: Uniform Resource Locator
// a backend only supports a certain set of URL paths
// when setting up a backend we need to determine which URL paths are supported, and how each URL path will respond
// if we send a request to a URL path that is not supported, the backend will respond with an error
//xhr.open('GET', 'https://supersimplebackend.dev/products/first'); // returns JSON
//xhr.open('GET', 'https://supersimplebackend.dev/documentation');  // returns raw HTML
//xhr.open('GET', 'https://supersimplebackend.dev/not-supported'); // returns {"errorMessage":"Error: this URL path is not supported."}


//xhr.open('GET', 'https://supersimplebackend.dev/images/apple.jpg'); // returns jpg as raw data
// when we type a URL in the browser, it actually sends a GET request
// in a browser, the response is displayed on the page
// if the response is a jpg, or html, the brower will display it

/*
  Status Code: e.g. 404 not found

  Starts with 4 or 5 (400, 404, 500) = response failed. 
    - starting with 4 means it was our problem. we sent the request to a URL path that was not supported
    - starting with 5 means it was a backend problem. e.g. the backend crashed

  Starts with 2 (200, 201, 204) = response succeeded

  The Status Code can be found in the browser's Network Tab -> Headers Tab

  To know which URL paths are supported, some backends create documentation for URL paths that are supported,
  and the response that they give
  others may not have documentation due to security concerns
  
  Backend API: the list of all URL paths supported
*/


// when we send a request to a backend we get a 'Response'
// .send() is asynchronous code, meaning it does not wait for the code to finish executing
xhr.send(); 

// Request-Response Cycle
// since it takes time for the request to be sent, and the response to be sent back, 
//xhr.response(); // response() will be undefined

// 1. send a request
// 2. use a callback to wait for a response
// 3. run the rest of the code, once you have a response