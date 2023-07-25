import { isValidURL } from './urlValidator.js';

async function handleSubmit(event) {
    event.preventDefault();
  
    let formText = document.getElementById('url').value;
  
    console.log("::: Form Submitted :::");
    
    // Check if the URL is empty or not in a valid format
    if (!formText.trim() || !isValidURL(formText)) {
      // Display an error message in the results element
      document.getElementById('results').innerHTML = "<p>Please enter a valid URL</p>";
      return; // Stop the function execution here to avoid the API request
    }
  
    try {
      const response = await fetch('http://localhost:8081/analyze', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url: formText }),
      });
  
      if (!response.ok) {
        throw new Error('API request failed.');
      }
  
      const data = await response.json();
      console.log("Server Response: ", data);
  
      // Access the sentiment analysis results and update the UI accordingly
      let resultHTML = '';
      const keysToDisplay = ['agreement', 'confidence', 'irony', 'model', 'score_tag'];
      for (let key of keysToDisplay) {
        if (data.hasOwnProperty(key)) {
          resultHTML += `<p>${key}: ${data[key]}</p>`;
        }
      }
      document.getElementById('results').innerHTML = resultHTML;
    } catch (error) {
      console.error('Error fetching data:', error);
    }
}

export { handleSubmit };
