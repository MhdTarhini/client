import { useEffect, useState } from "react";
import ShipmentCard from "../shipmentCard/shipmentCard";
import { useAxios } from "../../API/queries";
import "./index.css";

function CardList({ shipments, setshipments, setShipmentDetails }) {
  const { deleteShipment } = useAxios();
  const [shipmentId, setshipmentId] = useState(0);

  const handleDelete = async (shipmentId) => {
    const response = await deleteShipment({ id: shipmentId });
    if (response.data.status === "success") {
      const updatedShipmentsList = shipments.filter(
        (shipment) => shipment.id !== shipmentId
      );
      setshipments(updatedShipmentsList);
    }
  };
  useEffect(() => {
    if (shipmentId) handleDelete(shipmentId);
  }, [shipmentId]);
  return (
    <div className="card-list flex column">
      {shipments.map((shipment) => (
        <ShipmentCard
          shipment={shipment}
          key={shipment.id}
          id={shipment.id}
          name={shipment.name}
          phone={shipment.phone_number}
          address={shipment.address}
          waybill={shipment.waybill}
          setShipmentId={setshipmentId}
          setShipmentDetails={setShipmentDetails}
        />
      ))}
    </div>
  );
}

export default CardList;
