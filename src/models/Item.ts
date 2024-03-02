import mongoose, { Document } from 'mongoose'

export interface ItemsInterface extends Document {
  images: string[]
  shoe_size?: number
  clothing_size?: string
  wanted_shoe_size?: number
  wanted_clothing_size?: string
  status?: 'searching' | 'pairing' | 'paired'
  owner: mongoose.Schema.Types.ObjectId
  description?: string
  kit_type?: string
}

const itemSchema = new mongoose.Schema<ItemsInterface>({
  images: [],
  shoe_size: {
    type: Number,
    // enum: ['small', 'medium', 'large', 'extra-large'],
  },
  clothing_size: {
    type: String,
    enum: ['small', 'medium', 'large', 'extra-large'],
  },
  wanted_shoe_size: {
    type: Number,
  },
  wanted_clothing_size: {
    type: String,
    enum: ['small', 'medium', 'large', 'extra-large'],
  },
  status: {
    type: String,
    enum: ['searching', 'pairing', 'paired'],
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  description: String,
  kit_type: String,
})

const Item = mongoose.model<ItemsInterface>('Item', itemSchema)

export default Item
