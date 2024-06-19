export type chartDataProps = {
    labels: string[] | undefined,
    datasets: datasetsProps[]
  }
  
  export type datasetsProps = {
    label: string,
    data: number[],
    backgroundColor?: string[],
    borderWidth: number
  }