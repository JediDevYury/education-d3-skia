export type DataPoint = {
  date: string;
  value: number;
}

export const originalData: DataPoint[] = [
  {date: "2000-02-01T05:00.00.000Z", value: 250 },
  {date: "2000-02-02T05:00.00.000Z", value: 300.35 },
  {date: "2000-02-03T05:00.00.000Z", value: 150.84 }
];
