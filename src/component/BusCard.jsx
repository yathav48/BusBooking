function BusCard({ bus, onViewSeats }) {
  const displayPrice =
    bus.layoutConfig.decks.includes("UPPER")
      ? bus.pricing.baseFare + bus.pricing.upperDeckExtra
      : bus.pricing.baseFare;
      
  return (
    <div
      className="border rounded-2xl p-3 lg:p-4! shadow-sm cursor-pointer hover:shadow-md bg-white"
      onClick={() => onViewSeats(bus)}
    >
      <div className="flex flex-col gap-2">
        <div className="flex justify-between items-center border-b border-gray-300 border-dashed">
          <div className="flex flex-col">
            <div className="font-bold text-lg">{bus.operator}</div>
            <div className="flex flex-row gap-2">
              <p className="text-sm text-gray-500">{bus.comfort?.ac ? "AC" : "Non-AC"}</p>
              <p className="text-sm text-gray-500 lowercase">{bus.busType}</p>
            </div>
          </div>
          <div className="pb-4">
            <p className="text-md m-0 font-semibold">
              {bus.departureTime} → {bus.arrivalTime}
            </p>
            <p className="text-sm m-0 text-gray-500">{bus.seatsAvailable} seats</p>
          </div>
          <div className="text-start">
            <p className="font-bold m-0">₹{displayPrice}</p>
          </div>
        </div>

        <div className="text-right py-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onViewSeats(bus);
            }}
            className="bg-red-600 text-white font-bold text-lg px-4 py-2 rounded-full! w-full md:w-fit"
          >
            View Seats
          </button>
        </div>
      </div>

    </div>
  );
}

export default BusCard;
