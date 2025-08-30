import { useRoute } from "wouter";

// mock data for demo
const mockData = {
  "total-applications": [
    { id: 1, name: "John Doe", status: "Approved" },
    { id: 2, name: "Jane Smith", status: "Pending" }
  ],
  approved: [{ id: 1, name: "John Doe", status: "Approved" }],
  rejected: [{ id: 3, name: "Alan Brown", status: "Rejected" }],
  "in-process": [{ id: 4, name: "Emily Davis", status: "In Process" }],
  pending: [{ id: 2, name: "Jane Smith", status: "Pending" }]
};

// helper to clean up the title
const formatTitle = (status: string) => {
  return status
    .split("-")               // split at hyphens → ["in", "process"]
    .map(word => word.charAt(0).toUpperCase() + word.slice(1)) // capitalize
    .join(" ");               // join back → "In Process"
};

const ApplicationsPage: React.FC = () => {
  const [match, params] = useRoute("/applications/:status");
  const status = params?.status || "";
  const data = mockData[status as keyof typeof mockData] || [];

  return (
    <div className="p-6">
      {/* Page Title */}
      <h1 className="text-3xl font-bold mb-4">
        {formatTitle(status)} Page
      </h1>

      {/* Table */}
      {data.length > 0 ? (
        <table className="w-full border-collapse border border-gray-300">
          <thead>
  <tr className="bg-gray-100 dark:bg-gray-800">
    <th className="border p-2 text-left text-gray-700 dark:text-gray-200">ID</th>
    <th className="border p-2 text-left text-gray-700 dark:text-gray-200">Name</th>
    <th className="border p-2 text-left text-gray-700 dark:text-gray-200">Status</th>
  </tr>
</thead>

          <tbody>
            {data.map((item) => (
              <tr key={item.id}>
                <td className="border p-2">{item.id}</td>
                <td className="border p-2">{item.name}</td>
                <td className="border p-2">{item.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="text-muted-foreground">No records found for {formatTitle(status)}.</p>
      )}
    </div>
  );
};

export default ApplicationsPage;
