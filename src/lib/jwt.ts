import { sign } from "jsonwebtoken";

interface IUser {
  userId: string;
}

export function genTokens(user: IUser) {
  return {
    accessToken: genAccessToken(user),
    refreshToken: genRefreshToken(user),
  };
}

export function genAccessToken(user: IUser) {
  return sign(user, process.env.JWT_ACCESS_SECRET, { expiresIn: "15m" });
}
export function genRefreshToken(user: IUser) {
  return sign(user, process.env.JWT_REFRESH_SECRET, { expiresIn: "7d" });
}
