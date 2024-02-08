export default function Page() {
  async function create(formData: FormData) {
    "use server";
    console.log(formData);
  }
  const d = new Date();
  return (
    <div>
      <form action={create}>
        <input type="text" name="name" />
        <button className="flex justify-normal" type="submit">
          Submit
        </button>
        <div>
          <p>{d.toISOString()}</p>
          klo 14.16.
          {process.env.NEXT_PUBLIC_TESTATAAN ?? "Ei olla azuressa"}
        </div>
      </form>
    </div>
  );
}
