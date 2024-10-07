import mongoose, {Types} from 'mongoose';
import User from './User';

const Schema = mongoose.Schema;

const MessageSchema = new Schema({
  author: {
    type: Types.ObjectId,
    ref: 'User',
    required: true,
    validate: {
      validator: async (value: Types.ObjectId) => {
        const user = await User.findById(value);
        return Boolean(user);
      },
      message: 'user does not exist',
    },
  },
  message: {
    type: String,
    required: true,
  },
  datetime: {
    type: Date,
    required: true,
    default: new Date(),
  },
  private: {
    type: Types.ObjectId,
    ref: 'User',
  }
});

const Message = mongoose.model('Message', MessageSchema);
export default Message;