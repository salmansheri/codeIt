import ProblemsTable from "@/components/tables/problems-table";

export default function Home() {
  return (
    <section className="max-w-7xl mx-auto">
      <div className="my-5">
        <h1 className="text-3xl font-bold text-center">
          Quality Over Quantity!
        </h1>
      </div>
      <ProblemsTable />
    </section>
  );
}
