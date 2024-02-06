export default function Page() {
  async function create(formData: FormData) {
    "use server";
    console.log(formData);
  }

  return (
    <div>
      <form action={create}>
        <input type="text" name="name" />
        <button className="flex justify-normal" type="submit">
          Submit
        </button>
        <div>
          pitäs toimia A11111!!! Hei!{" "}
          {process.env.NEXT_PUBLIC_TESTATAAN ?? "Ei olla azuressa"}
        </div>
      </form>
    </div>
  );
}
