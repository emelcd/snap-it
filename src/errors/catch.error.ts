export const catchError = (error: unknown): void => {
  console.log(error)
  process.exit(0)
}
