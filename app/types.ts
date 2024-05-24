export type Event = {
  id: number;
  title: string;
  description: string;
  eventDate: string;
  organizer: string;
}

export type TilesgridProps = {
  eventList: Event[];
};