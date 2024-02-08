export default function Page() {
  async function create(formData: FormData) {
    "use server";
    console.log(formData);
  }

  const testFetch = async () => {
    try {
      const res = await fetch("https://jsonplaceholder.typicode.com/todos/1");

      const json = await res.json();
    } catch (error) {
      console.log(error);
    }
  };
  const d = new Date();
  return (
    <div>
      <form action={create}>
        <input type="text" name="name" />
        <button className="flex justify-normal" type="submit">
          Submit
        </button>
        {d.toISOString()}
        <div>{process.env.NEXT_PUBLIC_TESTATAAN ?? "Ei olla azuressa"}</div>
      </form>
    </div>
  );
}
