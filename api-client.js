const apiUrl = "http://localhost:3000";

// Get taskdata from te API server
export async function getData() {
    try {
        const data = await fetch(apiUrl, { 
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
            }
        });
        console.log("Fetched the getData from the api URL");
        return data;
    } catch (err) {
        return console.log("Error: ", err);
    }
}

// Add a new task
export async function postData(input) {
    try {
        const data = await fetch(apiUrl, {
            method: 'POST',
            body: JSON.stringify(input),
            headers: {
                "Content-Type": "application/json",
            }
        });
        console.log("Fetched the postData from the api URL");
        return data;
    } catch (err) {
        return console.log("Error: ", err);
    }
}

// Delete a task
export async function deleteData(input) {
    try {

    } catch (err) {
        return console.log("Error: ", err);
    }
}