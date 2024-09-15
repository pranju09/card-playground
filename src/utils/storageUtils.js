import defaultCards from '../data/cards.json'

// get data from localStorage
export const getStoredData = () => {
    const storedData = localStorage.getItem('cardData')
    return storedData ? JSON.parse(storedData) : []
}

// set data in localStorage
export const setStoredData = (data) => {
    localStorage.setItem('cardData', JSON.stringify(data))
}

// Initialize localStorage with default data if it's empty
export const initializeData = () => {
    const storedData = getStoredData()
    if (storedData?.length === 0) {
        console.log("defaultCards", defaultCards)
        setStoredData(defaultCards)
        console.log("initializeData", getStoredData());
    }
}
