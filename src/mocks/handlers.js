import { http, HttpResponse } from 'msw'
import { getStoredData, initializeData, setStoredData } from '../utils/storageUtils'

initializeData()

export const handlers = [
    http.get('/api/cards', () => {
        const cards = getStoredData()
        return HttpResponse.json(cards, { status: 200, message: "Cards fetched successfully" })
    }),

    // add a new card
    http.post('/api/card', async ({ request }) => {
        const cards = getStoredData()
        const newCard = await request.json()
        newCard.position = cards.length
        cards.push(newCard)
        setStoredData(cards)
        return HttpResponse.json(newCard, { status: 201, message: "New card added successfully" })
    }),

    // save all cards
    http.post('/api/cards', async ({ request }) => {
        const updatedCards = await request.json()
        setStoredData(updatedCards)
        return new HttpResponse(null, { status: 204, message: "Cards saved successfully" })
    }),

    // delete a single card
    http.delete('/api/card/:id', ({ params }) => {
        const cards = getStoredData()
        const cardId = params.id
        const updatedCards = cards.filter(card => card.id !== cardId)
        setStoredData(updatedCards)
        return new HttpResponse(null, { status: 204, message: "Card deleted successfully" })
    }),
]