import IntegrationCard from "./IntegrationCard";

export default function SystemStatus() {
  const integrations = [
    {
      name: "Google Calendar",
      status: "Connected",
      description: "Booking system sync active",
      message: "Google Calendar Integration\nStatus: Connected\n\nClick to manage integration settings and view detailed logs."
    },
    {
      name: "Payment Gateway",
      status: "Connected",
      description: "Secure payments processing",
      message: "Payment Gateway Integration\nStatus: Connected\n\nClick to manage integration settings and view detailed logs."
    },
    {
      name: "Notion CMS",
      status: "Connected",
      description: "Content management active",
      message: "Notion CMS Integration\nStatus: Connected\n\nClick to manage integration settings and view detailed logs."
    },
    {
      name: "MailChimp",
      status: "Error",
      description: "Newsletter sync requires attention",
      message: "MailChimp Integration\nStatus: Error\n\nClick to manage integration settings and view detailed logs."
    },
  ];

  return (
    <div className="bg-white rounded-xl shadow-md p-6 mb-6">
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-800">System Status</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        {integrations.map((i) => (
          <IntegrationCard
            key={i.name}
            name={i.name}
            status={i.status}
            description={i.description}
            onClick={() => alert(i.message)}
          />
        ))}
      </div>
    </div>
  );
}
