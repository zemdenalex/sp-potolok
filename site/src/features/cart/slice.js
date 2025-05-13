import { createSlice } from '@reduxjs/toolkit'
import { PURGE } from "redux-persist"

const cartSlice = createSlice({
    name: 'cart',
    initialState: [],
    reducers: {
        addItem(state, action) {
            const {name, price, image_link} = action.payload
            const product = state.find(p => p.name == name)
            if (product) product.amount += 1
            else state.push({name, amount: 1, price, image_link})
        },
        removeItem(state, action) {
            const {name} = action.payload
            const product = state.find(p => p.name == name)
            if (product) {
                if (product.amount > 1) product.amount -= 1
                else state.splice(state.findIndex(p => p.name == name), 1)
            }
        }
    },
    extraReducers: (builder) => {
        builder.addCase(PURGE, (state) => {
            while (state.length) state.pop()
        })
    }
})

const { actions, reducer } = cartSlice
export const { addItem, removeItem } = actions
export default reducer