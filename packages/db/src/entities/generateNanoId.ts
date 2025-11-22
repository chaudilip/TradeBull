import { nanoid } from "nanoid"

export function generateNanoId(length: number = 21): string {
  return nanoid(length)
}
