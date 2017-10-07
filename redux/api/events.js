class Api {
    static headers() {
      return {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }
  
  
    static getUsers() {
      return fetch("http://localhost:5984/demo/users",
        { method: "GET" })
        .then((response) => response.json())
        .then((responseData) => {
          return responseData;
        })
        .catch((ex) => {
          { throw ex }
        });
    }
  
    static getEvents(type) {
      let url = "";
      if (type == "arsiv")
        url = "https://simultane.ibb.gov.tr/wp-json/wp/v2/posts?categories=5";
      if (type == "canli")
        url = "https://simultane.ibb.gov.tr/wp-json/wp/v2/posts?categories=4";
      if (type == "gelecek")
        url = "https://simultane.ibb.gov.tr/wp-json/wp/v2/posts?categories=6";
  
      return fetch(url,
        {
          method: "GET",
          headers: {
            'Cache-Control': 'no-cache'
          }
        })
        .then((response) => {
        setTimeout(() => null,0)
        return response.json()}
        )
        .then((responseData) => {
          return responseData;
        })
        .catch((ex) => {
          throw ex;
        });
    }
  
  }
  export default Api
  