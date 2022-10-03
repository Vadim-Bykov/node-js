import { model, Schema, Types } from 'mongoose';

interface IToken {
  userId: Types.ObjectId;
  refreshToken: string;
}

const Token = new Schema<IToken>({
  userId: { type: Schema.Types.ObjectId, ref: 'User' },
  refreshToken: { type: String, required: true },
});

export const TokenModel = model('Token', Token);
