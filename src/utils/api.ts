export async function fetchData<T>(url: string): Promise<T> {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data: T = await response.json();
        return data;
    } catch (error) {
        console.log("Error while fetching data:", error);
        throw error;
    }
}

export async function saveData<T>(url: string, data: T): Promise<void> {
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
    } catch (error) {
        console.log("Error while saving data:", error);
        throw error;
    }
}
