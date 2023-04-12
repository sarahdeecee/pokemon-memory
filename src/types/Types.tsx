export type Pokemon = {
  name: string,
  id: number,
  generation: number,
  types?: string[],
  imgSrc?: string,
  veto?: boolean
};

export type GenSelect = {
  [key: string]: boolean
}

export type DialogSet = {
  content: string,
  open: boolean
}