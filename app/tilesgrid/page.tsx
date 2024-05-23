"use client";

import CreateYourCurseButton, {
  RegistrationButton,
  ViewCurseButton,
} from "@/app/components/ui/buttons";

interface Event {
  id: number;
  title: string;
  organizer: string;
  description: string;
}

type TilesgridProps = {
  eventList: Event[];
}

const Tilesgrid: React.FC<TilesgridProps> = ({ eventList }) => {
  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {eventList.map((event) => (
          <div
            className="rounded-lg overflow-hidden shadow-lg bg-blue-50 "
            key={event.id}
          >
            <div className="px-6 py-4">
              <h2 className="font-bold text-xl mb-2 text-blue-900">
                {event.title}
              </h2>
              <p className="text-gray-700 text-base mb-4">
                {event.description}
              </p>
              <p className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                {event.organizer}
              </p>
            </div>
            <div className="px-6 py-4 flex justify-between">
              <ViewCurseButton linkto={event.id} />
              <RegistrationButton linkto={event.id} />
            </div>
          </div>
        ))}
      </div>
        <div className="flex justify-center mt-8">
          <CreateYourCurseButton />
        </div>
    </div>
  );
};

export default Tilesgrid;
