import axios from 'axios';


// Add a new person

export const addPerson = (personData) => {
  return axios.post('http://localhost/person.php', personData)
    .then(response => {
      // Handle the response data
      console.log(response.data);
      console.log('person added')
      return response.data;
    })
    .catch(error => {
      // Handle the error
      console.error(error);
      throw error;
    });
};



// Update an existing person
export const updatePerson = (id, personData) => {
  return axios.put(`http://localhost/person.php?id=${id}`, personData)
    .then(response => {
      // Handle the response data
      console.log(response.data);
      return response.data;
    })
    .catch(error => {
      // Handle the error
      console.error(error);
      throw error;
    });
};

// Retrieve all persons
export const getPersons = () => {
  return axios.get('http://localhost/person.php')
    .then(response => {
      // Handle the response data
      console.log(response.data);
      return response.data;
    })
    .catch(error => {
      // Handle the error
      console.error(error);
      throw error;
    });
};

// Retrieve a specific person by ID
export const getPersonById = (id) => {
  return axios.get(`http://localhost/person.php?id=${id}`)
    .then(response => {
      // Handle the response data
      console.log(response.data);
      return response.data;
    })
    .catch(error => {
      // Handle the error
      console.error(error);
      throw error;
    });
};

// Delete a person by ID
export const deletePerson = (id) => {
  return axios.delete(`http://localhost/person.php?id=${id}`)
    .then(response => {
      // Handle the response data
      console.log(response.data);
      return response.data;
    })
    .catch(error => {
      // Handle the error
      console.error(error);
      throw error;
    });
};
