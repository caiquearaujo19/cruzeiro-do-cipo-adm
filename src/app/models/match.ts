export interface Match {
  id?: string,
  adversary?: string,
  place?: string,
  date?: string,
  goalsCipo: number,
  goalsAdversary: number,
  scorers: Array<any>,
  assists: Array<any>
}