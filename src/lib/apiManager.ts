'use server'
import DATA from '@/app/DATA'

// const URL = `https://todo-tau-sage.vercel.app/api/mysql/todo/`;
const URL = `http://localhost:3000/api/mysql/todo`

export async function getData() {
  try {
      const res = await fetch(URL);
      if (!res.ok) {
          throw new Error('Failed to fetch data');
      }
      const contentType = res.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
          throw new Error('Unexpected response format');
      }
      const data = await res.json();
      return data;
  } catch (error) {
      // Handle any errors that occur during the HTTP request
      console.error('Error fetching data:', error);
      throw error; // Re-throw the error if needed
  }
}

export async function updateData(data: DATA) {
    try {
      const response = await fetch(URL , {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
  
      if (!response.ok) {
        throw new Error('Network response was not ok')
      }
  
      const updatedData = await response.json()
      console.log('Data updated successfully:', updatedData)
      return updatedData
    } catch (error) {
      console.error('Error updating data:', error)
      throw error
    }
}

export async function insertData(data: DATA){
  try {
    const response = await fetch(URL ,{
      method: 'POST',
      headers:{
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    
    if(!response.ok){
      throw new Error('Error Inserting Data')
    }

    const insertedData = await response.json()
    console.log('Data uploaded successfully:', insertedData)
  } catch (error) {
    console.error('Error inserting data:', error)
    throw error
  }
}

export async function deleteData(id: number) {
  try {
    const response = await fetch(`${URL}/${id}`,{
      method: 'DELETE',
      headers:{
        'Content-Type': 'application/json'
      }
    })

    if(!response.ok){
      throw new Error(`Error Deleting Data ${response.status} - ${response.statusText}`)
    }

    const deletedData = await response.json()
    console.log('Data deleted successfully:', deletedData)

  } catch (error) {
    console.error('Error deleting data:', error);
    throw error;
  }
}